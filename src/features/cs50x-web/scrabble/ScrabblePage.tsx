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
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonIcon from '@mui/icons-material/Person';

const POINTS = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];

// Compute scrabble score for a string (ignoring non-letters)
function computeScore(word: string): number {
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    const char = word[i].toUpperCase();
    if (char >= 'A' && char <= 'Z') {
      const index = char.charCodeAt(0) - 65; // 'A' is 65
      score += POINTS[index];
    }
  }
  return score;
}

export function ScrabblePage() {
  const [word1, setWord1] = useState('');
  const [word2, setWord2] = useState('');
  const [result, setResult] = useState<{ score1: number; score2: number; winner: string } | null>(null);

  const handleCompute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word1.trim() && !word2.trim()) {
        setResult(null);
        return;
    }
    
    const score1 = computeScore(word1);
    const score2 = computeScore(word2);

    let winner = 'Tie!';
    if (score1 > score2) winner = 'Player 1 wins!';
    else if (score2 > score1) winner = 'Player 2 wins!';

    setResult({ score1, score2, winner });
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
          CS50x: Scrabble
        </Typography>
        <Typography level="body-lg" sx={{ color: "text.secondary", maxWidth: "600px", mx: "auto" }}>
          A digital translation of the CS50 Scrabble problem. 
          Enter two words to compute their scrabble scores and determine the winner!
        </Typography>
      </Box>

      <Card
        variant="outlined" 
        sx={{ 
          p: { xs: 3, sm: 4 }, 
          bgcolor: "background.surface", 
          borderColor: "neutral.800",
          boxShadow: "sm",
          borderRadius: "xl"
        }}
      >
        <CardContent>
          <form onSubmit={handleCompute}>
            <Stack spacing={4} sx={{ width: '100%' }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                {/* Player 1 Input */}
                <Box>
                  <Typography level="title-md" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon color="primary" /> Player 1
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="Enter word..."
                    value={word1}
                    onChange={(e) => setWord1(e.target.value)}
                    sx={{ 
                      bgcolor: 'background.body',
                      '--Input-focusedHighlight': 'rgba(0, 212, 255, 0.4)'
                    }}
                  />
                  {result && (
                    <Typography level="body-sm" sx={{ mt: 1, color: 'text.tertiary', fontWeight: 600 }}>
                      Score: {result.score1}
                    </Typography>
                  )}
                </Box>

                {/* Player 2 Input */}
                <Box>
                  <Typography level="title-md" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PersonIcon color="warning" /> Player 2
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="Enter word..."
                    value={word2}
                    onChange={(e) => setWord2(e.target.value)}
                    sx={{ 
                      bgcolor: 'background.body',
                      '--Input-focusedHighlight': 'rgba(255, 215, 0, 0.4)'
                    }}
                  />
                  {result && (
                     <Typography level="body-sm" sx={{ mt: 1, color: 'text.tertiary', fontWeight: 600 }}>
                     Score: {result.score2}
                   </Typography>
                  )}
                </Box>
              </Box>

              <Divider />

              <Button 
                type="submit" 
                size="lg" 
                fullWidth
                sx={{ 
                  bgcolor: "primary.600",
                  "&:hover": { bgcolor: "primary.700" },
                  fontWeight: 600
                }}
              >
                Compute Winner
              </Button>
            </Stack>
          </form>

          {result && (
            <Alert
                variant="soft"
                color={result.winner === 'Tie!' ? 'neutral' : (result.winner.includes('1') ? 'primary' : 'warning')}
                startDecorator={result.winner !== 'Tie!' ? <EmojiEventsIcon sx={{ fontSize: 24 }} /> : null}
                sx={{ 
                  mt: 4, 
                  fontWeight: 700, 
                  fontSize: "1.25rem", 
                  justifyContent: "center",
                  py: 2,
                  borderRadius: 'lg'
                }}
            >
              {result.winner}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
