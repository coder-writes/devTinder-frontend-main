import { useState, useEffect } from "react";
import { FaUserEdit, FaKey, FaTrash, FaCog, FaGithub } from "react-icons/fa";
import { Outlet, useNavigate, useLocation } from "react-router";

const sidebarItems = [
    { key: "editProfile", label: "Edit Profile", icon: <FaUserEdit />, route: "/settings/edit-profile" },
    { key: "changePassword", label: "Change Password", icon: <FaKey />, route: "/settings/change-password" },
    { key: "deleteAccount", label: "Delete Account", icon: <FaTrash />, route: "/settings/delete-account" },
];

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
        <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 font-mono text-gray-100">
            {/* Responsive sidebar */}
            <aside className="w-full md:w-64 lg:w-72 bg-gradient-to-br from-gray-800/95 to-gray-700/90 border-r border-orange-500/20 flex flex-col py-4 md:py-8 shadow-2xl">
                <div className="flex items-center gap-3 text-xl md:text-2xl font-bold px-4 md:px-8 pb-4 md:pb-8 text-orange-500 tracking-wider">
                    <FaCog size={24} className="md:w-8 md:h-8" />
                    <span className="hidden sm:block">Settings</span>
                </div>
                <nav className="flex flex-col gap-1 md:gap-2">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.key}
                            className={`flex items-center gap-2 md:gap-3 px-4 md:px-8 py-2 md:py-3 text-sm md:text-base rounded-md transition-all duration-200
                                ${
                                    selected === item.key
                                        ? "bg-gradient-to-r from-orange-500/30 to-gray-700 text-orange-400 shadow-lg"
                                        : "hover:bg-gray-700/80 hover:text-orange-400 text-gray-100"
                                }
                                font-medium font-mono`}
                            onClick={() => handleNavigation(item)}
                        >
                            <span className="text-lg md:text-xl">{item.icon}</span>
                            <span className="hidden sm:block">{item.label}</span>
                        </button>
                    ))}
                </nav>
                <div className="mt-auto px-4 md:px-8 pt-4 md:pt-8 flex items-center gap-2 text-orange-500/70 text-xs md:text-sm">
                    <FaGithub className="text-base md:text-lg" />
                    <span className="font-mono hidden sm:block">devTinder</span>
                </div>
            </aside>
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}

