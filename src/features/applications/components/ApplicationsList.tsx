import React from 'react';
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import AspectRatio from "@mui/joy/AspectRatio";
import Grid from "@mui/joy/Grid";
import { applicationProjects } from '../data';

export default function ApplicationsList() {
  return (
    <Grid container spacing={3} sx={{ flexGrow: 1 }}>
      {applicationProjects.map((project) => (
        <Grid key={project.id} xs={12} sm={6} md={4}>
           <Card
              variant="outlined"
              sx={{
                height: "100%",
                bgcolor: "background.surface",
                borderColor: "neutral.800",
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: "primary.600",
                  transform: "translateY(-4px)",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <CardOverflow>
                <AspectRatio ratio="16/9">
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{ objectFit: "cover" }}
                  />
                </AspectRatio>
              </CardOverflow>
              <CardContent sx={{ p: 2 }}>
                <Typography level="title-md" sx={{ fontWeight: 600, mb: 1 }}>
                  {project.title}
                </Typography>
                <Typography level="body-sm" sx={{ color: "text.tertiary", mb: 2 }}>
                  {project.description}
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                  {project.tags.map((tag) => (
                    <Chip
                      key={tag}
                      size="sm"
                      variant="soft"
                      sx={{
                        bgcolor: "rgba(0, 212, 255, 0.1)",
                        color: "primary.400",
                        fontSize: "0.7rem",
                      }}
                    >
                      {tag}
                    </Chip>
                  ))}
                </Box>
              </CardContent>
            </Card>
        </Grid>
      ))}
    </Grid>
  );
}
