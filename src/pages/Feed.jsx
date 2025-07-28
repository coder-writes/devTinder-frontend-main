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
import apiClient from '../utils/apiClient';
import { useNavigate } from 'react-router';
import { API_ENDPOINTS } from '../utils/apiConfig';


const Feed = () => {
    const [current, setCurrent] = useState(0);
    const [swipe, setSwipe] = useState(null); // 'left' or 'right'
    const timeoutRef = useRef(null);
    const Navigate = useNavigate();
    const dispatch = useDispatch();

    const feed = useSelector((state) => state.feed);
    const user = useSelector((state) => state.user);
    const hasFetchedRef = useRef(false);

    // Only fetch feed when user is authenticated and component mounts
    useEffect(() => {
        const getFeed = async () => {
            // Prevent multiple API calls and ensure user is authenticated
            if (feed || hasFetchedRef.current || !user) return;
            
            console.log('Attempting to fetch feed for user:', user?.firstName);
            
            // Add a longer delay to ensure cookies are properly set
            console.log('Waiting for cookies to be set...');
            await new Promise(resolve => setTimeout(resolve, 500));
            
            console.log('Cookies after delay:', document.cookie);
            
            hasFetchedRef.current = true;
            try {
                const response = await apiClient.get(API_ENDPOINTS.FEED);
                console.log('Feed fetched successfully:', response.data);
                dispatch(addFeed(response?.data?.data));
            } catch (err) {
                console.log("Error fetching feed:", err);
                hasFetchedRef.current = false; // Reset on error to allow retry
            }
        }
        
        getFeed();
    }, [feed, dispatch, user]); // Add user as dependency

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
                    await apiClient.post(
                        API_ENDPOINTS.SEND_REQUEST(status, currentProfile._id)
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

    // Show loading if user is not yet authenticated
    if (!user) {
        return (
            <PageLayout fullHeight compact>
                <div className="flex flex-1 items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                        <p className="text-white">Authenticating...</p>
                    </div>
                </div>
            </PageLayout>
        );
    }

    // Show loading if feed is being fetched
    if (!feed && hasFetchedRef.current) {
        return (
            <PageLayout fullHeight compact>
                <div className="flex flex-1 items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                        <p className="text-white">Loading your matches...</p>
                    </div>
                </div>
            </PageLayout>
        );
    }

    if (!feed) return null;
    // console.log("Feed:", feed);

    if (current >= feed.length) {
        return (
            <PageLayout fullHeight compact>
                <div className="flex flex-1 items-center justify-center min-h-[60vh]">
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
                <div className="flex flex-col flex-1 w-full max-w-7xl mx-auto px-2 md:px-4">
                    <PageHeader
                        title="DevTinder"
                        subtitle="Find your next coding partner"
                    />
                    <div className="flex-1 flex items-center justify-center p-2 md:p-4">
                        <AnimatePresence custom={swipe}>
                            <ProfileCard
                                profile={profile}
                                swipe={swipe}
                                onSwipe={handleSwipe}
                            />
                        </AnimatePresence>
                    </div>
                </div>

                <ToastContainer />
            </PageLayout>
        </>
    );
};

export default Feed;