import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Alert from '@mui/joy/Alert';
import Stack from '@mui/joy/Stack';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaTimesCircle } from 'react-icons/fa';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// Utility function translating the CS50 C logic into TypeScript
function validateCreditCard(cardNumber: string): string {
  // Only accept numbers
  if (!/^\d+$/.test(cardNumber)) return "INVALID";

  const numArr = cardNumber.split('').map(Number);
  const position = numArr.length;
  let checksum = 0;
  
  // Luhn's Algorithm: read from right to left
  let isSecond = false;
  for (let i = position - 1; i >= 0; i--) {
      let digit = numArr[i];
      if (isSecond) {
          digit *= 2;
          if (digit > 9) {
              digit -= 9;
          }
      }
      checksum += digit;
      isSecond = !isSecond;
  }

  // Check validity
  if (checksum % 10 !== 0) {
      return "INVALID";
  }

  // Determine card type based on CS50 specs
  const firstTwo = parseInt(cardNumber.substring(0, 2), 10);
  const firstDigit = parseInt(cardNumber.substring(0, 1), 10);

  if (position === 15) {
      if (firstTwo === 34 || firstTwo === 37) {
          return "AMEX";
      }
  } else if (position === 13) {
      if (firstDigit === 4) return "VISA";
  } else if (position === 16) {
      if (firstTwo >= 51 && firstTwo <= 55) {
          return "MASTERCARD";
      } else if (firstDigit === 4) {
          return "VISA";
      }
  }
  
  return "INVALID";
}

export function CreditPage() {
    const [cardNumber, setCardNumber] = useState("");
    const [result, setResult] = useState<string | null>(null);

    const handleValidation = (e: React.FormEvent) => {
        e.preventDefault();
        if (cardNumber.trim() === "") {
          setResult(null);
          return;
        }
        const outcome = validateCreditCard(cardNumber.replace(/\s+/g, ''));
        setResult(outcome);
    };

    // Helper to render proper UI based on the response
    const getResultDisplay = () => {
      if (!result) return null;

      if (result === 'INVALID') {
        return (
          <Alert
            variant="soft"
            color="danger"
            startDecorator={<ErrorOutlineIcon />}
            sx={{ mt: 3, fontWeight: 600, fontSize: "1.1rem", borderRadius: "md" }}
          >
            INVALID
          </Alert>
        );
      }

      // Valid variations
      let icon = <CheckCircleIcon sx={{ fontSize: 24 }} />;
      let colorMode: "success" | "primary" | "warning" = "success";
      
      if (result === 'VISA') {
        icon = <FaCcVisa size={28} />;
        colorMode = "primary";
      } else if (result === 'MASTERCARD') {
        icon = <FaCcMastercard size={28} />;
        colorMode = "warning";
      } else if (result === 'AMEX') {
        icon = <FaCcAmex size={28} />;
        colorMode = "success";
      }

      return (
        <Alert
          variant="soft"
          color={colorMode}
          startDecorator={icon}
          sx={{ mt: 3, fontWeight: 700, fontSize: "1.2rem", alignItems: "center", borderRadius: "md", justifyContent: "center" }}
        >
          {result}
        </Alert>
      );
    };

    return (
        <Box sx={{ 
          p: { xs: 2, sm: 4, md: 6 }, 
          maxWidth: '800px', 
          mx: 'auto',
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center" 
        }}>
            <Box sx={{ mb: 6, textAlign: "center" }}>
              <Typography level="h1" sx={{ mb: 2, fontWeight: 800, letterSpacing: "-0.02em" }}>
                CS50x: Credit
              </Typography>
              <Typography level="body-lg" sx={{ color: "text.secondary", maxWidth: "600px", mx: "auto" }}>
                A digital translation of the CS50 Credit problem. 
                Enter a credit card number to validate it using Luhn's algorithm and reliably detect Visa, Mastercard, or AMEX.
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
                <form onSubmit={handleValidation}>
                  <Stack spacing={3}>
                    <Box>
                      <Typography level="title-md" sx={{ mb: 1, fontWeight: 600 }}>
                        Card Number
                      </Typography>
                      <Input
                        size="lg"
                        placeholder="Enter 13, 15, or 16 digit number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        startDecorator={<CreditCardIcon sx={{ color: 'text.tertiary' }} />}
                        sx={{ 
                          bgcolor: 'background.body',
                          '--Input-focusedHighlight': 'rgba(0, 212, 255, 0.4)'
                        }}
                      />
                    </Box>
                    <Button 
                      type="submit" 
                      size="lg" 
                      sx={{ 
                        bgcolor: "primary.600",
                        "&:hover": { bgcolor: "primary.700" },
                        fontWeight: 600
                      }}
                    >
                      Validate Card
                    </Button>
                  </Stack>
                </form>

                {getResultDisplay()}
              </CardContent>
            </Card>
        </Box>
    );
}
