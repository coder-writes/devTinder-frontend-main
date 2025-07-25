import React from 'react';
import { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import {
    AuthLayout,
    AuthLogo,
    AuthHeader,
    AuthDivider,
    SocialLoginButtons,
    InputField,
    SubmitButton
} from '../components';
import { useDispatch } from 'react-redux';
import {setUser} from '../utils/userSlicer';
import axios from 'axios';
import { useNavigate } from 'react-router';
import LoginError from '../components/auth/LoginError';
import { useSelector } from 'react-redux';
import { createApiUrl, API_ENDPOINTS } from '../utils/apiConfig';
const Login = () => {
    const [emailId, setEmail] = useState('aman@gmail.com');
    const [password, setPassword] = useState('Rishi@123');
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    if(user) {
        navigate('/feed'); // Redirect to feed if user is already logged in// Prevent rendering the login page
    }
    const handleLogin = async ()=>{
        try{
            const response = await axios.post(
                createApiUrl(API_ENDPOINTS.LOGIN),
                {
                    emailId,
                    password
                },
                { withCredentials: true }
            );
                console.log("Login successful:", response.data);  
                dispatch(setUser(response.data));
                navigate('/feed'); 
        }catch(err){
            setError(err?.response?.data || "Login failed. Please try again.");
            console.error("Login failed:", err);
        }
    }
    return (
        <AuthLayout>
            <LoginError message={error ? (typeof error === 'string' ? error : error.message || "Login failed. Please try again.") : null} />
            <AuthLogo />
            <AuthHeader 
                title="Welcome Back"
                subtitle="Log in to DevTinder and connect with awesome devs!"
            />
            <SocialLoginButtons type="login" />
            <AuthDivider text="or log in with your email" />
            <form
                className="space-y-3 sm:space-y-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}
            >
                <InputField 
                    value={emailId}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email Address"
                    icon={Mail}
                />
                <InputField 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    icon={Lock}
                />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 text-xs sm:text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                        <input type="checkbox" className="w-3 h-3 sm:w-4 sm:h-4 accent-[#ff512f]" />
                        <span>Remember me</span>
                    </div>
                    <a href="/forgot-password" className="text-[#ff512f] hover:underline">
                        Forgot password?
                    </a>
                </div>

                <SubmitButton type="submit" text="Log In" />
            </form>

            <div className="text-center text-gray-400 text-xs sm:text-sm">
                Don't have an account?{' '}
                <a href="/signup" className="text-[#ff512f] hover:underline">
                    Sign up
                </a>
            </div>
        </AuthLayout>
    );
};

export default Login;