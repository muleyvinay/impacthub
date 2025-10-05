# 🌟 ImpactHub - Web3 Nonprofit Funding Platform

A modern, transparent platform for nonprofit funding using Web3 technology.

## 🚀 Features

- **Transparent Donations**: Track every dollar from source to impact
- **Project Management**: Create, manage, and track nonprofit projects
- **User Authentication**: Secure login and role-based access
- **Voting System**: Community-driven decision making
- **Premium Design**: Modern UI with animations and responsive design
- **Real-time Updates**: Live project progress and impact tracking

## 🏗️ Architecture

- **Frontend**: Next.js 15 with TypeScript
- **Backend**: NestJS with Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: JWT-based
- **Styling**: Tailwind CSS with custom animations

## 📱 Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: NestJS, Prisma, PostgreSQL
- **Authentication**: JWT tokens
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel (Frontend) + Railway (Backend)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/impacthub.git
cd impacthub
```

2. **Install dependencies**
```bash
# Frontend
cd web
npm install

# Backend
cd ../api
npm install
```

3. **Set up environment variables**
```bash
# Backend (.env)
DATABASE_URL="postgresql://username:password@localhost:5432/impacthub"
JWT_SECRET="your-jwt-secret"

# Frontend (.env.local)
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

4. **Set up database**
```bash
cd api
npx prisma migrate dev
npx prisma generate
```

5. **Start development servers**
```bash
# Backend (Terminal 1)
cd api
npm run start:dev

# Frontend (Terminal 2)
cd web
npm run dev
```

6. **Open the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 🌐 Deployment

### Free Hosting (Recommended)

**Frontend (Vercel):**
1. Push code to GitHub
2. Connect to Vercel
3. Deploy automatically

**Backend (Railway):**
1. Connect GitHub to Railway
2. Deploy from repository
3. Set environment variables

### Manual Deployment

See `HOSTING_GUIDE.md` for detailed instructions.

## 📁 Project Structure

```
impacthub/
├── web/                 # Next.js frontend
│   ├── src/
│   │   ├── app/        # App router pages
│   │   ├── components/ # React components
│   │   └── styles/     # CSS and animations
│   └── package.json
├── api/                 # NestJS backend
│   ├── src/
│   │   ├── modules/    # Feature modules
│   │   └── main.ts     # Application entry
│   └── package.json
└── README.md
```

## 🎨 Design System

- **Color Palette**: Navy blue, white, and gold
- **Typography**: Inter font family
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design
- **Accessibility**: WCAG compliant

## 🔧 Development

### Available Scripts

**Frontend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

**Backend:**
```bash
npm run start:dev    # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run test         # Run tests
```

### Database Management

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Reset database
npx prisma migrate reset

# View database
npx prisma studio
```

## 📊 Features Overview

### User Management
- User registration and authentication
- Role-based access control
- User profiles and settings

### Project Management
- Create and manage nonprofit projects
- Progress tracking and milestones
- Media uploads and updates

### Community Features
- Voting on proposals
- Comments and discussions
- Reputation system

### Analytics
- Project impact metrics
- User engagement tracking
- Financial transparency

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the deployment guides

---

**Built with ❤️ for transparent nonprofit funding**