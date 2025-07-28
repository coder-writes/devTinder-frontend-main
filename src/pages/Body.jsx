import { Outlet } from "react-router";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlicer.js";
import { useNavigate } from "react-router";
import { useEffect, } from "react";
import { createApiUrl, API_ENDPOINTS } from "../utils/apiConfig";
import axios from "axios";


const Body = () => {
    const userData = useSelector((state)=>state.user);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const fetchUser = async () => {
        try{
            const res = await axios.get(createApiUrl(API_ENDPOINTS.PROFILE_VIEW), {
                withCredentials: true,
            });
            dispatch(setUser(res.data));
        }catch(err){
            console.error("Error fetching user data:", err);
        }
    }

    useEffect(()=>{
        fetchUser();
    },[]);
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
