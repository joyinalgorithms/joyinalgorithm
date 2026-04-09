import React, { useState } from 'react';
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import AspectRatio from "@mui/joy/AspectRatio";
import Grid from "@mui/joy/Grid";
import Button from "@mui/joy/Button";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import LaunchIcon from "@mui/icons-material/Launch";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import { cs50wProjects } from '../data';

export default function Cs50wList() {
  const [activeVideo, setActiveVideo] = useState<{ url: string; title: string } | null>(null);

  const videoModal = activeVideo && (
    <Modal open={!!activeVideo} onClose={() => setActiveVideo(null)}>
      <ModalDialog
        layout="center"
        sx={{
          width: "min(960px, 96vw)",
          maxWidth: "96vw",
          p: 1.5,
          bgcolor: "background.surface",
          borderColor: "neutral.800",
        }}
      >
        <ModalClose />
        <Box sx={{ p: { xs: 1, sm: 2 } }}>
          <Typography level="h4" sx={{ mb: 2, pr: 4, fontWeight: 600 }}>
            {activeVideo.title} Demo
          </Typography>
          <AspectRatio
            ratio="16/9"
            sx={{
              borderRadius: "12px",
              overflow: "hidden",
              bgcolor: "common.black",
            }}
          >
            <video
              key={activeVideo.url}
              controls
              autoPlay
              preload="metadata"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            >
              <source src={activeVideo.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </AspectRatio>
        </Box>
      </ModalDialog>
    </Modal>
  );

  return (
    <>
      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        {cs50wProjects.map((project) => (
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
                {(project.live || project.video) && (
                  <Button
                    size="sm"
                    fullWidth
                    component={project.live ? "a" : "button"}
                    href={project.live}
                    target={project.live ? "_blank" : undefined}
                    rel={project.live ? "noopener noreferrer" : undefined}
                    startDecorator={
                      project.live ? (
                        <LaunchIcon sx={{ fontSize: 18 }} />
                      ) : (
                        <PlayCircleOutlineIcon />
                      )
                    }
                    onClick={project.live ? undefined : () => setActiveVideo({ url: project.video!, title: project.title })}
                    sx={{
                      mt: "auto",
                      bgcolor: "primary.600",
                      color: "white",
                      "&:hover": { bgcolor: "primary.700" },
                    }}
                  >
                    {project.live ? "Open Project" : "Video Demo"}
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {videoModal}
    </>
  );
}
