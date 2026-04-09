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
import KeyIcon from '@mui/icons-material/Key';
import LockIcon from '@mui/icons-material/Lock';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';

// Utility function translating the CS50 Substitution C logic into TypeScript
function validateKey(key: string): string | null {
  if (key.length !== 26) {
    return "Key must contain exactly 26 characters.";
  }
  
  if (!/^[a-zA-Z]+$/.test(key)) {
    return "Key must only contain alphabetic characters.";
  }
  
  const upperKey = key.toUpperCase();
  const charSet = new Set<string>();
  
  for (let i = 0; i < upperKey.length; i++) {
    if (charSet.has(upperKey[i])) {
      return "Key must not contain repeated characters.";
    }
    charSet.add(upperKey[i]);
  }
  
  return null;
}

function computeSubstitutionCipher(plaintext: string, key: string): string {
  let ciphertext = '';
  const upperKey = key.toUpperCase();
  
  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext[i];
    const charCode = plaintext.charCodeAt(i);
    
    // Check if uppercase
    if (charCode >= 65 && charCode <= 90) {
      const letterIndex = charCode - 65;
      ciphertext += upperKey[letterIndex];
    } 
    // Check if lowercase
    else if (charCode >= 97 && charCode <= 122) {
      const letterIndex = charCode - 97;
      ciphertext += upperKey[letterIndex].toLowerCase();
    } 
    // Non-alphabetic character
    else {
      ciphertext += char;
    }
  }
  
  return ciphertext;
}

export function SubstitutionPage() {
  const [keyInput, setKeyInput] = useState('');
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEncrypt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyInput.trim() || !plaintext.trim()) {
      setCiphertext(null);
      setError(null);
      return;
    }

    const validationError = validateKey(keyInput);
    if (validationError) {
      setError(validationError);
      setCiphertext(null);
      return;
    }

    setError(null);
    const encrypted = computeSubstitutionCipher(plaintext, keyInput);
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
          CS50x: Substitution
        </Typography>
        <Typography level="body-lg" sx={{ color: "text.secondary", maxWidth: "600px", mx: "auto" }}>
          A digital translation of the CS50 Substitution problem. 
          Enter a 26-character substitution key and a plaintext message to generate ciphertext!
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
                <Box sx={{ flex: 1.5 }}>
                  <Typography level="title-md" sx={{ mb: 1, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <KeyIcon color="warning" /> 26-Letter Key
                  </Typography>
                  <Input
                    size="lg"
                    type="text"
                    placeholder="e.g., JTREKYAVOGDXPSNCUIZLFBMWHQ"
                    value={keyInput}
                    onChange={(e) => setKeyInput(e.target.value)}
                    sx={{ 
                      bgcolor: 'background.body',
                      '--Input-focusedHighlight': 'rgba(255, 215, 0, 0.4)'
                    }}
                  />
                </Box>
                
                <Box sx={{ flex: 2 }}>
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

              {error && (
                <Alert 
                  variant="soft" 
                  color="danger" 
                  startDecorator={<SpellcheckIcon />}
                  sx={{ borderRadius: 'md', fontWeight: 600 }}
                >
                  {error}
                </Alert>
              )}

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

          {ciphertext !== null && !error && (
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
