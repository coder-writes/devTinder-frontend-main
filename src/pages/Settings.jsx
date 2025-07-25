import { useState, useEffect } from "react";
import { FaUserEdit, FaKey, FaTrash, FaCog, FaGithub } from "react-icons/fa";
import { Outlet, useNavigate, useLocation } from "react-router";
const sidebarItems = [
    { key: "editProfile", label: "Edit Profile", icon: <FaUserEdit />, route: "/settings/edit-profile" },
    { key: "changePassword", label: "Change Password", icon: <FaKey />, route: "/settings/change-password" },
    { key: "deleteAccount", label: "Delete Account", icon: <FaTrash />, route: "/settings/delete-account" },
];

function SettingsBackground() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#191b1e] via-[#232526] to-[#181a1b]"></div>
            
            {/* Responsive floating particles */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Mobile: 8 particles */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={`mobile-${i}`}
                        className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-[#00ffd0] rounded-full animate-pulse opacity-40 block sm:hidden"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 4}s`
                        }}
                    ></div>
                ))}
                {/* Tablet: 12 particles */}
                {[...Array(12)].map((_, i) => (
                    <div
                        key={`tablet-${i}`}
                        className="absolute w-1 h-1 bg-[#00ffd0] rounded-full animate-pulse opacity-40 hidden sm:block lg:hidden"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 4}s`
                        }}
                    ></div>
                ))}
                {/* Desktop: 15 particles */}
                {[...Array(15)].map((_, i) => (
                    <div
                        key={`desktop-${i}`}
                        className="absolute w-1 h-1 bg-[#00ffd0] rounded-full animate-pulse opacity-40 hidden lg:block"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 4}s`
                        }}
                    ></div>
                ))}
            </div>
            
            {/* Responsive CSS-only animated torus-like shape */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 border border-[#00ffd0] sm:border-2 opacity-20 rounded-full animate-spin" 
                     style={{ animationDuration: '20s' }}>
                    <div className="absolute inset-2 sm:inset-4 border border-[#00ffd0] rounded-full opacity-60 animate-spin" 
                         style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                        <div className="absolute inset-2 sm:inset-4 border border-[#00ffd0] rounded-full opacity-40 animate-spin" 
                             style={{ animationDuration: '10s' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Settings() {
    const [selected, setSelected] = useState("editProfile");
    const navigate = useNavigate();
    const location = useLocation();

    // Update selected based on current route
    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath.includes('edit-profile')) {
            setSelected('editProfile');
        } else if (currentPath.includes('change-password')) {
            setSelected('changePassword');
        } else if (currentPath.includes('delete-account')) {
            setSelected('deleteAccount');
        }
    }, [location.pathname]);

    const handleNavigation = (item) => {
        setSelected(item.key);
        navigate(item.route);
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-[#191b1e] via-[#232526] to-[#181a1b] font-mono text-[#e0e0e0] relative">
            {/* CSS-only animated background */}
            <SettingsBackground />
            {/* Overlay grid */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00ffd0" strokeWidth="0.12" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>
            <aside className="z-10 w-full md:w-[260px] bg-gradient-to-br from-[#181a1b]/95 to-[#232526]/90 border-b md:border-b-0 md:border-r border-[#00ffd0]/20 flex flex-col py-4 md:py-8 shadow-2xl">
                <div className="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl font-bold px-4 sm:px-6 md:px-8 pb-4 md:pb-8 text-[#00ffd0] tracking-wider">
                    <FaCog size={24} className="sm:w-6 sm:h-6 md:w-8 md:h-8" />
                    <span>Settings</span>
                </div>
                <nav className="flex flex-row md:flex-col gap-1 md:gap-2 overflow-x-auto md:overflow-visible px-2 md:px-0">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.key}
                            className={`flex items-center gap-2 md:gap-3 px-4 sm:px-6 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-md transition whitespace-nowrap md:whitespace-normal
                                ${
                                    selected === item.key
                                        ? "bg-gradient-to-r from-[#00ffd0]/30 to-[#232526] text-[#00ffd0] shadow-lg"
                                        : "hover:bg-[#232526]/80 hover:text-[#00ffd0] text-[#e0e0e0]"
                                }
                                font-medium font-mono`}
                            onClick={() => handleNavigation(item)}
                        >
                            <span className="md:hidden">{item.icon}</span>
                            <span className="hidden md:flex md:items-center md:gap-3">
                                {item.icon}
                                {item.label}
                            </span>
                            <span className="md:hidden text-xs">{item.label.split(' ')[0]}</span>
                        </button>
                    ))}
                </nav>
                <div className="mt-auto px-4 sm:px-6 md:px-8 pt-4 md:pt-8 flex items-center gap-2 text-[#00ffd0]/70 text-xs sm:text-sm">
                    <FaGithub />
                    <span className="font-mono">devTinder</span>
                </div>
            </aside>
            <div className="flex-1 w-full md:w-auto">
                <Outlet />
            </div>
            {/* <main className="z-10 flex-1 flex items-start justify-center py-16">
                <AnimatePresence mode="wait" initial={false}>
                    {selected === "editProfile" && <EditProfile key="editProfile" />}
                    {selected === "changePassword" && <ChangePassword key="changePassword" />}
                    {selected === "deleteAccount" && <DeleteAccount key="deleteAccount" />}
                </AnimatePresence>
            </main> */}
        </div>
    );
}

