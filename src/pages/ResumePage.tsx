import Box from '@mui/joy/Box'
import Typography from '@mui/joy/Typography'
import Button from '@mui/joy/Button'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import Divider from '@mui/joy/Divider'
import Grid from '@mui/joy/Grid'
import DownloadIcon from '@mui/icons-material/Download'
import VisibilityIcon from '@mui/icons-material/Visibility'
import WorkIcon from '@mui/icons-material/Work'
import SchoolIcon from '@mui/icons-material/School'

const workExperience = [
  {
    title: 'On-the-Job Training (OJT) – IT / Systems Development Intern',
    company: 'Amerasia International Terminal Services Inc.',
    period: 'January 2026 - April 2026',
    description: 'Co-developed an HR Information System to streamline employee data management, attendance tracking, and HR processes.',
    highlights: [
      'Assisted in the development of a Fuel Monitoring System for tracking fuel usage, logs, and operational efficiency.',
      'Collaborated with the development team to design, test, and implement system features and improvements.',
      'Enhanced and optimized the company’s existing website, improving functionality, performance, and user experience.',
      'Participated in debugging, troubleshooting, and system maintenance to ensure smooth operations.',
    ],
  },
  {
    title: 'Brand Marketing & Sales Assistant (Freelance)',
    company: 'E-Commerce Company',
    period: '2020 – 2023',
    description: 'Managed online communication with potential clients and converted leads into product sales.',
    highlights: [
      'Coordinated with brand ambassadors, handling outreach, gift distribution, and relationship management.',
      'Managed company social media accounts and scheduled promotional posts featuring brand ambassadors.',
      'Assisted in digital marketing campaigns and audience engagement strategies.',
    ],
  },
]

const experiences = [
  {
    title: 'Vice President',
    company: 'Association of Students for Communication and Information Interchange (ASCII)',
    period: '2023',
    description: 'Served as Vice President, supporting organizational leadership and student initiatives.',
    highlights: [],
  },
  {
    title: 'Member',
    company: 'Peer Facilitators Organization',
    period: '2023',
    description: 'Active member supporting peer facilitation and student engagement activities.',
    highlights: [],
  },
  {
    title: 'Legislative Officer',
    company: 'Supreme Student Government (PRMSU – Main Campus)',
    period: '2024',
    description: 'Served as Legislative Officer in the university-wide student government body.',
    highlights: [],
  },
  {
    title: 'President',
    company: 'College of Communication and Information Technology – Student Body Organization',
    period: '2024',
    description: 'Led the CCIT Student Body Organization, overseeing college-level student governance and activities.',
    highlights: [],
  },
  {
    title: 'Sergeant at Arms',
    company: 'Association of Students for Communication and Information Interchange (ASCII)',
    period: '2025',
    description: 'Responsible for maintaining order and discipline during organizational meetings and events.',
    highlights: [],
  },
  {
    title: '4th Year Representative',
    company: 'College of Communication and Information Technology – Student Body Organization',
    period: '2025',
    description: 'Represented 4th year students in the CCIT Student Body Organization.',
    highlights: [],
  },
]

const competitions = [
  {
    degree: 'Finalist – Special Citations Award',
    school: 'National Academy of Science and Technology – Magsaysay Future Engineer / Technologist Awards',
    period: 'Competition',
    details: 'Recognized as a finalist and recipient of Special Citations at this prestigious national competition.',
  },
  {
    degree: 'Presenter | Competitor',
    school: 'International Research Conference on Information Technology – IT Marketing',
    period: 'Competition',
    details: 'Presented and competed in the IT Marketing category at the international research conference.',
  },
  {
    degree: 'Quiz Bee Competitor',
    school: 'Regional Assembly on Information Technology Education',
    period: 'Competition',
    details: 'Competed in the Quiz Bee at the regional IT education assembly.',
  },
  {
    degree: 'Champion',
    school: 'TechnoFest Quiz Bee – College of Communication and Information Technology',
    period: 'Competition',
    details: 'Won first place in the TechnoFest Quiz Bee at the college level.',
  },
  {
    degree: 'Competitor',
    school: 'TechnoFest Programming Challenge – College of Communication and Information Technology',
    period: 'Competition',
    details: 'Competed in the college-level programming challenge at TechnoFest.',
  },
  {
    degree: 'Competitor',
    school: 'Division Level Competition: Chinese Mandarin Quiz Bee',
    period: 'Competition',
    details: 'Competed in the Chinese Mandarin Quiz Bee at the division level.',
  },
]

