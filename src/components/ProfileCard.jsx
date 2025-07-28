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
    // console.log(profile);
    return (
        <motion.div
            key={profile.id}
            className="relative z-10 bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-lg rounded-2xl md:rounded-3xl shadow-2xl p-4 md:p-6 w-full max-w-sm md:max-w-lg mx-auto flex flex-col items-center border border-orange-500/30"
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
                borderImage: 'linear-gradient(135deg, #f97316, #ea580c, #dc2626) 1',
            }}
        >
            {/* Decorative elements */}
            <div className="absolute top-3 md:top-4 right-3 md:right-4 flex gap-1 md:gap-2">
                <div className="w-2 md:w-3 h-2 md:h-3 bg-orange-400 rounded-full animate-pulse"></div>
                <div className="w-2 md:w-3 h-2 md:h-3 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-2 md:w-3 h-2 md:h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Profile Image with glow effect */}
            <div className="relative mb-3 md:mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-md opacity-50 animate-pulse"></div>
                <motion.img
                    src={profile?.photoUrl}
                    alt={profile.firsName + profile.lastName}
                    className="relative w-24 h-24 md:w-32 lg:w-40 md:h-32 lg:h-40 rounded-full border-2 md:border-4 border-orange-400 shadow-xl object-cover"
                    whileHover={{ scale: 1.08, rotate: 8 }}
                />
                <div className="absolute -bottom-1 md:-bottom-2 -right-1 md:-right-2 bg-orange-400 p-1 md:p-2 rounded-full">
                    <FaCode className="text-gray-900 text-xs md:text-sm" />
                </div>
            </div>

            {/* Name and Role */}
            <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold mb-2 bg-gradient-to-r from-orange-400 via-red-500 to-yellow-600 bg-clip-text text-transparent text-center">
                {profile?.firstName+ " "  + profile.lastName || profile?.name}
            </h2>
            <div className="flex items-center gap-2 mb-3 md:mb-4">
                <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-orange-400 rounded-full"></div>
                <h4 className="text-gray-300 font-semibold text-sm md:text-base lg:text-lg">{profile.role || "Frontend Developer"}</h4>
                <div className="w-1.5 md:w-2 h-1.5 md:h-2 bg-red-400 rounded-full"></div>
            </div>

            <p className="text-gray-300 mb-4 md:mb-6 text-center text-sm md:text-base lg:text-lg leading-relaxed px-2 md:px-4 min-h-[2rem] md:min-h-[3rem] flex items-center">
                {profile.about}
            </p>

            {Array.isArray(profile.skills) && profile.skills.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-3 md:mb-4 min-h-[2rem] md:min-h-[2.5rem] items-center">
                    {profile.skills.map((skill, index) => (
                        <motion.span
                            key={skill}
                            className="bg-gradient-to-r from-orange-400/20 to-red-500/20 border border-orange-400/30 text-orange-300 px-3 md:px-4 lg:px-6 py-1.5 md:py-2 lg:py-3 rounded-full text-xs md:text-sm lg:text-base font-semibold backdrop-blur-sm hover:from-orange-400/30 hover:to-red-500/30 transition-all duration-300"
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
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-4 md:mb-6 min-h-[2rem] md:min-h-[2.5rem] items-center">
                    {profile.hobbies.map((hobby, idx) => (
                        <motion.span
                            key={hobby}
                            className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 text-yellow-200 px-3 md:px-4 lg:px-5 py-1 md:py-1.5 lg:py-2 rounded-full text-xs md:text-sm font-medium backdrop-blur-sm hover:from-yellow-400/30 hover:to-orange-400/30 transition-all duration-300"
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
            <div className="flex gap-3 md:gap-4 mb-4 md:mb-6">
                <motion.div 
                    className="p-2 md:p-3 bg-gray-700/50 rounded-full border border-gray-600/50 hover:border-orange-400/50 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                >
                    <FaGithub className="text-gray-300 text-sm md:text-base lg:text-lg" />
                </motion.div>
                <motion.div 
                    className="p-2 md:p-3 bg-gray-700/50 rounded-full border border-gray-600/50 hover:border-red-400/50 transition-colors"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                >
                    <FaLinkedin className="text-gray-300 text-sm md:text-base lg:text-lg" />
                </motion.div>
                <motion.div 
                    className="p-2 md:p-3 bg-gray-700/50 rounded-full border border-gray-600/50 hover:border-yellow-400/50 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                >
                    <FaCoffee className="text-gray-300 text-sm md:text-base lg:text-lg" />
                </motion.div>
            </div>

            {/* Action buttons with enhanced design */}
            <div className="flex gap-3 md:gap-4 lg:gap-6 mt-auto">
                <motion.button
                    className="group bg-gradient-to-r from-red-500/20 to-red-600/20 border-2 border-red-400/30 hover:border-red-400 text-red-300 hover:text-white px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 rounded-xl md:rounded-2xl font-bold shadow-lg text-sm md:text-base lg:text-lg flex items-center gap-2 md:gap-3 backdrop-blur-sm transition-all duration-300 hover:from-red-500/30 hover:to-red-600/30"
                    onClick={() => onSwipe('left')}
                    aria-label="Swipe left"
                    whileTap={{ scale: 0.92, rotate: -12 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <FaTimes className="text-base md:text-lg lg:text-xl group-hover:scale-110 transition-transform" /> 
                    <span className="hidden sm:inline">Pass</span>
                </motion.button>
                <motion.button
                    className="group bg-gradient-to-r from-orange-500/20 to-red-500/20 border-2 border-orange-400/30 hover:border-orange-400 text-orange-300 hover:text-white px-4 md:px-6 lg:px-8 py-2 md:py-3 lg:py-4 rounded-xl md:rounded-2xl font-bold shadow-lg text-sm md:text-base lg:text-lg flex items-center gap-2 md:gap-3 backdrop-blur-sm transition-all duration-300 hover:from-orange-500/30 hover:to-red-500/30"
                    onClick={() => onSwipe('right')}
                    aria-label="Swipe right"
                    whileTap={{ scale: 0.92, rotate: 12 }}
                    whileHover={{ scale: 1.05 }}
                >
                    <span className="hidden sm:inline">Code</span>
                    <FaHeart className="text-base md:text-lg lg:text-xl group-hover:scale-110 transition-transform" />
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ProfileCard;
