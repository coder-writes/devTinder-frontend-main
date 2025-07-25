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
import toast, { Toaster } from 'react-hot-toast';

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
        gender: "",
        phoneNo: "",
    });
    
    console.log(user);
    // Update profile state when user data loads
    const fName = user?.name?.split(' ')[0]?.trim() || '';
    const lName = user?.name?.split(' ')[1]?.trim() || '';
    useEffect(() => {
        if (user) {
            setprofile({
                firstName: (user.firstName || fName || ""),
                lastName: (user.lastName|| lName || ""),
                email: user.email || "",    
                age: user.age || "",
                bio: user.about || "",
                skills: Array.isArray(user.hobbies) ? user.hobbies.join(", ") : "",
                photoUrl: user.photoUrl|| user.image || "",
                phoneNo: user.phoneNo || "",
                gender: user.gender || "",
            });
        }
    }, [user]);
    const handleSave = async(e)=>{
        e.preventDefault(); // Prevent form submission
        
        // Basic validation for required fields
        if (!profile.firstName.trim() || !profile.lastName.trim()) {
            toast.error('First Name and Last Name are required!', {
                duration: 2000,
                style: {
                    background: '#EF4444',
                    color: '#ffffff',
                    fontWeight: 'bold',
                },
            });
            return;
        }
        
        // Show loading toast
        const loadingToast = toast.loading('Updating profile...');
        
        try{
            console.log("Saving profile data:", profile); // Debug log
            const response = await axios.patch(createApiUrl(API_ENDPOINTS.PROFILE_EDIT), {
                phoneNo: profile.phoneNo,
                gender: profile.gender,
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
            
            dispatch(setUser(response?.data?.data));
            console.log("Profile updated successfully:", response);
            
            // Dismiss loading toast and show success toast
            toast.dismiss(loadingToast);
            toast.success('Profile updated successfully! 🎉', {
                duration: 2000,
                style: {
                    background: '#10B981',
                    color: '#ffffff',
                    fontWeight: 'bold',
                },
                iconTheme: {
                    primary: '#ffffff',
                    secondary: '#10B981',
                },
            });
            
        }catch(err){
            console.error("Error updating profile:", err.response?.data || err.message);
            
            // Dismiss loading toast and show error toast
            toast.dismiss(loadingToast);
            
            const errorMessage = err.response?.data?.message || 
                               err.response?.data?.error || 
                               'Failed to update profile. Please try again.';
            
            toast.error(errorMessage, {
                duration: 2000,
                style: {
                    background: '#EF4444',
                    color: '#ffffff',
                    fontWeight: 'bold',
                },
                iconTheme: {
                    primary: '#ffffff',
                    secondary: '#EF4444',
                },
            });
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
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 xl:gap-16 justify-center items-start w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Toast container */}
            <Toaster 
                position="top-right"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    className: '',
                    duration: 2000,
                    style: {
                        background: '#232526',
                        color: '#00ffd0',
                        border: '1px solid #00ffd0',
                    },
                }}
            />
            <motion.div
                key="editProfile"
                variants={panelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-gradient-to-br my-4 lg:my-8 from-[#232526] to-[#181a1b] border border-[#00ffd0]/30 shadow-2xl rounded-2xl px-4 sm:px-6 lg:px-10 py-6 lg:py-8 w-full max-w-md lg:max-w-lg relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 opacity-10 text-[#00ffd0] text-5xl sm:text-6xl lg:text-7xl pointer-events-none select-none">
                    <FaTerminal />
                </div>
                <h2 className="mb-4 sm:mb-6 text-[#00ffd0] text-xl sm:text-2xl font-bold flex items-center gap-2">
                    <FaUserEdit /> Edit Profile
                </h2>
                <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSave}>
                    <label className="flex flex-col gap-1 text-sm sm:text-base">
                        <span className="text-[#00ffd0] font-mono">First Name*</span>
                        <input
                            value={profile.firstName}
                            type="text"
                            placeholder="Your first name"
                            className="bg-[#181a1b] border border-[#00ffd0]/30 rounded-md px-3 py-2 text-[#e0e0e0] focus:border-[#00ffd0] outline-none transition font-mono hover:border-[#00ffd0]/60 text-sm sm:text-base"
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-sm sm:text-base">
                        <span className="text-[#00ffd0] font-mono">Last Name*</span>
                        <input
                            value={profile.lastName}
                            type="text"
                            placeholder="Your last name"
                            className="bg-[#181a1b] border border-[#00ffd0]/30 rounded-md px-3 py-2 text-[#e0e0e0] focus:border-[#00ffd0] outline-none transition font-mono hover:border-[#00ffd0]/60 text-sm sm:text-base"
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-sm sm:text-base">
                        <span className="text-[#00ffd0] font-mono">Email</span>
                        <input
                            value={profile.email}
                            type="email"
                            placeholder="Your email"
                            className="bg-[#181a1b] border border-[#00ffd0]/30 rounded-md px-3 py-2 text-[#e0e0e0] focus:border-[#00ffd0] outline-none transition font-mono hover:border-[#00ffd0]/60 text-sm sm:text-base"
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-sm sm:text-base">
                        <span className="text-[#00ffd0] font-mono">Age</span>
                        <input
                            value={profile.age}
                            onChange={e => setprofile({ ...profile, age: e.target.value })}
                            type="number"
                            min="0"
                            placeholder="Your age"
                            className="bg-[#181a1b] border border-[#00ffd0]/30 rounded-md px-3 py-2 text-[#e0e0e0] focus:border-[#00ffd0] outline-none transition font-mono hover:border-[#00ffd0]/60 text-sm sm:text-base"
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-sm sm:text-base">
                        <span className="text-[#00ffd0] font-mono">Gender</span>
                        <select
                            value={profile.gender}
                            onChange={e => setprofile({ ...profile, gender: e.target.value })}
                            className="bg-[#181a1b] border border-[#00ffd0]/30 rounded-md px-3 py-2 text-[#e0e0e0] focus:border-[#00ffd0] outline-none transition font-mono hover:border-[#00ffd0]/60 text-sm sm:text-base"
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                    </label>
                    <label className="flex flex-col gap-1 text-sm sm:text-base">
                        <span className="text-[#00ffd0] font-mono">Phone No</span>
                        <input
                            value={profile.phoneNo}
                            onChange={e => setprofile({ ...profile, phoneNo: e.target.value })}
                            type="number"
                            min="0"
                            placeholder="Your phone number"
                            className="bg-[#181a1b] border border-[#00ffd0]/30 rounded-md px-3 py-2 text-[#e0e0e0] focus:border-[#00ffd0] outline-none transition font-mono hover:border-[#00ffd0]/60 text-sm sm:text-base"
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-sm sm:text-base">
                        <span className="text-[#00ffd0] font-mono">Bio</span>
                        <textarea
                            value={profile.bio}
                            onChange={e => setprofile({ ...profile, bio: e.target.value })}
                            placeholder="Tell us about yourself"
                            rows={4}
                            className="bg-[#181a1b] border border-[#00ffd0]/30 rounded-md px-3 py-2 text-[#e0e0e0] focus:border-[#00ffd0] outline-none transition font-mono resize-none hover:border-[#00ffd0]/60 text-sm sm:text-base"
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-sm sm:text-base">
                        <span className="text-[#00ffd0] font-mono">Skills / Interests</span>
                        <input
                            value={profile.skills}
                            onChange={e => setprofile({ ...profile, skills: e.target.value })}
                            type="text"
                            placeholder="e.g. React, Node.js, UI/UX, Gaming"
                            className="bg-[#181a1b] border border-[#00ffd0]/30 rounded-md px-3 py-2 text-[#e0e0e0] focus:border-[#00ffd0] outline-none transition font-mono hover:border-[#00ffd0]/60 text-sm sm:text-base"
                        />
                        <span className="text-xs text-[#00ffd0]/70 font-mono mt-1">Comma separated</span>
                    </label>
                    <label className="flex flex-col gap-1 text-sm sm:text-base">
                        <span className="text-[#00ffd0] font-mono">Photo URL</span>
                        <input
                            value={profile.photoUrl}
                            onChange={e => setprofile({ ...profile, photoUrl: e.target.value })}
                            type="url"
                            placeholder="Link to your profile photo"
                            className="bg-[#181a1b] border border-[#00ffd0]/30 rounded-md px-3 py-2 text-[#e0e0e0] focus:border-[#00ffd0] outline-none transition font-mono hover:border-[#00ffd0]/60 text-sm sm:text-base"
                        />
                        <span className="text-xs text-[#00ffd0]/70 font-mono mt-1">Paste an image URL</span>
                    </label>
                    <button
                        type="submit"
                        className="self-end bg-gradient-to-r from-[#00ffd0] to-[#00cfa0] text-[#181a1b] font-bold rounded-md px-4 sm:px-5 py-2 mt-2 transition hover:scale-105 shadow-lg font-mono text-sm sm:text-base"
                    >
                        Save Changes
                    </button>
                </form>
            </motion.div>
            <div className="flex-1 flex justify-center items-start max-w-md lg:max-w-lg w-full">
                <div className="w-full">
                    <ProfileCard 
                        profile={{
                            id: user.id || 'preview',
                            firstName: profile.firstName || 'Your Name',
                            lastName: profile.lastName || '',
                            role: 'Developer',
                            about: profile.bio || 'Your bio will appear here',
                            photoUrl: profile.photoUrl || profile?.image || 'https://via.placeholder.com/150',
                            skills: profile.skills ? profile.skills.split(', ').filter(skill => skill.trim()) : ['No skills added']
                        }} 
                    />
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
