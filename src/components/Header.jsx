import React from 'react';
import { motion as Motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { removeUser } from '../utils/userSlicer';
import { createApiUrl, API_ENDPOINTS } from '../utils/apiConfig';

const Header = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = React.useState(false);

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClick = (e) => {
            if (!e.target.closest("#user-menu")) setMenuOpen(false);
        };
        if (menuOpen) document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [menuOpen]);

    const handleLogout = async () => {
        try{
            const response = await axios.post(createApiUrl(API_ENDPOINTS.LOGOUT), {}, { withCredentials: true });
            // console.log("Logout successful:", response);
            if(response.status === 200) {
                dispatch(removeUser());
                dispatch({ type: "feed/addFeed", payload: null });
                navigate('/');
                // console.log("User logged out successfully");
            }
        }catch(err){
            // console.error("Logout failed:", err);
        }
    };

    const handleLogoClick = () => {
        if (user) {
            navigate('/feed');
        } else {
            navigate('/');
        }
    };

    return (
        <Motion.header
            className="w-full py-3 md:py-4 lg:py-6 px-4 md:px-6 flex items-center justify-between bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl backdrop-blur-lg relative z-50"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, type: 'spring' }}
            style={{
                borderBottom: `2px solid rgba(249, 115, 22, 0.3)`,
                boxShadow: `0 8px 32px 0 rgba(249, 115, 22, 0.15)`,
            }}
        >
            <div className="flex items-center gap-2 md:gap-4">
                <Motion.img
                    src="https://img.icons8.com/ios-filled/48/ffffff/source-code.png"
                    alt="DevTinder Logo"
                    onClick={handleLogoClick}
                    className="w-8 h-8 md:w-10 lg:w-12 md:h-10 lg:h-12 rounded-full shadow-lg cursor-pointer"
                    initial={{ rotate: -20, scale: 0.7, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
                    style={{ filter: `drop-shadow(0 4px 16px rgba(249, 115, 22, 0.6))` }}
                />
                <Motion.h1
                    className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500 cursor-pointer"
                    onClick={handleLogoClick}
                    initial={{ scale: 0.8, letterSpacing: '0.05em' }}
                    animate={{ scale: 1, letterSpacing: '0.01em' }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                >
                    DevTinder
                </Motion.h1>
            </div>
            <Motion.nav
                className="hidden md:flex gap-4 lg:gap-6 xl:gap-8 text-white font-medium items-center"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                {!user && (
                    <>
                        <Motion.div whileHover={{ scale: 1.08 }}>
                            <Link
                                to="/"
                                className="hover:text-orange-400 transition-colors duration-200 relative group text-sm lg:text-base"
                            >
                                Home
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all group-hover:w-full"></span>
                            </Link>
                        </Motion.div>
                        <Motion.div whileHover={{ scale: 1.08 }}>
                            <Link
                                to="/about"
                                className="hover:text-orange-400 transition-colors duration-200 relative group text-sm lg:text-base"
                            >
                                About
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all group-hover:w-full"></span>
                            </Link>
                        </Motion.div>
                        <Motion.div whileHover={{ scale: 1.08 }}>
                            <Link
                                to="/contact"
                                className="hover:text-orange-400 transition-colors duration-200 relative group text-sm lg:text-base"
                            >
                                Contact
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all group-hover:w-full"></span>
                            </Link>
                        </Motion.div>
                        <Motion.div whileHover={{ scale: 1.08 }}>
                            <Link
                                to="/blogs"
                                className="hover:text-orange-400 transition-colors duration-200 relative group text-sm lg:text-base"
                            >
                                Blogs
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all group-hover:w-full"></span>
                            </Link>
                        </Motion.div>
                        <Motion.div
                            whileHover={{ scale: 1.12, boxShadow: `0 0 24px rgba(249, 115, 22, 0.8)` }}
                            whileTap={{ scale: 0.96 }}
                        >
                            <Link
                                to="/login"
                                className="ml-2 px-3 md:px-4 lg:px-6 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold shadow-lg hover:from-red-600 hover:to-orange-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 text-sm lg:text-base"
                            >
                                Login
                            </Link>
                        </Motion.div>
                    </>
                )}
                {user && (
                    <div className="relative z-[9999]" id="user-menu">
                        <button
                            type="button"
                            onClick={() => setMenuOpen((open) => !open)}
                            className="flex items-center focus:outline-none"
                        >
                            <img
                                src={user?.photoUrl}
                                alt={user.firstName}
                                className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-orange-400 shadow-md object-cover"
                                style={{ boxShadow: `0 2px 8px rgba(249, 115, 22, 0.4)` }}
                            />
                            <span className="ml-2 font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent text-sm md:text-base">
                                Welcome {user?.firstName}
                            </span>
                        </button>
                        {menuOpen && (
                            <Motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-lg py-2 z-[9999] border border-gray-600"
                                style={{ 
                                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
                                    zIndex: 9999
                                }}
                            >
                                <Link
                                    to="/settings"
                                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                                >
                                    Settings
                                </Link>
                                <Link to="/connections" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                                    Connections
                                </Link>
                                <Link to="/requests" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors">
                                    Requests
                                </Link>
                                <Link
                                    to="/my-blogs"
                                    className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                                >
                                    My Blogs
                                </Link>
                                <a
                                    onClick={handleLogout}
                                    className="block px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors font-semibold cursor-pointer"
                                >
                                    Log Out
                                </a>
                            </Motion.div>
                        )}
                    </div>
                )}
            </Motion.nav>

            {/* Mobile menu button for logged out users */}
            {!user && (
                <div className="md:hidden">
                    <Motion.div whileTap={{ scale: 0.96 }}>
                        <Link
                            to="/login"
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold shadow-lg text-sm"
                        >
                            Login
                        </Link>
                    </Motion.div>
                </div>
            )}
        </Motion.header>
    );
}

export default Header;