import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          50: '#e6f9ff',
          100: '#b3edff',
          200: '#80e1ff',
          300: '#4dd5ff',
          400: '#1ac9ff',
          500: '#00d4ff',
          600: '#00a3c7',
          700: '#00728f',
          800: '#004157',
          900: '#00101f',
        },
        success: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#FFD700',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        background: {
          body: '#0a0a0a',
          surface: '#141414',
          level1: '#1a1a1a',
          level2: '#242424',
          level3: '#2e2e2e',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a0a0a0',
          tertiary: '#707070',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
    },
  },
  fontFamily: {
    body: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    display: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    code: 'var(--font-geist-mono), "Fira Code", "Consolas", monospace',
  },
  components: {
    JoyButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          fontWeight: 600,
          textTransform: 'none',
        },
      },
    },
    JoyCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          backgroundColor: '#141414',
          border: '1px solid #262626',
        },
      },
    },
    JoySheet: {
      styleOverrides: {
        root: {
          backgroundColor: '#0a0a0a',
        },
      },
    },
  },
});

export default theme;
