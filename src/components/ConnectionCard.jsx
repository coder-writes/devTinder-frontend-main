/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaCode, FaUserCheck, FaEnvelope  } from 'react-icons/fa';

const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
            duration: 0.3, 
            type: "spring",
            stiffness: 300,
            damping: 30
        }
    },
    hover: { 
        scale: 1.02,
        y: -5,
        transition: { duration: 0.2 }
    }
};

const ConnectionCard = ({ connection, index = 0 }) => {
    const { firstName, lastName, photoUrl, gender, _id } = connection;
    
    const handleViewProfile = () => {
        console.log('View profile for:', _id);
        // TODO: Navigate to user profile or show modal
    };

    const handleSendMessage = () => {
        console.log('Send message to:', _id);
        // TODO: Open messaging interface
    };

    const handleConnect = (platform) => {
        console.log(`Connect on ${platform} with:`, _id);
        // TODO: Handle social platform connections
    };
    
    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            custom={index}
            onClick={handleViewProfile}
            className="relative bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-lg rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 w-full border border-green-400/30 overflow-hidden group cursor-pointer"
            style={{
                background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
                backdropFilter: 'blur(16px)',
                borderImage: 'linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6) 1',
            }}
        >
            {/* Decorative elements */}
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-1">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Connected badge */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-green-500/20 border border-green-400/50 rounded-full px-1.5 py-0.5 sm:px-2 sm:py-1 flex items-center gap-1">
                <FaUserCheck className="text-green-400 text-xs" />
                <span className="text-green-400 text-xs font-mono hidden sm:inline">Connected</span>
            </div>

            {/* Profile Image with glow effect */}
            <div className="relative mb-3 sm:mb-4 mt-6 sm:mt-8 flex justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-md opacity-50 animate-pulse"></div>
                <motion.img
                    src={photoUrl || 'https://via.placeholder.com/150'}
                    alt={`${firstName} ${lastName}`}
                    className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-2 sm:border-3 border-green-400 shadow-xl object-cover"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=10b981&color=fff&size=150`;
                    }}
                />
                <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 bg-blue-500 p-1 sm:p-1.5 rounded-full border-2 border-gray-800">
                    <FaCode className="text-white text-xs" />
                </div>
            </div>

            {/* Name and Gender */}
            <div className="text-center mb-3 sm:mb-4">
                <h3 className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-1">
                    {firstName} {lastName}
                </h3>
                <div className="flex items-center justify-center gap-2">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-400 rounded-full"></div>
                    <span className="text-gray-400 text-xs sm:text-sm font-mono capitalize">
                        {gender || 'Developer'}
                    </span>
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-blue-400 rounded-full"></div>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 sm:gap-3 justify-center" onClick={(e) => e.stopPropagation()}>
                <motion.button
                    onClick={() => handleConnect('linkedin')}
                    className="group/btn bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/30 hover:border-blue-400 text-blue-300 hover:text-white p-2 sm:p-2.5 rounded-lg sm:rounded-xl transition-all duration-300 hover:from-blue-500/30 hover:to-blue-600/30"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="LinkedIn"
                >
                    <FaLinkedin className="text-xs sm:text-sm group-hover/btn:scale-110 transition-transform" />
                </motion.button>
                
                <motion.button
                    onClick={() => handleConnect('github')}
                    className="group/btn bg-gradient-to-r from-gray-500/20 to-gray-600/20 border border-gray-400/30 hover:border-gray-400 text-gray-300 hover:text-white p-2 sm:p-2.5 rounded-lg sm:rounded-xl transition-all duration-300 hover:from-gray-500/30 hover:to-gray-600/30"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="GitHub"
                >
                    <FaGithub className="text-xs sm:text-sm group-hover/btn:scale-110 transition-transform" />
                </motion.button>
                
                <motion.button
                    onClick={handleSendMessage}
                    className="group/btn bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 hover:border-green-400 text-green-300 hover:text-white p-2 sm:p-2.5 rounded-lg sm:rounded-xl transition-all duration-300 hover:from-green-500/30 hover:to-emerald-500/30"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title="Send Message"
                >
                    <FaEnvelope className="text-xs sm:text-sm group-hover/btn:scale-110 transition-transform" />
                </motion.button>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl pointer-events-none"></div>
        </motion.div>
    );
};

export default ConnectionCard;
