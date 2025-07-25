/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { FaHeart, FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    ProfileCard,
    PageLayout,
    PageHeader,
    KeyboardHints,
    CompletionScreen
} from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import { removeUser } from '../utils/userSlicer';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { createApiUrl, API_ENDPOINTS } from '../utils/apiConfig';


const Feed = () => {
    const [current, setCurrent] = useState(0);
    const [swipe, setSwipe] = useState(null); // 'left' or 'right'
    const [isLoading, setIsLoading] = useState(false);
    const timeoutRef = useRef(null);
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    

    const user = useSelector((state) => state.user);
    const feed = useSelector((state) => state.feed);
    
    // Redirect to login if no user
    useEffect(() => {
        if (!user) {
            console.log("No user found, redirecting to login");
            Navigate('/login');
            return;
        }
    }, [user, Navigate]);

    const getFeed = useCallback(async () => {
        if (feed || !user || isLoading) return;
        
        setIsLoading(true);
        try {
            console.log("Fetching feed data...");
            const response = await axios.get(createApiUrl(API_ENDPOINTS.FEED), {
                withCredentials: true
            });
            console.log("Feed response:", response.data);
            dispatch(addFeed(response?.data?.data));
        } catch (err) {
            console.error("Error fetching feed:", err);
            // The global interceptor will handle 401 errors
            // Just log here and let it handle the auth state cleanup
        } finally {
            setIsLoading(false);
        }
    }, [feed, user, dispatch, isLoading]);

    // Get feed data when component mounts
    useEffect(() => {
        if (user && !feed) {
            getFeed();
        }
    }, [user, feed, getFeed]);

    const sendRequest = async ()=>{
        
    }
    
    // Remove the old useEffect that was calling getFeed
    // useEffect(() => {
    //     getFeed()
    // }, []);

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


    if (!feed && isLoading) {
        return (
            <PageLayout fullHeight compact>
                <div className="flex flex-1 items-center justify-center min-h-[60vh] px-4 sm:px-6">
                    <div className="text-center">
                        <div className="text-4xl mb-4">🔄</div>
                        <h2 className="text-xl font-bold text-white mb-2">Loading Feed...</h2>
                        <p className="text-gray-400">Finding awesome developers for you</p>
                    </div>
                </div>
            </PageLayout>
        );
    }

    if (!feed) return null;
    console.log("Feed:", feed);

    if (current >= feed.length) {
        return (
            <PageLayout fullHeight compact>
                <div className="flex flex-1 items-center justify-center min-h-[60vh] px-4 sm:px-6">
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
            <PageLayout fullHeight>
                <div className="flex flex-col flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <PageHeader
                        title="DevTinder"
                        subtitle="Find your next coding partner"
                    />
                    <div className="flex-1 flex items-center justify-center py-4 sm:py-8">
                        <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
                            <AnimatePresence custom={swipe}>
                                <ProfileCard
                                    profile={profile}
                                    swipe={swipe}
                                    onSwipe={handleSwipe}
                                />
                            </AnimatePresence>
                        </div>
                    </div>
                    
                    {/* Mobile Keyboard Hints */}
                    <div className="sm:hidden pb-4">
                        <KeyboardHints />
                    </div>
                </div>

                <ToastContainer />
            </PageLayout>
        </>
    );
};

export default Feed;