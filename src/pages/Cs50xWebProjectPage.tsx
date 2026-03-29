import { useParams } from "react-router-dom";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { cs50xWebProjectMeta } from "@/features/cs50x-web/projectMeta";
import { cs50xWebProjectRegistry } from "@/features/cs50x-web/registry";

export default function Cs50xWebProjectPage() {
  const { project } = useParams<{ project: string }>();
  const entry = project ? cs50xWebProjectMeta[project] : undefined;
  const ProjectComponent = project ? cs50xWebProjectRegistry[project] : undefined;

  if (!entry) {
    return (
      <Box sx={{ py: 8, px: 4, textAlign: "center" }}>
        <Typography level="h2" sx={{ mb: 2 }}>
          Project Not Found
        </Typography>
        <Typography level="body-lg" sx={{ color: "text.tertiary", mb: 4 }}>
          That CS50x React feature is not registered yet.
        </Typography>
      </Box>
    );
  }

  if (ProjectComponent) {
    return <ProjectComponent />;
  }
  return null;
}
