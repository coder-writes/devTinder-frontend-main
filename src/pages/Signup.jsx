import React from 'react';
import { Mail, Lock, User } from 'lucide-react';
import {
    AuthLayout,
    AuthLogo,
    AuthHeader,
    AuthDivider,
    SocialLoginButtons,
    InputField,
    SubmitButton
} from '../components';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { setUser } from '../utils/userSlicer';
import { useDispatch } from 'react-redux';
import { createApiUrl, API_ENDPOINTS } from '../utils/apiConfig';
import { ToastContainer , toast } from 'react-toastify';

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailID] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/feed');
        }
    }, [user, navigate]);

    if (user) {
        return null; 
    }

    const handleSignUp = async () => {
        try {
            const res = await axios.post(
                createApiUrl(API_ENDPOINTS.SIGNUP),
                { firstName, lastName, emailId, password},
                { withCredentials: true }
            );
            dispatch(setUser(res.data.data));
            return navigate('/settings/edit-profile');
        } catch (err) {
            const errorMessage = err?.response?.data?.message || err?.response?.data || err?.message || "Signup failed. Please try again.";
            toast.error(errorMessage);
            console.error("Signup failed:", err);
        }
    };

    return (
        <AuthLayout>
            <AuthLogo />
            <AuthHeader 
                title="Create Your Account"
                subtitle="Join DevTinder and connect with awesome devs!"
                />

            <SocialLoginButtons type="signup" />
            <ToastContainer />

            <AuthDivider text="or sign up with your email" />
            <form 
                className="space-y-4" 
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSignUp();
                }}
            >
                <InputField 
                    type="text"
                    placeholder="First Name"
                    onChange={(e)=> setFirstName(e.target.value)}
                    icon={User}
                />
                <InputField 
                    type="text"
                    placeholder="Last Name"
                    onChange={(e)=> setLastName(e.target.value)}
                    icon={User}
                />

                <InputField 
                    type="email"
                    placeholder="Email Address"
                    onChange={(e)=> setEmailID(e.target.value)}
                    icon={Mail}
                />

                <InputField 
                    type="password"
                    placeholder="Password"
                    onChange={(e)=> setPassword(e.target.value)}
                    icon={Lock}
                />

                <div className="flex items-center gap-2 text-sm text-gray-300">
                    <input type="checkbox" className="w-4 h-4 accent-orange-500" />
                    <span>
                        I agree to the
                        <Link to="/terms" className="text-orange-500 ml-1 hover:underline">Terms of Service</Link> and
                        <Link to="/privacy" className="text-orange-500 ml-1 hover:underline">Privacy Policy</Link>.
                    </span>
                </div>
                <SubmitButton type="submit" text="Create Account" />
            </form>

            <div className="text-center text-gray-400 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-orange-500 hover:underline">
                    Log in
                </Link>
            </div>
        </AuthLayout>
    );
};

export default Signup;
