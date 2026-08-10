// ─── Portfolio Data ───────────────────────────────────────────────────────────
// Edit this file to update all content across the portfolio.

export const PROJECTS = [
  {
    id: "accuLedger",
    codename: "Full-Stack App",
    title: "AccuLedger",
    subtitle: "Quantum-Resilient Blockchain Audit System",
    tags: ["Blockchain", "Accumulators", "Merkle Trees"],
    status: "GITHUB",
    hypothesis: "Traditional blockchains will face vulnerabilities in the post-quantum era. The goal was to build an audit verification system using cryptographic accumulators.",
    method: "Designed a blockchain audit verification system utilizing cryptographic accumulators for efficient membership proofs. Implemented Merkle trees for structured data retrieval.",
    finding: "Efficient verification is achievable without compromising cryptographic strength. The accumulator approach reduces proof size significantly compared to naive blockchain queries.",
    outcome: "Source code available on GitHub. Demonstrates advanced cryptographic implementation.",
    publication: null,
    year: "2024",
  },
  {
    id: "jobMarketIntelligence",
    codename: "Data Analytics",
    title: "Job Market Intelligence",
    subtitle: "Reproducible Job-Market Analytics Pipeline",
    tags: ["Python", "Pandas", "SQL", "SQLite", "Streamlit", "EDA"],
    status: "GITHUB",
    hypothesis: "How can technology job-posting data be transformed into a structured, validated, and reusable dataset for analysis without over-interpreting demonstration data?",
    method: "Built a reproducible pipeline that cleans and validates job data, preserves invalid records with validation flags, extracts normalized job-to-skill relationships, loads the data into SQLite, and performs SQL analysis and exploratory data analysis.",
    finding: "Created an analysis-ready workflow covering data cleaning, relational modeling, SQL analysis, visualization, and interactive dashboard reporting.",
    outcome: "Interactive Streamlit dashboard and reproducible analytical pipeline available on GitHub.",
    publication: null,
    year: "2026",
  },
  {
    id: "projectAyush",
    codename: "Frontend App",
    title: "Project Ayush",
    subtitle: "Virtual Herbal Garden — SIH 2024",
    tags: ["HTML", "CSS", "JavaScript"],
    status: "HACKATHON PROJECT",
    hypothesis: "Standard UI patterns for botanical data often fall short in user retention. The goal was to build an interface that feels intuitive and visually cohesive.",
    method: "Collaborated with a team to develop a virtual herbal garden featuring 20+ categorized medicinal plants. Built the responsive frontend to handle user navigation, filtering, and categorization.",
    finding: "UX decisions and clean filtering logic are critical when dealing with large datasets. Investing time in a robust frontend architecture speeds up feature development.",
    outcome: "Top 3 Inter-College at SIH 2024. Working application with clean front-end architecture.",
    publication: null,
    year: "2024",
  },
  {
    id: "learningPathways",
    codename: "AI/ML Research",
    title: "Learning Pathways",
    subtitle: "Reinforcement Learning Recommendation System",
    tags: ["Python", "Reinforcement Learning", "Flask", "SQL"],
    status: "PUBLISHED",
    hypothesis: "Can a reinforcement learning model provide adaptive learning recommendations based on a structured reward mechanism?",
    method: "Developed a reinforcement learning model to analyze past student scores and track performance improvements automatically. Built a Flask API for real-time recommendations.",
    finding: "The applied RL models demonstrated strong predictive capabilities and adaptability, proving the viability of the approach in practical educational scenarios.",
    outcome: "Peer-reviewed and published.",
    publication: "IEEE INOACC 2025 (SCOPUS Indexed)",
    year: "2025",
  },
  {
    id: "autonomousNav",
    codename: "AI/ML Research",
    title: "Autonomous Navigation",
    subtitle: "CNN + LSTM Trajectory Prediction",
    tags: ["Python", "CNN", "LSTM", "TensorFlow", "Computer Vision"],
    status: "RESEARCH",
    hypothesis: "Explored novel methodologies for applying hybrid CNN and LSTM machine learning algorithms to complex trajectory datasets.",
    method: "Trained CNN and LSTM models for trajectory prediction and path planning using OpenCV and FER-2013/PIE datasets. Optimized the model pipeline to process environmental input data with lower latency.",
    finding: "Achieved a statistically significant improvement in model accuracy and processing speed over standard baseline implementations.",
    outcome: "Accepted for publication.",
    publication: "IEEE NKCon 2025 (In Press)",
    year: "2024–25",
  },
];

