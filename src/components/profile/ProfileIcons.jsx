import React from 'react';
import { FaGithub, FaLinkedin, FaCode, FaCoffee } from 'react-icons/fa';

const ProfileIcons = ({ profile }) => {
    return (
        <div className="flex gap-4 mt-4">
            {profile.github && (
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">
                    <FaGithub className="w-6 h-6" />
                </a>
            )}
            {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">
                    <FaLinkedin className="w-6 h-6" />
                </a>
            )}
            <span className="text-green-400">
                <FaCode className="w-6 h-6" />
            </span>
            <span className="text-green-400">
                <FaCoffee className="w-6 h-6" />
            </span>
        </div>
    );
};

export default ProfileIcons;
