import { useState, useRef, useEffect } from "react";
import { FaUserEdit, FaKey, FaTrash, FaCog, FaGithub } from "react-icons/fa";
import * as THREE from "three";
import { Outlet, useNavigate, useLocation } from "react-router";
const sidebarItems = [
    { key: "editProfile", label: "Edit Profile", icon: <FaUserEdit />, route: "/settings/edit-profile" },
    { key: "changePassword", label: "Change Password", icon: <FaKey />, route: "/settings/change-password" },
    { key: "deleteAccount", label: "Delete Account", icon: <FaTrash />, route: "/settings/delete-account" },
];

function ThreeBG() {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const currentMount = mountRef.current;
        let width = window.innerWidth;
        let height = window.innerHeight;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 8;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setClearColor(0x000000, 0); // transparent
        renderer.setSize(width, height);
        currentMount.appendChild(renderer.domElement);

        // Add animated glowing wireframe torus
        const geometry = new THREE.TorusKnotGeometry(2.5, 0.12, 120, 16);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ffd0,
            wireframe: true,
            opacity: 0.18,
            transparent: true,
        });
        const torus = new THREE.Mesh(geometry, material);
        scene.add(torus);

        // Animate
        let frameId;
        const animate = () => {
            torus.rotation.x += 0.003;
            torus.rotation.y += 0.004;
            renderer.render(scene, camera);
            frameId = requestAnimationFrame(animate);
        };
        animate();

        // Handle resize
        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            try {
                cancelAnimationFrame(frameId);
                window.removeEventListener("resize", handleResize);
                if (currentMount && renderer.domElement && currentMount.contains(renderer.domElement)) {
                    currentMount.removeChild(renderer.domElement);
                }
                renderer.dispose();
                geometry.dispose();
                material.dispose();
            } catch (error) {
                console.warn("Error during ThreeBG cleanup:", error);
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ filter: "blur(0.5px)" }}
        />
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
        <div className="flex min-h-screen bg-gradient-to-br from-[#191b1e] via-[#232526] to-[#181a1b] font-mono text-[#e0e0e0] relative">
            {/* Three.js animated background */}
            <ThreeBG />
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

