import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';
import { HeroSection, FeatureCard } from '../components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "How does DevTinder work?",
            answer: "DevTinder works like a dating app but for developers! Create your profile, showcase your skills, and swipe through other developers. Match with those who share your interests and start collaborating on exciting projects."
        },
        {
            question: "Is DevTinder completely free?",
            answer: "Yes! Creating an account, browsing profiles, and matching with developers is completely free. We believe in building a strong developer community without barriers."
        },
        {
            question: "What kind of developers can I find?",
            answer: "You'll find developers from all backgrounds - frontend, backend, mobile, DevOps, data science, AI/ML, and more. From beginners learning their first language to senior engineers with decades of experience."
        },
        {
            question: "How do I start collaborating after matching?",
            answer: "Once you match with someone, you can start chatting directly through our platform. Share project ideas, discuss tech stacks, or even plan meetups. Many successful collaborations start with a simple 'Hello!'."
        },
        {
            question: "Can I find developers for specific technologies?",
            answer: "Absolutely! Our advanced filtering system lets you search by programming languages, frameworks, experience level, location, and project interests. Find exactly the kind of developer you're looking for."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <Motion.section
            className="w-full max-w-4xl mx-auto mt-20 px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
        >
            {/* Header */}
            <Motion.div
                className="text-center mb-12"
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.2 }}
            >
                <div className="flex items-center justify-center gap-3 mb-4">
                    <FaQuestionCircle className="text-[#ff512f] text-3xl" />
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-[#ff512f] to-[#dd2476] bg-clip-text text-transparent">
                        Frequently Asked Questions
                    </h2>
                </div>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    Got questions about DevTinder? We've got answers! Here are some common questions from our developer community.
                </p>
            </Motion.div>

            {/* FAQ Items */}
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <Motion.div
                        key={index}
                        className="bg-[rgba(34,34,34,0.85)] rounded-xl border border-gray-700 overflow-hidden backdrop-blur-sm"
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 2.4 + index * 0.1 }}
                        whileHover={{ 
                            scale: 1.02,
                            boxShadow: "0 10px 30px rgba(255, 81, 47, 0.1)"
                        }}
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-[rgba(255,81,47,0.05)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ff512f] focus:ring-opacity-50"
                        >
                            <span className="font-semibold text-lg text-white pr-4">
                                {faq.question}
                            </span>
                            <Motion.div
                                animate={{ rotate: openIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <FaChevronDown className="text-[#ff512f] text-xl flex-shrink-0" />
                            </Motion.div>
                        </button>
                        
                        <AnimatePresence>
                            {openIndex === index && (
                                <Motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-5 pt-2">
                                        <p className="text-gray-300 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </Motion.div>
                            )}
                        </AnimatePresence>
                    </Motion.div>
                ))}
            </div>

            {/* Call to Action */}
            <Motion.div
                className="text-center mt-12"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 3 }}
            >
                <p className="text-gray-300 mb-6">
                    Still have questions? We'd love to help!
                </p>
                <a
                    href="mailto:devtinder@example.com"
                    className="inline-block px-8 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#ff512f] to-[#dd2476] rounded-lg hover:from-[#dd2476] hover:to-[#ff512f] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                    Contact Support
                </a>
            </Motion.div>
        </Motion.section>
    );
};

const Index = () => {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    
    if(user){
        navigate('/feed');
    }
    
    return (
        <Motion.div
            className="flex flex-col items-center justify-center flex-grow py-16 px-4 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <div className="text-center mb-10">
                <Motion.h1
                    className="text-5xl font-bold"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    DevTinder
                </Motion.h1>
                <Motion.p
                    className="text-xl mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    Connect. Collaborate. Code. <br />
                    Find your perfect coding partner!
                </Motion.p>
            </div>

            <Motion.div
                className="bg-[rgba(34,34,34,0.85)] p-8 rounded-2xl shadow-lg max-w-sm w-full text-center"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
            >
                <Motion.img
                    src="https://img.icons8.com/ios-filled/100/ffffff/source-code.png"
                    alt="DevTinder Logo"
                    className="w-20 mb-6 mx-auto"
                    initial={{ rotate: -20, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6, type: 'spring' }}
                />
                <Motion.h2
                    className="my-4 text-2xl font-semibold"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                >
                    Meet Developers Like You
                </Motion.h2>
                <Motion.p
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                >
                    Swipe right to connect with fellow developers, collaborate on projects, or just chat about code!
                </Motion.p>
                <Motion.div
                    className="mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.4 }}
                >
                    <a
                        href="/Signup"
                        className="inline-block px-8 py-3 text-base font-semibold text-white bg-gradient-to-r from-[#ff512f] to-[#dd2476] rounded-lg hover:from-[#dd2476] hover:to-[#ff512f] transition-all duration-300"
                    >
                        Get Started
                    </a>
                </Motion.div>
            </Motion.div>

            {/* FAQ Section */}
            <FAQ />
        </Motion.div>
    );
};

export { Index };
