/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUsers, FaSearch, FaCode, FaWifi, FaExclamationTriangle } from 'react-icons/fa';
import ConnectionCard from '../ConnectionCard';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.3 }
    }
};

const ConnectionsList = ({ connections = [], loading = false, error = null, onRefresh }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredConnections, setFilteredConnections] = useState(connections);

    useEffect(() => {
        if (searchTerm) {
            const filtered = connections.filter(connection => 
                `${connection.firstName} ${connection.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredConnections(filtered);
        } else {
            setFilteredConnections(connections);
        }
    }, [searchTerm, connections]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-20">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="inline-block mb-4"
                        >
                            <FaCode className="text-6xl text-green-400" />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-white mb-2">Loading Connections...</h2>
                        <p className="text-gray-400 font-mono">Compiling your developer network</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-20">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="inline-block mb-4"
                        >
                            <FaExclamationTriangle className="text-6xl text-red-400" />
                        </motion.div>
                        <h2 className="text-2xl font-bold text-white mb-2">Connection Error</h2>
                        <p className="text-gray-400 font-mono mb-6">{error}</p>
                        <motion.button
                            onClick={onRefresh}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Try Again
                        </motion.button>
                    </div>
                </div>
            </div>
        );
    }

    if (connections.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-white mb-2">No connections found</h2>
                        <p className="text-gray-400 font-mono">This state should not be reached</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-xl">
                                <FaUsers className="text-white text-xl" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                                    My Connections
                                </h1>
                                <p className="text-gray-400 font-mono">
                                    {connections.length} developer{connections.length !== 1 ? 's' : ''} in your network
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <FaWifi className="text-green-400" />
                            <span className="text-green-400 text-sm font-mono">Online</span>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative max-w-md">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search connections..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-gray-800/50 border border-gray-600/30 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                        />
                    </div>
                </motion.div>

                {/* Connections Grid */}
                <AnimatePresence mode="wait">
                    {filteredConnections.length === 0 && searchTerm ? (
                        <motion.div
                            key="no-results"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="text-center py-20"
                        >
                            <FaSearch className="text-6xl text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">No Results Found</h3>
                            <p className="text-gray-400 font-mono">
                                No connections match "{searchTerm}"
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="connections-grid"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            {filteredConnections.map((connection, index) => (
                                <motion.div
                                    key={connection._id}
                                    variants={itemVariants}
                                    layout
                                >
                                    <ConnectionCard connection={connection} index={index} />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Stats Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center"
                >
                    <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/30 rounded-xl p-6 inline-block">
                        <div className="flex items-center gap-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-400">{connections.length}</div>
                                <div className="text-gray-400 text-sm font-mono">Total</div>
                            </div>
                            <div className="w-px h-8 bg-gray-600"></div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-400">{filteredConnections.length}</div>
                                <div className="text-gray-400 text-sm font-mono">Showing</div>
                            </div>
                            <div className="w-px h-8 bg-gray-600"></div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-400">∞</div>
                                <div className="text-gray-400 text-sm font-mono">Potential</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ConnectionsList;
