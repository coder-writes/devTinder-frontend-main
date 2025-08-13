import React, { useState } from 'react';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createApiUrl, API_ENDPOINTS } from '../utils/apiConfig';
import {
    AuthLayout,
    AuthLogo,
    AuthHeader,
    InputField,
    SubmitButton
} from '../components';

const ForgotPassword = () => {
    const [emailId, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!emailId.trim()) {
            setError('Please enter your email address');
            return;
        }

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await axios.post(
                createApiUrl(API_ENDPOINTS.FORGOT_PASSWORD),
                { emailId: emailId.trim() }
            );
            setMessage(response.data.message);
            setOtpSent(true);
        } catch (err) {
            console.error('Forgot password error:', err);
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!otp.trim()) {
            setError('Please enter the OTP sent to your email');
            return;
        }
        setError('');
        setVerifying(true);
        try {
            const response = await axios.post(
                createApiUrl(API_ENDPOINTS.VERIFY_OTP),
                { emailId: emailId.trim(), otp: otp.trim() }
            );
            const token = response.data?.resetToken;
            if (token) {
                navigate(`/reset-password/${token}`);
            } else {
                setError('Verification failed. Please try again.');
            }
        } catch (err) {
            console.error('Verify OTP error:', err);
            setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
        } finally {
            setVerifying(false);
        }
    };

    return (
        <AuthLayout>
            <AuthLogo />
            
            <div className="text-center mb-6">
                <Link 
                    to="/login" 
                    className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Login
                </Link>
            </div>

            <AuthHeader
                title={otpSent ? 'Enter Verification Code' : 'Forgot Password?'}
                subtitle={
                    otpSent
                        ? `We sent a 6-digit code to ${emailId}. Enter it below to continue.`
                        : "Enter your email and we'll send you a verification code"
                }
            />

            {!otpSent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-center">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg text-center">
                        {message}
                    </div>
                )}

                <InputField
                    value={emailId}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email address"
                    icon={Mail}
                    required
                />

                <SubmitButton 
                    type="submit" 
                    text={loading ? "Sending..." : "Send Code"}
                    disabled={loading}
                />
            </form>
            ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-center">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg text-center">
                        {message}
                    </div>
                )}

                <InputField
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    type="text"
                    placeholder="Enter 6-digit code"
                    icon={KeyRound}
                    required
                />

                <SubmitButton 
                    type="submit" 
                    text={verifying ? "Verifying..." : "Verify Code"}
                    disabled={verifying}
                />
            </form>
            )}

            <div className="text-center text-gray-400 text-sm mt-6">
                Remember your password?{' '}
                <Link to="/login" className="text-[#ff512f] hover:underline">
                    Log in
                </Link>
            </div>

            <div className="text-center text-gray-500 text-xs mt-4">
                {otpSent ? (
                    <>
                        <p>Enter the code we sent to your email. It expires in 10 minutes.</p>
                        <p>Didn't receive it? Check spam or request a new code.</p>
                    </>
                ) : (
                    <>
                        <p>We will send a 6-digit verification code to your email.</p>
                        <p>The code expires in 10 minutes for security.</p>
                    </>
                )}
            </div>
        </AuthLayout>
    );
};

export default ForgotPassword; 