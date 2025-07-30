import React from 'react';
import { useState ,useEffect } from 'react';
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
import apiClient from '../utils/apiClient';
import { useNavigate, Link } from 'react-router';
import LoginError from '../components/auth/LoginError';
import { useSelector } from 'react-redux';
import { API_ENDPOINTS } from '../utils/apiConfig';
import { setToken } from '../utils/tokenUtils';
const Login = () => {
    const [emailId, setEmail] = useState('aman@gmail.com');
    const [password, setPassword] = useState('Rishi@123');
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    
    useEffect(() => {
        if (user) {
            navigate('/feed');
        }
    }, [user, navigate]);

  
    const handleLogin = async ()=>{
        try{
            const response = await apiClient.post(API_ENDPOINTS.LOGIN,
                {
                    emailId,
                    password
                }
            );
            console.log("Login successful:", response.data);  
            
            // Store token in localStorage if provided
            if (response.data.token) {
                setToken(response.data.token);
                console.log("Token stored in localStorage");
            }
            
            // Set user data in Redux
            dispatch(setUser(response.data));
            
            // Add a small delay to ensure Redux state is updated
            await new Promise(resolve => setTimeout(resolve, 50));
            
            // Then navigate to feed
            return navigate('/feed'); 
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
                    <Link to="/forgot-password" className="text-[#ff512f] hover:underline">
                        Forgot password?
                    </Link>
                </div>

                <SubmitButton type="submit" text="Log In" />
            </form>

            <div className="text-center text-gray-400 text-sm">
                Don't have an account?{' '}
                <Link to="/signup" className="text-[#ff512f] hover:underline">
                    Sign up
                </Link>
            </div>
        </AuthLayout>
    );
};

export default Login;