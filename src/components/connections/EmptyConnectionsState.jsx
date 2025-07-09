/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaArrowRight, FaHeart, FaCode } from 'react-icons/fa';

const EmptyConnectionsState = ({ onNavigateToFeed }) => {
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
                            className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-2xl"
                        />
                        <div className="relative bg-gradient-to-r from-green-400 to-blue-500 p-8 rounded-full">
                            <FaUsers className="text-6xl text-white" />
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
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
                        Your Network Awaits
                    </h1>
                    <p className="text-xl text-gray-300 mb-2 font-light">
                        No connections yet, but every great coder started somewhere!
                    </p>
                    <p className="text-gray-400 font-mono text-sm">
                        // TODO: Build your developer network
                    </p>
                </motion.div>

                {/* Features List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="grid md:grid-cols-3 gap-6 mb-8"
                >
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-green-400/20 rounded-xl p-6">
                        <FaHeart className="text-3xl text-red-400 mb-3 mx-auto" />
                        <h3 className="text-lg font-semibold text-white mb-2">Swipe Right</h3>
                        <p className="text-gray-400 text-sm">
                            Find developers that match your interests and tech stack
                        </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-blue-400/20 rounded-xl p-6">
                        <FaCode className="text-3xl text-blue-400 mb-3 mx-auto" />
                        <h3 className="text-lg font-semibold text-white mb-2">Connect</h3>
                        <p className="text-gray-400 text-sm">
                            Build meaningful relationships with fellow developers
                        </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-purple-400/20 rounded-xl p-6">
                        <FaUsers className="text-3xl text-purple-400 mb-3 mx-auto" />
                        <h3 className="text-lg font-semibold text-white mb-2">Collaborate</h3>
                        <p className="text-gray-400 text-sm">
                            Work together on projects and share knowledge
                        </p>
                    </div>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                >
                    <motion.button
                        onClick={onNavigateToFeed}
                        className="group bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                        whileHover={{ 
                            scale: 1.05,
                            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="flex items-center gap-3">
                            Start Connecting
                            <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ 
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <FaArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
                            </motion.div>
                        </span>
                    </motion.button>
                </motion.div>

                {/* Code Block Decoration */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="mt-12 bg-gray-900/80 border border-gray-700/50 rounded-lg p-4 font-mono text-sm text-left max-w-md mx-auto"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-gray-500 ml-2">connections.js</span>
                    </div>
                    <div className="text-gray-300">
                        <span className="text-purple-400">const</span>{" "}
                        <span className="text-blue-400">myNetwork</span>{" "}
                        <span className="text-white">=</span>{" "}
                        <span className="text-yellow-400">[]</span><span className="text-gray-500">;</span>
                        <br />
                        <span className="text-gray-500">// Let's change that! 🚀</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default EmptyConnectionsState;
