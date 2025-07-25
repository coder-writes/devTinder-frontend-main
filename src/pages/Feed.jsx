/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaHeart, FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    ProfileCard,
    DevBackground,
    PageLayout,
    PageHeader,
    KeyboardHints,
    CompletionScreen
} from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { createApiUrl, API_ENDPOINTS } from '../utils/apiConfig';


const Feed = () => {
    const [current, setCurrent] = useState(0);
    const [swipe, setSwipe] = useState(null); // 'left' or 'right'
    const timeoutRef = useRef(null);
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    

    const user = useSelector((state) => state.user);
    
    if (user) {
        Navigate('/feed');
    }

    const feed = useSelector((state) => state.feed);
    useEffect(() => {
        if (!feed) {
            Navigate('/');
        }
    }, [feed, Navigate]);

    const getFeed = async () => {
        if (feed) return;
        try {
            const response = await axios.get(createApiUrl(API_ENDPOINTS.FEED), {
                withCredentials: true
            });
            dispatch(addFeed(response?.data?.data));
            Navigate('/feed');

        } catch (err) {
            console.log("Error fetching feed:", err);
        }
    }

    const sendRequest = async ()=>{
        
    }
    useEffect(() => {
        getFeed()
    }, []);

    // Toast for swipe actions
    const showToast = useCallback((direction, name) => {
        if (direction === 'right') {
            toast.success(`You want to code with ${name}! 💻`, {
                icon: <FaHeart color="#10b981" />,
                position: 'top-center',
                theme: 'dark',
                autoClose: 1500,
                style: {
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    color: '#10b981'
                }
            });
        } else {
            toast.error(`Maybe next time with ${name} 🤔`, {
                icon: <FaTimes color="#ef4444" />,
                position: 'top-center',
                theme: 'dark',
                autoClose: 1500,
                style: {
                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(156, 163, 175, 0.1) 100%)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#ef4444'
                }
            });
        }
    }, []);

    const handleSwipe = useCallback(
        async (direction) => {
            if (swipe) {
                return;
            }
            setSwipe(direction);
            const currentProfile = feed[current];
            showToast(direction, currentProfile?.firstName);

            // Send API request for interested or ignored
            const status = direction === 'right' ? 'interested' : 'ignored';
            if (currentProfile?._id) {
                try {
                    await axios.post(
                        createApiUrl(API_ENDPOINTS.SEND_REQUEST(status, currentProfile._id)),
                        {},
                        { withCredentials: true }
                    );
                } catch (err) {
                    console.error('Error sending request:', err);
                }
            }

            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setSwipe(null);
                setCurrent((prev) => prev + 1);
            }, 500);
        },
        [current, swipe, showToast, feed]
    );

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                handleSwipe('left');
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                handleSwipe('right');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleSwipe]);


    if (!feed) return;
    console.log("Feed:", feed);

    if (current >= feed.length) {
        return (
            <PageLayout backgroundComponent={<DevBackground />} fullHeight compact>
                <div className="flex flex-1 items-center justify-center min-h-[60vh] px-4">
                    <CompletionScreen
                        title="Mission Complete!"
                        message="You have explored all the people that were relevant to you"
                        subtitle="Ready to start coding together? 💻"
                    />
                </div>
                <ToastContainer />
            </PageLayout>
        );
    }
    

    const profile = feed[current];

    return (
        <>
            <PageLayout fullHeight backgroundComponent={<DevBackground />}>
                <div className="flex flex-col flex-1 w-full max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                    <div className="pt-20 sm:pt-24 md:pt-28 pb-4 sm:pb-6">
                        <PageHeader
                            title="DevTinder"
                            subtitle="Find your next coding partner"
                        />
                    </div>
                    
                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col items-center justify-center min-h-0 pb-4 sm:pb-6 md:pb-8">
                        {/* Profile Card Container */}
                        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl h-full max-h-[calc(100vh-200px)] flex items-center justify-center">
                            <AnimatePresence custom={swipe} mode="wait">
                                <ProfileCard
                                    key={current} // Add key for better animation handling
                                    profile={profile}
                                    swipe={swipe}
                                    onSwipe={handleSwipe}
                                />
                            </AnimatePresence>
                        </div>
                        
                        {/* Keyboard Hints - Only show on larger screens */}
                        <div className="hidden md:block mt-6 lg:mt-8">
                            <KeyboardHints />
                        </div>
                        
                        {/* Mobile Action Buttons */}
                        <div className="flex md:hidden gap-6 mt-4 sm:mt-6 px-4">
                            <button
                                onClick={() => handleSwipe('left')}
                                disabled={!!swipe}
                                className="flex-1 max-w-[120px] h-14 rounded-full bg-gradient-to-r from-red-500/20 to-red-600/20 border-2 border-red-500/50 backdrop-blur-sm transition-all duration-300 hover:from-red-500/30 hover:to-red-600/30 hover:border-red-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
                            >
                                <FaTimes className="text-red-400 text-xl group-hover:scale-110 transition-transform duration-200" />
                            </button>
                            <button
                                onClick={() => handleSwipe('right')}
                                disabled={!!swipe}
                                className="flex-1 max-w-[120px] h-14 rounded-full bg-gradient-to-r from-green-500/20 to-green-600/20 border-2 border-green-500/50 backdrop-blur-sm transition-all duration-300 hover:from-green-500/30 hover:to-green-600/30 hover:border-green-400 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
                            >
                                <FaHeart className="text-green-400 text-xl group-hover:scale-110 transition-transform duration-200" />
                            </button>
                        </div>
                        
                        {/* Progress Indicator */}
                        <div className="mt-4 sm:mt-6 w-full max-w-md">
                            <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                                <span>Progress</span>
                                <span>{Math.min(current + 1, feed.length)} / {feed.length}</span>
                            </div>
                            <div className="w-full bg-gray-700/50 rounded-full h-2 backdrop-blur-sm">
                                <div 
                                    className="bg-gradient-to-r from-pink-500 to-yellow-500 h-2 rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${((current + 1) / feed.length) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <ToastContainer 
                    position="top-center"
                    autoClose={1500}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    toastStyle={{
                        background: 'rgba(31, 41, 55, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        fontSize: '14px'
                    }}
                />
            </PageLayout>
        </>
    );
};

export default Feed;