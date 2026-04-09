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
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WarningIcon from '@mui/icons-material/Warning';

const MAX_CANDIDATES = 9;

interface Candidate {
  name: string;
  votes: number;
}

export function PluralityPage() {
  // Election state
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [candidateInput, setCandidateInput] = useState('');
  
  // Voting state
  const [voteInput, setVoteInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Add a new candidate
  const handleAddCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    const name = candidateInput.trim();
    
    if (!name) return;
    if (candidates.length >= MAX_CANDIDATES) {
      setError(`Maximum number of candidates is ${MAX_CANDIDATES}`);
      return;
    }
    
    // Check for duplicates (case-insensitive)
    if (candidates.some(c => c.name.toLowerCase() === name.toLowerCase())) {
        setError("Candidate already exists.");
        return;
    }

    setCandidates([...candidates, { name, votes: 0 }]);
    setCandidateInput('');
    setError(null);
  };

  // Process a vote (mirrors the C `vote` function)
  const handleVote = (e: React.FormEvent) => {
    e.preventDefault();
    const name = voteInput.trim();
    if (!name) return;

    // Find candidate case-insensitively
    const candidateIndex = candidates.findIndex(
        c => c.name.toLowerCase() === name.toLowerCase()
    );

    if (candidateIndex !== -1) {
        const newCandidates = [...candidates];
        newCandidates[candidateIndex].votes += 1;
        setCandidates(newCandidates);
        setError(null);
    } else {
        setError("Invalid vote. No such candidate.");
    }
    setVoteInput('');
  };

  // Reset election
  const handleReset = () => {
    setCandidates([]);
    setVoteInput('');
    setCandidateInput('');
    setError(null);
  };

  // Determine winners (mirrors `print_winner` logic)
  const getWinners = (): Candidate[] => {
    if (candidates.length === 0) return [];
    
    let highestVote = 0;
    for (const c of candidates) {
        if (c.votes > highestVote) {
            highestVote = c.votes;
        }
    }

    // No votes cast yet
    if (highestVote === 0) return [];

    return candidates.filter(c => c.votes === highestVote);
  };

  const winners = getWinners();

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
          CS50x: Plurality
        </Typography>
        <Typography level="body-lg" sx={{ color: "text.secondary", maxWidth: "600px", mx: "auto" }}>
          A digital translation of the CS50 Plurality problem. 
          Set up an election, cast your votes, and see the highest vote-earners win dynamically!
        </Typography>
      </Box>

      {error && (
        <Alert 
          variant="soft" 
          color="danger" 
          startDecorator={<WarningIcon />}
          sx={{ mb: 4, borderRadius: 'md', fontWeight: 600 }}
        >
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Left Column: Management */}
        <Grid xs={12} md={6}>
            <Stack spacing={4}>
                {/* 1. Candidate Setup */}
                <Card variant="outlined" sx={{ bgcolor: "background.surface", boxShadow: "sm", borderRadius: "xl" }}>
                    <CardContent>
                        <Typography level="title-lg" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PersonAddIcon color="primary" /> Setup Candidates
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
                            {candidates.map((c, i) => (
                                <Chip key={i} variant="soft" color="primary">
                                    {c.name}
                                </Chip>
                            ))}
                            {candidates.length === 0 && (
                                <Typography level="body-sm" color="neutral">No candidates added yet.</Typography>
                            )}
                        </Box>
                    </CardContent>
                </Card>

                {/* 2. Voting Station */}
                <Card variant="outlined" sx={{ bgcolor: "background.surface", boxShadow: "sm", borderRadius: "xl" }}>
                    <CardContent>
                        <Typography level="title-lg" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <HowToVoteIcon color="warning" /> Cast Vote
                        </Typography>
                        <form onSubmit={handleVote}>
                            <Stack spacing={2}>
                                <Input
                                    placeholder="Type candidate name precisely..."
                                    value={voteInput}
                                    onChange={(e) => setVoteInput(e.target.value)}
                                    disabled={candidates.length === 0}
                                    sx={{ bgcolor: 'background.body' }}
                                />
                                <Button type="submit" color="warning" disabled={candidates.length === 0}>
                                    Submit Vote
                                </Button>
                            </Stack>
                        </form>
                    </CardContent>
                </Card>
            </Stack>
        </Grid>

        {/* Right Column: Scoreboard & Results */}
        <Grid xs={12} md={6}>
            <Card variant="outlined" sx={{ height: '100%', bgcolor: "background.surface", boxShadow: "sm", borderRadius: "xl" }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography level="title-lg" sx={{ mb: 3 }}>
                        Live Election Results
                    </Typography>

                    <Stack spacing={2} sx={{ flexGrow: 1 }}>
                        {candidates.length === 0 ? (
                             <Typography level="body-md" color="neutral" sx={{ fontStyle: 'italic' }}>
                                Awaiting candidates...
                             </Typography>
                        ) : (
                            candidates.map((c, i) => (
                                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, bgcolor: 'background.level1', borderRadius: 'md' }}>
                                    <Typography level="title-md">{c.name}</Typography>
                                    <Typography level="h4" color="primary">{c.votes}</Typography>
                                </Box>
                            ))
                        )}
                    </Stack>
                    
                    <Divider sx={{ my: 3 }} />

                    <Box sx={{ minHeight: '80px' }}>
                        {winners.length > 0 ? (
                            <Alert
                                variant="soft"
                                color="success"
                                startDecorator={<EmojiEventsIcon sx={{ fontSize: 28 }} />}
                                sx={{ fontWeight: 700, fontSize: "1.2rem", alignItems: 'center' }}
                            >
                                Winner(s): {winners.map(w => w.name).join(', ')}
                            </Alert>
                        ) : (
                            <Alert variant="plain" color="neutral" sx={{ justifyContent: 'center' }}>
                                No votes cast yet
                            </Alert>
                        )}
                    </Box>

                    {candidates.length > 0 && (
                        <Button variant="plain" color="danger" onClick={handleReset} sx={{ mt: 2 }}>
                            Reset Election
                        </Button>
                    )}
                </CardContent>
            </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
