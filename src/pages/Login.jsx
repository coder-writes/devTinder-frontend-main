import React from 'react';
import { useState, useEffect } from 'react';
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
import { createApiUrl, API_ENDPOINTS, googleAuth } from '../utils/apiConfig';
import {useGoogleLogin} from '@react-oauth/google';

const Login = () => {
    const [emailId, setEmail] = useState('aman@gmail.com');
    const [password, setPassword] = useState('Rishi@123');
    const [error, setError] = useState(null);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    // Handle navigation when user is already logged in
    useEffect(() => {
        if (user) {
            navigate('/feed'); // Redirect to feed if user is already logged in
        }
    }, [user, navigate]);

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
            
            // Handle the new response format from backend
            if (response.data.user) {
                dispatch(setUser(response.data.user));
            } else {
                // Fallback for old format
                dispatch(setUser(response.data));
            }
            navigate('/feed'); 
        }catch(err){
            const errorMsg = err?.response?.data?.error || err?.response?.data?.message || err?.response?.data || "Login failed. Please try again.";
            setError(errorMsg);
            console.error("Login failed:", err);
        }
    }
    const responseGoogle = async (authResult) => {
        setIsGoogleLoading(true);
        setError(null); // Clear any previous errors
        
        try{
            console.log("Google auth result:", authResult);
            if(authResult?.code){
                console.log("Sending code to backend:", authResult.code);
                const result = await googleAuth(authResult.code);
                console.log("Backend response:", result);
                
                // Assuming your backend returns user data in result.data
                const userData = result.data.user;
                dispatch(setUser(userData));
                navigate('/feed');
            } else {
                console.error("No authorization code received");
                setError("Google login failed. No authorization code received.");
            }
        }   
        catch(err){
            console.error("Google login failed:", err);
            setError(err?.response?.data?.message || "Google login failed. Please try again.");
        } finally {
            setIsGoogleLoading(false);
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code',
    })
    return (
        <AuthLayout>
            <LoginError message={error ? (typeof error === 'string' ? error : error.message || "Login failed. Please try again.") : null} />
            <AuthLogo />
            <AuthHeader 
                title="Welcome Back"
                subtitle="Log in to DevTinder and connect with awesome devs!"
            />
            <SocialLoginButtons 
                onGoogleLogin={googleLogin} 
                type="login"
                isGoogleLoading={isGoogleLoading}
            />
            <AuthDivider text="or log in with your email" />
            <form
                className="space-y-4"
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
                <div className="flex items-center justify-between text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 accent-[#ff512f]" />
                        <span>Remember me</span>
                    </div>
                    <a href="/forgot-password" className="text-[#ff512f] hover:underline">
                        Forgot password?
                    </a>
                </div>

                <SubmitButton type="submit" text="Log In" />
            </form>

            <div className="text-center text-gray-400 text-sm">
                Don't have an account?{' '}
                <a href="/signup" className="text-[#ff512f] hover:underline">
                    Sign up
                </a>
            </div>
        </AuthLayout>
    );
};

export default Login;