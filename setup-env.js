#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🔧 Setting up environment files...\n')

const backendEnvPath = path.join(__dirname, 'backend', '.env')
const backendEnvExample = `# Server Configuration
PORT=5000
NODE_ENV=development

# Database - Using local MongoDB for development
# For MongoDB Atlas, replace with: mongodb+srv://<username>:<password>@<cluster>.mongodb.net/portfolio
MONGO_URI=mongodb://localhost:27017/portfolio

# JWT Authentication
JWT_SECRET=dev-secret-key-change-in-production-minimum-32-characters-long

# Email Configuration (SMTP) - Optional for development
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
CONTACT_EMAIL=utkarsh.yash77@gmail.com

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
`

if (!fs.existsSync(backendEnvPath)) {
  fs.writeFileSync(backendEnvPath, backendEnvExample)
  console.log('✅ Created backend/.env')
} else {
  console.log('ℹ️  backend/.env already exists, skipping...')
}

const frontendEnvPath = path.join(__dirname, 'frontend', '.env.local')
const frontendEnvExample = `# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000

# Analytics (Optional)
NEXT_PUBLIC_ANALYTICS_ID=

# Site URL (Optional, for sitemap)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
`

if (!fs.existsSync(frontendEnvPath)) {
  fs.writeFileSync(frontendEnvPath, frontendEnvExample)
  console.log('✅ Created frontend/.env.local')
} else {
  console.log('ℹ️  frontend/.env.local already exists, skipping...')
}

console.log('\n✨ Environment setup complete!')
console.log('\n📝 Next steps:')
console.log('   1. Edit backend/.env and set your MongoDB URI (optional for development)')
console.log('   2. Edit frontend/.env.local if needed')
console.log('   3. Run: npm install')
console.log('   4. Run: npm run dev')































// #!/usr/bin/env node

// const fs = require('fs')
// const path = require('path')

// console.log('🔧 Setting up environment files...\n')

// // Backend .env
// const backendEnvPath = path.join(__dirname, 'backend', '.env')
// const backendEnvExample = `# Server Configuration
// PORT=5000
// NODE_ENV=development

// # Database - Using local MongoDB for development
// # For MongoDB Atlas, replace with: mongodb+srv://username:password@cluster.mongodb.net/portfolio
// MONGO_URI=mongodb://localhost:27017/portfolio

// # JWT Authentication
// JWT_SECRET=dev-secret-key-change-in-production-minimum-32-characters-long

// # Email Configuration (SMTP) - Optional for development
// SMTP_HOST=smtp.gmail.com
// SMTP_PORT=587
// SMTP_USER=
// SMTP_PASS=
// CONTACT_EMAIL=utkarsh.yash77@gmail.com

// # Admin Credentials
// ADMIN_USERNAME=admin
// ADMIN_PASSWORD=admin123
// `

// if (!fs.existsSync(backendEnvPath)) {
//   fs.writeFileSync(backendEnvPath, backendEnvExample)
//   console.log('✅ Created backend/.env')
// } else {
//   console.log('ℹ️  backend/.env already exists, skipping...')
// }

// // Frontend .env.local
// const frontendEnvPath = path.join(__dirname, 'frontend', '.env.local')
// const frontendEnvExample = `# API Configuration
// NEXT_PUBLIC_API_URL=http://localhost:5000

// # Analytics (Optional)
// NEXT_PUBLIC_ANALYTICS_ID=

// # Site URL (Optional, for sitemap)
// NEXT_PUBLIC_SITE_URL=http://localhost:3000
// `

// if (!fs.existsSync(frontendEnvPath)) {
//   fs.writeFileSync(frontendEnvPath, frontendEnvExample)
//   console.log('✅ Created frontend/.env.local')
// } else {
//   console.log('ℹ️  frontend/.env.local already exists, skipping...')
// }

// console.log('\n✨ Environment setup complete!')
// console.log('\n📝 Next steps:')
// console.log('   1. Edit backend/.env and set your MongoDB URI (optional for development)')
// console.log('   2. Edit frontend/.env.local if needed')
// console.log('   3. Run: npm install')
// console.log('   4. Run: npm run dev')

