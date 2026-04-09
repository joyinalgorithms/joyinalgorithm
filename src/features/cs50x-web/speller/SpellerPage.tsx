import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/joy/Divider';
import Alert from '@mui/joy/Alert';
import Textarea from '@mui/joy/Textarea';
import Grid from '@mui/joy/Grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import CancelIcon from '@mui/icons-material/Cancel';
import MenuBookIcon from '@mui/icons-material/MenuBook';

// Default dictionary (fallback minimal set)
const DEFAULT_DICTIONARY = `
a
and
are
as
at
be
but
by
for
if
in
into
is
it
no
not
of
on
or
such
that
the
their
then
there
these
they
this
to
was
will
with
`.trim();

interface SpellerResult {
  misspelledCount: number;
  dictWords: number;
  textWords: number;
  misspelledList: string[];
  timeTotal: number; // Simulated benchmark
}

// Function to meticulously parse the text identical to CS50 Speller C Logic
function extractValidWords(text: string): string[] {
  const words: string[] = [];
  let currentWord = "";
  let hasDigit = false;
  let wordTooLong = false;

  const LENGTH = 45; // Same as length constant in CS50

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    
    // Allow only alphabetical characters and apostrophes (not at the start)
    if (/[a-zA-Z]/.test(c) || (c === "'" && currentWord.length > 0)) {
      currentWord += c;
      if (currentWord.length > LENGTH) {
         wordTooLong = true;
      }
    } 
    // Ignore words with numbers (like MS Word can)
    else if (/[0-9]/.test(c)) {
      hasDigit = true;
      currentWord += c;
    } 
    // Word boundary
    else {
      if (currentWord.length > 0) {
        if (!hasDigit && !wordTooLong) {
          words.push(currentWord);
        }
        currentWord = "";
        hasDigit = false;
        wordTooLong = false;
      }
    }
  }

  // Final flush
  if (currentWord.length > 0 && !hasDigit && !wordTooLong) {
    words.push(currentWord);
  }

  return words;
}

