export type NavItem = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  year?: string;
};

export type Skill = {
  name: string;
  level: number;
  icon: string;
  category: "frontend" | "backend" | "tools";
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  details: string[];
};

export type Certification = {
  title: string;
  issuer: string;
};

export type EducationEntry = {
  degree: string;
  school: string;
  location: string;
  period: string;
  coursework: string;
  honors?: string;
};

export const siteConfig = {
  name: "Utkarsh Singh",
  firstName: "Utkarsh",
  title: "Full-Stack Developer & AI Enthusiast",
  shortRole: "Full-Stack Developer",
  email: "utkarsh.yash@gmail.com",
  phone: "+91 98713 35300",
  location: "Jaipur, India",
  description:
    "B.Tech Information Technology student at Manipal University Jaipur. I build production-grade full-stack products, contribute to open source, and design AI-powered systems that scale.",
  ctaPrimary: "View Projects",
  ctaSecondary: "Contact Me",
  resumeUrl: "/UTKARSHRESUME.pdf",
  socialLinks: {
    github: "https://github.com/UtkarshSingh-06",
    linkedin: "https://linkedin.com/in/utkarsh-singh06",
    leetcode: "https://leetcode.com/u/Utkarsh-Singh06/",
    email: "mailto:utkarsh.yash@gmail.com",
  },
  // Gmail compose URL — opens Gmail directly with your address pre-filled in the "To" field.
  gmailCompose:
    "https://mail.google.com/mail/?view=cm&fs=1&to=utkarsh.yash@gmail.com&su=Let%27s%20work%20together",
  navItems: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ] satisfies NavItem[],
};

export const typedRoles = [
  "Full-Stack Developer",
  "AI Enthusiast",
  "Open Source Contributor",
  "Problem Solver",
];

export const aboutHighlights = [
  "Led development of CampusAdda, a production app with 10K+ daily active users",
  "Open-source contributor at GirlScript Summer of Code (GSSoC '25)",
  "AWS Certified Solutions Architect – Associate (SAA-C03)",
  "B.Tech IT at Manipal University Jaipur — multiple excellence awards",
];

export const aboutStats = [
  { label: "Daily Active Users", value: "10K+" },
  { label: "Students Coordinated", value: "500+" },
  { label: "Major Projects", value: "10+" },
  { label: "Certifications", value: "5+" },
];

export const projects: Project[] = [
  {
    title: "AI-Powered Payment Fraud Detection System",
    description:
      "Real-time fraud detection processing 10K+ transactions/day with 92%+ accuracy. Low-latency FastAPI services (<120 ms) integrated with a React monitoring dashboard, deployed on AWS with 99.9% uptime.",
    tags: ["Python", "FastAPI", "React", "TensorFlow", "AWS", "Docker"],
    image: "/projects/project1.svg",
    githubUrl: "https://github.com/UtkarshSingh-06",
    liveUrl: "https://github.com/UtkarshSingh-06",
    year: "2025",
  },
  {
    title: "Enterprise AI Continuous Quality Control (CQC) Framework",
    description:
      "AI-driven QA framework that reduced manual effort by 60% via automated anomaly detection. Containerized microservices orchestrated on Kubernetes, IaC with Terraform/Ansible, CI/CD on GitHub Actions cutting release time by 40%.",
    tags: ["Python", "Docker", "Kubernetes", "CI/CD", "AWS", "Terraform", "Ansible"],
    image: "/projects/project2.svg",
    githubUrl: "https://github.com/UtkarshSingh-06",
    liveUrl: "https://github.com/UtkarshSingh-06",
    year: "2025",
  },
  {
    title: "Real Estate Booking System",
    description:
      "Full-stack MERN booking platform supporting 1K+ users with secure auth and dynamic search. Optimized REST APIs reduced response time by 30%. Responsive UI in React + Tailwind, deployed on AWS with Docker.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind", "AWS"],
    image: "/projects/project3.svg",
    githubUrl: "https://github.com/UtkarshSingh-06",
    liveUrl: "https://github.com/UtkarshSingh-06",
    year: "2024",
  },
  {
    title: "NetScope — Network Monitoring & Analysis Tool",
    description:
      "Linux-based network monitor analyzing 5K+ packets/sec with packet inspection, structured logging, and alerting. Reduced troubleshooting time by 35% with rich metric visualizations and observability pipelines.",
    tags: ["Python", "Linux", "Networking", "Observability"],
    image: "/projects/project4.svg",
    githubUrl: "https://github.com/UtkarshSingh-06",
    liveUrl: "https://github.com/UtkarshSingh-06",
    year: "2024",
  },
];

