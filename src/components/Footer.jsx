import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import Logo from '../assets/code-svgrepo-com.svg';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Motion.footer
            className="w-fit py-7 bg-gradient-to-r from-[#232526] to-[#414345] text-white  shadow-inner "
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, type: 'spring' }}
        >
            <div className="max-w-fit mx-auto px-25 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-24 text-sm text-center sm:text-left">

                {/* Logo & About */}
                <div >
                    <div className="flex items-center justify-center sm:justify-start gap-3 mb-4 ml-3">
                        <img src={Logo} alt="DevTinder Logo" className="w-12 h-12 object-cover " />
                        <span className="text-2xl font-extrabold hover:underline transition-all  duration-300 cursor-pointer">DevTinder</span>
                    </div>
                    <p className="text-gray-300 text-lg">
                        Connect. Collaborate. Code. Your perfect coding partner awaits.
                    </p>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className=" font-extrabold mb-4 text-2xl hover:underline transition-all  duration-300 cursor-pointer">Contact</h3>
                    <ul className="space-y-3 text-gray-200 text-lg">
                        <li className="flex items-center justify-center sm:justify-start gap-2">
                            <MdPhone className="text-[#ff512f]" /> +91 123 456 7890
                        </li>
                        <li className="flex items-center justify-center sm:justify-start gap-2 ">
                            <MdEmail className="text-[#ff512f]" /> devtinder@example.com
                        </li>
                        <li className="flex items-center justify-center sm:justify-start gap-2 ">
                            <MdLocationOn className="text-[#ff512f]" /> India
                        </li>
                    </ul>

                </div>

                {/* Quick Links */}
                <div className='text-center sm:text-left'>
                    <h3 className="text-2xl font-extrabold mb-4 hover:underline transition-all  duration-300 cursor-pointer">Quick Links</h3>
                    <ul className="space-y-3 text-gray-200 text-lg flex flex-col items-center sm:items-start ml-5">
                        <li><Link to="/" className="hover:bg-gradient-to-r hover:from-[#ff512f] hover:to-[#dd2476] hover:text-transparent hover:bg-clip-text transition">Home</Link></li>
                        <li><Link to="/signup" className="hover:bg-gradient-to-r hover:from-[#ff512f] hover:to-[#dd2476] hover:text-transparent hover:bg-clip-text transition">Signup</Link></li>
                        <li><Link to="/login" className="hover:bg-gradient-to-r hover:from-[#ff512f] hover:to-[#dd2476] hover:text-transparent hover:bg-clip-text transition">Login</Link></li>
                        <li><Link to="/about" className="hover:bg-gradient-to-r hover:from-[#ff512f] hover:to-[#dd2476] hover:text-transparent hover:bg-clip-text transition">About Us</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4 text-white ">Subscribe for Updates</h3>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full p-2 rounded-md bg-transparent text-white placeholder-gray-300 border border-white focus:outline-none focus:ring-2 focus:ring-[#ff4d4d] transition duration-200"
                    />

                    <button className="mt-5 w-full bg-gradient-to-r from-[#ff512f] to-[#dd2476] hover:brightness-110 transition-all rounded-md py-2 font-semibold text-lg text-white shadow-md">
                        Subscribe
                    </button>

                    {/* Social Media Icons */}
                    <div className="flex justify-center gap-5 mt-8 text-white text-2xl">
                        {[
                            { icon: <FaGithub />, label: "GitHub", link: "https://github.com/coder-writes" },
                            { icon: <FaFacebookF />, label: "Facebook", link: "#" },
                            { icon: <FaTwitter />, label: "Twitter", link: "https://x.com/risshi_codes" },
                            { icon: <FaInstagram />, label: "Instagram", link: "#" },
                            { icon: <FaLinkedin />, label: "LinkedIn", link: "https://www.linkedin.com/in/rishi-verma-sde/" },
                        ].map((item, index) => (
                            <a
                                key={index}
                                href={item.link}
                                aria-label={item.label}
                                className="p-3 border border-white rounded-full transition-all duration-300 hover:text-white hover:bg-gradient-to-r from-[#ff512f] to-[#dd2476] shadow-lg"
                            >
                                {item.icon}
                            </a>
                        ))}
                    </div>

                </div>



            </div>

            {/* Bottom Area */}
            <div className="mt-5 pt-5 border-t-2 border-gray-600 px-6 flex flex-col sm:flex-row justify-center items-center text-lg text-gray-200">
                <p className="text-center">
                    &copy; {currentYear} <span className="font-bold text-white">DevTinder</span>. Made with <span className="text-[#ff512f] text-lg">♥</span> for Developers.
                </p>
            </div>
            <div className="text-center text-gray-300 mt-2">
                <p className="text-md">All rights reserved.</p>
            </div>
        </Motion.footer>
    );
};

export default Footer;
