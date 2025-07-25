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
        <div className="flex min-h-screen bg-gradient-to-br from-[#191b1e] via-[#232526] to-[#181a1b] font-mono text-[#e0e0e0] relative">
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
            <aside className="z-10 w-[260px] bg-gradient-to-br from-[#181a1b]/95 to-[#232526]/90 border-r border-[#00ffd0]/20 flex flex-col py-8 shadow-2xl">
                <div className="flex items-center gap-3 text-2xl font-bold px-8 pb-8 text-[#00ffd0] tracking-wider">
                    <FaCog size={32} />
                    <span>Settings</span>
                </div>
                <nav className="flex flex-col gap-2">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.key}
                            className={`flex items-center gap-3 px-8 py-3 text-base rounded-md transition
                                ${
                                    selected === item.key
                                        ? "bg-gradient-to-r from-[#00ffd0]/30 to-[#232526] text-[#00ffd0] shadow-lg"
                                        : "hover:bg-[#232526]/80 hover:text-[#00ffd0] text-[#e0e0e0]"
                                }
                                font-medium font-mono`}
                            onClick={() => handleNavigation(item)}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>
                <div className="mt-auto px-8 pt-8 flex items-center gap-2 text-[#00ffd0]/70 text-sm">
                    <FaGithub />
                    <span className="font-mono">devTinder</span>
                </div>
            </aside>
            <Outlet />
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

