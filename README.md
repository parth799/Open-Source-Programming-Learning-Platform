# Open-Source Programming Learning Platform

A comprehensive platform for learning various programming languages, featuring structured learning materials, interactive examples, and personalized learning paths.

## Features

- Choose from multiple programming languages
- Follow structured learning roadmaps
- Access curated online resources and documentation
- Track learning progress
- Interactive coding examples
- Mobile-friendly responsive design

## Tech Stack

### Frontend
- React (with Vite)
- Tailwind CSS / Material UI
- Redux Toolkit
- React Router

### Backend
- Node.js with Express.js
- JWT Authentication
- RESTful API / GraphQL
- MongoDB with Mongoose

### Other Technologies
- Firebase / AWS S3 (for content storage)
- GitHub Actions (CI/CD)
- Vercel (Frontend deployment)
- Render / DigitalOcean / AWS (Backend deployment)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/programming-learning-platform.git
cd programming-learning-platform
```

2. Install dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables
```bash
# Frontend (.env)
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_CONFIG=your_firebase_config

# Backend (.env)
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Start the development servers
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm run dev
```

## Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by W3Schools and other educational platforms
- Thanks to all contributors who help make this project better 