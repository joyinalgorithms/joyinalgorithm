import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';

// ---- CS50 Inheritance C Logic Translated to TypeScript ----
const GENERATIONS = 3;

interface Person {
  id: string;
  generation: number;
  label: string;
  alleles: [string, string];
  parents: [Person, Person] | null;
}

const randomAllele = (): string => {
  const r = Math.floor(Math.random() * 3);
  return r === 0 ? 'A' : r === 1 ? 'B' : 'O';
};

export function InheritancePage() {
  const [familyTree, setFamilyTree] = useState<Person | null>(null);

  const generateFamily = () => {
    let idCounter = 0;

    const createFamilyNodes = (generations: number, currentGeneration: number = 0): Person => {
      idCounter++;
      
      let label = "Child";
      if (currentGeneration === 1) label = "Parent";
      else if (currentGeneration === 2) label = "Grandparent";
      else if (currentGeneration > 2) {
          label = "Great-".repeat(currentGeneration - 2) + "Grandparent";
      }

      const p: Person = {
        id: `person-${idCounter}`,
        generation: currentGeneration,
        label,
        alleles: ['O', 'O'],
        parents: null
      };

      if (generations > 1) {
        const parent0 = createFamilyNodes(generations - 1, currentGeneration + 1);
        const parent1 = createFamilyNodes(generations - 1, currentGeneration + 1);
        p.parents = [parent0, parent1];
        
        // Randomly assign current person's alleles based on their parents
        p.alleles[0] = p.parents[0].alleles[Math.floor(Math.random() * 2)];
        p.alleles[1] = p.parents[1].alleles[Math.floor(Math.random() * 2)];
      } else {
        // Base case: Randomly assign alleles for oldest generation
        p.parents = null;
        p.alleles[0] = randomAllele();
        p.alleles[1] = randomAllele();
      }

      return p;
    };

    const tree = createFamilyNodes(GENERATIONS);
    setFamilyTree(tree);
  };

  // Visual representation of the recursive family structure
  const renderPerson = (p: Person) => {
    // Generate a unique color based on generation
    const genColors = ['primary', 'warning', 'success', 'danger', 'neutral'];
    const colorTheme = genColors[p.generation % genColors.length] as any;

    return (
      <Box key={p.id} sx={{ mb: 2, ml: { xs: 2, md: p.generation * 4 } }}>
        <Card 
          variant="soft" 
          color={colorTheme}
          sx={{ 
            p: 2, 
            display: 'flex', 
            flexDirection: 'row', 
            alignItems: 'center', 
            gap: 2,
            borderLeft: '6px solid',
            borderLeftColor: `${colorTheme}.500`,
            boxShadow: 'sm'
          }}
        >
          <BloodtypeIcon color={colorTheme} sx={{ fontSize: 32 }} />
          <Box>
            <Typography level="title-md" fontWeight="bold">
              {p.label} (Gen {p.generation})
            </Typography>
            <Typography level="body-md">
              Blood Type: <strong>{p.alleles[0]}{p.alleles[1]}</strong>
            </Typography>
          </Box>
        </Card>
        
        {p.parents && (
          <Box sx={{ mt: 2, position: 'relative' }}>
            {/* Visual connector lines for large screens could be added here */}
            {renderPerson(p.parents[0])}
            {renderPerson(p.parents[1])}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box 
      sx={{ 
        p: { xs: 2, sm: 4, md: 6 }, 
        maxWidth: '800px', 
        mx: 'auto',
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography level="h1" sx={{ mb: 2, fontWeight: 800, letterSpacing: "-0.02em" }}>
          CS50x: Inheritance
        </Typography>
        <Typography level="body-lg" sx={{ color: "text.secondary", maxWidth: "600px", mx: "auto" }}>
          A digital translation of the CS50 Inheritance problem. 
          Simulate genetic inheritance of blood types across multiple generations!
        </Typography>
      </Box>

      <Card
        variant="outlined" 
        sx={{ 
          p: { xs: 3, sm: 4 }, 
          bgcolor: "background.surface", 
          borderColor: "neutral.800",
          boxShadow: "sm",
          borderRadius: "xl"
        }}
      >
        <CardContent>
          <Button 
            size="lg" 
            fullWidth
            onClick={generateFamily}
            startDecorator={<AccountTreeIcon />}
            sx={{ 
              mb: 4,
              bgcolor: "primary.600",
              "&:hover": { bgcolor: "primary.700" },
              fontWeight: 600
            }}
          >
            {familyTree ? "Regenerate Family Tree" : "Generate Family Tree"}
          </Button>

          {familyTree && (
            <Box>
              <Divider sx={{ mb: 4 }}>
                <Typography level="body-sm" color="neutral">Simulation Results</Typography>
              </Divider>
              {renderPerson(familyTree)}
            </Box>
          )}

          {!familyTree && (
            <Typography level="body-md" color="neutral" textAlign="center" sx={{ py: 4, fontStyle: 'italic' }}>
              Click the button above to simulate 3 generations of genetic inheritance.
            </Typography>
          )}

        </CardContent>
      </Card>
    </Box>
  );
}
