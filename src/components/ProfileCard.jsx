/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaTimes, FaGithub, FaLinkedin, FaCode, FaCoffee } from 'react-icons/fa';

const cardVariants = {
    initial: (direction) => ({
        x: direction === 'right' ? 400 : direction === 'left' ? -400 : 0,
        opacity: 0,
        scale: 0.85,
        rotate: direction === 'right' ? 10 : direction === 'left' ? -10 : 0,
    }),
    animate: {
        x: 0,
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
    exit: (direction) => ({
        x: direction === 'right' ? 400 : direction === 'left' ? -400 : 0,
        opacity: 0,
        scale: 0.85,
        rotate: direction === 'right' ? 10 : direction === 'left' ? -10 : 0,
        transition: { duration: 0.35 },
    }),
};

const ProfileCard = ({ profile, swipe, onSwipe }) => {
    console.log(profile);
    return (
        <motion.div
            key={profile.id}
            className="relative z-10 bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 w-full max-w-sm sm:max-w-md lg:max-w-lg flex flex-col items-center border border-green-400/30"
            custom={swipe}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={(_, info) => {
                if (info.offset.x > 120) onSwipe('right');
                else if (info.offset.x < -120) onSwipe('left');
            }}
            whileTap={{ scale: 0.97 }}
            style={{
                background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
                backdropFilter: 'blur(16px)',
                borderImage: 'linear-gradient(135deg, #10b981, #3b82f6, #8b5cf6) 1',
            }}
        >
            {/* Decorative elements */}
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex gap-1 sm:gap-2">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Profile Image with glow effect */}
            <div className="relative mb-2 sm:mb-3">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-md opacity-50 animate-pulse"></div>
                <motion.img
                    src={profile?.photoUrl}
                    alt={profile.firsName + profile.lastName}
                    className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-2 sm:border-4 border-green-400 shadow-xl object-cover"
                    whileHover={{ scale: 1.08, rotate: 8 }}
                />
                <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-green-400 p-1 sm:p-2 rounded-full">
                    <FaCode className="text-gray-900 text-xs sm:text-sm" />
                </div>
            </div>

            {/* Name and Role */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-1 sm:mb-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent text-center">
                {profile?.firstName+ " "  + profile.lastName || profile?.name}
            </h2>
            <div className="flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
                <h4 className="text-gray-300 font-semibold text-sm sm:text-base md:text-lg">{profile.role || "Frontend Developer"}</h4>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full"></div>
            </div>

            <p className="text-gray-300 mb-6 sm:mb-8 md:mb-12 lg:mb-20 text-center text-sm sm:text-base md:text-lg leading-relaxed px-2 sm:px-4 min-h-[2rem] sm:min-h-[3rem] flex items-center">
                {profile.about}
            </p>

            {Array.isArray(profile.skills) && profile.skills.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 min-h-[2rem] sm:min-h-[2.5rem] items-center">
                    {profile.skills.map((skill, index) => (
                        <motion.span
                            key={skill}
                            className="bg-gradient-to-r from-green-400/20 to-blue-500/20 border border-green-400/30 text-green-300 px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full text-xs sm:text-sm md:text-base font-semibold backdrop-blur-sm hover:from-green-400/30 hover:to-blue-500/30 transition-all duration-300"
                            whileHover={{ scale: 1.08, y: -2 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>
            )}
            {Array.isArray(profile.hobbies) && profile.hobbies.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8 min-h-[2rem] sm:min-h-[2.5rem] items-center">
                    {profile.hobbies.map((hobby, idx) => (
                        <motion.span
                            key={hobby}
                            className="bg-gradient-to-r from-purple-400/20 to-blue-400/20 border border-purple-400/30 text-purple-200 px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm hover:from-purple-400/30 hover:to-blue-400/30 transition-all duration-300"
                            whileHover={{ scale: 1.12, y: -2 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.08 }}
                        >
                            {hobby}
                        </motion.span>
                    ))}
                </div>
            )}
            {/* Social links placeholder */}
            <div className="flex gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                <motion.div 
                    className="p-2 sm:p-3 bg-gray-700/50 rounded-full border border-gray-600/50 hover:border-green-400/50 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                >
                    <FaGithub className="text-gray-300 text-sm sm:text-base md:text-lg" />
                </motion.div>
                <motion.div 
                    className="p-2 sm:p-3 bg-gray-700/50 rounded-full border border-gray-600/50 hover:border-blue-400/50 transition-colors"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                >
                    <FaLinkedin className="text-gray-300 text-sm sm:text-base md:text-lg" />
                </motion.div>
                <motion.div 
                    className="p-2 sm:p-3 bg-gray-700/50 rounded-full border border-gray-600/50 hover:border-purple-400/50 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                >
                    <FaCoffee className="text-gray-300 text-sm sm:text-base md:text-lg" />
                </motion.div>
            </div>

            {/* Action buttons with enhanced design */}
            <div className="flex gap-3 sm:gap-4 md:gap-6 mt-auto">
                <motion.button
                    className="group bg-gradient-to-r from-red-500/20 to-red-600/20 border-2 border-red-400/30 hover:border-red-400 text-red-300 hover:text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-xl sm:rounded-2xl font-bold shadow-lg text-sm sm:text-base md:text-lg flex items-center gap-1 sm:gap-2 md:gap-3 backdrop-blur-sm transition-all duration-300 hover:from-red-500/30 hover:to-red-600/30"
                    onClick={() => onSwipe('left')}
                    aria-label="Swipe left"
                    whileTap={{ scale: 0.92, rotate: -12 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <FaTimes className="text-sm sm:text-base md:text-xl group-hover:scale-110 transition-transform" /> 
                    <span className="hidden sm:inline">Pass</span>
                </motion.button>
                <motion.button
                    className="group bg-gradient-to-r from-green-500/20 to-blue-500/20 border-2 border-green-400/30 hover:border-green-400 text-green-300 hover:text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-xl sm:rounded-2xl font-bold shadow-lg text-sm sm:text-base md:text-lg flex items-center gap-1 sm:gap-2 md:gap-3 backdrop-blur-sm transition-all duration-300 hover:from-green-500/30 hover:to-blue-500/30"
                    onClick={() => onSwipe('right')}
                    aria-label="Swipe right"
                    whileTap={{ scale: 0.92, rotate: 12 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <span className="hidden sm:inline">Code</span>
                    <FaHeart className="text-sm sm:text-base md:text-xl group-hover:scale-110 transition-transform" />
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ProfileCard;
