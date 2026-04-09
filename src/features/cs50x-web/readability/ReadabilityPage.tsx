import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/joy/Divider';
import Alert from '@mui/joy/Alert';
import SchoolIcon from '@mui/icons-material/School';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import Grid from '@mui/joy/Grid';

// Utility functions translating the CS50 C logic into TypeScript
function countLetters(text: string): number {
  return text.split('').filter(char => /[a-zA-Z]/.test(char)).length;
}

function countWords(text: string): number {
  if (text.trim() === '') return 0;
  // CS50 simple logic: split by spaces. 1 space = 1 word separator
  // The C logic essentially counts spaces + 1
  let words = 1;
  const trimmed = text.trim();
  for (let i = 0; i < trimmed.length; i++) {
    if (trimmed[i] === ' ' && trimmed[i + 1] !== ' ') {
      words++;
    }
  }
  return words;
}

function countSentences(text: string): number {
  return text.split('').filter(char => char === '.' || char === '!' || char === '?').length;
}

function computeReadability(text: string) {
  const letters = countLetters(text);
  const words = countWords(text);
  const sentences = countSentences(text);

  if (words === 0) return { result: "No text provided", stats: null };

  const L = (letters / words) * 100;
  const S = (sentences / words) * 100;
  const index = Math.round(0.0588 * L - 0.296 * S - 15.8);

  let result = `Grade ${index}`;
  if (index >= 16) {
    result = "Grade 16+";
  } else if (index < 1) {
    result = "Before Grade 1";
  }

  return { result, stats: { letters, words, sentences } };
}

export function ReadabilityPage() {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<{ result: string; stats: any } | null>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === '') {
        setAnalysis(null);
        return;
    }
    setAnalysis(computeReadability(text));
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
          CS50x: Readability
        </Typography>
        <Typography level="body-lg" sx={{ color: "text.secondary", maxWidth: "600px", mx: "auto" }}>
          A digital translation of the CS50 Readability problem. 
          Enter a block of text to compute its Coleman-Liau index and determine its US grade reading level!
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
          <form onSubmit={handleAnalyze}>
            <Stack spacing={4} sx={{ width: '100%' }}>
              <Box>
                <Typography level="title-md" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextSnippetIcon color="primary" /> Input Text
                </Typography>
                <Textarea
                  minRows={4}
                  size="lg"
                  placeholder="Paste or type your regular text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  sx={{ 
                    bgcolor: 'background.body',
                    '--Textarea-focusedHighlight': 'rgba(0, 212, 255, 0.4)'
                  }}
                />
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
                Evaluate Reading Level
              </Button>
            </Stack>
          </form>

          {analysis && analysis.stats && (
            <Box sx={{ mt: 4 }}>
              <Alert
                variant="soft"
                color="success"
                startDecorator={<SchoolIcon sx={{ fontSize: 24 }} />}
                sx={{ 
                  fontWeight: 700, 
                  fontSize: "1.25rem", 
                  justifyContent: "center",
                  py: 2,
                  mb: 3,
                  borderRadius: 'lg'
                }}
              >
                {analysis.result}
              </Alert>

              <Grid container spacing={2}>
                <Grid xs={4}>
                  <Card variant="soft" sx={{ textAlign: 'center', bgcolor: 'rgba(0,0,0,0.2)' }}>
                    <Typography level="body-sm" sx={{ color: 'text.secondary', fontWeight: 600 }}>Letters</Typography>
                    <Typography level="h3" sx={{ color: 'primary.400' }}>{analysis.stats.letters}</Typography>
                  </Card>
                </Grid>
                <Grid xs={4}>
                  <Card variant="soft" sx={{ textAlign: 'center', bgcolor: 'rgba(0,0,0,0.2)' }}>
                    <Typography level="body-sm" sx={{ color: 'text.secondary', fontWeight: 600 }}>Words</Typography>
                    <Typography level="h3" sx={{ color: 'warning.400' }}>{analysis.stats.words}</Typography>
                  </Card>
                </Grid>
                <Grid xs={4}>
                  <Card variant="soft" sx={{ textAlign: 'center', bgcolor: 'rgba(0,0,0,0.2)' }}>
                    <Typography level="body-sm" sx={{ color: 'text.secondary', fontWeight: 600 }}>Sentences</Typography>
                    <Typography level="h3" sx={{ color: 'success.400' }}>{analysis.stats.sentences}</Typography>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
