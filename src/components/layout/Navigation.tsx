import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Drawer from '@mui/joy/Drawer';
import List from '@mui/joy/List';
import ListItemButton from '@mui/joy/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import CodeIcon from '@mui/icons-material/Code';
import VerifiedIcon from '@mui/icons-material/Verified';
import EmailIcon from '@mui/icons-material/Email';
import { PATHS } from '@/routes/paths';

const navItems = [
  { label: 'Home', path: PATHS.HOME, icon: <HomeIcon /> },
  { label: 'Projects', path: PATHS.PROJECTS, icon: <FolderIcon /> },
  { label: 'Resume', path: PATHS.RESUME, icon: <DescriptionIcon /> },
  { label: 'Tech Stack', path: PATHS.TECH_STACK, icon: <CodeIcon /> },
  { label: 'Certifications', path: PATHS.CERTIFICATIONS, icon: <VerifiedIcon /> },
  { label: 'Contact Me', path: PATHS.CONTACT, icon: <EmailIcon /> },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          bgcolor: 'rgba(10, 10, 10, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid',
          borderColor: 'neutral.800',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Box
          sx={{
            maxWidth: '1200px',
            mx: 'auto',
            px: { xs: 2, md: 4 },
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link to={PATHS.HOME} style={{ textDecoration: 'none' }}>
            <img
              src="favicon.ico"
              alt="CJB"
              style={{
                height: 36,
                width: 36,
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}  
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            />
          </Link>

          {/* Desktop Navigation */}
          <Box
            component="nav"
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
            }}
          >
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} style={{ textDecoration: 'none' }}>
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: '8px',
                    color: location.pathname === item.path ? 'primary.400' : 'text.primary',
                    bgcolor: location.pathname === item.path ? 'rgba(0, 212, 255, 0.15)' : 'transparent',
                    fontWeight: location.pathname === item.path ? 600 : 500,
                    fontSize: '0.875rem',
                    transition: 'all 0.2s ease',
                    border: location.pathname === item.path ? '1px solid' : '1px solid transparent',
                    borderColor: location.pathname === item.path ? 'primary.600' : 'transparent',
                    '&:hover': {
                      color: 'primary.400',
                      bgcolor: 'rgba(0, 212, 255, 0.08)',
                      borderColor: 'primary.800',
                    },
                  }}
                >
                  {item.label}
                </Box>
              </Link>
            ))}
          </Box>

          {/* Mobile Menu Button */}
          <IconButton
            variant="outlined"
            color="neutral"
            onClick={handleDrawerToggle}
            sx={{
              display: { xs: 'flex', md: 'none' },
              borderColor: 'neutral.700',
            }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        anchor="right"
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-content': {
            bgcolor: 'background.surface',
            width: 280,
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={handleDrawerToggle} variant="plain" color="neutral">
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ px: 2 }}>
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} style={{ textDecoration: 'none' }} onClick={handleDrawerToggle}>
              <ListItemButton
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: '8px',
                  mb: 1,
                  gap: 2,
                  color: location.pathname === item.path ? 'primary.400' : 'text.secondary',
                  '&.Mui-selected': {
                    bgcolor: 'rgba(0, 212, 255, 0.1)',
                  },
                }}
              >
                {item.icon}
                {item.label}
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Drawer>
    </>
  );
}
