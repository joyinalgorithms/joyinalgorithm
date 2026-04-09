import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/joy/Divider';
import Alert from '@mui/joy/Alert';
import Chip from '@mui/joy/Chip';
import Grid from '@mui/joy/Grid';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const MAX_CANDIDATES = 9;
const MAX_VOTERS = 100;

interface Candidate {
  id: number;
  name: string;
  votes: number;
  eliminated: boolean;
}

export function RunoffPage() {
  // Setup Phase
  const [phase, setPhase] = useState<'setup' | 'voting' | 'results'>('setup');
  const [candidateInput, setCandidateInput] = useState('');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [voterCountInput, setVoterCountInput] = useState('1');
  
  // Voting Phase
  const [voterCount, setVoterCount] = useState(1);
  const [currentVoter, setCurrentVoter] = useState(0); // 0-indexed
  const [currentRankings, setCurrentRankings] = useState<number[]>([]); 
  const [preferences, setPreferences] = useState<number[][]>([]); // preferences[voter][rank] = candidate_id

  // Results Phase
  const [winners, setWinners] = useState<Candidate[]>([]);

  // ---- Setup Logic ----
  const handleAddCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    const name = candidateInput.trim();
    if (!name || candidates.length >= MAX_CANDIDATES) return;
    
    // Case-insensitive duplicate check
    if (candidates.some(c => c.name.toLowerCase() === name.toLowerCase())) {
        return; 
    }

    setCandidates([...candidates, { id: candidates.length, name, votes: 0, eliminated: false }]);
    setCandidateInput('');
  };

  const handleStartVoting = () => {
    if (candidates.length < 2) return;
    const count = parseInt(voterCountInput, 10);
    if (isNaN(count) || count < 1 || count > MAX_VOTERS) return;

    setVoterCount(count);
    setPhase('voting');
    setCurrentRankings(Array(candidates.length).fill(-1));
  };

  // ---- Voting Logic ----
  const handleRankingChange = (rankIndex: number, candidateId: number | null) => {
    if (candidateId === null) return;
    const newRankings = [...currentRankings];
    newRankings[rankIndex] = candidateId;
    setCurrentRankings(newRankings);
  };

  const handleSubmitVote = () => {
    // Validate that all ranks are filled and unique
    if (currentRankings.includes(-1) || new Set(currentRankings).size !== currentRankings.length) {
        alert("Please assign a unique rank to all candidates.");
        return;
    }

    const newPreferences = [...preferences, [...currentRankings]];
    setPreferences(newPreferences);

    if (currentVoter + 1 < voterCount) {
        setCurrentVoter(currentVoter + 1);
        setCurrentRankings(Array(candidates.length).fill(-1));
    } else {
        // Run Tabulation algorithm
        runElectionAlgorithm(newPreferences);
        setPhase('results');
    }
  };

  // ---- Runoff Algorithm Translation ----
  const runElectionAlgorithm = (finalPreferences: number[][]) => {
      let stateCandidates = candidates.map(c => ({ ...c, votes: 0, eliminated: false }));

      while (true) {
          // 1. Tabulate
          for (let i = 0; i < stateCandidates.length; i++) stateCandidates[i].votes = 0;
          
          for (let i = 0; i < voterCount; i++) {
              for (let j = 0; j < stateCandidates.length; j++) {
                  const candidateId = finalPreferences[i][j];
                  if (!stateCandidates[candidateId].eliminated) {
                      stateCandidates[candidateId].votes++;
                      break;
                  }
              }
          }

          // 2. Check for winner
          const winnerNode = stateCandidates.find(c => c.votes > voterCount / 2);
          if (winnerNode) {
              setWinners([winnerNode]);
              break;
          }

          // 3. Find minimum
          let minVotes = Infinity;
          for (let i = 0; i < stateCandidates.length; i++) {
              if (!stateCandidates[i].eliminated && stateCandidates[i].votes < minVotes) {
                  minVotes = stateCandidates[i].votes;
              }
          }

          // 4. Check for tie
          let remainingCount = 0;
          let minCount = 0;
          for (let i = 0; i < stateCandidates.length; i++) {
              if (!stateCandidates[i].eliminated) {
                  remainingCount++;
                  if (stateCandidates[i].votes === minVotes) {
                      minCount++;
                  }
              }
          }

          if (remainingCount === minCount) {
              // Tie! Everyone remaining wins
              setWinners(stateCandidates.filter(c => !c.eliminated));
              break;
          }

          // 5. Eliminate
          for (let i = 0; i < stateCandidates.length; i++) {
              if (!stateCandidates[i].eliminated && stateCandidates[i].votes === minVotes) {
                  stateCandidates[i].eliminated = true;
              }
          }
      }
      setCandidates(stateCandidates); // Keep state for final scoreboard visualization
  };

  const handleReset = () => {
    setPhase('setup');
    setCandidates([]);
    setPreferences([]);
    setCurrentVoter(0);
    setWinners([]);
  };

  return (
    <Box 
      sx={{ 
        p: { xs: 2, sm: 4, md: 6 }, 
        maxWidth: '900px', 
        mx: 'auto',
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center" 
      }}
    >
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography level="h1" sx={{ mb: 2, fontWeight: 800, letterSpacing: "-0.02em" }}>
          CS50x: Runoff
        </Typography>
        <Typography level="body-lg" sx={{ color: "text.secondary", maxWidth: "600px", mx: "auto" }}>
          A digital translation of the CS50 Runoff problem (Ranked Choice Voting). 
          Configure an election, cast ranked preferences, and execute the runoff algorithm.
        </Typography>
      </Box>

      {phase === 'setup' && (
        <Card variant="outlined" sx={{ bgcolor: "background.surface", boxShadow: "sm", borderRadius: "xl" }}>
            <CardContent>
                <Grid container spacing={4}>
                    <Grid xs={12} md={6}>
                        <Typography level="title-lg" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PersonAddIcon color="primary" /> Candidates Setup
                        </Typography>
                        <form onSubmit={handleAddCandidate}>
                            <Stack spacing={2}>
                                <Input
                                    placeholder="Enter candidate name..."
                                    value={candidateInput}
                                    onChange={(e) => setCandidateInput(e.target.value)}
                                    disabled={candidates.length >= MAX_CANDIDATES}
                                    sx={{ bgcolor: 'background.body' }}
                                />
                                <Button type="submit" disabled={candidates.length >= MAX_CANDIDATES}>
                                    Add Candidate
                                </Button>
                            </Stack>
                        </form>
                        <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {candidates.map((c) => (
                                <Chip key={c.id} variant="soft" color="primary">{c.name}</Chip>
                            ))}
                            {candidates.length === 0 && (
                                <Typography level="body-sm" color="neutral">No candidates added yet.</Typography>
                            )}
                        </Box>
                    </Grid>
                    
                    <Grid xs={12} md={6}>
                        <Typography level="title-lg" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <HowToVoteIcon color="warning" /> Voter Configuration
                        </Typography>
                        <Stack spacing={2}>
                            <Input
                                type="number"
                                slotProps={{ input: { min: 1, max: MAX_VOTERS } }}
                                value={voterCountInput}
                                onChange={(e) => setVoterCountInput(e.target.value)}
                                sx={{ bgcolor: 'background.body' }}
                            />
                            <Button 
                                color="success" 
                                size="lg" 
                                onClick={handleStartVoting}
                                disabled={candidates.length < 2}
                            >
                                Start Voting
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
      )}

      {phase === 'voting' && (
        <Card variant="outlined" sx={{ bgcolor: "background.surface", boxShadow: "sm", borderRadius: "xl" }}>
            <CardContent>
                <Typography level="h3" sx={{ mb: 2, textAlign: 'center' }}>
                    Voter {currentVoter + 1} of {voterCount}
                </Typography>
                <Typography level="body-md" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
                    Rank all candidates in order of preference.
                </Typography>

                <Stack spacing={3} sx={{ maxWidth: '500px', mx: 'auto' }}>
                    {candidates.map((_, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography level="title-md" sx={{ width: '80px' }}>Rank {index + 1}:</Typography>
                            <Select 
                                value={currentRankings[index] !== -1 ? currentRankings[index] : null}
                                onChange={(_, value) => handleRankingChange(index, value)}
                                placeholder="Select candidate"
                                sx={{ flexGrow: 1 }}
                            >
                                {candidates.map(c => (
                                    <Option 
                                        key={c.id} 
                                        value={c.id} 
                                        // Disable if already ranked in another slot
                                        disabled={currentRankings.includes(c.id) && currentRankings[index] !== c.id}
                                    >
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                        </Box>
                    ))}
                    
                    <Button size="lg" color="primary" onClick={handleSubmitVote} sx={{ mt: 2 }}>
                        Submit Ballot
                    </Button>
                </Stack>
            </CardContent>
        </Card>
      )}

      {phase === 'results' && (
        <Card variant="outlined" sx={{ bgcolor: "background.surface", boxShadow: "sm", borderRadius: "xl" }}>
            <CardContent sx={{ textAlign: 'center' }}>
                <Typography level="h2" sx={{ mb: 4 }}>Election Concluded</Typography>

                <Alert
                    variant="soft"
                    color="success"
                    startDecorator={<EmojiEventsIcon sx={{ fontSize: 32 }} />}
                    sx={{ fontWeight: 700, fontSize: "1.5rem", justifyContent: 'center', py: 3, mb: 4 }}
                >
                    Winner(s): {winners.map(w => w.name).join(', ')}
                </Alert>

                <Button variant="outlined" color="primary" onClick={handleReset}>
                    Start New Election
                </Button>
            </CardContent>
        </Card>
      )}
    </Box>
  );
}
