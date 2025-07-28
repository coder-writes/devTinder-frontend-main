/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCode, 
  FaRocket, 
  FaCog, 
  FaUsers, 
  FaLightbulb, 
  FaGithub,
  FaHeart,
  FaStar,
  FaArrowLeft,
  FaUser
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

const NewFeature = () => {
  const [progress, setProgress] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);
  const user = useSelector((state) => state.user);
  // Simulate progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 85) return 0; // Reset at 85% to show ongoing work
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Cycle through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % upcomingFeatures.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const upcomingFeatures = [
    {
      icon: FaUsers,
      title: "Team Matching",
      description: "Find and create development teams for hackathons and projects",
      status: "In Development",
      progress: 75,
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: FaStar,
      title: "Blogs Section",
      description: "Users can read and share technical blogs ,explore tutorials, and engage with the community",
      status: "In Development",
      progress: 50,
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: FaUser,
      title: "Invidual Full Profile Preview",
      description: "View detailed profiles of developers with skills, projects, and interests, Github links etc",
      status: "Planning",
      progress: 50,
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: FaCode,
      title: "Code Collaboration",
      description: "Real-time code sharing and collaborative coding sessions",
      status: "Design Phase",
      progress: 45,
      color: "from-green-500 to-teal-600"
    },
    {
      icon: FaLightbulb,
      title: "Project Ideas Hub",
      description: "Discover and share innovative project ideas with the community",
      status: "Planning",
      progress: 25,
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: FaRocket,
      title: "Skill Assessment",
      description: "AI-powered skill matching and recommendation system",
      status: "Research",
      progress: 15,
      color: "from-pink-500 to-red-600"
    }
  ];

  const developmentSteps = [
    { icon: FaLightbulb, title: "Ideation", completed: true },
    { icon: FaCode, title: "Development", completed: true },
    { icon: FaCog, title: "Testing", completed: false },
    { icon: FaRocket, title: "Launch", completed: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#232526] to-[#414345] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-400/5"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 0
            }}
            animate={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 360
            }}
            transition={{
              duration: 20 + i * 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <FaCog size={40 + i * 5} />
          </motion.div>
        ))}
      </div>

      {/* Header with Back Button */}
      <motion.div
        className="relative z-10 p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          to="/feed"
          className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors duration-200"
        >
          <FaArrowLeft />
          <span>{user ? "Back to Feed" : "Back to Home"}</span>
        </Link>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative inline-block mb-6"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="relative">
                <HiSparkles className="text-6xl text-yellow-400 mb-4" />
                <motion.div
                  className="absolute -inset-4 rounded-full border-2 border-yellow-400/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              New Features
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-green-400 font-semibold mb-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              We're Cooking Something Amazing! 🔥
            </motion.p>

            <motion.p
              className="text-lg text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Our development team is working tirelessly to bring you cutting-edge features that will revolutionize how developers connect and collaborate. Stay tuned for these exciting updates!
            </motion.p>
          </motion.div>

          {/* Development Progress */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-2xl p-8 border border-green-400/30 shadow-2xl">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                Development Progress
              </h2>
              
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-400 font-semibold">Overall Progress</span>
                  <span className="text-white font-bold">{progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full relative"
                    style={{ width: `${progress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/20"
                      animate={{ x: ['0%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                </div>
              </div>

              {/* Development Steps */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {developmentSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <motion.div
                      key={step.title}
                      className={`text-center p-4 rounded-xl border-2 transition-all duration-300 ${
                        step.completed 
                          ? 'border-green-400/50 bg-green-400/10' 
                          : 'border-gray-600/50 bg-gray-600/10'
                      }`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <IconComponent 
                        className={`text-3xl mx-auto mb-2 ${
                          step.completed ? 'text-green-400' : 'text-gray-400'
                        }`} 
                      />
                      <p className={`font-semibold ${
                        step.completed ? 'text-green-400' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </p>
                      {step.completed && (
                        <motion.div
                          className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-2"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.3 + index * 0.1 }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Upcoming Features */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-8 text-center">
              What's Coming Next
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                const isActive = index === activeFeature;
                
                return (
                  <motion.div
                    key={feature.title}
                    className={`bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-xl p-6 border transition-all duration-500 ${
                      isActive 
                        ? 'border-green-400/50 shadow-2xl shadow-green-400/20 scale-105' 
                        : 'border-gray-600/30 hover:border-green-400/30'
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      scale: isActive ? 1.05 : 1,
                      y: isActive ? -5 : 0
                    }}
                    transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <motion.div
                        className={`p-3 rounded-lg bg-gradient-to-r ${feature.color}`}
                        animate={isActive ? { rotate: [0, 10, -10, 0] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <IconComponent className="text-white text-xl" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {feature.title}
                        </h3>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          feature.status === 'In Development' ? 'bg-green-500/20 text-green-400' :
                          feature.status === 'Design Phase' ? 'bg-blue-500/20 text-blue-400' :
                          feature.status === 'Planning' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {feature.status}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4">
                      {feature.description}
                    </p>
                    
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">Progress</span>
                      <span className="text-sm font-semibold text-white">
                        {feature.progress}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${feature.color} rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${feature.progress}%` }}
                        transition={{ delay: 1.7 + index * 0.1, duration: 1 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.9, duration: 0.8 }}
          >
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-lg rounded-2xl p-8 border border-green-400/30">
              <h3 className="text-2xl font-bold text-white mb-4">
                Want to stay updated?
              </h3>
              <p className="text-gray-300 mb-6">
                Follow our development journey and be the first to try new features!
              </p>
              
              <div className="flex justify-center space-x-4">
                <motion.a
                  target='_blank'
                  href="https://github.com/coder-writes"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub />
                  Follow on GitHub
                </motion.a>
                
                <motion.a
                  target='_blank'
                  href="https://github.com/sponsors/coder-writes"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-green-400 text-green-400 font-semibold rounded-lg hover:bg-green-400 hover:text-gray-900 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaHeart />
                  Show Support
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Hearts Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 5 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-400/20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 20,
            }}
            animate={{
              y: -20,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          >
            <FaHeart size={20} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NewFeature;
