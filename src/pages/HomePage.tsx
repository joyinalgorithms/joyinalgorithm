import { Link } from 'react-router-dom'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import Button from '@mui/joy/Button'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import Avatar from '@mui/joy/Avatar'
import Grid from '@mui/joy/Grid'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import FolderIcon from '@mui/icons-material/Folder'
import DescriptionIcon from '@mui/icons-material/Description'
import CodeIcon from '@mui/icons-material/Code'
import VerifiedIcon from '@mui/icons-material/Verified'
import EmailIcon from '@mui/icons-material/Email'
import { PATHS } from '@/lib/paths'
import { FaFolderOpen } from 'react-icons/fa'
import { FaFileLines } from 'react-icons/fa6'
import { IoLayersSharp } from 'react-icons/io5'
import { MdVerifiedUser } from 'react-icons/md'
import { HiPaperAirplane } from 'react-icons/hi2'


const sectionPreviews = [
  {
    title: 'Projects',
    description: 'Explore my portfolio of web applications, ML projects, and games.',
    icon: <FaFolderOpen size={32} />,
    path: PATHS.PROJECTS,
    color: '#00d4ff',
  },
  {
    title: 'Resume',
    description: 'View or download my professional resume and work experience.',
    icon: <FaFileLines size={32} />,
    path: PATHS.RESUME,
    color: '#00ff88',
  },
  {
    title: 'Tech Stack',
    description: 'Technologies and tools I use for development.',
    icon: <IoLayersSharp size={32} />,
    path: PATHS.TECH_STACK,
    color: '#ff6b6b',
  },
  {
    title: 'Certifications',
    description: 'Professional certifications and achievements.',
    icon: <MdVerifiedUser size={32} />,
    path: PATHS.CERTIFICATIONS,
    color: '#ffd93d',
  },
  {
    title: 'Contact Me',
    description: 'Get in touch for collaborations or opportunities.',
    icon: <HiPaperAirplane size={32} />,
    path: PATHS.CONTACT,
    color: '#c084fc',
  },
]

export default function HomePage() {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 2, md: 4 },
          py: { xs: 6, md: 10 },
        }}
      >
        <Box
          sx={{
            maxWidth: '1200px',
            width: '100%',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 4, md: 8 },
          }}
        >
          {/* Text Content */}
          <Box
            sx={{
              flex: 1,
              textAlign: { xs: 'center', md: 'left' },
            }}
            className="animate-fadeInUp"
          >
            <Typography
              level="body-sm"
              sx={{
                color: 'primary.500',
                fontFamily: 'code',
                mb: 2,
                letterSpacing: '0.1em',
              }}
            >
              {'// Hello, World!'}
            </Typography>
            <Typography
              level="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                fontWeight: 800,
                mb: 1,
                lineHeight: 1.1,
              }}
            >
              Joy Bernal
            </Typography>
            <Typography
              level="h3"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                mb: 3, 
              }}
            >
              Full Stack Web Developer
            </Typography>
            <Typography
              level="body-lg"
              sx={{
                color: 'text.tertiary',
                maxWidth: '500px',
                mb: 4,
                mx: { xs: 'auto', md: 0 },
                lineHeight: 1.7,
              }}
            >
              I build scalable, modern web applications with clean code and intuitive design. Passionate about turning ideas into impactful digital solutions.
              <br /><br />
              🏆 Finalist & Special Citation Awardee — Project LIF, recognized by National Academy of Science and Technology (NAST).
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Link to={PATHS.PROJECTS} style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  endDecorator={<ArrowForwardIcon />}
                  sx={{
                    background: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)',
                    color: '#0a0a0a',
                    fontWeight: 600,
                    px: 4,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #00c4ef 0%, #00ef78 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 30px rgba(0, 212, 255, 0.3)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  View Projects
                </Button>
              </Link>
              <Link to={PATHS.CONTACT} style={{ textDecoration: 'none' }}>
                <Button
                  size="lg"
                  variant="outlined"
                  sx={{
                    borderColor: 'primary.500',
                    color: 'primary.500',
                    px: 4,
                    '&:hover': {
                      bgcolor: 'rgba(0, 212, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Contact Me
                </Button>
              </Link>
            </Box>
          </Box>

          {/* Avatar/Image Section */}
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
            }}
            className="animate-fadeInUp"
            style={{ animationDelay: '0.2s' }}
          >
            <Box
              sx={{
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: -4,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)',
                  opacity: 0.3,
                  filter: 'blur(20px)',
                },
              }}
            >
              <Avatar
                src="/joy.jpg"
                alt="Christine Joy A. Bernal"
                sx={{
                  width: { xs: 200, md: 280, lg: 320 },
                  height: { xs: 200, md: 280, lg: 320 },
                  border: '4px solid',
                  borderColor: 'neutral.800',
                  boxShadow: '0 0 40px rgba(0, 212, 255, 0.2)',
                }}
              />
            </Box>
            {/* Decorative elements */}
            <Box
              sx={{
                position: 'absolute',
                top: -20,
                right: -20,
                width: 60,
                height: 60,
                borderRadius: '12px',
                bgcolor: 'rgba(0, 212, 255, 0.1)',
                border: '1px solid',
                borderColor: 'primary.800',
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'code',
                color: 'primary.500',
              }}
              className="animate-float"
            >
              {'</>'}
            </Box>
            <Box
              sx={{
                position: 'absolute',
                bottom: 20,
                left: -30,
                width: 50,
                height: 50,
                borderRadius: '50%',
                bgcolor: 'rgba(0, 255, 136, 0.1)',
                border: '1px solid',
                borderColor: 'success.800',
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'code',
                fontSize: '0.75rem',
                color: 'success.500',
              }}
              className="animate-float"
              style={{ animationDelay: '1s' }}
            >
              {'{ }'}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Section Previews */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 4 },
          bgcolor: 'background.level1',
        }}
      >
        <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
          <Typography
            level="h2"
            sx={{
              textAlign: 'center',
              mb: 2,
              fontWeight: 700,
            }}
          >
            Explore My Work
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
            Navigate through different sections to learn more about my skills, 
            experience, and projects.
          </Typography>

          <Grid container spacing={3}>
            {sectionPreviews.map((section, index) => (
              <Grid key={section.title} xs={12} sm={6} md={4}>
                <Link to={section.path} style={{ textDecoration: 'none' }}>
                  <Card
                    variant="outlined"
                    sx={{
                      height: '100%',
                      bgcolor: 'background.surface',
                      borderColor: 'neutral.800',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: section.color,
                        transform: 'translateY(-8px)',
                        boxShadow: `0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px ${section.color}20`,
                      },
                    }}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '12px',
                          bgcolor: `${section.color}15`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: section.color,
                          mb: 2,
                        }}
                      >
                        {section.icon}
                      </Box>
                      <Typography
                        level="title-lg"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                          color: 'text.primary',
                        }}
                      >
                        {section.title}
                      </Typography>
                      <Typography
                        level="body-sm"
                        sx={{ color: 'text.tertiary' }}
                      >
                        {section.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
