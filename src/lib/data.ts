export const personalInfo = {
  name: "Stephen Davis",
  title: "Senior Software Engineer & Tech Lead",
  location: "Waterloo Region, Ontario, Canada",
  email: "steve@visda.ca",
  github: "https://github.com/iamstevedavis",
  linkedin: "https://www.linkedin.com/in/iamstevedavis/",
  devto: "https://dev.to/iamstevedavis",
  profilePicture: "/profile.jpg",
  heroDescription:
    "Senior Software Engineer and Tech Lead with 10+ years building cloud-native systems and AI-enabled product workflows. Hands-on with Claude, Codex, OpenClaw, and Conductor, I turn ambiguous customer feedback into prototypes, delivery plans, and production-ready features across backend, cloud, and frontend systems. Additional experience is available on LinkedIn.",
};

export const workExperience = [
  {
    company: "Cognota",
    location: "Toronto, Ontario, Canada",
    position: "Senior Software Developer and Tech Lead",
    period: "September 2023 - Present",
    achievements: [
      "Led backend and AI-enabled initiatives from ambiguous customer feedback through architecture, ticketing, estimates, and delivery plans.",
      "Used Claude, Codex, and Conductor to turn loose requirements into prototypes and harden them into maintainable product features.",
      "Mentored an intermediate engineer through planning, code review, and day-to-day delivery decisions.",
      "Added GitHub PR coverage reporting to improve code-quality visibility and catch regressions earlier in review.",
      "Upgraded legacy backend data access to Sequelize 6, improving security, performance, and long-term maintainability.",
      "Built a PicaOS integration for bidirectional Outlook calendar synchronization between external systems and Cognota.",
    ],
  },
  {
    company: "Vidyard",
    location: "Kitchener, Ontario, Canada",
    position: "Senior Software Developer · Platform Team",
    period: "2022 - 2023",
    achievements: [
      "Owned the full lifecycle of a Ruby on Rails video encoding platform serving tens of thousands of videos daily.",
      "Introduced Google SRE-aligned monitoring and SLO practices, improving platform observability and customer confidence.",
      "Migrated AWS infrastructure to Terraform, making changes safer, faster, and more repeatable.",
      "Streamlined CI/CD with GitHub Actions, improving deployment automation and release reliability.",
      "Refactored Lambda video encoding pipelines to ARM64, saving tens of thousands annually.",
      "Shipped React and Manifest V3 features for new video creation experiences.",
    ],
  },
  {
    company: "OpenText",
    location: "Waterloo, Ontario, Canada",
    position: "Senior Software Engineer · WOPI Integrations Team",
    period: "2020 - 2022",
    achievements: [
      "Architected and delivered a GDPR-compliant authentication and authorization flow that enabled EU market expansion.",
      "Designed OAuth2 and concurrency-lock flows for Microsoft WOPI (Office Online) integrations using Redis.",
      "Built GitLab CI/CD pipelines with CodeCov and SonarQube, improving quality, security visibility, and audit turnaround.",
      "Supported government-mandated security audits across BlackDuck, Fortify, and Burp Suite findings.",
    ],
  },
  {
    company: "Focus 21 Inc",
    location: "Kitchener, Ontario, Canada",
    position: "Senior Software Developer",
    period: "2019 - 2020",
    achievements: [
      "Built offline-first medical applications using React and Redux.",
      "Led client-facing architecture, planning, and requirements discovery, including international on-site work.",
      "Integrated Electronic Health Record (EHR) workflows using SMART on FHIR standards.",
    ],
  },
];

export const education = [
  {
    institution: "Conestoga College",
    location: "Kitchener, Canada",
    degree: "Advanced Diploma · Software Engineering Technology (Co-op)",
    period: "2009 - 2014",
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
    "Ruby",
    "SQL",
  ],
  frontendDevelopment: [
    "React",
    "Redux",
    "GraphQL",
  ],
  backendDevelopment: ["Node.js", "Ruby on Rails", "NestJS", "TypeORM", "Sequelize", "Knex"],
  databaseAndStorage: ["SQL", "Redis", "MongoDB"],
  cloudAndDevOps: ["AWS Lambda", "AWS ECS", "AWS EC2", "Terraform", "Docker", "GitHub Actions", "GitLab Pipelines"],
  toolsAndServices: [
    "SonarQube",
    "BlackDuck",
    "Burp Suite",
    "Fortify",
    "Jest",
    "CodeCov",
  ],
  aiArchitectureAndDelivery: ["Claude", "Codex", "OpenClaw", "Conductor", "AI-assisted prototyping", "Requirements synthesis", "Microservices", "Event-driven systems"],
};

export const aiWorkflowHighlights = [
  {
    title: "Hands-On AI Tooling",
    description:
      "Work hands-on with Claude, Codex, OpenClaw, and Conductor to support AI-enabled product workflows.",
  },
  {
    title: "AI-Assisted Delivery",
    description:
      "Use Claude, Codex, and Conductor to turn loose requirements into prototypes and harden them into maintainable product features.",
  },
  {
    title: "Technical Leadership",
    description:
      "Translate ambiguous customer feedback into architecture, tickets, estimates, and delivery plans, while mentoring engineers through planning and code review.",
  },
];

export const projects = [
  {
    title: "stlinator",
    github: null,
    description: [
      "ARM64 AWS Lambda leveraging Vosk ASR to transcribe audio from video files for indexing and analysis.",
    ],
  },
  {
    title: "Sanctuary Refugee Health",
    github: "https://github.com/SanctuaryRefugeeHealth",
    description: [
      "Multilingual SMS appointment reminders using Twilio to improve patient engagement.",
    ],
  },
  {
    title: "Happy Birthday Automation",
    github: "https://github.com/iamstevedavis/happy-birthday",
    description: [
      "Automated interactive SMS messages to Google contacts using Twilio and AWS Lambda.",
    ],
  },
  {
    title: "Foto",
    github: "https://github.com/iamstevedavis/foto",
    description: [
      "Python-powered digital photo frame with email ingestion, built on Raspberry Pi.",
    ],
  },
  {
    title: "COVID Passport Inspector",
    github: "https://github.com/iamstevedavis/covid-passport-inspector",
    description: [
      "QR code inspection tool for Ontario proof-of-vaccination data.",
    ],
  },
  {
    title: "Visda.ca",
    github: "https://github.com/iamstevedavis/my-portfolio",
    description: [
      "Personal website originally built with React, MUI, Gatsby, GraphQL, and optimized image lazy-loading.",
      "The current version uses Astro, React, and Tailwind CSS and is hosted on Netlify.",
    ],
  },
];

export const awards = [
  {
    name: "AAA",
    issuer: "AAA",
    date: "Sep 2022",
    type: "International",
    position: "Second Place",
  },
];
