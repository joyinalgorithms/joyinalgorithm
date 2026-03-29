import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Stack,
  Sheet,
  CircularProgress,
  Alert,
  Container,
} from "@mui/joy";
import { Trophy, Gamepad2, Info } from "lucide-react";
import { useScrabble } from "./hooks/useScrabble";
import PlayerCard from "./components/PlayerCard";
import LetterValuesGrid from "./components/LetterValuesGrid";

const ScrabblePage: React.FC = () => {
  const { gameState, updateWord, playGame } = useScrabble();

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack spacing={6}>
        {/* Header Section */}
        <Box sx={{ textAlign: "center" }}>
          <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mb: 2 }}>
            <Trophy size={48} color="#0B6BCB" />
            <Typography
              level="h1"
              sx={{
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                fontWeight: "900",
                color: "neutral.800",
                letterSpacing: 2,
                textTransform: "uppercase",
                textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              Scrabble Scorer
            </Typography>
          </Stack>
          <Typography
            level="h4"
            sx={{
              color: "neutral.500",
              fontWeight: "500",
              fontStyle: "italic",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Enter words and see who scores higher!
          </Typography>
        </Box>

        {/* Scoreboard Section */}
        <Grid container spacing={4}>
          <Grid xs={12} md={6}>
            <PlayerCard
              player={gameState.player1}
              onWordChange={(word) => updateWord(1, word)}
              disabled={gameState.loading}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <PlayerCard
              player={gameState.player2}
              onWordChange={(word) => updateWord(2, word)}
              disabled={gameState.loading}
            />
          </Grid>
        </Grid>

        {/* Controls Section */}
        <Box sx={{ textAlign: "center", py: 2 }}>
          <Stack spacing={3} alignItems="center">
            <Button
              size="lg"
              variant="solid"
              color="primary"
              onClick={playGame}
              disabled={gameState.loading || !gameState.player1.word || !gameState.player2.word}
              startDecorator={gameState.loading ? <CircularProgress size="sm" color="neutral" /> : <Gamepad2 size={24} />}
              sx={{
                px: 6,
                py: 2,
                fontSize: "1.3rem",
                fontWeight: "bold",
                borderRadius: "full",
                boxShadow: "lg",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "xl",
                },
              }}
            >
              {gameState.loading ? "Calculating..." : "Play Game"}
            </Button>

            {gameState.winnerMessage && (
              <Alert
                variant="soft"
                color={gameState.winnerMessage.includes("tie") ? "neutral" : "primary"}
                startDecorator={<Trophy size={24} />}
                sx={{
                  px: 4,
                  py: 2,
                  borderRadius: "lg",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  boxShadow: "md",
                  animation: "bounce 1s ease-in-out infinite",
                  "@keyframes bounce": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-8px)" },
                  },
                }}
              >
                {gameState.winnerMessage}
              </Alert>
            )}
          </Stack>
        </Box>

        {/* Info Section */}
        <Box>
          <LetterValuesGrid />
        </Box>

        {/* Footer Info */}
        <Sheet
          variant="soft"
          color="neutral"
          sx={{
            p: 3,
            borderRadius: "lg",
            display: "flex",
            alignItems: "center",
            gap: 2,
            bgcolor: "background.level1",
            border: "1px solid",
            borderColor: "neutral.outlinedBorder",
          }}
        >
          <Info size={24} color="#636B74" />
          <Typography level="body-sm" sx={{ color: "neutral.600" }}>
            Scrabble scores are calculated based on standard letter values. Each letter has a specific point value, and the total score is the sum of all letters in the word.
          </Typography>
        </Sheet>
      </Stack>
    </Container>
  );
};

export default ScrabblePage;
