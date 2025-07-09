/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaArrowRight, FaHeart, FaCode, FaSearch } from 'react-icons/fa';

const EmptyRequestsState = ({ onNavigateToFeed }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
            <div className="max-w-2xl mx-auto text-center">
                {/* Animated Icon */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        duration: 0.8
                    }}
                    className="mb-8"
                >
                    <div className="relative inline-block">
                        <motion.div
                            animate={{ 
                                scale: [1, 1.1, 1],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ 
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-2xl"
                        />
                        <div className="relative bg-gradient-to-r from-purple-400 to-pink-500 p-8 rounded-full">
                            <FaUserPlus className="text-6xl text-white" />
                        </div>
                    </div>
                </motion.div>

                {/* Title and Description */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-600 bg-clip-text text-transparent mb-4">
                        No Requests Yet
                    </h1>
                    <p className="text-xl text-gray-300 mb-2 font-light">
                        Your inbox is empty! Start exploring profiles to get noticed
                    </p>
                    <p className="text-gray-400 font-mono text-sm">
                        When developers want to connect with you, their requests will appear here
                    </p>
                </motion.div>

                {/* Interactive Elements */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mb-12"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-2xl p-6 backdrop-blur-sm"
                        >
                            <FaSearch className="text-3xl text-purple-400 mb-3 mx-auto" />
                            <h3 className="text-white font-semibold mb-2">Be Active</h3>
                            <p className="text-gray-400 text-sm">Browse profiles and engage with other developers</p>
                        </motion.div>
                        
                        <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/20 rounded-2xl p-6 backdrop-blur-sm"
                        >
                            <FaCode className="text-3xl text-blue-400 mb-3 mx-auto" />
                            <h3 className="text-white font-semibold mb-2">Show Your Work</h3>
                            <p className="text-gray-400 text-sm">Complete your profile with projects and skills</p>
                        </motion.div>
                        
                        <motion.div
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/20 rounded-2xl p-6 backdrop-blur-sm"
                        >
                            <FaHeart className="text-3xl text-green-400 mb-3 mx-auto" />
                            <h3 className="text-white font-semibold mb-2">Be Genuine</h3>
                            <p className="text-gray-400 text-sm">Authentic connections lead to meaningful collaborations</p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                >
                    <motion.button
                        onClick={onNavigateToFeed}
                        className="group relative bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transition-all duration-300 flex items-center gap-3 mx-auto"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="text-lg">Start Exploring Profiles</span>
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <FaArrowRight className="text-lg" />
                        </motion.div>
                        
                        {/* Button glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10"></div>
                    </motion.button>
                </motion.div>

                {/* Floating Code Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{ 
                            rotate: 360,
                            x: [0, 100, -100, 0],
                            y: [0, -50, 50, 0]
                        }}
                        transition={{ 
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute top-1/4 left-1/4 text-purple-400/20 text-4xl"
                    >
                        {'{}'}
                    </motion.div>
                    
                    <motion.div
                        animate={{ 
                            rotate: -360,
                            x: [0, -80, 120, 0],
                            y: [0, 80, -60, 0]
                        }}
                        transition={{ 
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute top-3/4 right-1/4 text-pink-400/20 text-3xl"
                    >
                        {'</>'}
                    </motion.div>
                    
                    <motion.div
                        animate={{ 
                            scale: [1, 1.2, 0.8, 1],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{ 
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute top-1/2 right-1/3 text-blue-400/20 text-2xl"
                    >
                        {'()=>'}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default EmptyRequestsState;
