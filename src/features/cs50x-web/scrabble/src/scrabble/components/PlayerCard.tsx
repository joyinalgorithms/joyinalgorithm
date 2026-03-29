import React from "react";
import { Card, Typography, Box, Stack, Sheet } from "@mui/joy";
import { User } from "lucide-react";
import { Player } from "../types";
import LetterTile from "./LetterTile";

interface PlayerCardProps {
  player: Player;
  onWordChange: (word: string) => void;
  disabled?: boolean;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onWordChange, disabled }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: "lg",
        boxShadow: player.isWinner ? "lg" : "sm",
        borderColor: player.isWinner ? "primary.400" : "neutral.outlinedBorder",
        borderWidth: player.isWinner ? 3 : 1,
        transition: "all 0.3s ease",
        transform: player.isWinner ? "translateY(-4px)" : "none",
        bgcolor: player.isWinner ? "primary.50" : "background.surface",
        position: "relative",
        overflow: "hidden",
        "&::before": player.isWinner ? {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          bgcolor: "primary.500",
        } : {},
      }}
    >
      <Stack spacing={2}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <User size={20} color={player.isWinner ? "#0B6BCB" : "#636B74"} />
            <Typography level="h4" sx={{ fontWeight: "bold", color: player.isWinner ? "primary.700" : "neutral.700" }}>
              {player.name}
            </Typography>
          </Stack>
          <Sheet
            variant="solid"
            color={player.isWinner ? "primary" : "neutral"}
            sx={{
              px: 2,
              py: 0.5,
              borderRadius: "md",
              fontWeight: "bold",
              fontSize: "1.5rem",
              minWidth: 80,
              textAlign: "center",
              boxShadow: "sm",
            }}
          >
            {player.score}
          </Sheet>
        </Box>

        <Box
          component="input"
          placeholder="Enter your word..."
          value={player.word}
          onChange={(e: any) => onWordChange(e.target.value)}
          disabled={disabled}
          sx={{
            width: "100%",
            fontSize: "1.2rem",
            py: 1.5,
            bgcolor: "background.level1",
            border: "1px solid",
            borderColor: "neutral.outlinedBorder",
            borderRadius: "md",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: 2,
            fontWeight: "bold",
            color: "neutral.800",
            outline: "none",
            "&:focus": {
              borderColor: "primary.400",
              boxShadow: (theme) => `0 0 0 2px ${theme.vars.palette.primary[200]}`,
            },
            "&:disabled": {
              opacity: 0.6,
              cursor: "not-allowed",
            },
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            minHeight: 60,
            justifyContent: "center",
            alignItems: "center",
            p: 1,
            borderRadius: "sm",
            bgcolor: "background.level1",
            border: "1px dashed",
            borderColor: "neutral.outlinedBorder",
          }}
        >
          {player.word.split("").map((char, index) => (
            <LetterTile key={`${char}-${index}`} letter={char} />
          ))}
          {player.word.length === 0 && (
            <Typography level="body-sm" sx={{ color: "neutral.500", fontStyle: "italic" }}>
              Tiles will appear here...
            </Typography>
          )}
        </Box>
      </Stack>
    </Card>
  );
};

export default PlayerCard;
