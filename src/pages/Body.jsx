import { Outlet } from "react-router";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser, removeUser } from "../utils/userSlicer.js";
import { useNavigate } from "react-router";
import { useEffect, useCallback } from "react";
import { createApiUrl, API_ENDPOINTS } from "../utils/apiConfig";


const Body = () => {
    const userData = useSelector((state)=>state.user);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    
    const fetchUSer = useCallback(async()=>{
        // Check if we're in the middle of a logout process
        if(sessionStorage.getItem('logging_out') === 'true') {
            console.log("Logout in progress, skipping user fetch");
            return;
        }
        
        if(userData) {
            console.log("User already exists, skipping fetch:", userData);
            return;
        }
        
        console.log("Fetching user data...");
        try{
            const response = await fetch(createApiUrl(API_ENDPOINTS.PROFILE_VIEW), {
                method: 'GET',
                credentials: 'include', // This is the correct way to include cookies
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            console.log("Response status:", response.status);
            
            if(response.ok) {
                const data = await response.json();
                console.log("User data fetched successfully:", data);
                dispatch(setUser(data));
            } else if(response.status === 401 || response.status === 403) {
                // User is not authenticated, ensure they stay logged out
                console.log("User not authenticated, staying on current page");
                dispatch(removeUser());
                // Only redirect to login if not already on a public page
                const currentPath = window.location.pathname;
                if (currentPath !== '/' && currentPath !== '/login' && currentPath !== '/signup') {
                    Navigate('/login');
                }
            } else {
                console.log("Unexpected response status:", response.status);
            }
            
        }catch(err){
            console.error("Network error fetching user data:", err);
            // Don't redirect on network errors, might be temporary
        }
    }, [userData, dispatch, Navigate]);

    useEffect(()=>{
        fetchUSer();
    },[fetchUSer]);

    // Cleanup logout flag on component mount
    useEffect(() => {
        const cleanup = () => {
            if(sessionStorage.getItem('logging_out') === 'true') {
                sessionStorage.removeItem('logging_out');
            }
        };
        
        // Clean up after a short delay to allow logout process to complete
        const timer = setTimeout(cleanup, 1000);
        
        return () => {
            clearTimeout(timer);
            cleanup();
        };
    }, []);
        return (
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e] overflow-x-hidden">
                <Header/>
                <main className="flex-1 relative">
                    <Outlet/>
                </main>
                <Footer/>
            </div>
        )
};

export default Body;
