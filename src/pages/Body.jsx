import { Outlet } from "react-router";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlicer.js";
import { useNavigate, useLocation } from "react-router";
import { useEffect, useRef } from "react";
import { API_ENDPOINTS } from "../utils/apiConfig";
import apiClient from "../utils/apiClient";
import { getToken, hasToken, isTokenExpired, removeToken } from "../utils/tokenUtils";


const Body = () => {
    const userData = useSelector((state)=>state.user);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const location = useLocation();
    const isAuthenticatingRef = useRef(false);

    useEffect(()=>{
        const fetchUserData = async () => {
            // Skip if user is already loaded or we're not on a protected route
            if (userData || isAuthenticatingRef.current) return;
            
            // Only fetch user data for protected routes
            const protectedRoutes = ['/feed', '/connections', '/requests', '/settings'];
            const isProtectedRoute = protectedRoutes.some(route => 
                location.pathname.startsWith(route)
            );
            
            if (!isProtectedRoute) return;

            // Check if we have a valid token
            if (!hasToken()) {
                console.log('No token found, redirecting to home');
                Navigate('/');
                return;
            }

            // Check if token is expired
            if (isTokenExpired()) {
                console.log('Token expired, removing and redirecting to home');
                removeToken();
                Navigate('/');
                return;
            }

            // Wait a bit to see if user gets set from login
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // Check again if user was set during the delay
            if (userData) return;

            console.log('Fetching user data for protected route:', location.pathname);
            console.log('Using token from localStorage for authentication');
            isAuthenticatingRef.current = true;
            
            try{
                const res = await apiClient.get(API_ENDPOINTS.PROFILE_VIEW);
                console.log('User data fetched successfully:', res.data);
                dispatch(setUser(res.data));
            }catch(err){
                console.error("Error fetching user data:", err);
                // If user fetch fails on protected route, remove token and redirect to home
                if (isProtectedRoute) {
                    removeToken();
                    Navigate('/');
                }
            } finally {
                isAuthenticatingRef.current = false;
            }
        };
        
        fetchUserData();
    }, [location.pathname, userData, dispatch, Navigate]); // Include all dependencies
        return (
            <div className="min-h-screen flex flex-col">
                <Header/>
                <main className="flex-1">
                    <Outlet/>
                </main>
                <Footer/>
            </div>
        )
};

export default Body;
