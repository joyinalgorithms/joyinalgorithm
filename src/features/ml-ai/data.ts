import { Project } from '../../types/project';

export const mlAiProjects: Project[] = [
  {
    id: "ml-1",
    title: "Project LiF",
    description: "A lipreading learning tool for basic Filipino words using 3D CNN and BiLSTM.",
    image: "/lif.png",
    tags: ["3D CNN", "BiLSTM", "Lipreading in Filipino", "Python", "TensorFlow", "Keras"],
    github: "https://github.com/projectlif/projectlif",
    abstract: "/Project_LiF.pdf",
  },
  {
    id: "mml-2",
    title: "Attendance System",
    description: "A secure, real-time employee attendance system that leverages AI-powered face recognition, liveness detection to prevent spoofing, and emotion tracking",
    image: "/preview/attendance.jpg",
    tags: ["React (Vite)", "SSD MobileNetV1", "Face Landmark 68 Net", "Face Recognition Net"],
    github: "https://github.com/projectlif/projectlif",
  },
];