export const projectFilters = ["All", "React", "Python", "AWS", "Docker"] as const;

export const skills: Skill[] = [
  { name: "React.js", level: 92, icon: "FaReact", category: "frontend" },
  { name: "Next.js", level: 90, icon: "SiNextdotjs", category: "frontend" },
  { name: "TypeScript", level: 88, icon: "SiTypescript", category: "frontend" },
  { name: "JavaScript (ES6+)", level: 93, icon: "SiJavascript", category: "frontend" },
  { name: "Tailwind CSS", level: 92, icon: "SiTailwindcss", category: "frontend" },

  { name: "Node.js", level: 88, icon: "FaNodeJs", category: "backend" },
  { name: "Express.js", level: 85, icon: "SiExpress", category: "backend" },
  { name: "Python", level: 90, icon: "FaPython", category: "backend" },
  { name: "FastAPI", level: 82, icon: "SiFastapi", category: "backend" },
  { name: "MongoDB", level: 85, icon: "SiMongodb", category: "backend" },
  { name: "MySQL", level: 80, icon: "SiMysql", category: "backend" },

  { name: "AWS", level: 86, icon: "FaAws", category: "tools" },
  { name: "Docker", level: 88, icon: "FaDocker", category: "tools" },
  { name: "Kubernetes", level: 78, icon: "SiKubernetes", category: "tools" },
  { name: "Git & GitHub", level: 93, icon: "FaGitAlt", category: "tools" },
  { name: "Linux", level: 85, icon: "FaLinux", category: "tools" },
  { name: "Terraform", level: 75, icon: "SiTerraform", category: "tools" },
];

export const experiences: Experience[] = [
  {
    role: "Student Placement Coordinator",
    company: "Directorate of Corporate Relations & Placements, Manipal University Jaipur",
    period: "Mar 2025 – Present",
    details: [
      "Coordinate placement operations involving 500+ students and recruiters, ensuring smooth execution of large-scale recruitment drives.",
      "Streamlined communication and scheduling workflows, improving operational efficiency and candidate experience.",
    ],
  },
  {
    role: "Open Source Contributor",
    company: "GirlScript Summer of Code (GSSoC '25)",
    period: "Aug 2025 – Nov 2025",
    details: [
      "Contributed to production-grade open-source projects by implementing features, fixing bugs, and improving documentation.",
      "Collaborated via Git/GitHub workflows and code reviews, ensuring clean, maintainable, and scalable code across distributed teams.",
    ],
  },
  {
    role: "Head of Development",
    company: "CampusAdda, Manipal University Jaipur",
    period: "Sep 2024 – May 2025",
    details: [
      "Led development of a production campus application available on Play Store and App Store, serving 10K+ daily active users.",
      "Standardized development workflows and deployment practices, reducing release cycles by 30% and improving team productivity.",
      "Delivered feature enhancements based on user needs, improving platform usability and adoption.",
    ],
  },
];

export const certifications: Certification[] = [
  {
    title: "AWS Certified Solutions Architect – Associate (SAA-C03)",
    issuer: "Amazon Web Services",
  },
  { title: "Data Structures and Algorithms", issuer: "NPTEL" },
  { title: "Design and Analysis of Algorithms", issuer: "NPTEL" },
  { title: "Database Programming with SQL", issuer: "Oracle Academy" },
  {
    title: "Red Hat System Administration I & II (RH124, RH134) — RHEL 9.3",
    issuer: "Red Hat",
  },
];

export const education: EducationEntry = {
  degree: "B.Tech, Information Technology",
  school: "Manipal University Jaipur",
  location: "Jaipur, India",
  period: "Aug 2023 – May 2027",
  coursework:
    "Data Structures, Algorithms, Database Management Systems, Software Engineering, Computer Networks",
  honors: "Recipient of Multiple Student Excellence Awards by the Department",
};
