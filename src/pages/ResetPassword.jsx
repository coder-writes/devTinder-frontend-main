import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { createApiUrl, API_ENDPOINTS } from '../utils/apiConfig';
import {
    AuthLayout,
    AuthLogo,
    AuthHeader,
    InputField,
    SubmitButton
} from '../components';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Password strength indicators
    const [passwordChecks, setPasswordChecks] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    });

    useEffect(() => {
        if (!token) {
            setError('Invalid reset link');
            return;
        }
        
        // Check password strength
        const checks = {
            length: newPassword.length >= 8,
            uppercase: /[A-Z]/.test(newPassword),
            lowercase: /[a-z]/.test(newPassword),
            number: /\d/.test(newPassword),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
        };
        setPasswordChecks(checks);
    }, [newPassword, token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!Object.values(passwordChecks).every(Boolean)) {
            setError('Please ensure your password meets all requirements');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post(
                createApiUrl(API_ENDPOINTS.RESET_PASSWORD(token)),
                { newPassword }
            );
            
            setSuccess(true);
            setNewPassword('');
            setConfirmPassword('');
            
            // Redirect to login after 3 seconds
            setTimeout(() => {
                navigate('/login');
            }, 3000);
            
        } catch (err) {
            console.error('Reset password error:', err);
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <AuthLayout>
                <AuthLogo />
                <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-white mb-2">Password Reset Successful!</h1>
                    <p className="text-gray-400 mb-6">
                        Your password has been updated. You will be redirected to the login page shortly.
                    </p>
                    <Link 
                        to="/login"
                        className="text-[#ff512f] hover:underline"
                    >
                        Go to Login Now
                    </Link>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout>
            <AuthLogo />
            
            <AuthHeader
                title="Reset Your Password"
                subtitle="Enter your new password below"
            />

            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-center">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div className="relative">
                        <InputField
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="New Password"
                            icon={Lock}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>

                    <div className="relative">
                        <InputField
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            type={showConfirm ? 'text' : 'password'}
                            placeholder="Confirm New Password"
                            icon={Lock}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                            {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Password Strength Indicator */}
                <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
                    <p className="text-sm text-gray-300 font-medium">Password Requirements:</p>
                    <div className="space-y-1">
                        <div className={`flex items-center text-sm ${passwordChecks.length ? 'text-green-400' : 'text-gray-500'}`}>
                            <CheckCircle className={`w-4 h-4 mr-2 ${passwordChecks.length ? 'text-green-400' : 'text-gray-500'}`} />
                            At least 8 characters
                        </div>
                        <div className={`flex items-center text-sm ${passwordChecks.uppercase ? 'text-green-400' : 'text-gray-500'}`}>
                            <CheckCircle className={`w-4 h-4 mr-2 ${passwordChecks.uppercase ? 'text-green-400' : 'text-gray-500'}`} />
                            One uppercase letter
                        </div>
                        <div className={`flex items-center text-sm ${passwordChecks.lowercase ? 'text-green-400' : 'text-gray-500'}`}>
                            <CheckCircle className={`w-4 h-4 mr-2 ${passwordChecks.lowercase ? 'text-green-400' : 'text-gray-500'}`} />
                            One lowercase letter
                        </div>
                        <div className={`flex items-center text-sm ${passwordChecks.number ? 'text-green-400' : 'text-gray-500'}`}>
                            <CheckCircle className={`w-4 h-4 mr-2 ${passwordChecks.number ? 'text-green-400' : 'text-gray-500'}`} />
                            One number
                        </div>
                        <div className={`flex items-center text-sm ${passwordChecks.special ? 'text-green-400' : 'text-gray-500'}`}>
                            <CheckCircle className={`w-4 h-4 mr-2 ${passwordChecks.special ? 'text-green-400' : 'text-gray-500'}`} />
                            One special character
                        </div>
                    </div>
                </div>

                <SubmitButton 
                    type="submit" 
                    text={loading ? "Updating Password..." : "Update Password"}
                    disabled={loading || !Object.values(passwordChecks).every(Boolean)}
                />
            </form>

            <div className="text-center text-gray-400 text-sm mt-6">
                Remember your password?{' '}
                <Link to="/login" className="text-[#ff512f] hover:underline">
                    Log in
                </Link>
            </div>
        </AuthLayout>
    );
};

export default ResetPassword; 