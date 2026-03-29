/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Box,
  Typography,
  Sheet,
  Button,
  Container,
  Alert,
  Stack,
  Divider,
} from '@mui/joy';
import { CreditCard as CardIcon, CheckCircle, AlertCircle, RefreshCcw } from 'lucide-react';
import { CreditCard } from './components/CreditCard';
import { useCreditCard } from './hooks/useCreditCard';

export const CreditPage: React.FC = () => {
  const {
    cardNumber,
    brand,
    isFlipped,
    isValidating,
    result,
    setIsFlipped,
    handleInputChange,
    handleValidate,
    handleReset,
  } = useCreditCard();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Box>
          <Sheet
            variant="outlined"
            sx={{
              borderRadius: '24px',
              p: { xs: 3, md: 5 },
              boxShadow: 'xl',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Stack spacing={1} sx={{ mb: 4, textAlign: 'center' }}>
              <Typography level="h2" sx={{ fontWeight: 'xl', letterSpacing: 'tight' }}>
                Credit
              </Typography>
              <Typography level="body-md" textColor="text.secondary">
                Securely validate your payment credentials
              </Typography>
            </Stack>

            <CreditCard 
              number={cardNumber.replace(/\s/g, '')} 
              brand={brand} 
              isFlipped={isFlipped} 
            />

            <Stack spacing={3}>
              <Box>
                <Typography level="title-sm" sx={{ mb: 1, ml: 0.5 }}>
                  Card Number
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    border: '1px solid',
                    borderColor: 'neutral.outlinedBorder',
                    borderRadius: 'xl',
                    px: 2,
                    py: 1,
                    bgcolor: 'background.surface',
                    '&:focus-within': {
                      borderColor: 'primary.solidBg',
                      boxShadow: '0 0 0 2px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <CardIcon size={20} color="gray" />
                  <Box
                    component="input"
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChange={handleInputChange}
                    onFocus={() => setIsFlipped(false)}
                    onBlur={() => setIsFlipped(true)}
                    maxLength={19}
                    sx={{
                      border: 'none',
                      outline: 'none',
                      width: '100%',
                      fontSize: 'lg',
                      bgcolor: 'transparent',
                      fontFamily: 'Inter',
                    }}
                  />
                </Box>
              </Box>

              <Stack direction="row" spacing={2}>
                <Button
                  size="lg"
                  fullWidth
                  onClick={handleValidate}
                  loading={isValidating}
                  disabled={!cardNumber || cardNumber.replace(/\D/g, '').length < 13}
                  sx={{ borderRadius: 'xl' }}
                >
                  Validate Now
                </Button>
                <Button
                  variant="soft"
                  color="neutral"
                  size="lg"
                  onClick={handleReset}
                  sx={{ borderRadius: 'xl', minWidth: 'fit-content' }}
                >
                  <RefreshCcw size={20} />
                </Button>
              </Stack>

              {result && (
                <Alert
                  variant="soft"
                  color={result.isValid ? 'success' : 'danger'}
                  startDecorator={result.isValid ? <CheckCircle /> : <AlertCircle />}
                  sx={{ borderRadius: 'xl', mt: 1 }}
                >
                  <Box>
                    <Typography level="title-sm">
                      {result.isValid ? 'Verification Successful' : 'Verification Failed'}
                    </Typography>
                    <Typography level="body-sm">
                      {result.message}
                    </Typography>
                  </Box>
                </Alert>
              )}
            </Stack>

            <Divider sx={{ my: 4 }} />

            <Typography level="body-xs" textAlign="center" textColor="text.tertiary">
              Powered by Luhn Algorithm • No data is stored or transmitted
            </Typography>
          </Sheet>
        </Box>
      </Container>
    </Box>
  );
};
