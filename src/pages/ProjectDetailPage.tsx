import { useParams, Link } from 'react-router-dom'
import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import Button from '@mui/joy/Button'
import Card from '@mui/joy/Card'
import Chip from '@mui/joy/Chip'
import AspectRatio from '@mui/joy/AspectRatio'
import Grid from '@mui/joy/Grid'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LaunchIcon from '@mui/icons-material/Launch'
import GitHubIcon from '@mui/icons-material/GitHub'
import { PATHS } from '@/routes/paths'

// This would typically come from an API or data file
const projectData: Record<string, {
  title: string
  description: string
  longDescription: string
  image: string
  tags: string[]
  features: string[]
  github?: string
  live?: string
}> = {
  'frontend-1': {
    title: 'E-Commerce Dashboard',
    description: 'A modern dashboard for managing online store products and orders.',
    longDescription: 'This comprehensive e-commerce dashboard provides store owners with all the tools they need to manage their online business. Features include real-time analytics, inventory management, order processing, and customer insights.',
    image: '/placeholder.jpg',
    tags: ['React', 'TypeScript', 'Joy UI', 'Chart.js'],
    features: [
      'Real-time sales analytics and reporting',
      'Inventory management with low stock alerts',
      'Order processing and tracking',
      'Customer management and insights',
      'Responsive design for all devices',
    ],
    github: '#',
    live: '#',
  },
}

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const project = id ? projectData[id] : null

  if (!project) {
    return (
      <Box sx={{ py: 8, px: 4, textAlign: 'center' }}>
        <Typography level="h2" sx={{ mb: 2 }}>Project Not Found</Typography>
        <Typography level="body-lg" sx={{ color: 'text.tertiary', mb: 4 }}>
          The project you&apos;re looking for doesn&apos;t exist or has been removed.
        </Typography>
        <Link to={PATHS.PROJECTS} style={{ textDecoration: 'none' }}>
          <Button startDecorator={<ArrowBackIcon />} variant="outlined">
            Back to Projects
          </Button>
        </Link>
      </Box>
    )
  }

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: '1000px', mx: 'auto' }}>
        <Link to={PATHS.PROJECTS} style={{ textDecoration: 'none' }}>
          <Button
            startDecorator={<ArrowBackIcon />}
            variant="plain"
            sx={{ mb: 4, color: 'text.secondary' }}
          >
            Back to Projects
          </Button>
        </Link>

        <Grid container spacing={4}>
          <Grid xs={12} md={6}>
            <Card variant="outlined" sx={{ borderColor: 'neutral.800', overflow: 'hidden' }}>
              <AspectRatio ratio="16/9">
                <img src={project.image} alt={project.title} style={{ objectFit: 'cover' }} />
              </AspectRatio>
            </Card>
          </Grid>

          <Grid xs={12} md={6}>
            <Typography level="h1" sx={{ fontWeight: 700, mb: 2 }}>
              {project.title}
            </Typography>
            <Typography level="body-lg" sx={{ color: 'text.tertiary', mb: 3 }}>
              {project.longDescription}
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {project.tags.map((tag) => (
                <Chip
                  key={tag}
                  variant="soft"
                  sx={{
                    bgcolor: 'rgba(0, 212, 255, 0.1)',
                    color: 'primary.400',
                  }}
                >
                  {tag}
                </Chip>
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              {project.github && (
                <Button
                  component="a"
                  href={project.github}
                  target="_blank"
                  variant="outlined"
                  startDecorator={<GitHubIcon />}
                  sx={{ borderColor: 'neutral.700' }}
                >
                  View Code
                </Button>
              )}
              {project.live && (
                <Button
                  component="a"
                  href={project.live}
                  target="_blank"
                  startDecorator={<LaunchIcon />}
                  sx={{
                    background: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)',
                    color: '#0a0a0a',
                  }}
                >
                  Live Demo
                </Button>
              )}
            </Box>
          </Grid>

          <Grid xs={12}>
            <Card
              variant="outlined"
              sx={{
                p: 3,
                borderColor: 'neutral.800',
                bgcolor: 'background.surface',
              }}
            >
              <Typography level="h3" sx={{ mb: 2 }}>
                Key Features
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                {project.features.map((feature, index) => (
                  <Box
                    component="li"
                    key={index}
                    sx={{
                      color: 'text.secondary',
                      mb: 1,
                      '&::marker': {
                        color: 'primary.500',
                      },
                    }}
                  >
                    {feature}
                  </Box>
                ))}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
