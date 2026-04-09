import React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";

export function CreditPage() {
  return (
    <Box sx={{ p: 4, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <Typography level="h1" sx={{ color: "primary.400" }}>CS50x Credit</Typography>
      <Typography level="body-lg" sx={{ mt: 2, textAlign: "center", maxWidth: "600px" }}>
        This is the dedicated feature directory for the Credit project. It has its own isolated components, pages, and API calls.
      </Typography>
    </Box>
  );
}
