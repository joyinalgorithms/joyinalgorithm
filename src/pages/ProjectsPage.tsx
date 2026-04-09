import React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";

import MlAiProjectList from "../features/ml-ai/components/MlAiProjectList";
import WebAppList from "../features/web-apps/components/WebAppList";
import Cs50xWebList from "../features/cs50x-web/components/Cs50xWebList";
import Cs50wList from "../features/cs50w/components/Cs50wList";
import FrontendList from "../features/frontend/components/FrontendList";
import ApplicationsList from "../features/applications/components/ApplicationsList";

const categories = [
  { key: "ml-ai", label: "Machine Learning / AI", component: <MlAiProjectList /> },
  { key: "web-apps", label: "Web Applications", component: <WebAppList /> },
  { key: "cs50x-web", label: "CS50x Web-Based Projects", component: <Cs50xWebList /> },
  { key: "cs50w", label: "CS50W Projects", component: <Cs50wList /> },
  { key: "applications", label: "Applications", component: <ApplicationsList /> },
  { key: "frontend", label: "UI Frontend Projects", component: <FrontendList /> },
];

export default function ProjectsPage() {
  return (
    <Box sx={{ minHeight: "100vh", position: "relative" }}>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(ellipse at 50% 50%, rgba(0, 212, 255, 0.05) 0%, rgba(9, 9, 121, 0.05) 50%, rgba(2, 0, 36, 0.05) 100%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          p: { xs: 2, md: 4, lg: 6 },
          maxWidth: "1400px",
          mx: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography
          level="h1"
          sx={{
            mb: 2,
            color: "white",
            fontSize: { xs: "2.5rem", md: "4rem" },
            fontWeight: 800,
            letterSpacing: "-0.02em",
            background: "linear-gradient(to right, #fff, rgba(255,255,255,0.7))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 4px 24px rgba(255,255,255,0.1)",
          }}
        >
          Projects
        </Typography>
        <Typography
          level="body-lg"
          sx={{
            mb: 6,
            color: "text.secondary",
            maxWidth: "800px",
            fontSize: { xs: "1.1rem", md: "1.25rem" },
            lineHeight: 1.6,
          }}
        >
          A curated collection of my work spanning from machine learning algorithms and full-stack web applications to intuitive UI designs and complex desktop tools.
        </Typography>

        <Tabs
          selectionFollowsFocus
          aria-label="Project categories"
          defaultValue={0}
          sx={{
            bgcolor: "transparent",
            "--Tabs-gap": "8px",
            "& .MuiTabList-root": {
              p: 0.5,
              gap: 1,
              borderRadius: "xl",
              bgcolor: "rgba(0, 0, 0, 0.2)",
              backdropFilter: "blur(10px)",
              border: "1px solid",
              borderColor: "neutral.800",
              mb: 4,
              overflow: "auto",
              scrollSnapType: "x mandatory",
              "&::-webkit-scrollbar": { display: "none" },
            },
            "& .MuiTab-root": {
              borderRadius: "lg",
              whiteSpace: "nowrap",
              fontWeight: 600,
              fontSize: "0.95rem",
              px: 3,
              py: 1.5,
              color: "text.tertiary",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                color: "text.secondary",
                bgcolor: "rgba(255,255,255,0.05)",
              },
              "&.Mui-selected": {
                color: "white",
                bgcolor: "rgba(0, 212, 255, 0.15)",
                textShadow: "0 0 20px rgba(0, 212, 255, 0.5)",
                border: "1px solid",
                borderColor: "rgba(0, 212, 255, 0.3)",
              },
              scrollSnapAlign: "start",
            },
          }}
        >
          <TabList>
            {categories.map((cat, index) => (
              <Tab key={cat.key} value={index}>
                {cat.label}
              </Tab>
            ))}
          </TabList>
          {categories.map((cat, index) => (
            <TabPanel
              key={cat.key}
              value={index}
              sx={{ p: 0, animation: "fadeIn 0.5s ease-out" }}
            >
              {cat.component}
            </TabPanel>
          ))}
        </Tabs>
      </Box>
    </Box>
  );
}
