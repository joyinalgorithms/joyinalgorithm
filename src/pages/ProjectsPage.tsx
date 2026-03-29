import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import AspectRatio from "@mui/joy/AspectRatio";
import Grid from "@mui/joy/Grid";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import LaunchIcon from "@mui/icons-material/Launch";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { getCs50xWebProjectPath, getProjectDetailPath } from "@/lib/paths";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  live?: string;
  ui?: string;
  video?: string;
  abstract?: string;
}

interface Category {
  key: string;
  label: string;
  projects: Project[];
}

const categories: Category[] = [
  {
    key: "ml-ai",
    label: "Machine Learning / AI",
    projects: [
      {
        id: "ml-1",
        title: "Project LiF",
        description:
          "A lipreading learning tool for basic Filipino words using 3D CNN and BiLSTM.",
        image: "/lif.png",
        tags: [
          "3D CNN",
          "BiLSTM",
          "Lipreading in Filipino",
          "Python",
          "TensorFlow",
          "Keras",
        ],
        github: "https://github.com/projectlif/projectlif",
        abstract: "/Project_LiF.pdf",
      },
      {
        id: "mml-2",
        title: "Attendance System",
        description:
          "A secure, real-time employee attendance system that leverages AI-powered face recognition, liveness detection to prevent spoofing, and emotion tracking",
        image: "/preview/attendance.jpg",
        tags: [
          "React (Vite)",
          "SSD MobileNetV1",
          "Face Landmark 68 Net",
          "Face Recognition Net",
        ],
        github: "https://github.com/projectlif/projectlif",
      },
    ],
  },
  {
    key: "frontend",
    label: "UI Frontend Projects",
    projects: [
      {
        id: "facebook",
        title: "Facebook Clone UI",
        description:
          "A simple Facebook-style UI built from HTML/CSS/JS templates.",
        image: "preview/facebook.jpg",
        tags: ["HTML", "CSS", "JavaScript"],
        ui: "facebook",
        video: "/videos/frontend/facebook.mp4",
      },
      {
        id: "instagram",
        title: "Instagram Clone UI",
        description: "An Instagram-style UI built from HTML/CSS/JS templates.",
        image: "preview/instagram.jpg",
        tags: ["HTML", "CSS", "JavaScript"],
        ui: "instagram",
        video: "/videos/frontend/instagram.mp4",
      },
      {
        id: "x",
        title: "X Clone UI",
        description: "An X/Twitter-style UI built from HTML/CSS/JS templates.",
        image: "preview/x.jpg",
        tags: ["HTML", "CSS", "JavaScript"],
        ui: "x",
        video: "/videos/frontend/x.mp4",
      },
      {
        id: "linkedin",
        title: "Linkedin UI",
        description: "A Linkedin-style UI built from HTML/CSS/JS templates.",
        image: "preview/linkedin.png",
        tags: ["HTML", "CSS", "JavaScript"],
        ui: "linkedin",
        video: "/videos/frontend/linkedin.mp4",
      },
      {
        id: "youtube",
        title: "Youtube UI",
        description: "A Youtube-style UI built from HTML/CSS/JS templates.",
        image: "preview/youtube.png",
        tags: ["HTML", "CSS", "JavaScript"],
        ui: "youtube",
        video: "/videos/frontend/youtube.mp4",
      },
      {
        id: "spotify",
        title: "Spotify UI",
        description: "A Spotify-style UI built from HTML/CSS/JS templates.",
        image: "preview/spotify.png",
        tags: ["HTML", "CSS", "JavaScript"],
        ui: "spotify",
        video: "/videos/frontend/spotify.mp4",
      },
      {
        id: "amazon",
        title: "Amazon UI",
        description: "A Amazon-style UI built from HTML/CSS/JS templates.",
        image: "preview/amazon.png",
        tags: ["HTML", "CSS", "JavaScript"],
        ui: "amazon",
        video: "/videos/frontend/amazon.mp4",
      },
      {
        id: "prmsuccit",
        title: "PRMSU CCIT",
        description:
          "A static website for the College of Communication and Information Technology of PRMSU.",
        image: "preview/prmsuccit.jpg",
        tags: ["HTML", "CSS", "JavaScript"],
        ui: "prmsuccit",
        video: "/videos/frontend/prmsuccit.mp4",
      },
      {
        id: "tourism",
        title: "Philippine Tourism Website",
        description:
          "A tourism website for the Philippines, showcasing the country's attractions, culture, and history.",
        image: "preview/tourism.png",
        tags: ["Python", "HTML", "CSS", "JavaScript"],
        ui: "tourism",
        video: "/videos/frontend/tourism.mp4",
      }
    ],
  },
  {
    key: "web-apps",
    label: "Web Applications",
    projects: [
      {
        id: "webapp-consumption-tracker",
        title: "Consumption Tracker",
        description:
          "A web application for tracking and analyzing consumption data.",
        image: "preview/consumption_tracker.jpg",
        tags: ["React", "Node.js", "Typescript", "Joy UI", "Sqlite3", "Prisma"],
        github: "https://github.com/joybernal/consumption_tracker",
        live: "https://consumption-tracker-pink.vercel.app/",
      },
      {
        id: "webapp-lemonaddie",
        title: "Lemonaddie Website",
        description:
          "An end-to-end e-commerce platform featuring user accounts, product management, and seamless checkout, tailored for selling lifestyle goods.",
        image: "preview/lemonaddie.png",
        tags: ["Python", "HTML", "CSS", "JavaScript"],
        github: "https://github.com/joybernal/lemonaddie-deploy",
        video: "/videos/web-apps/lemonaddie.mp4",
      },
      {
        id: "webapp-tripleq",
        title: "TripleQ Website",
        description:
          "A business website with integrated booking, service browsing, and project showcase functionality tailored for a modern construction firm..",
        image: "preview/tripleq.png",
        tags: ["Python", "HTML", "CSS", "JavaScript"],
        github: "https://github.com/joybernal/tripleq-website",
        video: "/videos/web-apps/tripleq.mp4",
      },
      {
        id: "webapp-journal",
        title: "Journal Website",
        description:
          "A full stack journaling website that allows users to write, manage, and share personal entries with privacy controls and community features.",
        image: "preview/journal.png",
        tags: ["Python", "HTML", "CSS", "JavaScript"],
        github: "https://github.com/joybernal/journal",
        video: "/videos/web-apps/journal.mp4",
      },
      {
        id: "webapp-ems",
        title: "Employee Management System",
        description:
          "A robust employee management system that handles onboarding, attendance, roles, and administrative operations for small to mid-sized businesses.",
        image: "preview/ems.png",
        tags: ["Python", "HTML", "CSS", "JavaScript"],
        github: "https://github.com/joybernal/emsdeploy",
        video: "/videos/web-apps/ems.mp4",
      },
      {
        id: "webapp-bookstore",
        title: "Online Bookstore",
        description:
          "A full-featured e-commerce application focused on book discovery, user reviews, and personalized shopping experiences.",
        image: "preview/books.png",
        tags: ["Python", "HTML", "CSS", "JavaScript"],
        github: "https://github.com/joybernal/bookit",
        video: "/videos/web-apps/bookstore.mp4",
      },
      {
        id: "webapp-writers",
        title: "Writers Website",
        description: "A website for writers to let their imagination run free.",
        image: "preview/writershaven.png",
        tags: ["Python", "HTML", "CSS", "JavaScript"],
        github: "https://github.com/joybernal/writers-haven",
        video: "/videos/web-apps/writers.mp4",
      },
    ],
  },
  {
    key: "mini-games",
    label: "Mini Games",
    projects: [
      {
        id: "game-tictactoe",
        title: "Tic Tac Toe",
        description:
          "A responsive web-based Tic Tac Toe game featuring intuitive UI and real-time win detection for casual solo or two-player gameplay.",
        image: "/preview/tictactoe.png",
        tags: ["HTML", "CSS", "JavaScript"],
      },
      {
        id: "game-rockpaperscissors",
        title: "Rock Paper Scissors",
        description:
          "A sleek and interactive implementation of the classic Rock, Paper, Scissors game with animations and instant result feedback.",
        image: "/preview/rockpaperscissors.png",
        tags: ["HTML", "CSS", "JavaScript"],
      },
      {
        id: "game-clawmachine",
        title: "Claw Machine",
        description:
          "A browser-based arcade game where players use directional controls and a grab mechanism to collect virtual tech-themed prizes in a simulated claw machine.",
        image: "/preview/clawmachine.png",
        tags: ["HTML", "CSS", "JavaScript"],
      },
      {
        id: "game-memorygame",
        title: "Memory Game",
        description:
          "A memory matching game where players pair tech-related icons to win.",
        image: "/preview/memorygame.png",
        tags: ["HTML", "CSS", "JavaScript"],
      },
      {
        id: "game-snakegame",
        title: "Snake Game",
        description: "A classic snake game with a sleek, modern twist.",
        image: "/preview/snakegame.png",
        tags: ["HTML", "CSS", "JavaScript"],
      },
      {
        id: "game-flappygame",
        title: "Flappy Game",
        description:
          "A flappy bird-style game featuring a flying tech bot dodging obstacles.",
        image: "/preview/flappygame.png",
        tags: ["HTML", "CSS", "JavaScript"],
      },
      {
        id: "game-colorgame",
        title: "Color Guessing Game",
        description:
          "A fun challenge where you guess the correct color from tricky RGB values.",
        image: "/preview/colorgame.png",
        tags: ["HTML", "CSS", "JavaScript"],
      },
      {
        id: "game-suduko",
        title: "Suduko",
        description:
          "A clean, interactive Sudoku game to test your logic and number skills.",
        image: "/preview/suduko.png",
        tags: ["HTML", "CSS", "JavaScript"],
      },
      {
        id: "game-typingtest",
        title: "Typing Test",
        description:
          "A fast-paced typing test to measure your speed and accuracy in real time.",
        image: "/preview/typingtest.png",
        tags: ["HTML", "CSS", "JavaScript"],
      },
    ],
  },
  {
    key: "cs50x-web",
    label: "CS50x Web-Based Projects",
    projects: [
      {
        id: "cs50web-credit",
        title: "Credit",
        description:
          "This project involves implementing a program that validates credit card numbers using the Luhn algorithm and identifies the card type based on number patterns.",
        image: "/preview/credit.png",
        tags: ["HTML", "CSS", "JavaScript"],
        live: getCs50xWebProjectPath("credit"),
      },
      {
        id: "cs50web-scrabble",
        title: "Scrabble",
        description:
          "A program that calculates and compares Scrabble scores of two players' words to determine the winner.",
        image: "/preview/scrabble.png",
        tags: ["HTML", "CSS", "JavaScript"],
        live: getCs50xWebProjectPath("scrabble"),
      },
      {
        id: "cs50web-readability",
        title: "Readability",
        description:
          "A program that analyzes a block of text and estimates its U.S. grade-level readability using the Coleman-Liau index.",
        image: "/preview/readability.png",
        tags: ["HTML", "CSS", "JavaScript"],
        live: getCs50xWebProjectPath("readability"),
      },
      {
        id: "cs50web-caesar",
        title: "Caesar",
        description:
          "A program that encrypts plaintext using Caesar\’s cipher, shifting each letter by a user-specified key.",
        image: "/preview/caesar.png",
        tags: ["HTML", "CSS", "JavaScript"],
        live: getCs50xWebProjectPath("caesar"),
      },
      {
        id: "cs50web-substitution",
        title: "Substitution",
        description:
          "A program that encrypts messages using a user-provided substitution cipher key to replace each letter with a corresponding one.",
        image: "/preview/substitution.png",
        tags: ["HTML", "CSS", "JavaScript"],
        live: getCs50xWebProjectPath("substitution"),
      },
      {
        id: "cs50web-plurality",
        title: "Pluratlity",
        description:
          "A program that calculates and compares Scrabble scores of two player's words to determine the winner.",
        image: "/preview/plurality.png",
        tags: ["HTML", "CSS", "JavaScript"],
        live: getCs50xWebProjectPath("plurality"),
      },
      {
        id: "cs50web-runoff",
        title: "Runoff",
        description:
          "A program that simulates an instant-runoff election using ranked-choice voting to determine the candidate with majority support.",
        image: "/preview/runoff.png",
        tags: ["HTML", "CSS", "JavaScript"],
        live: getCs50xWebProjectPath("runoff"),
      },
      {
        id: "cs50web-filter",
        title: "Filter",
        description:
          "A program that apply various filters (like grayscale, sepia, blur, and edge detection) to 24-bit BMP image files by manipulating pixel RGB values.",
        image: "/preview/filter.png",
        tags: ["HTML", "CSS", "JavaScript"],
        live: getCs50xWebProjectPath("filter"),
      },
      {
        id: "cs50web-inheritance",
        title: "Inheritance",
        description:
          "A program that recursively simulates the inheritance of blood type alleles across generations in a family.",
        image: "/preview/inheritance.png",
        tags: ["HTML", "CSS", "JavaScript"],
        live: getCs50xWebProjectPath("inheritance"),
      },
      {
        id: "cs50web-speller",
        title: "Speller",
        description:
          "A program that uses a hash table to implement an efficient spell checker by loading a dictionary and checking words in a text file.",
        image: "/preview/speller.png",
        tags: ["HTML", "CSS", "JavaScript"],
        live: getCs50xWebProjectPath("speller"),
      },
      {
        id: "cs50web-dna",
        title: "DNA",
        description:
          "A program that identifies individuals based on DNA STR patterns by comparing sequences against a database.",
        image: "/preview/credit.png",
        tags: ["HTML", "CSS", "JavaScript"],
        live: getCs50xWebProjectPath("dna"),
      },
      {
        id: "cs50web-trivia",
        title: "Trivia",
        description:
          "A web application that allows users to answer multiple-choice trivia questions using HTML, CSS, and JavaScript.",
        image: "/preview/trivia.png",
        tags: ["HTML", "CSS", "JavaScript"],
        live: getCs50xWebProjectPath("trivia"),
      },
      {
        id: "cs50web-homepage",
        title: "Homepage",
        description: "A simple static webpage about me.",
        image: "/preview/homepage.png",
        tags: ["HTML", "CSS", "JavaScript"],
        live: getCs50xWebProjectPath("homepage"),
      },
      {
        id: "cs50web-birthday",
        title: "Birthday",
        description:
          "A Flask-based web app that stores and displays users’ friends’ birthdays using a SQLite database.",
        image: "/preview/birthdays.png",
        tags: ["HTML", "CSS", "JavaScript"],
        live: getCs50xWebProjectPath("birthday"),
      },
      {
        id: "cs50web-finance",
        title: "Finance",
        description:
          "A web application that simulates stock trading by allowing users to buy, sell, and track stock holdings with real-time prices.",
        image: "/preview/finance.png",
        tags: ["HTML", "CSS", "JavaScript"],
        live: getCs50xWebProjectPath("finance"),
      },
    ],
  },
  {
    key: "cs50w",
    label: "CS50W Projects",
    projects: [
      {
        id: "cs50w-search",
        title: "Search",
        description:
          "An HTML-based front end that replicates the basic functionality of Google Search, Image Search, and Advanced Search by submitting user queries through GET requests.",
        image: "/preview/search.png",
        tags: ["HTML", "CSS", "JavaScript"],
        live: "/projects/cs50w/search/index.html",
      },
      {
        id: "cs50w-wiki",
        title: "Wiki",
        description:
          "A Django-based web application that allows users to view, search, create, and edit encyclopedia entries written in Markdown and rendered as HTML.",
        image: "/preview/wiki.png",
        tags: ["HTML", "CSS", "JavaScript", "Python", "Django", "Bootstrap", "Sqlite", "Markdown"],
        video: "/videos/cs50w/wiki.mp4",
      },
      {
        id: "cs50w-auction",
        title: "Auction",
        description:
          "An eBay-like e-commerce auction site that will allow users to post auction listings, place bids on listings, comment on those listings, and add listings to a “watchlist.",
        image: "/preview/auction.png",
        tags: ["HTML", "CSS", "JavaScript", "Python", "Django", "Bootstrap", "Sqlite", "Rest API"],
        video: "/videos/cs50w/auction.mp4",
      },
      {
        id: "cs50w-mail",
        title: "Mail",
        description:
          "Front-end for an email client that makes API calls to send and receive emails.",
        image: "/preview/mail.png",
        tags: ["HTML", "CSS", "JavaScript", "Python", "Django", "Bootstrap", "Sqlite", "Rest API"],
        video: "/videos/cs50w/mail.mp4",
      },
    ],
  },
  {
    key: "applications",
    label: "Applications",
    projects: [
      {
        id: "app-1",
        title: "Point of Sale Application",
        description:
          "A desktop-based point of sale application developed in VB.NET, featuring inventory tracking, sales processing, and receipt generation for small to medium businesses.",
        image: "/pos.png",
        tags: ["VB.NET", "Windows Forms"],
      },
    ],
  },
];

