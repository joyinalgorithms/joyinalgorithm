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
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LockIcon from '@mui/icons-material/Lock';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';

// Utility function translating the CS50 Caesar C logic into TypeScript
function computeCaesarCipher(plaintext: string, key: number): string {
  let ciphertext = '';
  
  for (let i = 0; i < plaintext.length; i++) {
    const charCode = plaintext.charCodeAt(i);
    
    // Check if uppercase
    if (charCode >= 65 && charCode <= 90) {
      // (char - 65 + key) % 26 + 65
      const shifted = ((charCode - 65 + key) % 26) + 65;
      ciphertext += String.fromCharCode(shifted);
    } 
    // Check if lowercase
    else if (charCode >= 97 && charCode <= 122) {
      // (char - 97 + key) % 26 + 97
      const shifted = ((charCode - 97 + key) % 26) + 97;
      ciphertext += String.fromCharCode(shifted);
    } 
    // Non-alphabetic character
    else {
      ciphertext += plaintext[i];
    }
  }
  
  return ciphertext;
}

export function CaesarPage() {
  const [keyInput, setKeyInput] = useState('');
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState<string | null>(null);

  const handleEncrypt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyInput.trim() || !plaintext.trim()) {
      setCiphertext(null);
      return;
    }

    const key = parseInt(keyInput, 10);
    // Mimic the C digit requirement check implicitly by NaN check
    if (isNaN(key) || key < 0) {
      return;
    }

    const encrypted = computeCaesarCipher(plaintext, key);
    setCiphertext(encrypted);
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
          CS50x: Caesar
        </Typography>
        <Typography level="body-lg" sx={{ color: "text.secondary", maxWidth: "600px", mx: "auto" }}>
          A digital translation of the CS50 Caesar problem. 
          Enter a numeric encryption key and a plaintext message to generate secret ciphertext!
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
          <form onSubmit={handleEncrypt}>
            <Stack spacing={4} sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography level="title-md" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <VpnKeyIcon color="warning" /> Encryption Key (k)
                  </Typography>
                  <Input
                    size="lg"
                    type="number"
                    slotProps={{ input: { min: "0" } }}
                    placeholder="E.g., 1, 13, 25"
                    value={keyInput}
                    onChange={(e) => setKeyInput(e.target.value)}
                    sx={{ 
                      bgcolor: 'background.body',
                      '--Input-focusedHighlight': 'rgba(255, 215, 0, 0.4)'
                    }}
                  />
                </Box>
                
                <Box sx={{ flex: 3 }}>
                  <Typography level="title-md" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LockIcon color="primary" /> Plaintext
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="Enter message to encrypt..."
                    value={plaintext}
                    onChange={(e) => setPlaintext(e.target.value)}
                    sx={{ 
                      bgcolor: 'background.body',
                      '--Input-focusedHighlight': 'rgba(0, 212, 255, 0.4)'
                    }}
                  />
                </Box>
              </Box>

              <Divider />

              <Button 
                type="submit" 
                size="lg" 
                fullWidth
                disabled={!keyInput.trim() || !plaintext.trim()}
                sx={{ 
                  bgcolor: "primary.600",
                  "&:hover": { bgcolor: "primary.700" },
                  fontWeight: 600
                }}
              >
                Encrypt Message
              </Button>
            </Stack>
          </form>

          {ciphertext !== null && (
            <Box sx={{ mt: 4 }}>
              <Typography level="title-md" sx={{ mb: 1, color: 'success.400', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                 <EnhancedEncryptionIcon /> Ciphertext Result
              </Typography>
              <Alert
                variant="soft"
                color="success"
                sx={{ 
                  fontWeight: 700, 
                  fontSize: "1.25rem", 
                  py: 2,
                  borderRadius: 'lg',
                  wordBreak: 'break-all'
                }}
              >
                {ciphertext}
              </Alert>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
