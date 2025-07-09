import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import ConnectionsList from '../components/connections/ConnectionsList';
import EmptyConnectionsState from '../components/connections/EmptyConnectionsState';

const Connections = () => {
    const [connections, setConnections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const getConnections = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('http://localhost:7777/user/connections', {
                withCredentials: true
            });
            console.log("Connections fetched successfully:", response?.data?.data);
            setConnections(response?.data?.data || []);
        } catch (err) {
            console.error("Error fetching connections:", err);
            setError(err.response?.data?.message || "Failed to fetch connections. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        getConnections();
    };

    const handleNavigateToFeed = () => {
        navigate('/feed');
    };

    useEffect(() => {
        getConnections();
    }, []);

    if (!loading && !error && connections.length === 0) {
        return <EmptyConnectionsState onNavigateToFeed={handleNavigateToFeed} />;
    }

    return (
        <ConnectionsList 
            connections={connections}
            loading={loading}
            error={error}
            onRefresh={handleRefresh}
        />
    );
};

export default Connections;
