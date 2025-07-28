/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaCode, FaUserPlus, FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
            duration: 0.4, 
            type: "spring",
            stiffness: 300,
            damping: 30
        }
    },
    hover: { 
        scale: 1.02,
        y: -8,
        transition: { duration: 0.2 }
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        y: -20,
        transition: { duration: 0.3 }
    }
};

const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
};

const RequestCard = ({ request, onAccept, onReject, index = 0 }) => {
    // console.log('RequestCard:', request);
    // console.log('RequestCard index:', request.fromUserId);
    // const { firstName, lastName, photo

    const { fromUserId } = request;
    // console.log('fromUserId:', fromUserId);
    const [isProcessing, setIsProcessing] = useState(false);
    const [actionTaken, setActionTaken] = useState(null);

    const handleAccept = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        setActionTaken('accepted');
        
        try {
            await onAccept(fromUserId._id);
        } catch (error) {
            setIsProcessing(false);
            setActionTaken(null);
            // console.error('Error accepting request:', error);
        }
    };

    const handleReject = async () => {
        if (isProcessing) return;
        setIsProcessing(true);
        setActionTaken('rejected');
        
        try {
            await onReject(fromUserId._id);
        } catch (error) {
            setIsProcessing(false);
            setActionTaken(null);
            console.error('Error rejecting request:', error);
        }
    };

    const handleViewProfile = () => {
        // console.log('View profile for:', fromUserId._id);
        // TODO: Navigate to user profile or show modal
    };

    if (actionTaken) {
        return (
            <motion.div
                variants={cardVariants}
                initial="visible"
                animate="exit"
                className="relative bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-full max-w-sm border overflow-hidden"
                style={{
                    borderColor: actionTaken === 'accepted' ? 'rgba(16, 185, 129, 0.5)' : 'rgba(239, 68, 68, 0.5)',
                    background: actionTaken === 'accepted' 
                        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(17, 24, 39, 0.95) 100%)'
                        : 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(17, 24, 39, 0.95) 100%)',
                }}
            >
                <div className="flex items-center justify-center h-32">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`p-4 rounded-full ${actionTaken === 'accepted' ? 'bg-green-500' : 'bg-red-500'}`}
                    >
                        {actionTaken === 'accepted' ? (
                            <FaCheck className="text-white text-2xl" />
                        ) : (
                            <FaTimes className="text-white text-2xl" />
                        )}
                    </motion.div>
                </div>
                <div className="text-center">
                    <p className={`text-lg font-semibold ${actionTaken === 'accepted' ? 'text-green-400' : 'text-red-400'}`}>
                        {actionTaken === 'accepted' ? 'Request Accepted!' : 'Request Rejected'}
                    </p>
                </div>
            </motion.div>
        );
    }
    
    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            custom={index}
            className="relative bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-purple-400/30 overflow-hidden group"
            style={{
                background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 100%)',
                backdropFilter: 'blur(16px)',
                borderImage: 'linear-gradient(135deg, #8b5cf6, #3b82f6, #10b981) 1',
            }}
        >
            {/* Decorative elements */}
            <div className="absolute top-4 right-4 flex gap-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Request badge */}
            <div className="absolute top-4 left-4 bg-purple-500/20 border border-purple-400/50 rounded-full px-2 py-1 flex items-center gap-1">
                <FaUserPlus className="text-purple-400 text-xs" />
                <span className="text-purple-400 text-xs font-mono">New Request</span>
            </div>

            {/* Profile Image with glow effect */}
            <div className="relative mb-4 mt-8 flex justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full blur-md opacity-50 animate-pulse"></div>
                <motion.img
                    src={fromUserId.photoUrl || 'https://via.placeholder.com/150'}
                    alt={`${fromUserId.firstName} ${fromUserId.lastName}`}
                    className="relative w-24 h-24 rounded-full border-3 border-purple-400 shadow-xl object-cover cursor-pointer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    onClick={handleViewProfile}
                    onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${fromUserId.firstName}+${fromUserId.lastName}&background=8b5cf6&color=fff&size=150`;
                    }}
                />
                <div className="absolute -bottom-1 -right-1 bg-pink-500 p-1.5 rounded-full border-2 border-gray-800">
                    <FaHeart className="text-white text-xs" />
                </div>
            </div>

            {/* Name and Details */}
            <div className="text-center mb-4" onClick={handleViewProfile}>
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-600 bg-clip-text text-transparent mb1 cursor-pointer hover:scale-105 transition-transform">
                    {fromUserId.firstName} {fromUserId.lastName}
                </h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-400 text-sm font-mono capitalize">
                        {fromUserId.gender || 'Developer'} {fromUserId.age && `• ${fromUserId.age} years`}
                    </span>
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full"></div>
                </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 justify-center">
                <motion.button
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleReject}
                    disabled={isProcessing}
                    className="group/btn bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-400/30 hover:border-red-400 text-red-300 hover:text-white p-3 rounded-xl transition-all duration-300 hover:from-red-500/30 hover:to-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex-1 flex items-center justify-center gap-2"
                >
                    <FaTimes className="text-sm group-hover/btn:scale-110 transition-transform" />
                    <span className="font-semibold">
                        {isProcessing && actionTaken === 'rejected' ? 'Rejecting...' : 'Reject'}
                    </span>
                </motion.button>
                
                <motion.button
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleAccept}
                    disabled={isProcessing}
                    className="group/btn bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 hover:border-green-400 text-green-300 hover:text-white p-3 rounded-xl transition-all duration-300 hover:from-green-500/30 hover:to-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex-1 flex items-center justify-center gap-2"
                >
                    <FaCheck className="text-sm group-hover/btn:scale-110 transition-transform" />
                    <span className="font-semibold">
                        {isProcessing && actionTaken === 'accepted' ? 'Accepting...' : 'Accept'}
                    </span>
                </motion.button>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
        </motion.div>
    );
};

export default RequestCard;
