import { Link } from "react-router-dom";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PATHS } from "@/lib/paths";

interface Cs50xProjectPlaceholderProps {
  title: string;
  slug: string;
  description: string;
  componentFile: string;
}

export default function Cs50xProjectPlaceholder({
  title,
  slug,
  description,
  componentFile,
}: Cs50xProjectPlaceholderProps) {
  return (
    <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: "1000px", mx: "auto" }}>
        <Link to={PATHS.PROJECTS} style={{ textDecoration: "none" }}>
          <Button
            startDecorator={<ArrowBackIcon />}
            variant="plain"
            sx={{ mb: 4, color: "text.secondary" }}
          >
            Back to Projects
          </Button>
        </Link>

        <Card
          variant="outlined"
          sx={{
            p: { xs: 2, md: 3 },
            borderColor: "neutral.800",
            bgcolor: "background.surface",
          }}
        >
          <Typography level="h1" sx={{ fontWeight: 700, mb: 1 }}>
            {title}
          </Typography>
          <Typography level="body-lg" sx={{ color: "text.tertiary", mb: 2 }}>
            {description}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            <Chip
              variant="soft"
              sx={{ bgcolor: "rgba(0, 212, 255, 0.1)", color: "primary.400" }}
            >
              React Feature
            </Chip>
            <Chip
              variant="soft"
              sx={{ bgcolor: "rgba(0, 212, 255, 0.1)", color: "primary.400" }}
            >
              src/features/cs50x-web/{slug}
            </Chip>
          </Box>
          <Typography level="title-md" sx={{ mb: 1.5 }}>
            Starter Structure
          </Typography>
          <Box
            component="pre"
            sx={{
              p: 2,
              borderRadius: 8,
              overflowX: "auto",
              bgcolor: "rgba(255,255,255,0.03)",
              border: "1px solid",
              borderColor: "neutral.800",
              color: "text.secondary",
              fontFamily: "monospace",
              fontSize: "0.9rem",
              m: 0,
            }}
          >
{`src/features/cs50x-web/${slug}/
  components/
  hooks/
  utils/
  lib/
  ${componentFile}
  index.ts
  types.ts`}
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