const seminars = [
  { title: 'Shaping Future-Ready Professionals', role: 'Participant' },
  { title: 'International Research Conference on Information Technology (IRCITE)', role: 'Participant' },
  { title: 'CCIT Women\'s Month Celebration: WE for Gender Equality and Inclusive Society', role: 'Proponent, Facilitator' },
  { title: 'Iba Student Leaders\' Assembly (ISLA)', role: 'Facilitator' },
  { title: '6th Student Leaders\' Congress 2025: Building Innovative, Nationalistic, and Humane Individuals (BINHI)', role: 'Participant' },
  { title: 'SMART Skills: Skills Mastery and Readiness in Technology', role: 'Proponent, Facilitator' },
  { title: 'Project MAGKAMIHA: Strengthening Student Leadership and Governance', role: 'Participant' },
  { title: 'Unleashing Potentials: Enhancing Leadership by Empowering Growth and Unity', role: 'Participant' },
  { title: 'Regional Assembly on Information Technology Education (RAITE)', role: 'Participant' },
  { title: 'Exploring JavaScript Essentials Webinar', role: 'Proponent, Facilitator' },
  { title: 'Navigating the Artificial Intelligence Frontier: Strategies, Tools, and Ethics in Digital Era', role: 'Participant' },
  { title: 'Philippine Association of Campus Student Advisers (PACSA)', role: 'Participant' },
  { title: 'Unleashing New Leadership and Development (UNLAD)', role: 'Participant' },
]

