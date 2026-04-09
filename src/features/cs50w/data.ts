import { Project } from '../../types/project';

export const cs50wProjects: Project[] = [
  {
    id: "cs50w-search",
    title: "Search",
    description: "An HTML-based front end that replicates the basic functionality of Google Search, Image Search, and Advanced Search by submitting user queries through GET requests.",
    image: "/preview/search.png",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "/projects/cs50w/search/index.html",
  },
  {
    id: "cs50w-wiki",
    title: "Wiki",
    description: "A Django-based web application that allows users to view, search, create, and edit encyclopedia entries written in Markdown and rendered as HTML.",
    image: "/preview/wiki.png",
    tags: ["HTML", "CSS", "JavaScript", "Python", "Django", "Bootstrap", "Sqlite", "Markdown"],
    video: "/videos/cs50w/wiki.mp4",
  },
  {
    id: "cs50w-auction",
    title: "Auction",
    description: "An eBay-like e-commerce auction site that will allow users to post auction listings, place bids on listings, comment on those listings, and add listings to a watchlist.",
    image: "/preview/auction.png",
    tags: ["HTML", "CSS", "JavaScript", "Python", "Django", "Bootstrap", "Sqlite", "Rest API"],
    video: "/videos/cs50w/auction.mp4",
  },
  {
    id: "cs50w-mail",
    title: "Mail",
    description: "Front-end for an email client that makes API calls to send and receive emails.",
    image: "/preview/mail.png",
    tags: ["HTML", "CSS", "JavaScript", "Python", "Django", "Bootstrap", "Sqlite", "Rest API"],
    video: "/videos/cs50w/mail.mp4",
  },
];