export const TIMELINE = [
  {
    category: "ORIGIN",
    title: "Unsupervised Internet Access",
    period: "The early years",
    description: "It started exactly how you'd expect: too much gaming and breaking the family computer. Eventually, I had to figure out how to fix it, which naturally led to writing my own code.",
    status: "past",
    events: [
      "Discovered how systems actually work under the hood.",
      "Transitioned from playing games to wondering how they were built.",
      "Wrote my first scripts and realized software engineering was the path forward."
    ],
  },
  {
    category: "EDUCATION",
    title: "SRMIST — Chennai",
    period: "2022 — 2026",
    description: "B.Tech in Computer Science and Engineering with specialization in Artificial Intelligence and Machine Learning.",
    status: "past",
    events: [
      "Deep dive into Data Structures, Algorithms, and System Architecture.",
      "Specialized coursework in Deep Learning (CNN, LSTM) and reinforcement learning.",
      "Graduated with a CGPA of 7.90/10."
    ],
  },
  {
    category: "EXPERIENCE",
    title: "Hackathons, Research & Internship",
    period: "2024 — 2026",
    description: "Applied theoretical knowledge to high-pressure environments, peer-reviewed academic research, and production codebases.",
    status: "past",
    events: [
      "Secured Top 3 Inter-College at SIH 2024 with Project Ayush.",
      "Co-authored two IEEE research papers focusing on trajectory prediction and personalized learning.",
      "Software Development Intern at Appexert: fixed production bugs, debugged REST APIs, and managed Jira/Git workflows."
    ],
  },
  {
    category: "CAREER",
    title: "Software Engineering",
    period: "2026 — Present",
    description: "Navigating full-time opportunities and transitioning into professional software development across South Indian tier-2 tech hubs.",
    status: "current",
    events: [
      "Secured a TCS Ninja role offer following successful technical rounds.",
      "Actively exploring opportunities that prioritize scalable architecture and user-centric problem solving.",
      "Continuing to build and refine personal projects."
    ],
  },
];

export const SKILLS = {
  languages: ["Python", "TypeScript", "JavaScript", "C", "C++", "SQL", "HTML", "CSS"],
  frameworks: ["React.js", "Node.js", "Flask", "TensorFlow", "OpenCV", "Pandas", "NumPy"],
  concepts: ["Deep Learning (CNN, LSTM)", "Reinforcement Learning", "REST APIs", "Git", "GitHub", "Jira"],
};

export const FUTURE_FRAGMENTS = [
  {
    id: "f1",
    type: "LEARNING",
    content: "Diving deeper into system architecture and how databases handle scale when the load isn't perfectly distributed.",
  },
  {
    id: "f2",
    type: "BUILDING",
    content: "Transitioning personal projects from 'it works' to 'it works efficiently.' Focusing on caching and load times.",
  },
  {
    id: "f3",
    type: "RESEARCH",
    content: "Looking at real-world applications for LLMs beyond chat interfaces—specifically agentic workflows and automated testing.",
  },
  {
    id: "f4",
    type: "LEARNING",
    content: "Exploring Rust as a secondary backend language for performance-critical services.",
  },
  {
    id: "f5",
    type: "BUILDING",
    content: "Refining UI/UX patterns. Realizing that a technically perfect backend is useless if the frontend is frustrating to use.",
  },
];

export const TERMINAL_COMMANDS: Record<string, string> = {
  help: `AVAILABLE COMMANDS
─────────────────────────────────────────
  whoami          Brief introduction
  resume          Formatted resume output  
  skills          Technical stack & Certifications
  projects        Project list
  contact         How to reach me
  clear           Clear terminal
─────────────────────────────────────────
Type any command and press Enter.`,

  whoami: `DARSIN DAVID J
──────────────────────────────────────
Role      Software Engineer (AI/ML)
Status    B.Tech Graduate — SRMIST
Based     Chennai, Tamil Nadu

I recently graduated and I'm currently focused on building resilient web applications, exploring intelligent systems, and finding full-time software engineering roles.`,

  resume: `DARSIN DAVID J
drcndvd@gmail.com | +91 9994777596

EDUCATION
─────────────────────────────────────
SRM Institute of Science and Technology
B.Tech, Computer Science (AI & ML)
Graduated 2026 | CGPA: 7.90/10

EXPERIENCE
─────────────────────────────────────
Software Development Intern — Appexert
Oct 2025 – Mar 2026
→ Ticket-based development, fixing bugs in a production codebase.
→ Debugged REST API issues involving incorrect responses and missing fields.
→ Resolved logic errors by tracing execution flow across backend/frontend.
→ Managed branches and pull requests via Git and Jira.

PUBLICATIONS
─────────────────────────────────────
[1] Quantum-Enhanced Emotion-Aware Pedestrian
    Trajectory Prediction — IEEE NKCon 2025
    (In Press)

[2] Personalized Learning Pathways via RL
    IEEE INOACC 2025 — SCOPUS Indexed`,

  skills: `TECHNICAL STACK & CERTIFICATIONS
─────────────────────────────────────
LANGUAGES
  Python, C, C++, JavaScript, TypeScript, SQL, HTML, CSS

FRAMEWORKS & LIBRARIES
  React.js, Node.js, Flask, TensorFlow, OpenCV, Pandas, NumPy

CONCEPTS & TOOLS
  Deep Learning (CNN, LSTM), Reinforcement Learning, REST APIs, Git, GitHub, Jira

CERTIFICATIONS
  → SQL Fundamentals
  → Introduction to Machine Learning
  → Data Structures in C
  → NLP & Text Mining`,

  projects: `PROJECT LOG
─────────────────────────────────────
[1] AccuLedger [GITHUB]
    Quantum-resilient blockchain audit system utilizing Merkle trees.

[2] Project Ayush [LIVE]
    Virtual herbal garden frontend. Top 3 Inter-College at SIH 2024.

[3] Learning Pathways [PUBLICATION]
    RL-based adaptive recommendations. IEEE INOACC 2025.

[4] Autonomous Navigation [RESEARCH]
    CNN + LSTM trajectory prediction. IEEE NKCon 2025.

→ Scroll to the PROJECTS section for full architecture details.`,

  contact: `CONTACT
─────────────────────────────────────
Email    drcndvd@gmail.com
GitHub   github.com/darsindavid
LinkedIn linkedin.com/in/darsindavid
Phone    +91 9994777596
Based    Chennai, Tamil Nadu`,
};