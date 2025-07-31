# 🔥 DevTinder - Developer Connection Platform

DevTinder is a modern, interactive web application that connects developers based on their skills, interests, and project goals. Think "Tinder for Developers" - swipe through developer profiles, connect with like-minded programmers, and build amazing projects together.

✨ Features

### 🎯 Core Features
1 Swipe-based developer discovery
2 Smart algorithmic matching
3 Real-time connections & notifications
4 Profile management with bio, skills & projects

### 🔐 Authentication
1 Secure login/signup (JWT-based)
2 Session persistence
3 Protected routes with role-based access

### 💻 UI/UX
1 Responsive mobile-first design (Tailwind CSS)
2 Smooth animations (Framer Motion)
3 Dark theme & 3D elements (React Three Fiber)


## 🛠️ Tech Stack
1 **Frontend:** React 19, Vite, React Router
2 **State Management:** Redux Toolkit
3 **Styling:** Tailwind CSS, Framer Motion, Lucide Icons
4 **3D Graphics:** React Three Fiber, Drei, Three.js
5 **HTTP & API:** Axios, centralized API config
6 **Forms & Notifications:** React Hook Form, React Toastify, Hot Toast
7 **Tools:** ESLint, TypeScript (supported)

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
src/
├── components/     # Reusable components
│   └── 3d/         # 3D elements
├── pages/          # Page-level components
├── utils/          # API config, Redux slices, helpers
├── theme/          # Color and theme setup
└── App.jsx         # Main app entry point
```
🎯 Key Features

1 🔄 Swipe-Based Matching – Discover developers with an intuitive card interface

2 🤝 Smart Matching System – Connect with developers having complementary skills

3 🔔 Real-Time Notifications – Instant updates for matches and requests

4 🧑‍💻 Profile Customization – Showcase bio, skills, tech stack, and projects

5 🔐 Secure Auth System – JWT-based login with protected routes

6 🌙 Modern UI – Responsive dark-themed design with 3D and animated elements

7 ⚙️ Performance Optimized – Lazy loading, code splitting, and fast refresh

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
## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes 
4. Push to the branch 
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments
Thanks to the React, Vite, Tailwind, Framer Motion, and open-source communities for their tools and inspiration.

**Made with ❤️ by the DevTinder Team**
