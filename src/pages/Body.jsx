import { Outlet } from "react-router";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlicer.js";
import { useNavigate } from "react-router";
import { useEffect, useCallback } from "react";
import { createApiUrl, API_ENDPOINTS } from "../utils/apiConfig";


const Body = () => {
    const userData = useSelector((state)=>state.user);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const fetchUSer = useCallback(async()=>{
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
            } 
            
        }catch(err){
            console.error("Network error fetching user data:", err);
            // Don't redirect on network errors, might be temporary
        }
    }, [userData, dispatch, Navigate]);

    useEffect(()=>{
        fetchUSer();
    },[fetchUSer]);
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
