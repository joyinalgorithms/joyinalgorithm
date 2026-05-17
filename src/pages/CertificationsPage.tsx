'use client';

import { useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Grid from '@mui/joy/Grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VerifiedIcon from '@mui/icons-material/Verified';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
}

const certificates: Certificate[] = [
    {
    id: '1',
    title: 'Special Citations Award | Finalist',
    issuer: 'National Academy of Science and Technology – Magsaysay Future Engineer / Technologist Awards ',
    date: 'December 2025',
    image: '/nast_pic.jpg',
  },
  {
    id: '2',
    title: "CS50X: CS50s Introduction to Computer Science",
    issuer: 'Harvard University',
    date: 'December 2024',
    image: '/cs50x_certificate.png',
  },
  {
    id: '3',
    title: 'Google Cybersecurity',
    issuer: 'Google Career Certificates',
    date: 'September 2024',
    image: '/google_cybersecurity.jpg',
  },
    {
    id: '4',
    title: 'Intro to Machine Learning',
    issuer: 'Kaggle',
    date: 'May 2025',
    image: '/kaggle_certificate.png',
  },
  {
    id: '5',
    title: 'Foundations of Cybersecurity',
    issuer: 'Coursera - Google',
    date: 'May 2024',
    image: '/cybersecurity_course1.jpg',
  },
  {
    id: '6',
    title: 'Play It Safe: Manage Security Risks',
    issuer: 'Coursera - Google',
    date: 'May 2024',
    image: '/cybersecurity_course2.jpg',
  },
  {
    id: '7',
    title: 'Connect and Protect: Network and Network Security',
    issuer: 'Coursera - Google',
    date: 'June 2024',
    image: '/cybersecurity_course3.jpg',
  },
    {
    id: '8',
    title: 'Tools of the Trade: Linux and SQL',
    issuer: 'Coursera - Google',
    date: 'June 2024',
    image: '/cybersecurity_course4.jpg',
  },
    {
    id: '9',
    title: 'Assets, Threats, and Vulnerabilities',
    issuer: 'Coursera - Google',
    date: 'July 2024',
    image: '/cybersecurity_course5.jpg',
  },
    {
    id: '10',
    title: 'Sound the Alarm: Detection and Response',
    issuer: 'Coursera - Google',
    date: 'August 2024',
    image: '/cybersecurity_course6.jpg',
  },
    {
    id: '11',
    title: 'Automate Cybersecurity Tasks with Python',
    issuer: 'Coursera - Google',
    date: 'August 2024',
    image: '/cybersecurity_course7.jpg',
  },
    {
    id: '12',
    title: 'Put it to Work: Prepare for Cybersecurity Jobs',
    issuer: 'Coursera - Google',
    date: 'September 2024',
    image: '/cybersecurity_course8.jpg',
  },
];

export default function CertificationsPage() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (  
      <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 4 } }}>
        <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
          <Typography
            level="h1"
            sx={{
              textAlign: 'center',
              mb: 2,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Certifications
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              textAlign: 'center',
              color: 'text.tertiary',
              mb: 6,
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Professional certifications and achievements that validate my skills 
            and commitment to continuous learning.
          </Typography>

          <Grid container spacing={3}>
            {certificates.map((cert) => (
              <Grid key={cert.id} xs={12} sm={6} md={4}>
                <Card
                  variant="outlined"
                  sx={{
                    height: '100%',
                    borderColor: 'neutral.800',
                    bgcolor: 'background.surface',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'primary.600',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                    },
                  }}
                >
                  <CardOverflow>
                    <AspectRatio ratio="16/10">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        style={{ objectFit: 'cover' }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          bgcolor: 'rgba(0, 0, 0, 0.7)',
                          borderRadius: '50%',
                          p: 0.5,
                        }}
                      >
                        <VerifiedIcon sx={{ color: 'success.500', fontSize: 20 }} />
                      </Box>
                    </AspectRatio>
                  </CardOverflow>
                  <CardContent sx={{ p: 2 }}>
                    <Typography level="title-md" sx={{ fontWeight: 600, mb: 1, minHeight: 48 }}>
                      {cert.title}
                    </Typography>
                    <Typography level="body-sm" sx={{ color: 'primary.400', mb: 1 }}>
                      {cert.issuer}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                      <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.tertiary' }} />
                      <Typography level="body-xs" sx={{ color: 'text.tertiary' }}>
                        {cert.date}
                      </Typography>
                    </Box>
                    <Button
                      size="sm"
                      variant="outlined"
                      fullWidth
                      startDecorator={<VisibilityIcon />}
                      onClick={() => setSelectedCert(cert)}
                      sx={{
                        borderColor: 'neutral.700',
                        color: 'text.secondary',
                        '&:hover': {
                          borderColor: 'primary.600',
                          bgcolor: 'rgba(0, 212, 255, 0.1)',
                        },
                      }}
                    >
                      View Certificate
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Certificate Modal */}
          <Modal open={!!selectedCert} onClose={() => setSelectedCert(null)}>
            <ModalDialog
              sx={{
                maxWidth: 700,
                width: '90%',
                bgcolor: 'background.surface',
                borderColor: 'neutral.800',
              }}
            >
              <ModalClose />
              {selectedCert && (
                <Box>
                  <Typography level="h4" sx={{ mb: 2, fontWeight: 600 }}>
                    {selectedCert.title}
                  </Typography>
                  <AspectRatio ratio="16/10" sx={{ mb: 2, borderRadius: '8px', overflow: 'hidden' }}>
                    <img
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      style={{ objectFit: 'cover' }}
                    />
                  </AspectRatio>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                      <Typography level="body-md" sx={{ color: 'primary.400' }}>
                        {selectedCert.issuer}
                      </Typography>
                      <Typography level="body-sm" sx={{ color: 'text.tertiary' }}>
                        Issued: {selectedCert.date}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              )}
            </ModalDialog>
          </Modal>
        </Box>
      </Box>
  );
}
