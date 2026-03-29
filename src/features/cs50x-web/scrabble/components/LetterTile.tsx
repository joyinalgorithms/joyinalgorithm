import React from "react";
import { Box, Typography } from "@mui/joy";
import { getLetterPoints } from "../utils/scoring";

interface LetterTileProps {
  letter: string;
}

const LetterTile: React.FC<LetterTileProps> = ({ letter }) => {
  const points = getLetterPoints(letter);

  return (
    <Box
      sx={{
        width: 45,
        height: 45,
        bgcolor: "background.surface",
        border: "2px solid",
        borderColor: "neutral.outlinedBorder",
        borderRadius: "sm",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxShadow: "sm",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Typography level="h4" sx={{ fontWeight: "bold", color: "neutral.800" }}>
        {letter.toUpperCase()}
      </Typography>
      <Typography
        sx={{
          position: "absolute",
          bottom: 2,
          right: 4,
          fontSize: "0.65rem",
          fontWeight: "bold",
          color: "primary.600",
        }}
      >
        {points}
      </Typography>
    </Box>
  );
};

export default LetterTile;
