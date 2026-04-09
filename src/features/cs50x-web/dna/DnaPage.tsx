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
import Table from '@mui/joy/Table';
import ScienceIcon from '@mui/icons-material/Science';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

// Default CSV Database
const DEFAULT_CSV = `name,AGATC,AATG,TATC
Alice,2,8,3
Bob,4,1,5
Charlie,3,2,5
`.trim();

// Default Sequence matching Bob
const DEFAULT_SEQUENCE = 'AACCCTGCGAAGATCAGATCAGATCAGATCAAGGCCGAATGTCACAATATCTATCTATCTATCTATCAAA';

interface DnaProfile {
  name: string;
  strs: Record<string, number>;
}

interface MatchResult {
  matchName: string | null;
  detectedStrs: Record<string, number>;
}

// Emulates longest_match from Python script
function longestMatch(sequence: string, subsequence: string): number {
  let longestRun = 0;
  const subLen = subsequence.length;
  const seqLen = sequence.length;

  for (let i = 0; i < seqLen; i++) {
    let count = 0;
    while (true) {
      const start = i + count * subLen;
      const end = start + subLen;

      if (sequence.substring(start, end) === subsequence) {
        count++;
      } else {
        break;
      }
    }
    longestRun = Math.max(longestRun, count);
  }

  return longestRun;
}

function parseCsv(csvText: string): { strNames: string[]; profiles: DnaProfile[] } | null {
  const lines = csvText.trim().split('\n').filter(Boolean);
  if (lines.length < 2) return null;

  const headers = lines[0].split(',').map((h) => h.trim());
  const strNames = headers.slice(1);

  const profiles: DnaProfile[] = [];
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',').map((r) => r.trim());
    const name = row[0];
    const strs: Record<string, number> = {};
    for (let j = 1; j < headers.length; j++) {
      strs[headers[j]] = parseInt(row[j], 10);
    }
    profiles.push({ name, strs });
  }

  return { strNames, profiles };
}

export function DnaPage() {
  const [csvInput, setCsvInput] = useState(DEFAULT_CSV);
  const [seqInput, setSeqInput] = useState(DEFAULT_SEQUENCE);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!csvInput.trim() || !seqInput.trim()) return;

    setError(null);
    setResult(null);

    // 1. Read Database
    const parsedBb = parseCsv(csvInput);
    if (!parsedBb) {
      setError("Invalid CSV format. Ensure headers and at least one row exist.");
      return;
    }
    const { strNames, profiles } = parsedBb;

    // 2. Find longest match of each STR in DNA sequence
    const strCounts: Record<string, number> = {};
    for (const strName of strNames) {
      strCounts[strName] = longestMatch(seqInput, strName);
    }

    // 3. Check database for matching profiles
    let matchFound: string | null = null;
    for (const profile of profiles) {
      let isMatch = true;
      for (const strName of strNames) {
        if (profile.strs[strName] !== strCounts[strName]) {
          isMatch = false;
          break;
        }
      }
      if (isMatch) {
        matchFound = profile.name;
        break;
      }
    }

    setResult({
      matchName: matchFound,
      detectedStrs: strCounts,
    });
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4, md: 6 },
        maxWidth: '1200px',
        mx: 'auto',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography level="h1" sx={{ mb: 2, fontWeight: 800, letterSpacing: '-0.02em' }}>
          CS50x: DNA
        </Typography>
        <Typography level="body-lg" sx={{ color: 'text.secondary', maxWidth: '700px', mx: 'auto' }}>
          A digital translation of the CS50 DNA matching program. Provide a CSV database of Short Tandem Repeats (STRs)
          and a DNA sequence to identify the profile!
        </Typography>
      </Box>

      {error && (
        <Alert
          variant="soft"
          color="danger"
          startDecorator={<WarningAmberIcon />}
          sx={{ mb: 4, borderRadius: 'md', fontWeight: 600 }}
        >
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        <Grid xs={12} md={5}>
          <Card variant="outlined" sx={{ height: '100%', bgcolor: 'background.surface', boxShadow: 'sm', borderRadius: 'xl' }}>
            <CardContent>
              <Typography level="title-lg" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <ScienceIcon color="primary" /> STR Database (CSV)
              </Typography>
              <Typography level="body-sm" sx={{ mb: 2, color: 'text.secondary' }}>
                Format: <code>name,STR1,STR2...</code>
              </Typography>
              <Textarea
                minRows={10}
                value={csvInput}
                onChange={(e) => setCsvInput(e.target.value)}
                sx={{ bgcolor: 'background.body', '--Textarea-focusedHighlight': 'rgba(0, 100, 255, 0.4)' }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={12} md={7}>
          <Card variant="outlined" sx={{ height: '100%', bgcolor: 'background.surface', boxShadow: 'sm', borderRadius: 'xl' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
              <form onSubmit={handleMatch} style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography level="title-lg" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FingerprintIcon color="warning" /> DNA Sequence File
                </Typography>

                <Textarea
                  minRows={6}
                  value={seqInput}
                  onChange={(e) => setSeqInput(e.target.value)}
                  placeholder="Paste the unknown DNA nucleotide sequence string here (A,C,T,G)..."
                  sx={{ mb: 4, bgcolor: 'background.body', '--Textarea-focusedHighlight': 'rgba(255, 160, 0, 0.4)' }}
                />

                <Button
                  type="submit"
                  size="lg"
                  disabled={!csvInput.trim() || !seqInput.trim()}
                  startDecorator={<PersonSearchIcon />}
                  sx={{
                    bgcolor: 'primary.600',
                    '&:hover': { bgcolor: 'primary.700' },
                    fontWeight: 600,
                  }}
                >
                  Analyze DNA Match
                </Button>
              </form>

              {result && (
                <Box sx={{ mt: 5 }}>
                  <Divider sx={{ mb: 4 }}>
                    <Typography level="body-sm" color="neutral">Match Results</Typography>
                  </Divider>

                  {result.matchName ? (
                    <Alert
                      variant="soft"
                      color="success"
                      sx={{ fontWeight: 700, fontSize: '1.5rem', justifyContent: 'center', py: 3, mb: 4 }}
                    >
                      {result.matchName}
                    </Alert>
                  ) : (
                    <Alert
                      variant="soft"
                      color="danger"
                      sx={{ fontWeight: 700, fontSize: '1.25rem', justifyContent: 'center', py: 3, mb: 4 }}
                    >
                      No Match
                    </Alert>
                  )}

                  <Typography level="title-md" sx={{ mb: 2 }}>Detected STR Maximums:</Typography>
                  <Table variant="outlined" sx={{ '& tr > *:not(:first-child)': { textAlign: 'right' } }}>
                    <thead>
                      <tr>
                        <th>STR Sequence</th>
                        <th>Longest Run Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(result.detectedStrs).map(([str, count]) => (
                        <tr key={str}>
                          <td><code>{str}</code></td>
                          <td><strong>{count}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
