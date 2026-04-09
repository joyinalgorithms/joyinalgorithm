'use client';

import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: { xs: 2, md: 4 },
        borderTop: '1px solid',
        borderColor: 'neutral.800',
        bgcolor: 'rgba(10, 10, 10, 0.8)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography
          level="body-sm"
          sx={{
            color: 'text.tertiary',
            fontFamily: 'code',
          }}
        >
          joyinalgorithm &copy; 2026
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Link
            href="https://github.com/joybernal"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'text.tertiary',
              transition: 'color 0.2s ease',
              '&:hover': {
                color: 'primary.500',
              },
            }}
          >
            <GitHubIcon />
          </Link>
          <Link
            href="https://www.linkedin.com/in/joy-bernal-390297369/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'text.tertiary',
              transition: 'color 0.2s ease',
              '&:hover': {
                color: 'primary.500',
              },
            }}
          >
            <LinkedInIcon />
          </Link>
          <Link
            href="mailto:joyinalgorithm@gmail.com"
            sx={{
              color: 'text.tertiary',
              transition: 'color 0.2s ease',
              '&:hover': {
                color: 'primary.500',
              },
            }}
          >
            <EmailIcon />
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
