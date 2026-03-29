/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Box, Typography, Sheet } from '@mui/joy';

interface CreditCardProps {
  number: string;
  brand: string;
  isFlipped: boolean;
}

const brandColors: Record<string, string> = {
  VISA: 'linear-gradient(135deg, #1a1f71 0%, #0f4c75 100%)',
  MASTERCARD: 'linear-gradient(135deg, #eb001b 0%, #f79e1b 100%)',
  AMEX: 'linear-gradient(135deg, #006fcf 0%, #0048a3 100%)',
  DISCOVER: 'linear-gradient(135deg, #ff6b00 0%, #ff9e00 100%)',
  UNKNOWN: 'linear-gradient(135deg, #2d3436 0%, #000000 100%)',
};

export const CreditCard: React.FC<CreditCardProps> = ({ number, brand, isFlipped }) => {
  const displayBrand = brand === 'UNKNOWN' ? '' : brand;
  const formattedNumber = number.padEnd(16, '•').replace(/(.{4})/g, '$1 ').trim();

  return (
    <Box
      sx={{
        perspective: '1000px',
        width: '100%',
        maxWidth: 400,
        height: 220,
        margin: '0 auto',
        mb: 4,
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.6s ease',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front Face */}
        <Sheet
          variant="solid"
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            borderRadius: 'xl',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: brandColors[brand] || brandColors.UNKNOWN,
            boxShadow: 'lg',
            color: 'white',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box
              sx={{
                width: 45,
                height: 35,
                background: 'linear-gradient(45deg, #ffd700, #ffed4e)',
                borderRadius: 'sm',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)',
              }}
            />
            <Typography level="h4" sx={{ color: 'white', opacity: 0.9, fontWeight: 'bold' }}>
              {displayBrand}
            </Typography>
          </Box>

          <Typography
            sx={{
              fontFamily: 'monospace',
              fontSize: { xs: '1.2rem', sm: '1.5rem' },
              letterSpacing: '4px',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              textAlign: 'center',
            }}
          >
            {formattedNumber}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Box>
              <Typography level="body-xs" sx={{ color: 'white', opacity: 0.7, textTransform: 'uppercase' }}>
                Card Holder
              </Typography>
              <Typography level="body-sm" sx={{ color: 'white', fontWeight: 'md' }}>
                VALUED CUSTOMER
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography level="body-xs" sx={{ color: 'white', opacity: 0.7, textTransform: 'uppercase' }}>
                Expires
              </Typography>
              <Typography level="body-sm" sx={{ color: 'white', fontWeight: 'md' }}>
                MM/YY
              </Typography>
            </Box>
          </Box>
        </Sheet>

        {/* Back Face */}
        <Sheet
          variant="solid"
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            borderRadius: 'xl',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, #2d3436 0%, #636e72 100%)',
            boxShadow: 'lg',
            overflow: 'hidden',
          }}
        >
          <Box sx={{ mt: 4, height: 45, background: '#000', width: '100%' }} />
          <Box sx={{ p: 3 }}>
            <Box
              sx={{
                background: 'white',
                height: 35,
                borderRadius: 'sm',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: 2,
              }}
            >
              <Typography level="body-xs" sx={{ color: 'black', fontStyle: 'italic', fontWeight: 'bold' }}>
                •••
              </Typography>
            </Box>
            <Typography level="body-xs" sx={{ color: 'white', opacity: 0.6, mt: 2, textAlign: 'center' }}>
              This card is property of the issuer. If found, please return to any branch.
            </Typography>
          </Box>
        </Sheet>
      </Box>
    </Box>
  );
};
