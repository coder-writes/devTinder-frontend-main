# 🔥 DevTinder - Developer Connection Platform

DevTinder is a modern, interactive web application that connects developers based on their skills, interests, and project goals. Think "Tinder for Developers" - swipe through developer profiles, connect with like-minded programmers, and build amazing projects together.

## ✨ Features

### 🎯 Core Functionality
- **Profile Swiping**: Discover and connect with developers through an intuitive swipe interface
- **Smart Matching**: Algorithm-based matching system for developers with complementary skills
- **Real-time Connections**: Instant connection notifications and request management
- **Profile Management**: Comprehensive profile editing with skills, bio, and project showcase

### 🔐 Authentication & Security
- **Secure Login/Signup**: JWT-based authentication with credential management
- **Session Persistence**: Automatic login state management across browser sessions
- **Protected Routes**: Role-based access control for authenticated features

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Dark Theme**: Professional dark theme optimized for developers

### 📱 Key Pages
- **Feed**: Swipe through developer profiles with keyboard support
- **Connections**: View and manage your developer network
- **Requests**: Handle incoming connection requests
- **Profile Settings**: Edit personal information, skills, and preferences
- **Coming Soon**: Preview upcoming features and updates

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.1.0** - Latest React with concurrent features
- **Vite 7.0.0** - Lightning-fast build tool and dev server
- **React Router 7.6.3** - Client-side routing with lazy loading

### State Management
- **Redux Toolkit 2.8.2** - Modern Redux with RTK Query
- **React Redux 9.2.0** - React bindings for Redux

### Styling & UI
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **Framer Motion 12.23.0** - Production-ready motion library
- **React Icons 5.5.0** - Popular icon library
- **Lucide React 0.525.0** - Beautiful & consistent icons

### HTTP & API
- **Axios 1.10.0** - Promise-based HTTP client
- **Centralized API Configuration** - Environment-based URL management

### User Experience
- **React Hot Toast 2.5.2** - Beautiful toast notifications
- **React Toastify 11.0.5** - Notification system
- **React Hook Form 7.59.0** - Performant forms with easy validation

### Developer Tools
- **ESLint 9.29.0** - Code linting and quality enforcement
- **TypeScript Support** - Type definitions for better development

## 🚀 Getting Started


### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/devtinder-frontend.git
   cd devtinder-frontend
   Also Start you Backend Server also you Can find it here https://github.com/coder-writes/dev-tinder
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_BASE_URL=http://localhost:7777
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the application.

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Authentication related components
│   ├── connections/     # Connection management components
│   ├── forms/           # Form components and inputs
│   ├── home/            # Landing page components
│   ├── layout/          # Layout and wrapper components
│   ├── profile/         # Profile related components
│   ├── ui/              # Generic UI components
│   └── 3d/              # 3D graphics components
├── pages/               # Page components
│   ├── Body.jsx         # Main layout wrapper
│   ├── Feed.jsx         # Profile swiping interface
│   ├── Login.jsx        # Authentication page
│   ├── Signup.jsx       # User registration
│   ├── Connections.jsx  # Connections management
│   ├── Requests.jsx     # Connection requests
│   ├── EditProfile.jsx  # Profile editing
│   ├── Settings.jsx     # User settings
│   └── NewFeature.jsx   # Feature preview page
├── utils/               # Utility functions and configurations
│   ├── apiConfig.js     # API endpoints and configuration
│   ├── reduxStore.js    # Redux store configuration
│   ├── userSlicer.js    # User state management
│   ├── feedSlice.js     # Feed state management
│   ├── requestSlice.js  # Request state management
│   └── lazyLoad.js      # Code splitting utilities
├── theme/               # Theme configuration
│   └── colors.js        # Color palette and styles
└── App.jsx              # Main application component
```

## 🎯 Key Features Deep Dive

### Swipe-Based Matching
- Intuitive card-based interface for browsing developer profiles
- Keyboard navigation support (arrow keys)
- Smooth animations and gesture feedback
- Real-time API integration for match processing

### Connection Management
- View all active connections with search and filter capabilities
- Request management system with accept/reject functionality
- Real-time status updates and notifications

### Profile System
- Comprehensive profile creation and editing
- Skill tags and technology stack display
- Bio and project showcase capabilities
- Photo upload and management

### Performance Optimizations
- **Code Splitting**: Lazy loading for optimal bundle size
- **Chunk Management**: Strategic code splitting with Vite
- **Image Optimization**: Efficient image loading and caching
- **State Management**: Optimized Redux patterns

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with HMR

# Production
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint for code quality check
```

## 🌐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_BASE_URL` | Backend API base URL | `http://localhost:7777` |

## 🎨 Design System

### Color Palette
- **Primary**: Green (#10b981) - Success, connections, positive actions
- **Secondary**: Pink/Red gradients - Highlights, CTAs, branding
- **Background**: Dark gradients (#232526 to #414345)
- **Text**: White/Gray scale for optimal readability

### Animation Principles
- **Smooth Transitions**: 200-300ms for UI interactions
- **Spring Physics**: Natural motion using Framer Motion
- **Micro-interactions**: Hover states and feedback animations
- **Page Transitions**: Smooth navigation between routes

## 🚀 Performance Features

### Bundle Optimization
- **Manual Chunks**: Vendor libraries separated for better caching
- **Lazy Loading**: Route-based code splitting
- **Tree Shaking**: Unused code elimination
- **Modern ES Modules**: Optimized for modern browsers

### Development Experience
- **Hot Module Replacement**: Instant updates during development
- **Fast Refresh**: React state preservation during updates
- **TypeScript Support**: Enhanced development with type checking
- **ESLint Integration**: Code quality enforcement

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vite Team** for the blazing-fast build tool
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations
- **Open Source Community** for the incredible ecosystem

---

**Made with ❤️ by the DevTinder Team**
