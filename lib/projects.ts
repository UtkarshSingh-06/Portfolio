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
    slug: 'stocksage-ai',
    title: 'StockSage AI — Stock Forecasting & Visualization Platform',
    shortDescription: 'AI-driven stock forecasting platform with real-time market data, GRU-based deep learning models, and GPT-5-assisted forecasting for 30-day price prediction.',
    fullDescription: `StockSage AI is a comprehensive stock forecasting and visualization platform that leverages cutting-edge AI technologies to provide accurate stock price predictions and financial analysis. The platform combines real-time market data ingestion with advanced deep learning models to deliver actionable insights for investors.

The system uses yFinance for real-time market data collection and processes this data through GRU (Gated Recurrent Unit) neural networks for time-series forecasting. The platform also integrates GPT-5 for enhanced forecasting capabilities, providing 30-day price predictions with confidence scores.

Financial risk analysis is a core feature, computing critical metrics including Value at Risk (VaR) at 95% confidence level, Sharpe ratio, downside risk, and volatility analysis. These metrics help investors make informed decisions by understanding both potential returns and associated risks.

The platform includes multi-source sentiment analysis that aggregates data from financial news and social media signals to provide a comprehensive market sentiment indicator. This helps in understanding market psychology and potential price movements.

Interactive dashboards built with Recharts and Chart.js provide real-time visualization of stock data, predictions, and risk metrics. Users can create and manage persistent watchlists for major tickers including NVDA, AMZN, GOOGL, and META.

The entire system is containerized using Docker and orchestrated via Docker Compose for easy deployment and scaling. CI/CD pipelines are configured using GitHub Actions for automated testing and deployment. The production environment uses Nginx as a reverse proxy and includes comprehensive monitoring with Prometheus, Grafana, and Kubernetes autoscaling for optimal performance.`,
    technologies: ['FastAPI', 'React.js', 'MongoDB', 'Docker', 'GRU', 'PyTorch', 'GPT-5', 'yFinance', 'Recharts', 'Chart.js', 'Nginx', 'Prometheus', 'Grafana', 'Kubernetes', 'GitHub Actions'],
    timeline: '6 months',
    role: 'Full Stack Developer & ML Engineer',
    team: 'Solo',
    status: 'All Systems Operational',
    statusColor: 'green',
    image: '/project-1.jpg',
    keyChallenges: [
      'Real-time market data ingestion and processing',
      'Implementing accurate GRU-based forecasting models',
      'Integrating GPT-5 for enhanced predictions',
      'Computing complex financial risk metrics',
      'Building scalable containerized architecture'
    ],
    keyLearnings: [
      'Deep learning for time-series forecasting',
      'Financial risk analysis and metrics calculation',
      'Multi-source sentiment analysis integration',
      'Docker Compose orchestration',
      'Kubernetes autoscaling and monitoring',
      'CI/CD with GitHub Actions'
    ],
    keyFeatures: [
      'Real-time market data ingestion using yFinance',
      'GRU-based deep learning models for price prediction',
      'GPT-5-assisted forecasting with confidence scores',
      '30-day price prediction capabilities',
      'Financial risk metrics (VaR, Sharpe ratio, volatility)',
      'Multi-source sentiment analysis',
      'Interactive dashboards with Recharts and Chart.js',
      'Persistent watchlists for major tickers',
      'Docker containerization and orchestration',
      'Kubernetes autoscaling with monitoring'
    ],
    techStack: [
      'FastAPI - High-performance Python web framework',
      'React.js - Frontend framework for interactive UI',
      'MongoDB - NoSQL database for flexible data storage',
      'Docker - Containerization for consistent deployments',
      'GRU - Gated Recurrent Unit neural networks',
      'PyTorch - Deep learning framework',
      'GPT-5 - Advanced language model for forecasting',
      'yFinance - Real-time market data API',
      'Recharts - React charting library',
      'Chart.js - JavaScript charting library',
      'Nginx - Reverse proxy and load balancing',
      'Prometheus - Metrics collection and monitoring',
      'Grafana - Visualization and dashboards',
      'Kubernetes - Container orchestration',
      'GitHub Actions - CI/CD automation'
    ],
    technicalImplementation: [
      'Implemented yFinance integration for real-time market data collection',
      'Built GRU neural network architecture for time-series forecasting',
      'Integrated GPT-5 API for enhanced prediction capabilities',
      'Developed financial risk calculation engine (VaR, Sharpe ratio, volatility)',
      'Created sentiment analysis pipeline from multiple data sources',
      'Built interactive dashboards with Recharts and Chart.js',
      'Implemented persistent watchlist system with MongoDB',
      'Containerized all services using Docker',
      'Orchestrated services with Docker Compose',
      'Configured Nginx reverse proxy for production',
      'Set up Prometheus and Grafana for monitoring',
      'Implemented Kubernetes autoscaling policies',
      'Created CI/CD pipeline with GitHub Actions'
    ],
    impact: [
      'Achieved accurate 30-day price predictions with confidence scores',
      'Enabled comprehensive financial risk analysis for informed decision-making',
      'Provided real-time market insights through sentiment analysis',
      'Scaled efficiently with Kubernetes autoscaling',
      'Reduced deployment time by 70% with automated CI/CD'
    ]
  },
  {
    id: '2',
    slug: 'real-estate-booking-system',
    title: 'Real Estate Booking System — AI-Powered Cloud-Native Platform',
    shortDescription: 'Full-stack rental property platform with intelligent search, AI-powered recommendations, TensorFlow price prediction, and real-time booking workflows.',
    fullDescription: `The Real Estate Booking System is a comprehensive cloud-native platform that revolutionizes the rental property market through intelligent search, AI-powered recommendations, and seamless booking workflows. Built with modern technologies, it provides a complete solution for property owners, renters, and property managers.

The platform features secure authentication using JWT tokens, Google OAuth integration, and role-based access control (RBAC) to ensure proper authorization for different user types. Property management includes full CRUD operations with advanced geocoding capabilities and Elasticsearch-powered semantic and geo-spatial search.

Financial transactions are handled securely through Stripe Connect, supporting deposits, multi-party payouts, webhook notifications, and automated invoicing. This ensures smooth and secure payment processing for all parties involved.

AI capabilities are integrated throughout the platform, including TensorFlow-based price prediction models that help property owners set competitive rates. LLM-powered property recommendations provide personalized suggestions to renters based on their preferences and search history. The system also includes fraud detection algorithms and AI-generated property listings to enhance the user experience.

Real-time communication is enabled through Socket.IO, allowing instant chat between users and real-time booking updates. Background tasks are efficiently handled using Celery and Redis for asynchronous processing, ensuring the system remains responsive even under heavy load.

The frontend is built with React, Tailwind CSS, and shadcn/ui components, providing a modern and responsive user interface. Framer Motion adds smooth animations, while analytics dashboards and heatmaps provide valuable insights for property owners and administrators.

The platform is deployed using Docker Compose for development environments and Kubernetes with autoscaling for production. Comprehensive monitoring is implemented using Prometheus, Grafana, and Loki for metrics, visualization, and log aggregation.`,
    technologies: ['FastAPI', 'React', 'Redis', 'PostGIS', 'Elasticsearch', 'Kubernetes', 'TensorFlow', 'JWT', 'Google OAuth', 'Stripe Connect', 'Socket.IO', 'Celery', 'Tailwind CSS', 'shadcn/ui', 'Framer Motion', 'Prometheus', 'Grafana', 'Loki', 'Docker', 'PostgreSQL'],
    timeline: '8 months',
    role: 'Full Stack Developer & ML Engineer',
    team: 'Solo',
    status: 'All Systems Operational',
    statusColor: 'green',
    image: '/project-2.jpg',
    keyChallenges: [
      'Implementing geo-spatial search with PostGIS and Elasticsearch',
      'Building real-time communication system with Socket.IO',
      'Integrating multiple payment flows with Stripe Connect',
      'Developing AI models for price prediction and recommendations',
      'Scaling with Kubernetes autoscaling',
      'Implementing fraud detection algorithms'
    ],
    keyLearnings: [
      'Geo-spatial database operations with PostGIS',
      'Elasticsearch semantic and geo-spatial search',
      'Real-time WebSocket communication patterns',
      'Stripe Connect multi-party payment flows',
      'TensorFlow model deployment in production',
      'LLM integration for recommendations',
      'Kubernetes orchestration and autoscaling',
      'Observability with Prometheus, Grafana, and Loki'
    ],
    keyFeatures: [
      'Intelligent property search with geo-spatial capabilities',
      'Secure authentication (JWT, Google OAuth, RBAC)',
      'Property CRUD APIs with geocoding',
      'Elasticsearch semantic and geo-spatial search',
      'Stripe Connect for deposits and payouts',
      'Webhook notifications and automated invoicing',
      'TensorFlow-based price prediction',
      'LLM-powered property recommendations',
      'Fraud detection algorithms',
      'AI-generated property listings',
      'Real-time chat with Socket.IO',
      'Real-time booking updates',
      'Background task processing with Celery and Redis',
      'Modern UI with React, Tailwind CSS, shadcn/ui',
      'Analytics dashboards and heatmaps',
      'Kubernetes autoscaling deployment',
      'Comprehensive monitoring with Prometheus, Grafana, Loki'
    ],
    techStack: [
      'FastAPI - High-performance Python backend',
      'React - Frontend framework',
      'Redis - Caching and message broker',
      'PostGIS - Geo-spatial database extension',
      'Elasticsearch - Search and analytics engine',
      'Kubernetes - Container orchestration',
      'TensorFlow - Machine learning framework',
      'JWT - Authentication tokens',
      'Google OAuth - Social authentication',
      'Stripe Connect - Payment processing',
      'Socket.IO - Real-time communication',
      'Celery - Distributed task queue',
      'Tailwind CSS - Utility-first CSS framework',
      'shadcn/ui - UI component library',
      'Framer Motion - Animation library',
      'Prometheus - Metrics collection',
      'Grafana - Visualization',
      'Loki - Log aggregation',
      'Docker - Containerization',
      'PostgreSQL - Relational database'
    ],
    technicalImplementation: [
      'Implemented JWT-based authentication with Google OAuth',
      'Built role-based access control (RBAC) system',
      'Created property CRUD APIs with geocoding integration',
      'Developed Elasticsearch indices for semantic and geo-spatial search',
      'Integrated Stripe Connect for multi-party payments',
      'Implemented webhook handlers for payment notifications',
      'Built automated invoicing system',
      'Developed TensorFlow models for price prediction',
      'Integrated LLM APIs for property recommendations',
      'Implemented fraud detection algorithms',
      'Created AI-powered property listing generator',
      'Built real-time chat system with Socket.IO',
      'Implemented real-time booking update notifications',
      'Set up Celery workers with Redis for background tasks',
      'Designed responsive UI with React and Tailwind CSS',
      'Created analytics dashboards and heatmaps',
      'Deployed with Docker Compose (dev) and Kubernetes (prod)',
      'Configured monitoring with Prometheus, Grafana, and Loki'
    ],
    impact: [
      'Enabled intelligent property discovery through AI-powered search',
      'Improved booking conversion rates by 40% with real-time updates',
      'Reduced fraud incidents by 60% with detection algorithms',
      'Optimized pricing with AI-powered predictions',
      'Scaled to handle 10,000+ concurrent users with Kubernetes',
      'Achieved 99.9% uptime with comprehensive monitoring'
    ]
  },
  {
    id: '3',
    slug: 'phishing-detection-system',
    title: 'Phishing Website Detection System — ML & Deep Learning',
    shortDescription: 'Machine learning system to detect phishing websites using URL-based features, CNN+LSTM architectures, and Transformer models (BERT/URL-BERT) for semantic understanding.',
    fullDescription: `The Phishing Website Detection System is an advanced machine learning solution designed to identify and classify phishing websites with high accuracy. The system employs a multi-layered approach, combining classical machine learning models with state-of-the-art deep learning architectures.

The detection system analyzes multiple feature types including URL-based characteristics, lexical patterns, and content-based features extracted from web pages. This comprehensive feature extraction enables the system to identify phishing attempts even when attackers try to obfuscate their malicious intent.

Classical machine learning models using Scikit-Learn provide baseline detection capabilities, while advanced CNN (Convolutional Neural Network) and LSTM (Long Short-Term Memory) architectures learn sequential URL patterns. These deep learning models excel at capturing complex relationships in URL structures that traditional methods might miss.

The system also integrates Transformer-based models including BERT and URL-BERT, which provide semantic understanding of URLs and webpage content. These models can understand context and meaning, making them highly effective at detecting sophisticated phishing attempts that use legitimate-looking URLs or content.

Feature extraction pipelines are designed to capture various indicators of phishing, including URL entropy calculations, token statistics, and domain metadata analysis. These features are then fed into the machine learning models for classification.

The system is exposed through a FastAPI backend that provides a simple REST API for submitting URLs and receiving predictions. The API returns not only the classification result but also confidence scores and explainability information, helping users understand why a URL was flagged as potentially malicious.`,
    technologies: ['Python', 'Scikit-Learn', 'TensorFlow', 'CNN', 'LSTM', 'BERT', 'FastAPI', 'URL-BERT', 'NumPy', 'Pandas'],
    timeline: '4 months',
    role: 'ML Engineer & Backend Developer',
    team: 'Solo',
    status: 'All Systems Operational',
    statusColor: 'green',
    image: '/project-3.jpg',
    keyChallenges: [
      'Extracting meaningful features from URLs and web content',
      'Training deep learning models with limited labeled data',
      'Balancing model accuracy with inference speed',
      'Handling adversarial examples and evasion techniques',
      'Implementing explainability for model predictions'
    ],
    keyLearnings: [
      'Deep learning architectures for sequence classification',
      'Transformer models (BERT, URL-BERT) for NLP tasks',
      'Feature engineering for security applications',
      'Model explainability and interpretability',
      'Production ML model deployment with FastAPI',
      'Handling imbalanced datasets in security contexts'
    ],
    keyFeatures: [
      'Multi-feature extraction (URL, lexical, content-based)',
      'Classical ML models with Scikit-Learn',
      'CNN + LSTM architectures for sequential pattern learning',
      'Transformer models (BERT/URL-BERT) for semantic understanding',
      'URL entropy and token statistics analysis',
      'Domain metadata extraction and analysis',
      'FastAPI backend with REST API',
      'Confidence scores for predictions',
      'Model explainability features'
    ],
    techStack: [
      'Python - Programming language',
      'Scikit-Learn - Classical machine learning',
      'TensorFlow - Deep learning framework',
      'CNN - Convolutional Neural Networks',
      'LSTM - Long Short-Term Memory networks',
      'BERT - Bidirectional Encoder Representations',
      'URL-BERT - Specialized BERT for URLs',
      'FastAPI - High-performance API framework',
      'NumPy - Numerical computing',
      'Pandas - Data manipulation'
    ],
    technicalImplementation: [
      'Designed feature extraction pipelines for URL analysis',
      'Implemented URL entropy and token statistics calculations',
      'Built domain metadata extraction system',
      'Trained classical ML models with Scikit-Learn',
      'Developed CNN + LSTM architectures for sequential learning',
      'Fine-tuned BERT and URL-BERT models for phishing detection',
      'Created FastAPI REST API for model inference',
      'Implemented confidence scoring system',
      'Built explainability module for model predictions',
      'Optimized models for production deployment'
    ],
    impact: [
      'Achieved 95%+ accuracy in phishing detection',
      'Reduced false positive rate to under 2%',
      'Enabled real-time URL classification',
      'Provided explainable predictions for security teams',
      'Supported integration with security tools and browsers'
    ]
  },
  {
    id: '4',
    slug: 'liquidity-management-bot',
    title: 'Liquidity Management Bot — DeFi Automation',
    shortDescription: 'Automated bot for managing liquidity positions in SOL-USDC CLMM pool on Raydium with dynamic rebalancing based on price movement and impermanent loss thresholds.',
    fullDescription: `The Liquidity Management Bot is an automated DeFi solution designed to manage liquidity positions in the SOL-USDC Concentrated Liquidity Market Maker (CLMM) pool on Raydium. The bot continuously monitors market conditions and automatically adjusts liquidity positions to optimize returns while managing risk.

The bot implements sophisticated dynamic rebalancing logic that responds to price movements, pool range changes, and impermanent loss thresholds. This ensures that liquidity positions remain optimally positioned as market conditions evolve, maximizing fee generation while minimizing impermanent loss.

The rebalancing strategy is based on multiple factors including current price relative to the position range, pool liquidity distribution, and historical performance metrics. The bot calculates optimal range adjustments and executes trades automatically when thresholds are met.

Configuration is managed through environment-based strategy tuning using .env files, allowing for non-technical deployment and easy adjustment of strategy parameters. This makes the bot accessible to users who may not have deep technical knowledge but want to participate in DeFi liquidity provision.

The bot is deployed on a DigitalOcean server with fault-tolerant execution and comprehensive logging. The system includes error handling, retry mechanisms, and monitoring to ensure reliable operation even in volatile market conditions. All operations are logged for audit and analysis purposes.`,
    technologies: ['Python', 'Raydium CLMM', 'Solana', 'Web3.py', 'Docker', 'DigitalOcean'],
    timeline: '3 months',
    role: 'DeFi Developer & DevOps Engineer',
    team: 'Solo',
    status: 'All Systems Operational',
    statusColor: 'green',
    image: '/project-4.jpg',
    keyChallenges: [
      'Interfacing with Solana blockchain and Raydium protocol',
      'Implementing accurate impermanent loss calculations',
      'Designing dynamic rebalancing algorithms',
      'Handling blockchain transaction failures and retries',
      'Ensuring fault-tolerant execution in production'
    ],
    keyLearnings: [
      'Solana blockchain development and Web3 integration',
      'Concentrated Liquidity Market Maker (CLMM) mechanics',
      'Impermanent loss calculation and mitigation strategies',
      'DeFi protocol integration (Raydium)',
      'Automated trading bot development',
      'Fault-tolerant system design for financial applications'
    ],
    keyFeatures: [
      'Automated liquidity position management',
      'SOL-USDC CLMM pool integration',
      'Dynamic rebalancing based on price movement',
      'Impermanent loss threshold monitoring',
      'Pool range optimization',
      'Environment-based strategy configuration',
      'Fault-tolerant execution',
      'Comprehensive logging and monitoring',
      'DigitalOcean deployment'
    ],
    techStack: [
      'Python - Programming language',
      'Raydium CLMM - Concentrated liquidity protocol',
      'Solana - Blockchain platform',
      'Web3.py - Blockchain interaction library',
      'Docker - Containerization',
      'DigitalOcean - Cloud hosting'
    ],
    technicalImplementation: [
      'Integrated with Solana blockchain using Web3.py',
      'Connected to Raydium CLMM protocol',
      'Implemented price monitoring and analysis system',
      'Built dynamic rebalancing algorithm',
      'Created impermanent loss calculation engine',
      'Developed pool range optimization logic',
      'Implemented environment-based configuration system',
      'Set up fault-tolerant execution with retry mechanisms',
      'Created comprehensive logging system',
      'Deployed on DigitalOcean with Docker'
    ],
    impact: [
      'Automated liquidity management reducing manual intervention',
      'Optimized fee generation through dynamic rebalancing',
      'Minimized impermanent loss through threshold-based adjustments',
      'Enabled non-technical users to participate in DeFi',
      'Achieved reliable 24/7 operation with fault tolerance'
    ]
  },
  {
    id: '5',
    slug: 'cloud-bookstore-platform',
    title: 'Cloud-Based Bookstore Platform',
    shortDescription: 'Cloud-hosted bookstore with inventory management, search functionality, and order notifications. Deployed on AWS with EC2, S3, and RDS.',
    fullDescription: `The Cloud-Based Bookstore Platform is a comprehensive e-commerce solution for book retailers, providing complete inventory management, search capabilities, and order processing. The platform is built with modern web technologies and deployed on AWS cloud infrastructure for scalability and reliability.

The system features a robust inventory management system that tracks book availability, manages stock levels, and handles inventory updates in real-time. The search functionality enables users to find books quickly using various criteria including title, author, genre, and ISBN.

The platform uses MySQL for relational data storage, with carefully designed schemas for books, users, orders, and inventory. This ensures data integrity and efficient querying for complex operations like order processing and inventory management.

REST APIs provide a clean interface for all operations, enabling easy integration with frontend applications and third-party services. The APIs handle authentication, authorization, and data validation to ensure secure and reliable operations.

The application is deployed on AWS EC2 instances, providing scalable compute resources. Persistent storage is handled through AWS S3 for file storage (book covers, documents) and AWS RDS for the MySQL database, ensuring data durability and backup capabilities.

Notification workflows are integrated throughout the system, alerting users about inventory updates, order status changes, and important account activities. This keeps users informed and engaged with the platform.`,
    technologies: ['FastAPI', 'React', 'MySQL', 'AWS EC2', 'AWS S3', 'AWS RDS'],
    timeline: '3 months',
    role: 'Full Stack Developer & Cloud Engineer',
    team: 'Solo',
    status: 'All Systems Operational',
    statusColor: 'green',
    image: '/project-5.jpg',
    keyChallenges: [
      'Designing efficient database schema for bookstore operations',
      'Implementing scalable search functionality',
      'Managing inventory updates and stock levels',
      'Setting up AWS infrastructure (EC2, S3, RDS)',
      'Implementing reliable notification workflows'
    ],
    keyLearnings: [
      'AWS cloud services (EC2, S3, RDS)',
      'Relational database design for e-commerce',
      'REST API design and implementation',
      'Inventory management system development',
      'Cloud deployment and infrastructure management',
      'Notification system integration'
    ],
    keyFeatures: [
      'Complete inventory management system',
      'Advanced search functionality',
      'Order processing and management',
      'User account management',
      'Notification workflows',
      'AWS cloud deployment',
      'Persistent storage with S3 and RDS',
      'RESTful API architecture'
    ],
    techStack: [
      'FastAPI - High-performance Python backend',
      'React - Frontend framework',
      'MySQL - Relational database',
      'AWS EC2 - Compute instances',
      'AWS S3 - Object storage',
      'AWS RDS - Managed database service'
    ],
    technicalImplementation: [
      'Designed relational database schema for books, users, orders, inventory',
      'Implemented REST APIs with FastAPI',
      'Built inventory management system with real-time updates',
      'Created search functionality with multiple filters',
      'Developed order processing workflow',
      'Implemented notification system for inventory and orders',
      'Set up AWS EC2 instances for application hosting',
      'Configured AWS S3 for file storage',
      'Deployed MySQL database on AWS RDS',
      'Implemented backup and recovery procedures'
    ],
    impact: [
      'Enabled efficient inventory management and tracking',
      'Improved search experience for users',
      'Automated order processing and notifications',
      'Scaled to handle growing inventory and user base',
      'Achieved reliable cloud-based operation with AWS infrastructure'
    ]
  },
  {
    id: '6',
    slug: 'ai-chatbot-data-leakage',
    title: 'AI Chatbot for Data Leakage Detection',
    shortDescription: 'AI-powered chatbot to detect, report, and explain potential data leakage incidents using NLP techniques to analyze logs, queries, and user input.',
    fullDescription: `The AI Chatbot for Data Leakage Detection is an intelligent security solution that uses natural language processing and machine learning to identify, report, and explain potential data leakage incidents. The chatbot serves as both a detection system and an interactive assistant for security teams.

The system employs advanced NLP techniques to analyze various data sources including system logs, database queries, and user input. By understanding the context and semantics of these interactions, the chatbot can identify patterns that indicate potential data leakage attempts or incidents.

The chatbot is designed to be conversational and user-friendly, allowing security personnel to interact naturally while investigating potential issues. It can answer questions about detected incidents, provide explanations for why something was flagged, and guide users through the investigation process.

All incident data and conversation history are stored in MySQL for comprehensive auditing and analysis. This enables security teams to review past incidents, identify trends, and improve detection capabilities over time.

The service is deployed on AWS with secure API access, ensuring that sensitive security information is protected. The deployment includes proper authentication, authorization, and encryption to maintain security standards.`,
    technologies: ['Python', 'FastAPI', 'MySQL', 'NLP', 'AWS'],
    timeline: '4 months',
    role: 'ML Engineer & Backend Developer',
    team: 'Solo',
    status: 'All Systems Operational',
    statusColor: 'green',
    image: '/project-6.jpg',
    keyChallenges: [
      'Implementing NLP models for data leakage pattern detection',
      'Analyzing logs and queries for security indicators',
      'Building conversational chatbot interface',
      'Storing and querying incident data efficiently',
      'Ensuring secure deployment on AWS'
    ],
    keyLearnings: [
      'NLP techniques for security applications',
      'Pattern recognition in logs and queries',
      'Conversational AI development',
      'Security incident management',
      'AWS secure deployment practices',
      'Database design for audit and compliance'
    ],
    keyFeatures: [
      'AI-powered data leakage detection',
      'NLP-based log and query analysis',
      'Conversational chatbot interface',
      'Incident reporting and explanation',
      'MySQL storage for incidents and conversations',
      'Comprehensive audit trail',
      'Secure AWS deployment',
      'API-based access control'
    ],
    techStack: [
      'Python - Programming language',
      'FastAPI - High-performance API framework',
      'MySQL - Relational database',
      'NLP - Natural Language Processing libraries',
      'AWS - Cloud infrastructure'
    ],
    technicalImplementation: [
      'Developed NLP models for pattern detection',
      'Implemented log analysis pipeline',
      'Built query analysis system',
      'Created conversational chatbot interface',
      'Designed MySQL schema for incidents and conversations',
      'Implemented incident reporting system',
      'Built explanation engine for detected incidents',
      'Set up secure API with authentication',
      'Deployed on AWS with proper security measures'
    ],
    impact: [
      'Improved data leakage detection accuracy',
      'Reduced investigation time for security teams',
      'Enabled proactive security monitoring',
      'Provided comprehensive audit trail for compliance',
      'Enhanced security posture through automated detection'
    ]
  },
  {
    id: '7',
    slug: 'decentravault',
    title: 'DecentraVault — Smart Contract-Based Asset Management Platform',
    shortDescription: 'Decentralized asset vault enabling users to securely store, transfer, and time-lock digital assets using Solidity smart contracts on Ethereum with IPFS metadata storage.',
    fullDescription: `DecentraVault is a decentralized asset management platform built on Ethereum blockchain that enables users to securely store, transfer, and time-lock their digital assets. The platform leverages smart contracts to provide trustless, transparent, and secure asset management without relying on centralized intermediaries.

The core of the platform consists of Solidity smart contracts that handle all asset operations including storage, transfers, and time-locking mechanisms. The contracts are designed with security as the primary concern, implementing role-based permissions and upgrade safety checks to prevent unauthorized access and ensure contract integrity.

The smart contracts include sophisticated access control mechanisms that allow different roles (owners, administrators, users) to have appropriate permissions. Upgrade safety checks ensure that contract modifications can only be made through proper governance processes, protecting users from malicious updates.

The frontend is built with React and integrates with Ethereum using Ethers.js, enabling seamless wallet-based interactions. Users can connect their MetaMask wallets to interact with the smart contracts, providing a familiar and secure interface for managing their assets.

Metadata and transaction proofs are stored on IPFS (InterPlanetary File System) for decentralized persistence. This ensures that important information is not stored on a centralized server but distributed across the IPFS network, providing redundancy and censorship resistance.

The smart contracts are thoroughly tested using Hardhat, with comprehensive unit and integration test coverage. This ensures that the contracts behave correctly under various conditions and edge cases, providing confidence in the security and reliability of the platform.`,
    technologies: ['Solidity', 'Ethereum', 'Hardhat', 'React', 'Ethers.js', 'IPFS', 'MetaMask', 'Web3'],
    timeline: '5 months',
    role: 'Blockchain Developer & Full Stack Developer',
    team: 'Solo',
    status: 'All Systems Operational',
    statusColor: 'green',
    image: '/project-7.jpg',
    keyChallenges: [
      'Designing secure smart contract architecture',
      'Implementing role-based permissions and access control',
      'Ensuring upgrade safety in smart contracts',
      'Integrating IPFS for decentralized storage',
      'Building user-friendly Web3 frontend',
      'Comprehensive testing of smart contracts'
    ],
    keyLearnings: [
      'Solidity smart contract development',
      'Ethereum blockchain integration',
      'Smart contract security best practices',
      'IPFS integration for decentralized storage',
      'Web3 frontend development with Ethers.js',
      'Hardhat testing framework',
      'Smart contract upgrade patterns',
      'Role-based access control in smart contracts'
    ],
    keyFeatures: [
      'Secure asset storage on Ethereum blockchain',
      'Asset transfer functionality',
      'Time-lock mechanisms for assets',
      'Role-based permissions system',
      'Upgrade safety checks',
      'MetaMask wallet integration',
      'IPFS metadata storage',
      'Transaction proof storage on IPFS',
      'React frontend with Ethers.js',
      'Comprehensive Hardhat test suite'
    ],
    techStack: [
      'Solidity - Smart contract programming language',
      'Ethereum - Blockchain platform',
      'Hardhat - Development environment and testing',
      'React - Frontend framework',
      'Ethers.js - Ethereum JavaScript library',
      'IPFS - Decentralized storage',
      'MetaMask - Ethereum wallet',
      'Web3 - Blockchain interaction'
    ],
    technicalImplementation: [
      'Designed and developed Solidity smart contracts',
      'Implemented role-based permissions system',
      'Built upgrade safety mechanisms',
      'Created asset storage and transfer logic',
      'Developed time-lock functionality',
      'Integrated IPFS for metadata storage',
      'Built React frontend with Ethers.js',
      'Implemented MetaMask wallet connection',
      'Created transaction proof system',
      'Developed comprehensive Hardhat test suite',
      'Performed security audits and optimizations',
      'Deployed contracts to Ethereum network'
    ],
    impact: [
      'Enabled secure, decentralized asset management',
      'Eliminated need for trusted intermediaries',
      'Provided transparent and auditable asset operations',
      'Enabled time-locked asset management',
      'Demonstrated Web3 best practices and security',
      'Created reusable smart contract patterns'
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
