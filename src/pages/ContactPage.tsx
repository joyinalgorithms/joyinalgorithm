import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import Link from '@mui/joy/Link'
import Grid from '@mui/joy/Grid'
import EmailIcon from '@mui/icons-material/Email'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'

interface SocialLink {
  name: string
  icon: React.ReactNode
  url: string
  color: string
  username: string
}

const socialLinks: SocialLink[] = [
  {
    name: 'Email',
    icon: <EmailIcon sx={{ fontSize: 32 }} />,
    url: 'mailto:joyinalgorithm@gmail.com',
    color: '#ea4335',
    username: 'joyinalgorithm@gmail.com',
  },
  {
    name: 'GitHub',
    icon: <GitHubIcon sx={{ fontSize: 32 }} />,
    url: 'https://github.com/joybernal',
    color: '#ffffff',
    username: '@joybernal',
  },
  {
    name: 'LinkedIn',
    icon: <LinkedInIcon sx={{ fontSize: 32 }} />,
    url: 'https://www.linkedin.com/in/joy-bernal-390297369/',
    color: '#0a66c2',
    username: 'Christine Joy Bernal',
  },
  {
    name: 'Discord',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
      </svg>
    ),
    url: 'https://discord.com',
    color: '#5865f2',
    username: 'joyserenity_12709',
  },
  {
    name: 'Instagram',
    icon: <InstagramIcon sx={{ fontSize: 32 }} />,
    url: 'https://instagram.com/joyinalgorithms',
    color: '#e4405f',
    username: '@joyinalgorithms',
  },
  {
    name: 'Twitter / X',
    icon: <TwitterIcon sx={{ fontSize: 32 }} />,
    url: 'https://twitter.com/joyinalgorithm',
    color: '#1da1f2',
    username: '@joyinalgorithm',
  },
  {
    name: 'Facebook',
    icon: <FacebookIcon sx={{ fontSize: 32 }} />,
    url: 'https://www.facebook.com/christinejoybernal17',
    color: '#1877f2',
    username: 'Christine Joy Bernal',
  },
]

export default function ContactPage() {
  return (
    <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 4 }, minHeight: '80vh' }}>
      <Box sx={{ maxWidth: '1000px', mx: 'auto' }}>
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
          Connect With Me
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
          Feel free to reach out for collaborations or opportunities.
          I&apos;m always open to discussing new projects and ideas.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {socialLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.url}
              target={link.name !== 'Email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              underline="none"
              sx={{ display: 'block' }}
            >
              <Box
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 0.05}s` }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  px: 3,
                  py: 2,
                  borderRadius: '12px',
                  border: '1px solid',
                  borderColor: 'neutral.800',
                  borderLeft: `4px solid ${link.color}`,
                  bgcolor: 'background.surface',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: `${link.color}08`,
                    borderColor: link.color,
                    borderLeft: `4px solid ${link.color}`,
                    transform: 'translateX(6px)',
                    boxShadow: `0 8px 24px rgba(0,0,0,0.2), -4px 0 20px ${link.color}20`,
                  },
                }}
              >
                {/* Icon */}
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '10px',
                    bgcolor: `${link.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: link.color,
                    flexShrink: 0,
                  }}
                >
                  {link.icon}
                </Box>

                {/* Text */}
                <Box sx={{ flex: 1, minWidth: 0, display: 'flex', gap: 3 }}>
                  <Typography level="title-sm" sx={{ fontWeight: 600, color: 'text.primary' }}>
                    {link.name}:
                  </Typography>
                  <Typography
                    level="body-xs"
                    sx={{
                      color: 'text.tertiary',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {link.username}
                  </Typography>
                </Box>

                {/* Arrow */}
                <Typography level="body-sm" sx={{ color: 'text.tertiary', flexShrink: 0 }}>
                  →
                </Typography>
              </Box>
            </Link>
          ))}
        </Box>

        {/* Additional Contact Info */}
        <Card
          variant="outlined"
          sx={{
            mt: 6,
            borderColor: 'neutral.800',
            bgcolor: 'background.surface',
            textAlign: 'center',
            p: 4,
          }}
        >
          <Typography level="h3" sx={{ mb: 2, fontWeight: 600 }}>
            Let&apos;s Work Together
          </Typography>
          <Typography level="body-md" sx={{ color: 'text.tertiary', maxWidth: 500, mx: 'auto' }}>
            I&apos;m currently open to freelance projects, full-time opportunities,
            and interesting collaborations. Don&apos;t hesitate to reach out!
          </Typography>
          <Box
            sx={{
              mt: 3,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 3,
              py: 1.5,
              borderRadius: '8px',
              bgcolor: 'rgba(0, 255, 136, 0.1)',
              color: 'success.400',
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: 'success.500',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
            <Typography level="body-sm" sx={{ fontWeight: 500 }}>
              Available for new opportunities
            </Typography>
          </Box>
        </Card>
      </Box>
    </Box>
  )
}
