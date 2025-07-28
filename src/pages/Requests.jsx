/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { addRequests, removeRequest } from '../utils/requestSlice';
import { PageLayout, RequestCard, EmptyRequestsState, PageHeader } from '../components';
import { createApiUrl, API_ENDPOINTS } from '../utils/apiConfig';

const Requests = () => {
    const requests = useSelector((state) => state.requests);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const reviewRequest = async (status, requestId) => {
        try {
            const response = await axios.post(
                createApiUrl(API_ENDPOINTS.REVIEW_REQUEST(status, requestId)),
                {},
                { withCredentials: true }
            );
            // console.log("Request reviewed successfully:", response);
            dispatch(removeRequest(requestId));
            
            const statusText = status === 'accepted' ? 'accepted' : 'rejected';
            toast.success(`Request ${statusText} successfully!`, {
                style: {
                    background: status === 'accepted' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    color: '#fff',
                    border: `1px solid ${status === 'accepted' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                },
            });
        } catch (err) {
            console.error("Error reviewing request:", err);
            toast.error("Failed to review request. Please try again.", {
                style: {
                    background: 'rgba(239, 68, 68, 0.1)',
                    color: '#fff',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                },
            });
            throw err;
        }
    };

    const fetchRequests = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(
                createApiUrl(API_ENDPOINTS.USER_REQUESTS_RECEIVED),
                { withCredentials: true }
            );
            dispatch(addRequests(response.data.data));
            // console.log("Requests fetched successfully:", response.data.data);
        } catch (err) {
            // console.error("Error fetching requests:", err);
            setError("Failed to load requests. Please try again.");
            toast.error("Failed to load requests", {
                style: {
                    background: 'rgba(239, 68, 68, 0.1)',
                    color: '#fff',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                },
            });
        } finally {
            setLoading(false);
        }
    }, [dispatch]);


    const handleNavigateToFeed = () => {
        navigate('/feed');
    };

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    if (loading) {
        return (
            <PageLayout>
                <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 border-3 border-purple-400 border-t-transparent rounded-full"
                    />
                </div>
            </PageLayout>
        );
    }

    if (error) {
        return (
            <PageLayout>
                <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-6">
                    <div className="text-center max-w-md">
                        <div className="text-red-400 text-6xl mb-4">⚠️</div>
                        <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
                        <p className="text-gray-400 mb-6">{error}</p>
                        <motion.button
                            onClick={fetchRequests}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Try Again
                        </motion.button>
                    </div>
                </div>
            </PageLayout>
        );
    }

    if (!requests || requests.length === 0) {
        return (
            <PageLayout>
                <EmptyRequestsState onNavigateToFeed={handleNavigateToFeed} />
            </PageLayout>
        );
    }

    return (
        <PageLayout>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
                <div className="max-w-7xl mx-auto">
                    <PageHeader
                        title="Connection Requests"
                        subtitle={`${requests.length} ${requests.length === 1 ? 'developer' : 'developers'} want to connect with you`}
                        icon="🤝"
                    />

                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        {requests.map((request, index) => (
                            <motion.div
                                key={request._id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ 
                                    duration: 0.5, 
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30
                                }}
                            >
                                <RequestCard
                                    request={request}
                                    onAccept={() => reviewRequest('accepted', request._id)}
                                    onReject={() => reviewRequest('rejected', request._id)}
                                    index={index}
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Stats Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-12 text-center"
                    >
                        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-2xl p-6 backdrop-blur-sm inline-block">
                            <p className="text-gray-300 font-mono text-sm">
                                💡 Tip: Review requests thoughtfully - great connections lead to amazing collaborations!
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </PageLayout>
    );
};

export default Requests;
