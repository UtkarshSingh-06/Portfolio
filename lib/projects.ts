// Project data structure and utilities

export interface Project {
  id: string
  slug: string
  title: string
  shortDescription: string
  fullDescription: string
  technologies: string[]
  timeline: string
  role: string
  team: string
  status: string
  statusColor: 'green' | 'yellow' | 'red'
  image: string
  github?: string
  demo?: string
  keyChallenges?: string[]
  keyLearnings?: string[]
  overview?: string
  keyFeatures?: string[]
  techStack?: string[]
  technicalImplementation?: string[]
  impact?: string[]
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'ai-powered-ecommerce',
    title: 'AI-Powered E-Commerce Platform',
    shortDescription: 'A full-stack e-commerce platform with AI-powered product recommendations and chatbot assistance. Built with modern web technologies for seamless user experience.',
    fullDescription: `AI-Powered E-Commerce Platform is a comprehensive full-stack solution that revolutionizes online shopping through intelligent AI integration. The platform combines cutting-edge machine learning algorithms with modern web technologies to deliver a personalized shopping experience.

The system features an advanced recommendation engine powered by TensorFlow that analyzes user behavior, purchase history, and product interactions to suggest relevant items. The AI chatbot, built with natural language processing, provides 24/7 customer support, handling inquiries, order tracking, and product recommendations.

Built with React and Next.js for the frontend, the platform offers a responsive and intuitive user interface. The backend, powered by Node.js, handles complex business logic and integrates seamlessly with MongoDB for efficient data storage and retrieval.

Key highlights include real-time inventory management, secure payment processing, and a scalable architecture that can handle high traffic volumes. The platform also includes an admin dashboard for managing products, orders, and analytics.`,
    technologies: ['React', 'Next.js', 'Node.js', 'TensorFlow', 'MongoDB', 'Express', 'Stripe'],
    timeline: '4 months',
    role: 'Full Stack Developer',
    team: 'Solo',
    status: 'All Systems Operational',
    statusColor: 'green',
    image: '/project-1.jpg',
    keyChallenges: [
      'Real-time recommendation system implementation',
      'Scalable architecture for high traffic',
      'AI model integration and optimization'
    ],
    keyLearnings: [
      'Advanced TensorFlow model deployment',
      'Microservices architecture patterns',
      'Real-time data processing with WebSockets'
    ],
    keyFeatures: [
      'AI-powered product recommendations',
      'Intelligent chatbot for customer support',
      'Real-time inventory management',
      'Secure payment processing',
      'Advanced analytics dashboard'
    ],
    techStack: [
      'React - Frontend framework',
      'Next.js - Server-side rendering',
      'Node.js - Backend runtime',
      'TensorFlow - Machine learning',
      'MongoDB - Database',
      'Express - API framework',
      'Stripe - Payment processing'
    ],
    technicalImplementation: [
      'Implemented collaborative filtering algorithm for recommendations',
      'Built RESTful API with Express.js',
      'Integrated TensorFlow.js for client-side ML inference',
      'Designed scalable database schema with MongoDB',
      'Implemented real-time updates using WebSockets'
    ],
    impact: [
      'Improved user engagement by 45% through personalized recommendations',
      'Reduced customer support load by 60% with AI chatbot',
      'Achieved 99.9% uptime with scalable architecture'
    ]
  },
  {
    id: '2',
    slug: 'cloud-analytics-dashboard',
    title: 'Cloud-Based Analytics Dashboard',
    shortDescription: 'Real-time analytics dashboard with data visualization, built on AWS with serverless architecture. Provides insights and monitoring capabilities.',
    fullDescription: `The Cloud-Based Analytics Dashboard is a powerful real-time data visualization platform built on AWS serverless architecture. It provides comprehensive insights and monitoring capabilities for businesses of all sizes.

The dashboard aggregates data from multiple sources, processes it in real-time, and presents it through interactive visualizations. Built with React for the frontend, it offers a responsive and intuitive interface that works seamlessly across all devices.

The backend leverages AWS Lambda for serverless computing, DynamoDB for fast data storage, and CloudWatch for monitoring. This architecture ensures high availability, automatic scaling, and cost-effectiveness.

Key features include customizable dashboards, real-time alerts, data export capabilities, and advanced filtering options. The platform supports multiple data sources and can handle millions of data points efficiently.`,
    technologies: ['React', 'AWS', 'TypeScript', 'Node.js', 'DynamoDB', 'Lambda', 'CloudWatch'],
    timeline: '3 months',
    role: 'Full Stack Developer',
    team: 'Solo',
    status: 'All Systems Operational',
    statusColor: 'green',
    image: '/project-2.jpg',
    keyChallenges: [
      'Real-time data processing at scale',
      'Serverless architecture optimization',
      'Complex data visualization performance'
    ],
    keyLearnings: [
      'AWS serverless architecture patterns',
      'Real-time data streaming with Kinesis',
      'Optimizing Lambda cold starts'
    ],
    keyFeatures: [
      'Real-time data visualization',
      'Customizable dashboards',
      'Multi-source data aggregation',
      'Automated alerts and notifications',
      'Data export capabilities'
    ],
    techStack: [
      'React - Frontend framework',
      'AWS Lambda - Serverless computing',
      'DynamoDB - NoSQL database',
      'CloudWatch - Monitoring',
      'TypeScript - Type safety',
      'AWS Kinesis - Data streaming'
    ],
    technicalImplementation: [
      'Implemented serverless API with AWS Lambda',
      'Built real-time data pipeline with Kinesis',
      'Created responsive visualizations with D3.js',
      'Optimized DynamoDB queries for performance',
      'Implemented caching layer with Redis'
    ],
    impact: [
      'Reduced infrastructure costs by 70% with serverless architecture',
      'Improved data processing speed by 5x',
      'Enabled real-time decision making for stakeholders'
    ]
  },
  {
    id: '3',
    slug: 'deep-learning-classifier',
    title: 'Deep Learning Image Classifier',
    shortDescription: 'CNN-based image classification system using PyTorch with RESTful API for predictions. Production-ready ML model with high accuracy.',
    fullDescription: `The Deep Learning Image Classifier is a production-ready machine learning system that uses convolutional neural networks (CNNs) to classify images with high accuracy. Built with PyTorch, the system provides a RESTful API for easy integration into any application.

The model was trained on a large dataset and fine-tuned for specific use cases. It supports multiple image categories and can be easily extended for new classification tasks. The system includes data preprocessing, model inference, and result post-processing pipelines.

The RESTful API, built with FastAPI, provides a simple interface for submitting images and receiving predictions. The entire system is containerized with Docker for easy deployment and scaling.

Key features include batch processing, confidence scores, and model versioning. The system is optimized for both accuracy and inference speed, making it suitable for production environments.`,
    technologies: ['Python', 'PyTorch', 'FastAPI', 'Docker', 'OpenCV', 'NumPy'],
    timeline: '2 months',
    role: 'ML Engineer & Full Stack Developer',
    team: 'Solo',
    status: 'All Systems Operational',
    statusColor: 'green',
    image: '/project-3.jpg',
    keyChallenges: [
      'Achieving high accuracy with limited training data',
      'Optimizing model inference speed',
      'Deploying ML model to production'
    ],
    keyLearnings: [
      'Advanced CNN architectures',
      'Model optimization techniques',
      'MLOps and model deployment',
      'Docker containerization for ML'
    ],
    keyFeatures: [
      'High-accuracy image classification',
      'RESTful API for easy integration',
      'Batch processing support',
      'Confidence score reporting',
      'Model versioning system'
    ],
    techStack: [
      'PyTorch - Deep learning framework',
      'FastAPI - API framework',
      'Docker - Containerization',
      'OpenCV - Image processing',
      'NumPy - Numerical computing',
      'Python - Programming language'
    ],
    technicalImplementation: [
      'Designed and trained CNN architecture',
      'Implemented data augmentation pipeline',
      'Built RESTful API with FastAPI',
      'Containerized application with Docker',
      'Optimized model for production deployment'
    ],
    impact: [
      'Achieved 95%+ classification accuracy',
      'Reduced inference time to under 100ms',
      'Enabled easy integration for multiple clients'
    ]
  },
  {
    id: '4',
    slug: 'realtime-chat-app',
    title: 'Real-Time Chat Application',
    shortDescription: 'Scalable real-time chat application with WebSocket support and message encryption. Supports multiple rooms and user authentication.',
    fullDescription: `The Real-Time Chat Application is a scalable messaging platform that enables instant communication between users. Built with Next.js and Socket.io, it provides real-time message delivery with end-to-end encryption.

The application supports multiple chat rooms, private messaging, file sharing, and user presence indicators. It includes a robust authentication system and user management features. The backend is built with Node.js and uses Redis for session management and message queuing.

PostgreSQL is used for persistent data storage, including user accounts, chat history, and room configurations. The system is designed to handle thousands of concurrent users with minimal latency.

Key features include message encryption, read receipts, typing indicators, and message search. The application also includes admin features for room moderation and user management.`,
    technologies: ['Next.js', 'Socket.io', 'Redis', 'PostgreSQL', 'TypeScript', 'JWT'],
    timeline: '3 months',
    role: 'Full Stack Developer',
    team: 'Solo',
    status: 'All Systems Operational',
    statusColor: 'green',
    image: '/project-4.jpg',
    keyChallenges: [
      'Real-time message delivery at scale',
      'Implementing end-to-end encryption',
      'Managing WebSocket connections efficiently'
    ],
    keyLearnings: [
      'WebSocket architecture patterns',
      'Real-time data synchronization',
      'Message encryption and security',
      'Scalable chat system design'
    ],
    keyFeatures: [
      'Real-time messaging with WebSockets',
      'End-to-end message encryption',
      'Multiple chat rooms support',
      'User presence indicators',
      'File sharing capabilities'
    ],
    techStack: [
      'Next.js - Full-stack framework',
      'Socket.io - WebSocket library',
      'Redis - Caching and sessions',
      'PostgreSQL - Database',
      'TypeScript - Type safety',
      'JWT - Authentication'
    ],
    technicalImplementation: [
      'Implemented WebSocket server with Socket.io',
      'Built real-time message broadcasting system',
      'Designed scalable database schema',
      'Implemented JWT-based authentication',
      'Created message encryption layer'
    ],
    impact: [
      'Supported 10,000+ concurrent users',
      'Achieved <100ms message delivery latency',
      'Maintained 99.9% uptime'
    ]
  },
  {
    id: '5',
    slug: 'microservices-platform',
    title: 'Microservices Architecture Platform',
    shortDescription: 'Containerized microservices platform with API gateway, service mesh, and CI/CD pipeline. Enterprise-grade infrastructure solution.',
    fullDescription: `The Microservices Architecture Platform is an enterprise-grade infrastructure solution that demonstrates modern cloud-native architecture patterns. The platform consists of multiple containerized microservices, each handling specific business functions.

The architecture includes an API gateway for routing requests, a service mesh for inter-service communication, and a comprehensive CI/CD pipeline for automated deployments. All services are containerized with Docker and orchestrated using Kubernetes.

The platform includes monitoring, logging, and tracing capabilities for observability. It supports horizontal scaling, load balancing, and automatic failover. The infrastructure is designed to be highly available and fault-tolerant.

Key components include user service, authentication service, data processing service, and notification service. Each service is independently deployable and scalable.`,
    technologies: ['Docker', 'Kubernetes', 'Node.js', 'Nginx', 'Prometheus', 'Grafana'],
    timeline: '5 months',
    role: 'DevOps Engineer & Full Stack Developer',
    team: 'Solo',
    status: 'All Systems Operational',
    statusColor: 'green',
    image: '/project-5.jpg',
    keyChallenges: [
      'Service discovery and communication',
      'Distributed system monitoring',
      'CI/CD pipeline automation',
      'Container orchestration at scale'
    ],
    keyLearnings: [
      'Kubernetes orchestration',
      'Service mesh architecture',
      'Microservices design patterns',
      'DevOps best practices',
      'Infrastructure as Code'
    ],
    keyFeatures: [
      'Containerized microservices',
      'API gateway for routing',
      'Service mesh for communication',
      'Automated CI/CD pipeline',
      'Comprehensive monitoring'
    ],
    techStack: [
      'Docker - Containerization',
      'Kubernetes - Orchestration',
      'Node.js - Runtime',
      'Nginx - Reverse proxy',
      'Prometheus - Monitoring',
      'Grafana - Visualization'
    ],
    technicalImplementation: [
      'Designed microservices architecture',
      'Implemented Kubernetes deployments',
      'Built API gateway with Nginx',
      'Set up CI/CD with GitHub Actions',
      'Configured monitoring and logging'
    ],
    impact: [
      'Reduced deployment time by 80%',
      'Improved system reliability to 99.95%',
      'Enabled independent service scaling'
    ]
  },
]

// Utility functions
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug)
}

export function getAllProjectSlugs(): string[] {
  return projects.map(project => project.slug)
}

export function getAllProjects(): Project[] {
  return projects
}
