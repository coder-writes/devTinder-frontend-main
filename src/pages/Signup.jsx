import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import {
    AuthLayout,
    AuthLogo,
    AuthHeader,
    AuthDivider,
    SocialLoginButtons,
    InputField,
    SubmitButton
} from '../components';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { setUser } from '../utils/userSlicer';
import { createApiUrl, API_ENDPOINTS } from '../utils/apiConfig';

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailID] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    if (user) {
        navigate('/feed');
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        try {
            const res = await axios.post(
                createApiUrl(API_ENDPOINTS.SIGNUP),
                { firstName, lastName, emailId, password, phoneNo },
                { withCredentials: true }
            );
            dispatch(setUser(res.data.data));
            navigate('/settings/edit-profile');
        } catch (err) {
            console.error("Signup failed:", err);
            setError("Signup failed. Please try again.");
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

            <AuthDivider text="or sign up with your email" />
            <form className="space-y-4" onSubmit={handleSignUp}>
                 {error && (
          <div className="text-red-500 text-sm font-semibold text-center animate-pulse">
            {error}
          </div>
        )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                        type="text"
                        placeholder="First Name"
                        onChange={(e) => setFirstName(e.target.value)}
                        icon={User}
                    />
                    <InputField
                        type="text"
                        placeholder="Last Name"
                        onChange={(e) => setLastName(e.target.value)}
                        icon={User}
                    />
                </div>

                <InputField
                    type="email"
                    placeholder="Email Address"
                    onChange={(e) => setEmailID(e.target.value)}
                    icon={Mail}
                />

                <InputField
                    type="text"
                    placeholder="Phone Number"
                    onChange={(e) => setPhoneNo(e.target.value)}
                    icon={User}
                />

                {/* Password Field with Toggle */}
                <div className="relative">
                    <InputField
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        icon={Lock}
                    />
                    <span
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                {/* Confirm Password Field with Toggle */}
                <div className="relative">
                    <InputField
                        type='password'
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        icon={Lock}
                    />

                </div>

                <div className="flex items-center gap-2 text-sm text-gray-300">
                    <input type="checkbox" className="w-4 h-4 accent-[#ff512f]" />
                    <span>
                        I agree to the
                        <a href="/terms" className="text-[#ff512f] ml-1 hover:underline">Terms of Service</a> and
                        <a href="/privacy" className="text-[#ff512f] ml-1 hover:underline">Privacy Policy</a>.
                    </span>
                </div>

                <SubmitButton type="submit" text="Create Account" />
            </form>

            <div className="text-center text-gray-400 text-sm">
                Already have an account?{' '}
                <a href="/login" className="text-[#ff512f] hover:underline">
                    Log in
                </a>
            </div>
        </AuthLayout>
    );
};

export default Signup;
