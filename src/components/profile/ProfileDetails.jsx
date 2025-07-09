import React from 'react';

const ProfileDetails = ({ profile }) => {
    return (
        <>
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-400/30 mb-4">
                <img
                    src={profile.avatar || '/default-avatar.png'}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <h2 className="text-2xl font-bold text-green-400 mb-2">{profile.name}</h2>
            <p className="text-gray-300 text-center mb-4">{profile.bio}</p>
            <div className="bg-gray-800/50 rounded-lg p-4 w-full mb-4">
                <h3 className="text-lg font-semibold text-green-400 mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                    {profile.technologies?.map((tech, index) => (
                        <span
                            key={index}
                            className="bg-green-400/20 text-green-300 px-3 py-1 rounded-full text-sm"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
            {profile.location && (
                <p className="text-gray-400 mb-4">
                    📍 {profile.location}
                </p>
            )}
        </>
    );
};

export default ProfileDetails;
