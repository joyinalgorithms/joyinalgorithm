import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Alert from '@mui/joy/Alert';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { User } from './types';

interface AuthViewProps {
  onLogin: (userId: string) => void;
}

export function AuthView({ onLogin }: AuthViewProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const users: User[] = JSON.parse(localStorage.getItem('cs50x_finance_users') || '[]');

    if (isRegistering) {
      if (!username || !password || !confirm) {
        return setError('All fields are required.');
      }
      if (password !== confirm) {
        return setError('Passwords must match.');
      }
      if (users.find(u => u.username === username)) {
        return setError('Username already exists.');
      }

      const newUser: User = {
        id: crypto.randomUUID(),
        username,
        hash: password, // Note: Stored in plaintext for demo constraints
        cash: 10000.00
      };

      users.push(newUser);
      localStorage.setItem('cs50x_finance_users', JSON.stringify(users));
      onLogin(newUser.id);
    } else {
      if (!username || !password) {
        return setError('Must provide username and password.');
      }
      const user = users.find(u => u.username === username && u.hash === password);
      if (!user) {
        return setError('Invalid username and/or password.');
      }
      onLogin(user.id);
    }
  };

  return (
    <Box sx={{ maxWidth: '400px', mx: 'auto', mt: 8 }}>
      <Typography level="h1" sx={{ textAlign: 'center', mb: 4 }}>
        <span style={{ color: '#096bde' }}>C</span>
        <span style={{ color: '#e53e3e' }}>$</span>
        <span style={{ color: '#d69e2e' }}>5</span>
        <span style={{ color: '#38a169' }}>0</span>
        {' '}Finance
      </Typography>

      <Card variant="outlined" sx={{ boxShadow: 'sm' }}>
        <CardContent>
          <Typography level="h3" sx={{ textAlign: 'center', mb: 3 }}>
            {isRegistering ? 'Register' : 'Log In'}
          </Typography>

          {error && (
            <Alert color="danger" variant="soft" startDecorator={<WarningAmberIcon />} sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <Input 
                autoFocus 
                placeholder="Username" 
                value={username} 
                onChange={e => setUsername(e.target.value)} 
              />
              <Input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
              />
              {isRegistering && (
                <Input 
                  type="password" 
                  placeholder="Confirm Password" 
                  value={confirm} 
                  onChange={e => setConfirm(e.target.value)} 
                />
              )}
              <Button type="submit" size="lg" sx={{ mt: 2 }}>
                {isRegistering ? 'Register' : 'Log In'}
              </Button>
            </Stack>
          </form>

          <Button 
            variant="plain" 
            color="neutral" 
            sx={{ width: '100%', mt: 2 }}
            onClick={() => {
              setIsRegistering(!isRegistering);
              setError(null);
              setUsername('');
              setPassword('');
              setConfirm('');
            }}
          >
            {isRegistering ? 'Already have an account? Log In' : "Don't have an account? Register"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
