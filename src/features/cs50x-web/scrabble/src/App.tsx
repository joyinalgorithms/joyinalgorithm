import { CssVarsProvider, CssBaseline, Box } from "@mui/joy";
import { ScrabblePage } from "./scrabble";

export default function App() {
  return (
    <CssVarsProvider defaultMode="light">
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.level1",
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(11, 107, 203, 0.05) 0%, transparent 100%)",
        }}
      >
        <ScrabblePage />
      </Box>
    </CssVarsProvider>
  );
}
