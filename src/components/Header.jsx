import React from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { colors } from '../theme/colors';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { removeUser } from '../utils/userSlicer';
import { createApiUrl, API_ENDPOINTS } from '../utils/apiConfig';
import { useNavigate } from 'react-router';
const Header = () => {

    const user = useSelector((state) => state.user);
    console.log("User data in Header:", user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClick = (e) => {
            if (!e.target.closest("#user-menu")) setMenuOpen(false);
            if (!e.target.closest("#mobile-menu")) setMobileMenuOpen(false);
        };
        if (menuOpen || mobileMenuOpen) document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [menuOpen, mobileMenuOpen]);

    const handleLogout = async () => {
        try{
            const response = await axios.post(createApiUrl(API_ENDPOINTS.LOGOUT), {}, { withCredentials: true });
            console.log("Logout successful:", response);
            if(response.status === 200) {
                dispatch(removeUser());
                dispatch({ type: "feed/addFeed", payload: null });
                window.location.href = '/';
                console.log("User logged out successfully");
                console.log("Redirecting to home page");
            }
        }catch(err){
            console.error("Logout failed:", err);
        }
    };

    const handleLogoClick = () => {
        if(user){
            return navigate('/feed');
        }else{
            return navigate('/');
        }
    };
    return (
        <Motion.header
            className={`fixed top-0 left-0 right-0 w-full py-3 sm:py-4 md:py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between bg-gradient-to-r ${colors.background.main} shadow-xl backdrop-blur-lg relative z-50 border-b border-white/10`}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
            style={{
                background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95) 0%, rgba(31, 41, 55, 0.95) 50%, rgba(17, 24, 39, 0.95) 100%)',
                backdropFilter: 'blur(20px)',
                borderBottom: `1px solid ${colors.primary.main}33`,
                boxShadow: `0 8px 32px 0 ${colors.primary.main}22, 0 0 0 1px rgba(255,255,255,0.05)`,
            }}
        >
            {/* Logo Section */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <Motion.div
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Motion.img
                        src="https://img.icons8.com/ios-filled/48/ffffff/source-code.png"
                        alt="DevTinder Logo"
                        onClick={handleLogoClick}
                        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full shadow-lg hover:cursor-pointer transition-all duration-300"
                        initial={{ rotate: -20, scale: 0.7, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
                        style={{ 
                            filter: `drop-shadow(0 4px 20px ${colors.primary.main}99)`,
                            background: 'linear-gradient(135deg, #ff512f, #dd2476)',
                            padding: '8px',
                            borderRadius: '50%'
                        }}
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 opacity-20 animate-pulse"></div>
                </Motion.div>
                <Motion.h1
                    className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl hover:cursor-pointer font-extrabold ${colors.text.primary} tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500`}
                    onClick={handleLogoClick}
                    initial={{ scale: 0.8, letterSpacing: '0.05em', opacity: 0 }}
                    animate={{ scale: 1, letterSpacing: '0.01em', opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    whileHover={{ 
                        scale: 1.05,
                        background: 'linear-gradient(135deg, #ff512f, #dd2476, #ffd93d)',
                        transition: { duration: 0.3 }
                    }}
                >
                    DevTinder
                </Motion.h1>
            </div>
            {/* Desktop Navigation Menu */}
            <div className="hidden md:block">
                {user ? (
                    <Motion.div
                        className="relative"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                    >
                        <Motion.button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className={`flex items-center gap-3 px-4 py-2 bg-gradient-to-r ${colors.background.surface} hover:${colors.background.secondary} rounded-full border border-white/10 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500/50`}
                            whileHover={{
                                boxShadow: `0 8px 25px 0 ${colors.primary.main}44`,
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Motion.img
                                src={user?.photoUrl || 'https://cdn-icons-png.flaticon.com/512/3003/3003035.png'}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover border-2 border-pink-500/50 shadow-lg"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.6, duration: 0.5, type: 'spring' }}
                                style={{ filter: 'drop-shadow(0 4px 12px rgba(236, 72, 153, 0.4))' }}
                            />
                            <span className={`${colors.text.primary} font-medium text-sm hidden lg:block max-w-32 truncate`}>
                                {user?.firstName || 'User'}
                            </span>
                            <Motion.div
                                animate={{ rotate: menuOpen ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="text-pink-400"
                            >
                                ▼
                            </Motion.div>
                        </Motion.button>

                        <AnimatePresence>
                            {menuOpen && (
                                <Motion.div
                                    className={`absolute right-0 top-14 w-56 bg-gradient-to-br ${colors.background.surface} border border-white/10 rounded-xl shadow-2xl backdrop-blur-md py-2 z-50`}
                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        boxShadow: `0 20px 50px 0 ${colors.primary.main}22, 0 0 0 1px rgba(255,255,255,0.05)`,
                                        background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.95) 0%, rgba(17, 24, 39, 0.95) 100%)'
                                    }}
                                >
                                    {[
                                        { label: 'Settings', path: '/settings', icon: '⚙️' },
                                        { label: 'Connections', path: '/connections', icon: '👥' },
                                        { label: 'Requests', path: '/requests', icon: '💌' },
                                        { label: 'My Blogs', path: '/my-blogs', icon: '📝' }
                                    ].map((item, index) => (
                                        <Motion.div
                                            key={item.path}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05, duration: 0.2 }}
                                        >
                                            <Link
                                                to={item.path}
                                                className={`w-full px-4 py-3 text-left ${colors.text.primary} hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-yellow-500/20 transition-all duration-300 flex items-center gap-3 group`}
                                                onClick={() => setMenuOpen(false)}
                                            >
                                                <Motion.span 
                                                    className="group-hover:scale-110 transition-transform duration-300"
                                                    whileHover={{ rotate: 10 }}
                                                >
                                                    {item.icon}
                                                </Motion.span>
                                                <span className="font-medium">{item.label}</span>
                                            </Link>
                                        </Motion.div>
                                    ))}
                                    
                                    <div className="border-t border-white/10 mt-2 pt-2">
                                        <Motion.button
                                            onClick={handleLogout}
                                            className={`w-full px-4 py-3 text-left ${colors.text.primary} hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20 transition-all duration-300 flex items-center gap-3 group`}
                                            whileHover={{ x: 4 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Motion.span 
                                                className="text-red-400 group-hover:text-red-300 transition-colors duration-300"
                                                whileHover={{ rotate: 15 }}
                                            >
                                                🚪
                                            </Motion.span>
                                            <span className="font-medium">Logout</span>
                                        </Motion.button>
                                    </div>
                                </Motion.div>
                            )}
                        </AnimatePresence>
                    </Motion.div>
                ) : (
                    <Motion.div
                        className="flex items-center gap-3"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                    >
                        <Link
                            to="/login"
                            className={`px-6 py-2 bg-gradient-to-r ${colors.primary.gradient} text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500/50`}
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className={`px-6 py-2 border-2 border-pink-500 ${colors.text.primary} font-semibold rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500/50`}
                        >
                            Sign Up
                        </Link>
                    </Motion.div>
                )}
            </div>

            {/* Mobile Hamburger Menu */}
            <div className="md:hidden">
                <Motion.button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className={`p-2 rounded-full bg-gradient-to-r ${colors.background.surface} border border-white/10 backdrop-blur-sm transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500/50`}
                    whileHover={{ 
                        scale: 1.05,
                        boxShadow: `0 8px 25px 0 ${colors.primary.main}44` 
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Motion.div
                        className="w-6 h-6 flex flex-col justify-center items-center"
                        animate={mobileMenuOpen ? "open" : "closed"}
                    >
                        <Motion.span
                            className={`block h-0.5 w-6 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full transition-all duration-300`}
                            variants={{
                                closed: { rotate: 0, y: 0, opacity: 1 },
                                open: { rotate: 45, y: 6, opacity: 1 }
                            }}
                        />
                        <Motion.span
                            className={`block h-0.5 w-6 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full mt-1.5 transition-all duration-300`}
                            variants={{
                                closed: { opacity: 1 },
                                open: { opacity: 0 }
                            }}
                        />
                        <Motion.span
                            className={`block h-0.5 w-6 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full mt-1.5 transition-all duration-300`}
                            variants={{
                                closed: { rotate: 0, y: 0, opacity: 1 },
                                open: { rotate: -45, y: -6, opacity: 1 }
                            }}
                        />
                    </Motion.div>
                </Motion.button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <Motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setMobileMenuOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Mobile Menu Panel */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <Motion.div
                        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-br ${colors.background.main} border-l border-white/10 shadow-2xl backdrop-blur-md z-50 md:hidden`}
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        style={{
                            background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.98) 0%, rgba(31, 41, 55, 0.98) 100%)',
                            backdropFilter: 'blur(20px)',
                            boxShadow: `-20px 0 50px 0 ${colors.primary.main}22`
                        }}
                    >
                        <div className="p-6 pt-20">
                            {user ? (
                                <Motion.div
                                    className="space-y-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1, duration: 0.4 }}
                                >
                                    {/* User Profile Section */}
                                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-500/10 to-yellow-500/10 rounded-xl border border-white/10">
                                        <Motion.img
                                            src={user?.photoUrl || 'https://cdn-icons-png.flaticon.com/512/3003/3003035.png'}
                                            alt="Profile"
                                            className="w-16 h-16 rounded-full object-cover border-2 border-pink-500/50 shadow-lg"
                                            whileHover={{ scale: 1.05 }}
                                            style={{ filter: 'drop-shadow(0 4px 12px rgba(236, 72, 153, 0.4))' }}
                                        />
                                        <div>
                                            <h3 className={`${colors.text.primary} font-semibold text-lg`}>
                                                {user?.firstName || 'User'}
                                            </h3>
                                            <p className="text-gray-400 text-sm">
                                                {user?.email || 'user@example.com'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Navigation Links */}
                                    <div className="space-y-2">
                                        {[
                                            { label: 'Feed', path: '/feed', icon: '🏠' },
                                            { label: 'Connections', path: '/connections', icon: '👥' },
                                            { label: 'Requests', path: '/requests', icon: '💌' },
                                            { label: 'Settings', path: '/settings', icon: '⚙️' },
                                            { label: 'My Blogs', path: '/my-blogs', icon: '📝' }
                                        ].map((item, index) => (
                                            <Motion.div
                                                key={item.path}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
                                            >
                                                <Link
                                                    to={item.path}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className={`flex items-center gap-4 p-4 ${colors.text.primary} hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-yellow-500/20 rounded-xl transition-all duration-300 group`}
                                                >
                                                    <Motion.span 
                                                        className="text-2xl group-hover:scale-110 transition-transform duration-300"
                                                        whileHover={{ rotate: 10 }}
                                                    >
                                                        {item.icon}
                                                    </Motion.span>
                                                    <span className="font-medium text-lg">{item.label}</span>
                                                </Link>
                                            </Motion.div>
                                        ))}
                                    </div>

                                    {/* Logout Button */}
                                    <Motion.button
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-4 p-4 ${colors.text.primary} hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20 rounded-xl transition-all duration-300 group mt-8`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6, duration: 0.4 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Motion.span 
                                            className="text-2xl text-red-400 group-hover:text-red-300 transition-colors duration-300"
                                            whileHover={{ rotate: 15 }}
                                        >
                                            🚪
                                        </Motion.span>
                                        <span className="font-medium text-lg">Logout</span>
                                    </Motion.button>
                                </Motion.div>
                            ) : (
                                <Motion.div
                                    className="space-y-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1, duration: 0.4 }}
                                >
                                    <Link
                                        to="/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`block w-full px-6 py-3 bg-gradient-to-r ${colors.primary.gradient} text-white font-semibold rounded-full text-center hover:shadow-lg hover:scale-105 transition-all duration-300`}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`block w-full px-6 py-3 border-2 border-pink-500 ${colors.text.primary} font-semibold rounded-full text-center hover:bg-pink-500 hover:text-white transition-all duration-300`}
                                    >
                                        Sign Up
                                    </Link>
                                </Motion.div>
                            )}
                        </div>
                    </Motion.div>
                )}
            </AnimatePresence>
        </Motion.header>
    );
}

export default Header;