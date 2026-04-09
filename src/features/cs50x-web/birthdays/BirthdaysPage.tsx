import React, { useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/joy/Divider';
import Input from '@mui/joy/Input';
import Grid from '@mui/joy/Grid';
import Table from '@mui/joy/Table';
import CakeIcon from '@mui/icons-material/Cake';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/joy/IconButton';

interface Birthday {
  id: string;
  name: string;
  month: number;
  day: number;
}

const STORAGE_KEY = 'cs50x_birthdays';

export function BirthdaysPage() {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [name, setName] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setBirthdays(JSON.parse(saved));
      } catch (e) {
        console.error("Local storage Parse Failed:", e);
      }
    }
  }, []);

  const handleAddBirthday = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !month || !day) return;

    const newBd: Birthday = {
      id: crypto.randomUUID(), // Standard browser uuid generator
      name: name.trim(),
      month: parseInt(month, 10),
      day: parseInt(day, 10)
    };

    const updatedList = [...birthdays, newBd];
    setBirthdays(updatedList);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));

    setName('');
    setMonth('');
    setDay('');
  };

  const handleDelete = (id: string) => {
    const updatedList = birthdays.filter((b) => b.id !== id);
    setBirthdays(updatedList);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
  };

  return (
    <Box 
      sx={{ 
        p: { xs: 2, sm: 4, md: 6 }, 
        maxWidth: '1000px', 
        mx: 'auto',
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography level="h1" sx={{ mb: 2, fontWeight: 800, letterSpacing: "-0.02em", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
          <CakeIcon fontSize="large" color="warning" /> CS50x: Birthdays
        </Typography>
        <Typography level="body-lg" sx={{ color: "text.secondary", maxWidth: "600px", mx: "auto" }}>
          A React state translation of the CS50 Birthdays database project. All birthdays are saved securely in your browser's local storage.
        </Typography>
      </Box>

      <Grid container spacing={4} sx={{ display: 'flex' }}>
        
        {/* ADD BIRTHDAY FORM */}
        <Grid xs={12} md={4}>
          <Card variant="outlined" sx={{ bgcolor: "background.surface", boxShadow: "sm", borderRadius: "xl", height: '100%' }}>
            <CardContent>
              <Typography level="title-lg" sx={{ mb: 2 }}>Add a Birthday</Typography>
              <Divider sx={{ mb: 3 }} />
              
              <form onSubmit={handleAddBirthday}>
                <Stack spacing={3}>
                  <Box>
                    <Typography level="body-sm" sx={{ mb: 1, fontWeight: 500 }}>Name</Typography>
                    <Input 
                      required 
                      placeholder="e.g. Joy" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                    />
                  </Box>
                  <Grid container spacing={2}>
                    <Grid xs={6}>
                      <Typography level="body-sm" sx={{ mb: 1, fontWeight: 500 }}>Month</Typography>
                      <Input 
                        required 
                        type="number" 
                        placeholder="1-12" 
                        slotProps={{ input: { min: 1, max: 12 } }}
                        value={month} 
                        onChange={(e) => setMonth(e.target.value)} 
                      />
                    </Grid>
                    <Grid xs={6}>
                      <Typography level="body-sm" sx={{ mb: 1, fontWeight: 500 }}>Day</Typography>
                      <Input 
                        required 
                        type="number" 
                        placeholder="1-31" 
                        slotProps={{ input: { min: 1, max: 31 } }}
                        value={day} 
                        onChange={(e) => setDay(e.target.value)} 
                      />
                    </Grid>
                  </Grid>
                  <Button 
                    type="submit" 
                    disabled={!name.trim() || !month || !day}
                    startDecorator={<AddCircleIcon />}
                    sx={{ mt: 2 }}
                  >
                    Add Birthday
                  </Button>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* BIRTHDAYS LIST (DATABASE) */}
        <Grid xs={12} md={8}>
          <Card variant="outlined" sx={{ bgcolor: "background.surface", boxShadow: "sm", borderRadius: "xl", height: '100%' }}>
            <CardContent>
              <Typography level="title-lg" sx={{ mb: 2 }}>All Birthdays</Typography>
              <Divider sx={{ mb: 3 }} />
              
              {birthdays.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4, color: 'text.tertiary' }}>
                  <CakeIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
                  <Typography level="body-md">No birthdays saved in your database yet.</Typography>
                </Box>
              ) : (
                <Box sx={{ overflowX: 'auto' }}>
                  <Table variant="outlined" borderAxis="both" sx={{ '& thead th': { bgcolor: 'background.level1' }}}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Birthday</th>
                        <th style={{ width: '80px', textAlign: 'center' }}>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {birthdays.map((b) => (
                        <tr key={b.id}>
                          <td style={{ verticalAlign: 'middle', fontWeight: 500 }}>{b.name}</td>
                          <td style={{ verticalAlign: 'middle' }}>{b.month}/{b.day}</td>
                          <td style={{ textAlign: 'center' }}>
                            <IconButton 
                              variant="plain" 
                              color="danger" 
                              size="sm" 
                              onClick={() => handleDelete(b.id)}
                              title="Delete Birthday"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
}
