import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/joy/Divider';
import Input from '@mui/joy/Input';
import Grid from '@mui/joy/Grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export function TriviaPage() {
  // Part 1: Multiple Choice State
  const [mcqStatus, setMcqStatus] = useState<number | null>(null);

  // Part 2: Free Response State
  const [frqInput, setFrqInput] = useState('');
  const [frqStatus, setFrqStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // MCQ Logic
  const handleMcq = (index: number) => {
    setMcqStatus(index);
  };

  // Free Response Logic
  const handleFrqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const answer = frqInput.trim().toLowerCase();
    if (answer === 'arpanet') {
      setFrqStatus('correct');
    } else {
      setFrqStatus('wrong');
    }
  };

  return (
    <Box 
      sx={{ 
        p: { xs: 2, sm: 4, md: 6 }, 
        maxWidth: '800px', 
        mx: 'auto',
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography level="h1" sx={{ mb: 2, fontWeight: 800, letterSpacing: "-0.02em" }}>
          CS50x: Trivia
        </Typography>
        <Typography level="body-lg" sx={{ color: "text.secondary", maxWidth: "600px", mx: "auto" }}>
          A digital translation of the CS50 Trivia problem. Test your computer science history knowledge!
        </Typography>
      </Box>

      <Grid container spacing={4} direction="column">
        
        {/* PART 1: Multiple Choice */}
        <Grid>
          <Card variant="outlined" sx={{ bgcolor: "background.surface", boxShadow: "sm", borderRadius: "xl" }}>
            <CardContent>
              <Typography level="title-lg" sx={{ mb: 1 }}>Part 1: Multiple Choice</Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Typography level="body-lg" sx={{ mb: 3, fontWeight: 500 }}>
                Who is credited with developing the first compiler for a computer programming language and popularizing the term "debugging"?
              </Typography>

              <Stack spacing={2} sx={{ maxWidth: '400px' }}>
                <Button 
                  variant={mcqStatus === 1 ? 'solid' : 'soft'} 
                  color={mcqStatus === 1 ? 'success' : 'neutral'}
                  onClick={() => handleMcq(1)}
                  endDecorator={mcqStatus === 1 ? <CheckCircleIcon /> : null}
                >
                  Grace Hopper
                </Button>
                <Button 
                  variant={mcqStatus === 2 ? 'solid' : 'soft'} 
                  color={mcqStatus === 2 ? 'danger' : 'neutral'}
                  onClick={() => handleMcq(2)}
                  endDecorator={mcqStatus === 2 ? <CancelIcon /> : null}
                >
                  Alan Turing
                </Button>
                <Button 
                  variant={mcqStatus === 3 ? 'solid' : 'soft'} 
                  color={mcqStatus === 3 ? 'danger' : 'neutral'}
                  onClick={() => handleMcq(3)}
                  endDecorator={mcqStatus === 3 ? <CancelIcon /> : null}
                >
                  Ada Lovelace
                </Button>
                <Button 
                  variant={mcqStatus === 4 ? 'solid' : 'soft'} 
                  color={mcqStatus === 4 ? 'danger' : 'neutral'}
                  onClick={() => handleMcq(4)}
                  endDecorator={mcqStatus === 4 ? <CancelIcon /> : null}
                >
                  Tim Berners-Lee
                </Button>
              </Stack>

              {mcqStatus !== null && (
                <Typography 
                  level="h4" 
                  color={mcqStatus === 1 ? "success" : "danger"} 
                  sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  {mcqStatus === 1 ? <><CheckCircleIcon /> Correct Answer!</> : <><CancelIcon /> Wrong Answer!</>}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* PART 2: Free Response */}
        <Grid>
          <Card variant="outlined" sx={{ bgcolor: "background.surface", boxShadow: "sm", borderRadius: "xl" }}>
            <CardContent>
              <Typography level="title-lg" sx={{ mb: 1 }}>Part 2: Free Response</Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Typography level="body-lg" sx={{ mb: 3, fontWeight: 500 }}>
                What was the first name of the internet that connect the first points on the internet to one another?
              </Typography>

              <form onSubmit={handleFrqSubmit}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ maxWidth: '500px' }}>
                  <Input 
                    placeholder="Type your answer..."
                    value={frqInput}
                    onChange={(e) => {
                      setFrqInput(e.target.value);
                      if (frqStatus !== 'idle') setFrqStatus('idle'); // Reset status on typing
                    }}
                    color={frqStatus === 'correct' ? 'success' : frqStatus === 'wrong' ? 'danger' : 'neutral'}
                    sx={{ flexGrow: 1 }}
                  />
                  <Button type="submit" color="primary">Submit</Button>
                </Stack>
              </form>

              {frqStatus !== 'idle' && (
                <Typography 
                  level="h4" 
                  color={frqStatus === 'correct' ? "success" : "danger"} 
                  sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}
                >
                  {frqStatus === 'correct' ? <><CheckCircleIcon /> Correct Answer!</> : <><CancelIcon /> Wrong Answer!</>}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
}
