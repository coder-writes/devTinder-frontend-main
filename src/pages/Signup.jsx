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
import { useNavigate } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import { setUser } from '../utils/userSlicer';
import { useDispatch } from 'react-redux';
import { createApiUrl, API_ENDPOINTS } from '../utils/apiConfig';
const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailID] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const dispatch = useDispatch();
const handleSignUp = async (e) => {
    if (e) e.preventDefault();
    try {
        const res = await axios.post(
            createApiUrl(API_ENDPOINTS.SIGNUP),
            { firstName, lastName, emailId, password, phoneNo },
            { withCredentials: true }
        );
        dispatch(setUser(res.data.data));
        // return navigate("/profile");
        navigate('/settings/edit-profile');
    } catch (err) {
        console.error("Signup failed:", err);
    }
};
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    if(user){
        navigate('/feed');
    }
    return (
        <AuthLayout>
            <AuthLogo />
            <AuthHeader 
                title="Create Your Account"
                subtitle="Join DevTinder and connect with awesome devs!"
            />

            <SocialLoginButtons type="signup" />

            <AuthDivider text="or sign up with your email" />
            <form className="space-y-3 sm:space-y-4" onSubmit={handleSignUp}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                </div>

                <InputField 
                    type="email"
                    placeholder="Email Address"
                    onChange={(e)=> setEmailID(e.target.value)}
                    icon={Mail}
                />

                <InputField 
                    type="text"
                    placeholder="Phone Number"
                    onChange={(e)=> setPhoneNo(e.target.value)}
                    icon={User}
                />

                <InputField 
                    type="password"
                    placeholder="Password"
                    onChange={(e)=> setPassword(e.target.value)}
                    icon={Lock}
                />

                <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                    <input type="checkbox" className="w-3 h-3 sm:w-4 sm:h-4 accent-[#ff512f] mt-0.5 flex-shrink-0" />
                    <span className="leading-tight">
                        I agree to the
                        <a href="/terms" className="text-[#ff512f] ml-1 hover:underline">Terms of Service</a> and
                        <a href="/privacy" className="text-[#ff512f] ml-1 hover:underline">Privacy Policy</a>.
                    </span>
                </div>
                <SubmitButton onClick={handleSignUp} text="Create Account" />
            </form>

            <div className="text-center text-gray-400 text-xs sm:text-sm">
                Already have an account?{' '}
                <a href="/login" className="text-[#ff512f] hover:underline">
                    Log in
                </a>
            </div>
        </AuthLayout>
    );
};

export default Signup;
