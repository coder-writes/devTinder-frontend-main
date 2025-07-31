/* eslint-disable no-unused-vars */
import React from 'react';
import { motion, AnimatePresence } from "framer-motion";

const panelVariants = {
    initial: { opacity: 0, y: 30, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: "spring" } },
    exit: { opacity: 0, y: -30, scale: 0.98, transition: { duration: 0.3 } },
};

export default function ChangePassword() {
    return (
        <motion.div
            key="changePassword"
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="bg-gradient-to-br from-[#232526] to-[#181a1b] border border-[#00ffd0]/30 shadow-2xl rounded-2xl px-12 py-10 min-w-[380px] max-w-[480px] w-full relative overflow-hidden"
        >
            <div className="absolute bottom-0 left-0 opacity-10 text-[#00ffd0] text-7xl pointer-events-none select-none">
                <FaKey />
            </div>
            <h2 className="mb-6 text-[#00ffd0] text-2xl font-bold flex items-center gap-2">
                <FaKey /> Change Password
            </h2>
            <form className="flex flex-col gap-5">
                <label className="flex flex-col gap-1 text-base">
                    <span className="text-[#00ffd0] font-mono">Current Password</span>
                    <input
                        type="password"
                        placeholder="Current password"
                        className="bg-[#181a1b] border border-[#00ffd0]/30 rounded-md px-3 py-2 text-[#e0e0e0] focus:border-[#00ffd0] outline-none transition font-mono"
                    />
                </label>
                <label className="flex flex-col gap-1 text-base">
                    <span className="text-[#00ffd0] font-mono">New Password</span>
                    <input
                        type="password"
                        placeholder="New password"
                        className="bg-[#181a1b] border border-[#00ffd0]/30 rounded-md px-3 py-2 text-[#e0e0e0] focus:border-[#00ffd0] outline-none transition font-mono"
                    />
                </label>
                <button
                    type="submit"
                    className="bg-gradient-to-r from-[#00ffd0] to-[#00cfa0] text-[#181a1b] font-bold rounded-md px-5 py-2 mt-2 transition hover:scale-105 shadow-lg font-mono"
                >
                    Update Password
                </button>
            </form>
        </motion.div>
    );
}