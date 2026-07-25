export type NavItem = {
  label: string;
  href: string;
};

export type Project = {
  /** URL slug for `/projects/[slug]` — stable, lowercase, hyphenated */
  slug: string;
  title: string;
  description: string;
  /** Optional shorter SEO title (falls back to title) */
  seoTitle?: string;
  /** Optional meta description (falls back to description) */
  seoDescription?: string;
  /** Accessible alt text for project imagery */
  imageAlt: string;
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
  /** External verification URL (opens in a new tab) */
  credentialUrl?: string;
  /** Quiet academy / learning strip — not shown in the main constellation */
  academy?: boolean;
};

export type EducationEntry = {
  degree: string;
  school: string;
  location: string;
  period: string;
  coursework: string;
  honors?: string;
};

export type AboutHighlightIcon =
  | "award"
  | "sparkles"
  | "cpu"
  | "cloud"
  | "activity"
  | "building"
  | "smartphone";

export type AboutHighlight = {
  id: string;
  title: string;
  subtitle?: string;
  href?: string;
  icon: AboutHighlightIcon;
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
  resumeUrl: "/Resume_.pdf",
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
    { label: "Activity", href: "#activity" },
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

export const aboutHighlights: AboutHighlight[] = [
  {
    id: "aws-saa",
    icon: "award",
    title: "AWS Certified Solutions Architect – Associate (SAA-C03)",
    subtitle: "Amazon Web Services",
  },
  {
    id: "gssoc",
    icon: "sparkles",
    title: "Open-source contributor — GirlScript Summer of Code (GSSoC '25)",
    subtitle: "Production-grade contributions, reviews, and documentation",
  },
  {
    id: "fraudshield",
    icon: "cpu",
    title: "FraudShield AI — UPI fraud detection platform",
    subtitle: "Full-stack risk scoring, WebSocket live monitoring, React analytics dashboard",
    href: "/projects/fraudshield-ai",
  },
  {
    id: "cqc",
    icon: "cloud",
    title: "Enterprise AI CQC automation framework",
    subtitle: "Drift detection, quality gates, CI/CD, Prometheus/Grafana, Terraform on AWS",
    href: "/projects/enterprise-ai-cqc-framework",
  },
  {
    id: "netscope",
    icon: "activity",
    title: "NetScope — eBPF network observability",
    subtitle: "Kernel-level metrics, Go agents, FastAPI + Next.js control plane, K8s-ready",
    href: "/projects/netscope",
  },
  {
    id: "realestate",
    icon: "building",
    title: "Real Estate Booking System",
    subtitle: "FastAPI + MongoDB, React, Stripe, Socket.IO live chat, Google OAuth & Maps",
    href: "/projects/real-estate-booking-system",
  },
  {
    id: "hackforge",
    icon: "smartphone",
    title: "SubTracker Pro India (Hackforge)",
    subtitle: "Flutter + Firebase subscription tracker for Indian users — INR billing, Razorpay, FCM reminders",
    href: "/projects/subtracker-pro-india",
  },
];

export const projects: Project[] = [
  {
    slug: "fraudshield-ai",
    title: "FraudShield AI — UPI Fraud Detection Platform",
    seoTitle: "FraudShield AI — UPI Fraud Detection Platform",
    seoDescription:
      "AI-powered UPI fraud detection with real-time risk scoring, WebSocket alerts, JWT auth, and a React analytics dashboard. Built by Utkarsh Singh.",
    imageAlt: "FraudShield AI UPI fraud detection platform dashboard preview",
    description:
      "Full-stack fraud prevention for UPI apps: AI risk scoring per transaction, real-time WebSocket alerts, JWT auth, and a React analytics dashboard (Vite + Recharts).",
    tags: ["Node.js", "Express", "React", "WebSocket", "JWT", "Vite"],
    image: "/projects/project1.svg",
    githubUrl: "https://github.com/UtkarshSingh-06/AI-Powered-Payment-Fraud-Detection-System",
    liveUrl: "https://github.com/UtkarshSingh-06/AI-Powered-Payment-Fraud-Detection-System",
    year: "2025",
  },
  {
    slug: "enterprise-ai-cqc-framework",
    title: "Enterprise AI Continuous Quality Control (CQC) Framework",
    seoTitle: "Enterprise AI CQC Automation Framework",
    seoDescription:
      "ML reliability platform with drift detection, quality gates, Prometheus/Grafana, and Terraform on AWS. Enterprise AI Continuous Quality Control by Utkarsh Singh.",
    imageAlt: "Enterprise AI Continuous Quality Control framework architecture preview",
    description:
      "ML reliability platform: drift detection (PSI/KL), quality gates blocking bad deploys, experiment tracking, synthetic edge-case data, Prometheus metrics, and Terraform-backed AWS deployment.",
    tags: ["Python", "FastAPI", "Docker", "Kubernetes", "Prometheus", "Terraform", "MLflow"],
    image: "/projects/project2.svg",
    githubUrl: "https://github.com/UtkarshSingh-06/Enterprise-AI-Continuous-Quality-Control-CQC-Automation-Framework",
    liveUrl: "https://github.com/UtkarshSingh-06/Enterprise-AI-Continuous-Quality-Control-CQC-Automation-Framework",
    year: "2025",
  },
  {
    slug: "netscope",
    title: "NetScope — Network Observability & Security",
    seoTitle: "NetScope — eBPF Network Observability & Security",
    seoDescription:
      "eBPF + Go network observability with FastAPI/Next.js control plane, anomaly detection, and Kubernetes-ready deployment. Built by Utkarsh Singh.",
    imageAlt: "NetScope network observability and security platform preview",
    description:
      "eBPF + Go observability agents with a FastAPI/Next.js control plane: live traffic metrics, anomaly detection, threat intel enrichment, IDS rules, and Docker/Kubernetes deployment patterns.",
    tags: ["eBPF", "Go", "FastAPI", "Next.js", "Prometheus", "Kubernetes"],
    image: "/projects/project4.svg",
    githubUrl: "https://github.com/UtkarshSingh-06/NetScope",
    liveUrl: "https://github.com/UtkarshSingh-06/NetScope",
    year: "2025",
  },
  {
    slug: "real-estate-booking-system",
    title: "Real Estate Booking System",
    seoTitle: "Real Estate Booking System — FastAPI & React",
    seoDescription:
      "End-to-end property booking with FastAPI, MongoDB, React, Stripe, Socket.IO chat, and Google OAuth. Full-stack real estate platform by Utkarsh Singh.",
    imageAlt: "Real estate booking system property discovery UI preview",
    description:
      "End-to-end property discovery and bookings: FastAPI backend, MongoDB, React + Tailwind/shadcn UI, JWT + Google OAuth, Stripe deposits, and Socket.IO messaging between buyers and owners.",
    tags: ["FastAPI", "MongoDB", "React", "Socket.IO", "Stripe", "Google OAuth"],
    image: "/projects/project3.svg",
    githubUrl: "https://github.com/UtkarshSingh-06/Real-Estate-Booking-System",
    liveUrl: "https://github.com/UtkarshSingh-06/Real-Estate-Booking-System",
    year: "2024",
  },
  {
    slug: "subtracker-pro-india",
    title: "SubTracker Pro India (Hackforge)",
    seoTitle: "SubTracker Pro India — Flutter Subscription Tracker",
    seoDescription:
      "Flutter + Firebase subscription tracker for Indian users with INR billing, Razorpay, and FCM reminders. Hackforge project by Utkarsh Singh.",
    imageAlt: "SubTracker Pro India Flutter subscription tracker app preview",
    description:
      "Cross-platform Flutter app for Indian subscription hygiene: Firebase auth & Firestore, renewal reminders (FCM), INR-aware billing cycles, Razorpay, charts, and localization — built for real-world daily use.",
    tags: ["Flutter", "Firebase", "Razorpay", "Riverpod", "Firestore", "FCM"],
    image: "/projects/project1.svg",
    githubUrl: "https://github.com/UtkarshSingh-06/hackforge",
    liveUrl: "https://github.com/UtkarshSingh-06/hackforge",
    year: "2026",
  },
];

export const projectFilters = ["All", "React", "Python", "Flutter", "AWS", "Docker"] as const;

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
    role: "SDE Intern",
    company: "Samsung Electro-Mechanics Bangalore (SEM-B)",
    period: "Jun 2026 – Present",
    details: [
      "Building and shipping software as an SDE Intern on production engineering teams at SEM-B.",
      "Collaborating with engineers on design, implementation, and delivery of scalable systems.",
    ],
  },
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
    credentialUrl:
      "https://www.credly.com/badges/e600bac2-926e-4173-9f83-7e51415118ef/public_url",
  },
  { title: "Data Structures and Algorithms", issuer: "NPTEL" },
  { title: "Design and Analysis of Algorithms", issuer: "NPTEL" },
  { title: "Database Programming with SQL", issuer: "Oracle Academy" },
  {
    title: "Red Hat System Administration I & II (RH124, RH134) — RHEL 9.3",
    issuer: "Red Hat",
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    academy: true,
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
