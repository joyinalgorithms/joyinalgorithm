import React from "react";
import { Sheet, Typography, Box, Grid, Card } from "@mui/joy";
import { LETTER_VALUES } from "../utils/scoring";

const LetterValuesGrid: React.FC = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: "lg",
        bgcolor: "background.surface",
        boxShadow: "sm",
        borderColor: "neutral.outlinedBorder",
      }}
    >
      <Typography
        level="h4"
        sx={{
          mb: 3,
          textAlign: "center",
          fontWeight: "bold",
          color: "neutral.700",
          letterSpacing: 1,
          textTransform: "uppercase",
        }}
      >
        📝 Letter Values
      </Typography>
      <Grid container spacing={1} sx={{ justifyContent: "center" }}>
        {LETTER_VALUES.map(({ letter, points }) => (
          <Grid key={letter} xs={3} sm={2} md={1.5} lg={1}>
            <Sheet
              variant="outlined"
              sx={{
                p: 1,
                textAlign: "center",
                borderRadius: "sm",
                bgcolor: "background.level1",
                position: "relative",
                transition: "all 0.2s",
                "&:hover": {
                  bgcolor: "primary.50",
                  borderColor: "primary.200",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <Typography level="h4" sx={{ fontWeight: "bold", color: "neutral.800" }}>
                {letter}
              </Typography>
              <Typography
                sx={{
                  position: "absolute",
                  bottom: 1,
                  right: 2,
                  fontSize: "0.6rem",
                  fontWeight: "bold",
                  color: "primary.600",
                }}
              >
                {points}
              </Typography>
            </Sheet>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default LetterValuesGrid;