export function SpellerPage() {
  const [dictInput, setDictInput] = useState(DEFAULT_DICTIONARY);
  const [textInput, setTextInput] = useState('');
  const [result, setResult] = useState<SpellerResult | null>(null);

  const runSpeller = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    const startMs = performance.now();

    // 1. Load: Parse dictionary into an O(1) Javascript Set hash table
    const dictSet = new Set<string>();
    const dictLines = dictInput.split('\n');
    for (const line of dictLines) {
      const word = line.trim().toLowerCase();
      if (word) {
        dictSet.add(word); // Effectively creating the Trie/Hash nodes
      }
    }

    // 2. Extract words from input text
    const textWords = extractValidWords(textInput);
    const misspelledWords: string[] = [];

    // 3. Check: verify spelling against loaded dictionary Set
    for (const word of textWords) {
      if (!dictSet.has(word.toLowerCase())) {
        misspelledWords.push(word);
      }
    }

    const endMs = performance.now();

    setResult({
      misspelledCount: misspelledWords.length,
      dictWords: dictSet.size,
      textWords: textWords.length,
      misspelledList: misspelledWords,
      timeTotal: (endMs - startMs) / 1000 // Convert ms to simulated seconds benchmarking
    });
  };

  return (
    <Box 
      sx={{ 
        p: { xs: 2, sm: 4, md: 6 }, 
        maxWidth: '1200px', 
        mx: 'auto',
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center" 
      }}
    >
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography level="h1" sx={{ mb: 2, fontWeight: 800, letterSpacing: "-0.02em" }}>
          CS50x: Speller
        </Typography>
        <Typography level="body-lg" sx={{ color: "text.secondary", maxWidth: "700px", mx: "auto" }}>
          A digital translation of the legendary CS50 Speller. 
          Upload or paste a dictionary hash table set and spell-check your text block instantly!
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid xs={12} md={4}>
            <Card variant="outlined" sx={{ height: '100%', bgcolor: "background.surface", boxShadow: "sm", borderRadius: "xl" }}>
                <CardContent>
                    <Typography level="title-lg" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <MenuBookIcon color="primary" /> Load Dictionary
                    </Typography>
                    <Typography level="body-sm" sx={{ mb: 2, color: 'text.secondary' }}>
                        Define accepted valid words. One word per line, case-insensitive.
                    </Typography>
                    <Textarea 
                        minRows={15}
                        value={dictInput}
                        onChange={(e) => setDictInput(e.target.value)}
                        placeholder="apple..."
                        sx={{ bgcolor: 'background.body', '--Textarea-focusedHighlight': 'rgba(0, 100, 255, 0.4)' }}
                    />
                </CardContent>
            </Card>
        </Grid>

        <Grid xs={12} md={8}>
            <Card variant="outlined" sx={{ height: '100%', bgcolor: "background.surface", boxShadow: "sm", borderRadius: "xl" }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    <form onSubmit={runSpeller} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Typography level="title-lg" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <SpellcheckIcon color="primary" /> Text to Check
                        </Typography>
                        
                        <Textarea 
                            minRows={8}
                            maxRows={12}
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            placeholder="Type or paste your document here to have its spelling miraculously validated..."
                            sx={{ mb: 4, bgcolor: 'background.body' }}
                        />

                        <Button 
                            type="submit" 
                            size="lg" 
                            disabled={!textInput.trim()}
                            startDecorator={<CheckCircleIcon />}
                            sx={{ 
                                bgcolor: "primary.600",
                                "&:hover": { bgcolor: "primary.700" },
                                fontWeight: 600,
                                mb: 4
                            }}
                        >
                            Execute Spell Check
                        </Button>
                    </form>

                    <Divider />

                    {result && (
                        <Box sx={{ mt: 4 }}>
                            <Typography level="h3" sx={{ mb: 3 }}>Benchmarks & Results</Typography>
                            
                            <Grid container spacing={2} sx={{ mb: 4 }}>
                                <Grid xs={6} md={3}>
                                    <Card variant="soft" color="danger" sx={{ textAlign: 'center' }}>
                                        <Typography level="body-sm" fontWeight={600}>Misspelled</Typography>
                                        <Typography level="h3" color="danger">{result.misspelledCount}</Typography>
                                    </Card>
                                </Grid>
                                <Grid xs={6} md={3}>
                                    <Card variant="soft" color="success" sx={{ textAlign: 'center' }}>
                                        <Typography level="body-sm" fontWeight={600}>Words in Dict</Typography>
                                        <Typography level="h3" color="success">{result.dictWords}</Typography>
                                    </Card>
                                </Grid>
                                <Grid xs={6} md={3}>
                                    <Card variant="soft" color="primary" sx={{ textAlign: 'center' }}>
                                        <Typography level="body-sm" fontWeight={600}>Words in Text</Typography>
                                        <Typography level="h3" color="primary">{result.textWords}</Typography>
                                    </Card>
                                </Grid>
                                <Grid xs={6} md={3}>
                                    <Card variant="soft" color="warning" sx={{ textAlign: 'center' }}>
                                        <Typography level="body-sm" fontWeight={600}>Total Time</Typography>
                                        <Typography level="h3" color="warning">{result.timeTotal.toFixed(4)}s</Typography>
                                    </Card>
                                </Grid>
                            </Grid>

                            {result.misspelledList.length > 0 ? (
                                <Box>
                                    <Typography level="title-md" color="danger" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CancelIcon /> Identified Misspellings
                                    </Typography>
                                    <Box sx={{ 
                                        p: 2, 
                                        bgcolor: 'background.level1', 
                                        borderRadius: 'md', 
                                        color: 'danger.500', 
                                        fontWeight: '500',
                                        maxHeight: '200px',
                                        overflowY: 'auto',
                                        wordBreak: 'break-all'
                                    }}>
                                        {result.misspelledList.join(' \u2022 ')}
                                    </Box>
                                </Box>
                            ) : (
                                <Alert
                                    variant="soft"
                                    color="success"
                                    startDecorator={<CheckCircleIcon sx={{ fontSize: 24 }} />}
                                    sx={{ fontWeight: 700, p: 2 }}
                                >
                                    Perfect! No typos found against the active dictionary.
                                </Alert>
                            )}
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