function ProjectCard({ project }: { project: Project }) {
  const targetPath = getProjectDetailPath(project.id);
  const navigate = useNavigate();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoModal = project.video ? (
    <Modal open={isVideoOpen} onClose={() => setIsVideoOpen(false)}>
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
            {project.title} Demo
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
              key={project.video}
              controls
              autoPlay
              preload="metadata"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            >
              <source src={project.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </AspectRatio>
        </Box>
      </ModalDialog>
    </Modal>
  ) : null;

  if (project.ui && project.video) {
    return (
      <>
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
            <Button
              size="sm"
              fullWidth
              startDecorator={<PlayCircleOutlineIcon />}
              onClick={() => setIsVideoOpen(true)}
              sx={{
                bgcolor: "primary.600",
                color: "white",
                "&:hover": { bgcolor: "primary.700" },
              }}
            >
              Video Demo
            </Button>
          </CardContent>
        </Card>
        {videoModal}
      </>
    );
  }

  if (
    project.id.startsWith("webapp-") ||
    project.id.startsWith("cs50w") ||
    project.id.startsWith("game") ||
    project.id.startsWith("cs50")
  ) {
    return (
      <>
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
            {(project.id.startsWith("webapp-") ||
              project.id.startsWith("cs50web-") ||
              project.id.startsWith("cs50w")) &&
            (project.live || project.video) ? (
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
                onClick={project.live ? undefined : () => setIsVideoOpen(true)}
                sx={{
                  mt: 2,
                  bgcolor: "primary.600",
                  color: "white",
                  "&:hover": { bgcolor: "primary.700" },
                }}
              >
                {project.live ? "Open Project" : "Video Demo"}
              </Button>
            ) : (
              <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                <a
                  href={project.live ? project.live : targetPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <Chip
                    size="sm"
                    variant="outlined"
                    startDecorator={<LaunchIcon sx={{ fontSize: 14 }} />}
                    sx={{ borderColor: "neutral.700", color: "text.secondary" }}
                  >
                    Open in New Tab
                  </Chip>
                </a>
              </Box>
            )}
          </CardContent>
        </Card>
        {videoModal}
      </>
    );
  }
  if (project.id.startsWith("app-")) {
    return (
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
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
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
    );
  }

  // Special handling for Project LiF (ml-1) - show abstract and GitHub links
  if (project.id === "ml-1" && project.abstract) {
    return (
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
            <a
              href={project.abstract}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Chip
                size="sm"
                variant="solid"
                sx={{
                  bgcolor: "primary.600",
                  color: "white",
                  width: "100%",
                  "&:hover": { bgcolor: "primary.700" },
                }}
              >
                View Abstract (PDF)
              </Chip>
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Chip
                  size="sm"
                  variant="outlined"
                  sx={{
                    borderColor: "neutral.700",
                    color: "text.secondary",
                    width: "100%",
                    "&:hover": { borderColor: "primary.600" },
                  }}
                >
                  View on GitHub
                </Chip>
              </a>
            )}
          </Box>
        </CardContent>
      </Card>
    );
  }

  // Default card for all other projects
  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => navigate(targetPath)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") navigate(targetPath);
      }}
      variant="outlined"
      sx={{
        height: "100%",
        bgcolor: "background.surface",
        borderColor: "neutral.800",
        cursor: "pointer",
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
        <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
          <Chip
            size="sm"
            variant="solid"
            sx={{
              bgcolor: "primary.600",
              color: "white",
              "&:hover": { bgcolor: "primary.700" },
            }}
          >
            {project.ui ? "View UI" : "View Details"}
          </Chip>
          <a
            href={project.live ? project.live : targetPath}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Chip
              size="sm"
              variant="outlined"
              startDecorator={<LaunchIcon sx={{ fontSize: 14 }} />}
              sx={{ borderColor: "neutral.700", color: "text.secondary" }}
            >
              Open in New Tab
            </Chip>
          </a>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, md: 4 } }}>
      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        <Typography
          level="h1"
          sx={{
            textAlign: "center",
            mb: 2,
            fontWeight: 700,
            background: "linear-gradient(135deg, #00d4ff 0%, #00ff88 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          My Projects
        </Typography>
        <Typography
          level="body-lg"
          sx={{
            textAlign: "center",
            color: "text.tertiary",
            mb: 6,
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          A collection of projects showcasing my skills in web development,
          machine learning, and software engineering.
        </Typography>

        <Tabs
          value={activeTab}
          onChange={(_, value) => setActiveTab(value as number)}
          sx={{ bgcolor: "transparent" }}
        >
          <TabList
            sx={{
              flexWrap: "wrap",
              gap: 1,
              justifyContent: "center",
              mb: 4,
              "--TabList-gap": "8px",
              bgcolor: "transparent",
              "& .MuiTab-root": {
                bgcolor: "background.surface",
                borderRadius: "8px",
                border: "1px solid",
                borderColor: "neutral.800",
                "&:hover": {
                  bgcolor: "background.level1",
                },
                "&.Mui-selected": {
                  bgcolor: "rgba(0, 212, 255, 0.1)",
                  borderColor: "primary.600",
                  color: "primary.500",
                },
              },
            }}
          >
            {categories.map((category, index) => (
              <Tab
                key={category.key}
                value={index}
                sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
              >
                {category.label}
              </Tab>
            ))}
          </TabList>

          {categories.map((category, index) => (
            <TabPanel key={category.key} value={index} sx={{ p: 0 }}>
              <Grid container spacing={3}>
                {category.projects.map((project) => (
                  <Grid key={project.id} xs={12} sm={6} md={4}>
                    <ProjectCard project={project} />
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
          ))}
        </Tabs>
      </Box>
    </Box>
  );
}
