import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router';

const Footer = () => (
    <Motion.footer
        className="w-full py-2 px-2 sm:py-3 sm:px-4 bg-gradient-to-r from-[#232526] to-[#414345] text-white shadow-inner mt-auto"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, type: 'spring' }}
    >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
            <Motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <img
                    src="https://img.icons8.com/ios-filled/32/ffffff/source-code.png"
                    alt="DevTinder Logo"
                    className="w-8 h-8"
                />
                <span className="font-semibold text-lg tracking-tight">DevTinder</span>
            </Motion.div>
            <Motion.div
                className="flex flex-wrap gap-3 sm:gap-5 text-xs sm:text-sm justify-center"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <a
                    href="https://github.com/coder-writes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#ff512f] transition-colors duration-200"
                >
                    GitHub
                </a>
                <Link
                    to="/privacy"
                    className="hover:text-[#ff512f] transition-colors duration-200"
                >
                    Privacy
                </Link>
                <Link
                    to="/terms"
                    className="hover:text-[#ff512f] transition-colors duration-200"
                >
                    Terms
                </Link>
                <Link
                    to="/contact"
                    className="hover:text-[#ff512f] transition-colors duration-200"
                >
                    Contact
                </Link>
            </Motion.div>
        </div>
        <Motion.div
            className="text-center text-[10px] sm:text-xs text-gray-400 mt-2 sm:mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
        >
            &copy; {new Date().getFullYear()} DevTinder. Made with <span className="text-[#ff512f]">♥</span> for developers.
        </Motion.div>
    </Motion.footer>
);

export default Footer;