export default function ResumePage() {
  return (
    <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 4 } }}>
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
          My Resume
        </Typography>
        <Typography
          level="body-lg"
          sx={{
            textAlign: 'center',
            color: 'text.tertiary',
            mb: 4,
            maxWidth: '600px',
            mx: 'auto',
          }}
        >
          View my professional experience and educational background,
          or download my full resume.
        </Typography>

        {/* Resume Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 6 }}>
          <Button
            size="lg"
            startDecorator={<VisibilityIcon />}
            variant="outlined"
            component="a"
            href="/resume.pdf"
            target="_blank"
            sx={{
              borderColor: 'primary.500',
              color: 'primary.500',
              '&:hover': {
                bgcolor: 'rgba(0, 212, 255, 0.1)',
              },
            }}
          >
            View Resume
          </Button>
          <Button
            size="lg"
            startDecorator={<DownloadIcon />}
            component="a"
            href="/resume.pdf"
            download
            sx={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)',
              color: '#0a0a0a',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(135deg, #00c4ef 0%, #00ef78 100%)',
              },
            }}
          >
            Download Resume
          </Button>
        </Box>

        <Grid container spacing={4}>
          {/* Work Experience */}
          <Grid xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '12px',
                  bgcolor: 'rgba(0, 212, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <WorkIcon sx={{ color: 'primary.500', fontSize: 24 }} />
              </Box>
              <Typography level="h2" sx={{ fontWeight: 700 }}>
                Work Experience
              </Typography>
            </Box>
            <Box sx={{ position: 'relative', pl: 4 }}>
              {/* Timeline line */}
              <Box
                sx={{
                  position: 'absolute',
                  left: 6,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  bgcolor: 'neutral.800',
                }}
              />
              {workExperience.map((exp, index) => (
                <Box key={index} sx={{ position: 'relative', mb: 4 }}>
                  {/* Timeline dot */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: -28,
                      top: 24,
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: 'primary.500',
                      border: '2px solid',
                      borderColor: 'background.body',
                    }}
                  />
                  <Card
                    variant="outlined"
                    sx={{
                      borderColor: 'neutral.800',
                      bgcolor: 'background.surface',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'primary.700',
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                        <Typography level="title-lg" sx={{ fontWeight: 600 }}>
                          {exp.title}
                        </Typography>
                        <Typography
                          level="body-sm"
                          sx={{
                            color: 'primary.400',
                            fontFamily: 'code',
                          }}
                        >
                          {exp.period}
                        </Typography>
                      </Box>
                      <Typography level="body-md" sx={{ color: 'text.secondary', mb: 2 }}>
                        {exp.company}
                      </Typography>
                      <Typography level="body-sm" sx={{ color: 'text.tertiary' }}>
                        {exp.description}
                      </Typography>
                      {exp.highlights && exp.highlights.length > 0 && (
                        <>
                          <Divider sx={{ my: 2 }} />
                          <Box component="ul" sx={{ pl: 2, m: 0 }}>
                            {exp.highlights.map((highlight, i) => (
                              <Box
                                component="li"
                                key={i}
                                sx={{
                                  color: 'text.secondary',
                                  fontSize: '0.875rem',
                                  mb: 0.5,
                                  '&::marker': { color: 'success.500' },
                                }}
                              >
                                {highlight}
                              </Box>
                            ))}
                          </Box>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Grid>
          {/* Leadership Experience */}
          <Grid xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '12px',
                  bgcolor: 'rgba(0, 212, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <WorkIcon sx={{ color: 'primary.500', fontSize: 24 }} />
              </Box>
              <Typography level="h2" sx={{ fontWeight: 700 }}>
                Leadership Experience
              </Typography>
            </Box>
            <Box sx={{ position: 'relative', pl: 4 }}>
              {/* Timeline line */}
              <Box
                sx={{
                  position: 'absolute',
                  left: 6,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  bgcolor: 'neutral.800',
                }}
              />
              {experiences.map((exp, index) => (
                <Box key={index} sx={{ position: 'relative', mb: 4 }}>
                  {/* Timeline dot */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: -28,
                      top: 24,
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: 'primary.500',
                      border: '2px solid',
                      borderColor: 'background.body',
                    }}
                  />
                  <Card
                    variant="outlined"
                    sx={{
                      borderColor: 'neutral.800',
                      bgcolor: 'background.surface',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'primary.700',
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                        <Typography level="title-lg" sx={{ fontWeight: 600 }}>
                          {exp.title}
                        </Typography>
                        <Typography
                          level="body-sm"
                          sx={{
                            color: 'primary.400',
                            fontFamily: 'code',
                          }}
                        >
                          {exp.period}
                        </Typography>
                      </Box>
                      <Typography level="body-md" sx={{ color: 'text.secondary', mb: 2 }}>
                        {exp.company}
                      </Typography>
                      <Typography level="body-sm" sx={{ color: 'text.tertiary' }}>
                        {exp.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Competitions */}
          <Grid xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '12px',
                  bgcolor: 'rgba(0, 255, 136, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SchoolIcon sx={{ color: 'success.500', fontSize: 24 }} />
              </Box>
              <Typography level="h2" sx={{ fontWeight: 700 }}>
                Competitions
              </Typography>
            </Box>
            <Box sx={{ position: 'relative', pl: 4 }}>
              <Box
                sx={{
                  position: 'absolute',
                  left: 6,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  bgcolor: 'neutral.800',
                }}
              />
              {competitions.map((comp, index) => (
                <Box key={index} sx={{ position: 'relative', mb: 4 }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      left: -28,
                      top: 24,
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: 'success.500',
                      border: '2px solid',
                      borderColor: 'background.body',
                    }}
                  />
                  <Card
                    variant="outlined"
                    sx={{
                      borderColor: 'neutral.800',
                      bgcolor: 'background.surface',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'success.700',
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                        <Typography level="title-lg" sx={{ fontWeight: 600 }}>
                          {comp.degree}
                        </Typography>
                        <Typography
                          level="body-sm"
                          sx={{ color: 'success.400', fontFamily: 'code' }}
                        >
                          {comp.period}
                        </Typography>
                      </Box>
                      <Typography level="body-md" sx={{ color: 'text.secondary', mb: 1 }}>
                        {comp.school}
                      </Typography>
                      <Typography level="body-sm" sx={{ color: 'text.tertiary' }}>
                        {comp.details}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Seminars & Webinars */}
          <Grid xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '12px',
                  bgcolor: 'rgba(0, 212, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <WorkIcon sx={{ color: 'primary.500', fontSize: 24 }} />
              </Box>
              <Typography level="h2" sx={{ fontWeight: 700 }}>
                Seminars & Webinars
              </Typography>
            </Box>
            <Box sx={{ position: 'relative', pl: 4 }}>
              <Box
                sx={{
                  position: 'absolute',
                  left: 6,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  bgcolor: 'neutral.800',
                }}
              />
              {seminars.map((seminar, index) => (
                <Box key={index} sx={{ position: 'relative', mb: 4 }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      left: -28,
                      top: 24,
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: 'primary.500',
                      border: '2px solid',
                      borderColor: 'background.body',
                    }}
                  />
                  <Card
                    variant="outlined"
                    sx={{
                      borderColor: 'neutral.800',
                      bgcolor: 'background.surface',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'primary.700',
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 1 }}>
                        <Typography level="title-lg" sx={{ fontWeight: 600 }}>
                          {seminar.title}
                        </Typography>
                        <Typography
                          level="body-sm"
                          sx={{ color: 'primary.400', fontFamily: 'code' }}
                        >
                          {seminar.role}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}