/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaTerminal, FaUserEdit } from 'react-icons/fa';
import ProfileCard from '../components/ProfileCard';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../utils/userSlicer';
import { createApiUrl, API_ENDPOINTS } from '../utils/apiConfig';

const panelVariants = {
    initial: { opacity: 0, y: 30, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, type: "spring" } },
    exit: { opacity: 0, y: -30, scale: 0.98, transition: { duration: 0.3 } },
};
function EditProfile() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    
    const [profile, setprofile] = useState({
        firstName: "",
        lastName: "",
        email: "",    
        age: "",
        bio: "",
        skills: "",
        photoUrl: "",
    });
    
    // Update profile state when user data loads
    useEffect(() => {
        if (user) {
            setprofile({
                firstName: (user.firstName || ""),
                lastName: (user.lastName || ""),
                email: user.email || "",    
                age: user.age || "",
                bio: user.about || "",
                skills: Array.isArray(user.hobbies) ? user.hobbies.join(", ") : "",
                photoUrl: user.photoUrl || "",
            });
        }
    }, [user]);
    const handleSave = async(e)=>{
        e.preventDefault(); // Prevent form submission
        try{
            console.log("Saving profile data:", profile); // Debug log
            const response = await axios.patch(createApiUrl(API_ENDPOINTS.PROFILE_EDIT), {
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
                age: profile.age,
                about: profile.bio,
                hobbies: profile.skills.split(',').map(skill => skill.trim()),
                photoUrl: profile.photoUrl,
            }, { 
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            dispatch(setUser(response?.data?.data))
            console.log("Profile updated successfully:", response);
        }catch(err){
            console.error("Error updating profile:", err.response?.data || err.message);
        } 
    }
    
    // Don't render if user data is not loaded yet
    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="text-[#00ffd0] text-lg font-mono">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 justify-center items-start w-full px-4 md:px-0">
            <motion.div
                key="editProfile"
                variants={panelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-gradient-to-br ml-0 md:ml-24 my-8 from-[#232526] to-[#181a1b] border border-[#00ffd0]/30 shadow-2xl rounded-2xl px-6 sm:px-10 py-8 min-w-[320px] max-w-[420px] w-full relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 opacity-10 text-[#00ffd0] text-7xl pointer-events-none select-none">
                    <FaTerminal />
                </div>
                <h2 className="mb-6 text-[#00ffd0] text-2xl font-bold flex items-center gap-2">
                    <FaUserEdit /> Edit Profile
                </h2>
                <form className="flex flex-col gap-5" onSubmit={handleSave}>
                    <label className="flex flex-col gap-1 text-base">
                        <span className="text-[#00ffd0] font-mono">First Name*</span>
                        <input
                            value={profile.firstName}
                            onChange={e => setprofile({ ...profile, firstName: e.target.value })}
                            type="text"
                            placeholder="Your first name"
                            className="bg-[#181a1b] border border-[#00ffd0]/30 rounded-md px-3 py-2 text-[#e0e0e0] focus:border-[#00ffd0] outline-none transition font-mono hover:border-[#00ffd0]/60"
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-base">
                        <span className="text-[#00ffd0] font-mono">Last Name*</span>
                        <input
                            value={profile.lastName}
                            onChange={e => setprofile({ ...profile, lastName: e.target.value })}
                            type="text"
                            placeholder="Your last name"
                            className="bg-[#181a1b] border border-[#00ffd0]/30 rounded-md px-3 py-2 text-[#e0e0e0] focus:border-[#00ffd0] outline-none transition font-mono hover:border-[#00ffd0]/60"
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-base">
                        <span className="text-[#00ffd0] font-mono">Email</span>
                        <input
                            value={profile.email}
                            onChange={e => setprofile({ ...profile, email: e.target.value })}
                            type="email"
                            placeholder="Your email"
                            className="bg-[#181a1b] border border-[#00ffd0]/30 rounded-md px-3 py-2 text-[#e0e0e0] focus:border-[#00ffd0] outline-none transition font-mono hover:border-[#00ffd0]/60"
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-base">
                        <span className="text-[#00ffd0] font-mono">Age</span>
                        <input
                            value={profile.age}
                            onChange={e => setprofile({ ...profile, age: e.target.value })}
                            type="number"
                            min="0"
                            placeholder="Your age"
                            className="bg-[#181a1b] border border-[#00ffd0]/30 rounded-md px-3 py-2 text-[#e0e0e0] focus:border-[#00ffd0] outline-none transition font-mono hover:border-[#00ffd0]/60"
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-base">
                        <span className="text-[#00ffd0] font-mono">Bio</span>
                        <textarea
                            value={profile.bio}
                            onChange={e => setprofile({ ...profile, bio: e.target.value })}
                            placeholder="Tell us about yourself"
                            rows={4}
                            className="bg-[#181a1b] border border-[#00ffd0]/30 rounded-md px-3 py-2 text-[#e0e0e0] focus:border-[#00ffd0] outline-none transition font-mono resize-none hover:border-[#00ffd0]/60"
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-base">
                        <span className="text-[#00ffd0] font-mono">Skills / Interests</span>
                        <input
                            value={profile.skills}
                            onChange={e => setprofile({ ...profile, skills: e.target.value })}
                            type="text"
                            placeholder="e.g. React, Node.js, UI/UX, Gaming"
                            className="bg-[#181a1b] border border-[#00ffd0]/30 rounded-md px-3 py-2 text-[#e0e0e0] focus:border-[#00ffd0] outline-none transition font-mono hover:border-[#00ffd0]/60"
                        />
                        <span className="text-xs text-[#00ffd0]/70 font-mono mt-1">Comma separated</span>
                    </label>
                    <label className="flex flex-col gap-1 text-base">
                        <span className="text-[#00ffd0] font-mono">Photo URL</span>
                        <input
                            value={profile.photoUrl}
                            onChange={e => setprofile({ ...profile, photoUrl: e.target.value })}
                            type="url"
                            placeholder="Link to your profile photo"
                            className="bg-[#181a1b] border border-[#00ffd0]/30 rounded-md px-3 py-2 text-[#e0e0e0] focus:border-[#00ffd0] outline-none transition font-mono hover:border-[#00ffd0]/60"
                        />
                        <span className="text-xs text-[#00ffd0]/70 font-mono mt-1">Paste an image URL</span>
                    </label>
                    <button
                        type="submit"
                        className="self-end bg-gradient-to-r from-[#00ffd0] to-[#00cfa0] text-[#181a1b] font-bold rounded-md px-5 py-2 mt-2 transition hover:scale-105 shadow-lg font-mono"
                    >
                        Save Changes
                    </button>
                </form>
            </motion.div>
            <div className="my-30 flex-1 flex justify-center items-start max-w-[420px] w-full">
                <ProfileCard 
                    profile={{
                        id: user.id || 'preview',
                        firstName: profile.firstName || 'Your Name',
                        lastName: profile.lastName || 'NN',
                        role: 'Developer',
                        about: profile.bio || 'Your bio will appear here',
                        photoUrl: profile.photoUrl || 'https://via.placeholder.com/150',
                        skills: profile.skills ? profile.skills.split(', ').filter(skill => skill.trim()) : ['No skills added']
                    }} 
                />
            </div>
        </div>
    );
}

export default EditProfile;
