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
useEffect(() => {
    if (user) {
        Navigate('/feed');
    }
}, []);

    const feed = useSelector((state) => state.feed);
    useEffect(() => {
        if (!feed) {
            Navigate('/');
        }
    }, []);

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