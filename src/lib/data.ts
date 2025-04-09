export const personalInfo = {
  name: "Steve D",
  location: "Waterloo Region, Ontario, Canada",
  email: "steve@visda.ca",
  github: "https://github.com/iamstevedavis",
  linkedin: "https://www.linkedin.com/in/iamstevedavis/",
};

export const workExperience = [
  {
    company: "Cognota",
    location: "Toronto, Ontario, Canada (Remote)",
    position: "Full Stack Software Developer, Senior",
    period: "September 2023 - Present",
    achievements: [
      "Implemented PR code coverage Github integration to improve maintainability and quality, reducing regression significantly.",
      "Implemented a custom Kafka Producer using the Outbox pattern to ensure reliable event delivery and data consistency.",
      "Upgrade legacy code to Sequelize 6, improving database performance and security.",
      "Backend lead for my team, overseeing backend development while ensuring high-quality, defect-free code in a primarily frontend-focused team."
    ],
  },
  {
    company: "Vidyard",
    location: "Waterloo, Ontario, Canada",
    position: "Platform Software Developer, Senior",
    period: "August 2022 - May 2023",
    achievements: [
      "Managed the full lifecycle of the RoR video encoding platform serving tens of thousands of videos daily to users.",
      "Set up SRE guidelines and monitoring performance metrics aligned with Google's standards. Allowed us to set and adopt SLO’s which increased customer confidence.",
      "Migrated AWS infrastructure to Terraform which set the foundation for significantly easier infrastructure changes.",
      "Optimized the CI/CD using GitHub Actions allowing for more automation of deployments.",
      "Refactored AWS Lambda encoding pipeline to ARM64, resulting in tens of thousands of dollars in cost savings.",
      "Developed new video creation experiences with React and Manifest V3.",
    ],
  },
  {
    company: "OpenText",
    location: "Waterloo, Ontario, Canada",
    position: "Software Engineer, Senior",
    period: "October 2020 - August 2022",
    achievements: [
      "Architected and roadmapped a GDPR-compliant auth flow for EU document access allowing EU product expansion.",
      "Built an OAuth2 and co-auth locks flow for MS WOPI integration (Office Online), utilizing Redis.",
      "Fully developed and deployed GitLab Pipelines with CodeCov and SonarQube ensuring code security and quality and reducing audit turnaround time.",
      "Security advocate for government-mandated security audits (BlackDuck, Fortify, Burp).",
    ],
  },
  {
    company: "Focus 21",
    location: "Kitchener, Ontario, Canada",
    position: "Software Developer, Senior",
    period: "January 2019 - September 2020",
    achievements: [
      "Developed React-based offline first medical applications with Redux.",
      "Conducted client-facing planning, architecture, and requirements gathering, on-site globally.",
      "Built EHR systems using SMART on FHIR.",
    ],
  },
];

export const education = [
  {
    institution: "Conestoga College",
    location: "Kitchener, Canada",
    degree: "Software Engineering Technology, Advanced Diploma",
    period: "Setpember 2019 - April 2013",
    achievements: [
      "Academic Distinction",
      "Dean's List",
    ],
  },
];
export const skills = {
  programmingLanguages: [
    "TypeScript",
    "JavaScript",
    "Python",
    "C++",
  ],
  frontendDevelopment: [
    "NestJS",
    "React",
    "Tailwind CSS",
    "HTML",
    "CSS",
  ],
  backendDevelopment: ["Nodejs", "Expressjs", "Fastify"],
  databaseAndStorage: ["PostgreSQL", "Redis", "MongoDB", "Cassandra"],
  cloudAndDevOps: ["AWS"],
  toolsAndServices: [
    "GitHub Actions",
    "GitLab CI/CD",
    "Terraform",
    "Docker",
    "SonarQube",
    "BlackDuck",
    "Burp",
    "Fortify",
  ],
};

export const projects = [
  {
    title: "Clipify",
    github: "https://github.com/iamstevedavis/clipify",
    description: [
      "Clipify is a clipboard history manager built with Go. It allows users to monitor clipboard activity, save clipboard history, and view it through a system tray interface.",
      "Clipboard Monitoring: Automatically tracks clipboard changes.",
      "History Management: Saves clipboard history to a JSON file for persistence.",
      "System Tray Integration: Provides a tray icon with options to view history or quit the application.",
      "Cross-Platform Support: Works on Windows, macOS, and Linux.",
    ],
  },
  {
    title: "FOTO",
    github: "https://github.com/iamstevedavis/foto",
    description: [
      "FOTO is an app built in Python that runs on Raspberry Pi",
      "Monitors an email address for incoming emails with images.",
      "Automatically downloads and saves images to a local directory.",
      "Displays them on screen using a slideshow format.",
    ],
  }
];

export const awards = [
  {
    name: "IEEE YESIST12 Hackathon",
    issuer: "IEEE",
    date: "Sep 2022",
    type: "International",
    position: "Second Place",
  },
  {
    name: "Prodigi Cognizant Hackathon",
    issuer: "Cognizant",
    date: "Feb 2023",
    type: "National",
    position: "Second Runner-up",
  },
  {
    name: "Cisco Thingqbator Hackathon",
    issuer: "Cisco",
    date: "Jan 2023",
    type: "National",
    position: "First Runner-up",
  },
  {
    name: "Innovators Day",
    issuer: "Sri Manakula Vinayagar Engineering College, Pondicherry",
    date: "Sep 2022",
    type: "National",
    position: "First Prize",
  },
  {
    name: "KG Hackfest'22",
    issuer: "KGiSL Institute of Technology, Coimbatore",
    date: "Sep 2022",
    type: "National",
    position: "Second Prize",
  },
  {
    name: "Innohacks'22",
    issuer: "Innogeeks, KIET Group of Institutions, New Delhi",
    date: "May 2022",
    type: "National",
    position: "Second Runner-up",
  },
  {
    name: "Hack @ SKCET",
    issuer: "Hackclub SKCET, SKCET, Coimbatore",
    date: "Feb 2022",
    type: "National",
    position: "Most Impactful Hack",
  },
];
