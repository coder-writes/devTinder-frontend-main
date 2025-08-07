// import React from "react";
// import { motion as Motion } from "framer-motion";
// import { colors, commonStyles } from "../theme/colors";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { Link } from "react-router";
// import { useDispatch } from "react-redux";
// import { removeUser } from "../utils/userSlicer";
// import { createApiUrl, API_ENDPOINTS } from "../utils/apiConfig";

// const Header = () => {
//   const user = useSelector((state) => state.user);
//   const dispatch = useDispatch();
//   const [menuOpen, setMenuOpen] = React.useState(false);
//   const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

//   React.useEffect(() => {
//     const handleClick = (e) => {
//       if (!e.target.closest("#user-menu")) setMenuOpen(false);
//     };
//     if (menuOpen) document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, [menuOpen]);

//   const handleLogout = async () => {
//     try {
//       const response = await axios.post(
//         createApiUrl(API_ENDPOINTS.LOGOUT),
//         {},
//         { withCredentials: true }
//       );
//       if (response.status === 200) {
//         dispatch(removeUser());
//         dispatch({ type: "feed/addFeed", payload: null });
//         window.location.href = "/";
//       }
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   return (
//     <>
//       <Motion.header
//         className={`w-full py-6 px-6 flex items-center justify-between bg-gradient-to-r ${colors.background.main} shadow-xl backdrop-blur-lg relative z-50`}
//         initial={{ y: -60, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.7, type: "spring" }}
//         style={{
//           borderBottom: `2px solid ${colors.primary.main}33`,
//           boxShadow: `0 8px 32px 0 ${colors.primary.main}22`,
//         }}
//       >
//         <div className="flex items-center gap-4">
//           <Motion.img
//             src="https://img.icons8.com/ios-filled/48/ffffff/source-code.png"
//             alt="DevTinder Logo"
//             className="w-12 h-12 rounded-full shadow-lg"
//             initial={{ rotate: -20, scale: 0.7, opacity: 0 }}
//             animate={{ rotate: 0, scale: 1, opacity: 1 }}
//             transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
//             style={{
//               filter: `drop-shadow(0 4px 16px ${colors.primary.main}99)`,
//             }}
//           />
//           <Motion.h1
//             className={`text-3xl md:text-4xl font-extrabold ${colors.text.primary} tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500`}
//             initial={{ scale: 0.8, letterSpacing: "0.05em" }}
//             animate={{ scale: 1, letterSpacing: "0.01em" }}
//             transition={{ delay: 0.3, duration: 0.4 }}
//           >
//             DevTinder
//           </Motion.h1>
//         </div>

//         <div className="md:hidden">
//           <button
//             onClick={() => setMobileNavOpen(!mobileNavOpen)}
//             className="focus:outline-none"
//           >
//             <svg
//               className="w-8 h-8 text-white"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d={
//                   mobileNavOpen
//                     ? "M6 18L18 6M6 6l12 12"
//                     : "M4 6h16M4 12h16M4 18h16"
//                 }
//               />
//             </svg>
//           </button>
//         </div>

//         <Motion.nav
//           className={`hidden md:flex flex-1 justify-end gap-4 px-4 ${colors.text.primary} font-medium items-center`}
//           initial={{ opacity: 0, x: 30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.5, duration: 0.5 }}
//         >
//           {!user ? (
//             <>
//               {["Home", "About", "Contact", "Blogs"].map((item) => (
//                 <a
//                   key={item}
//                   href={`/${item.toLowerCase()}`}
//                   className="px-4 py-2 rounded-md transition-all duration-300 hover:bg-[#ffffff12]"
//                 >
//                   {item}
//                 </a>
//               ))}
//               <a
//                 href="/login"
//                 className={`ml-2 px-6 py-2 rounded-xl ${commonStyles.primaryGradient} ${colors.text.primary} font-semibold shadow-lg hover:brightness-110 transition-all duration-300`}
//               >
//                 Login
//               </a>
//             </>
//           ) : (
//             <div className="relative z-[9999]" id="user-menu">
//               <button
//                 onClick={() => setMenuOpen((prev) => !prev)}
//                 className="flex items-center focus:outline-none"
//               >
//                 <img
//                   src={user?.photoUrl}
//                   alt={user.firstName}
//                   className="w-10 h-10 rounded-full border-2 border-pink-400 shadow-md object-cover"
//                 />
//                 <span className="ml-2 font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
//                   Welcome Back {user?.firstName}
//                 </span>
//               </button>
//               {menuOpen && (
//                 <Motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2 }}
//                   className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-[9999] border border-gray-200"
//                 >
//                   <a
//                     href="/settings"
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                   >
//                     Settings
//                   </a>
//                   <Link
//                     to="/connections"
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                   >
//                     Connections
//                   </Link>
//                   <Link
//                     to="/requests"
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                   >
//                     Requests
//                   </Link>
//                   <a
//                     href="/my-blogs"
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                   >
//                     My Blogs
//                   </a>
//                   <button
//                     onClick={handleLogout}
//                     className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 font-semibold"
//                   >
//                     Log Out
//                   </button>
//                 </Motion.div>
//               )}
//             </div>
//           )}
//         </Motion.nav>
//       </Motion.header>

//       {mobileNavOpen && (
//         <div className="md:hidden flex flex-col items-start gap-3 px-6 py-4 bg-[#242424] text-white shadow-lg z-40">
//           {!user ? (
//             <>
//               {["Home", "About", "Contact", "Blogs"].map((item) => (
//                 <a
//                   key={item}
//                   href={`/${item.toLowerCase()}`}
//                   className="w-full px-4 py-2 rounded-md transition-all duration-300 hover:bg-[#ffffff12]"
//                 >
//                   {item}
//                 </a>
//               ))}
//               <a
//                 href="/login"
//                 className="w-full px-4 py-2 mt-2 rounded-md bg-gradient-to-r from-pink-500 to-yellow-500 text-white text-center"
//               >
//                 Login
//               </a>
//             </>
//           ) : (
//             <>
//               <a
//                 href="/settings"
//                 className="w-full px-4 py-2 rounded-md hover:bg-[#ffffff12]"
//               >
//                 Settings
//               </a>
//               <Link
//                 to="/connections"
//                 className="w-full px-4 py-2 rounded-md hover:bg-[#ffffff12]"
//               >
//                 Connections
//               </Link>
//               <Link
//                 to="/requests"
//                 className="w-full px-4 py-2 rounded-md hover:bg-[#ffffff12]"
//               >
//                 Requests
//               </Link>
//               <a
//                 href="/my-blogs"
//                 className="w-full px-4 py-2 rounded-md hover:bg-[#ffffff12]"
//               >
//                 My Blogs
//               </a>
//               <button
//                 onClick={handleLogout}
//                 className="w-full px-4 py-2 text-red-500 rounded-md hover:bg-[#ffffff12] text-left"
//               >
//                 Log Out
//               </button>
//             </>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default Header;
import React from "react";
import { motion as Motion } from "framer-motion";
import { colors, commonStyles } from "../theme/colors";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlicer";
import { createApiUrl, API_ENDPOINTS } from "../utils/apiConfig";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  React.useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest("#user-menu")) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        createApiUrl(API_ENDPOINTS.LOGOUT),
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        dispatch(removeUser());
        dispatch({ type: "feed/addFeed", payload: null });
        navigate("/");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Define navigation items
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Blogs", path: "/blogs" },
  ];

  const userNavItems = [
    { name: "Settings", path: "/settings" },
    { name: "Connections", path: "/connections" },
    { name: "Requests", path: "/requests" },
    { name: "My Blogs", path: "/my-blogs" },
    { name: "Add Blog", path: "/add-blog" },
  ];

  return (
    <>
      <Motion.header
        className={`w-full py-6 px-6 flex items-center justify-between bg-gradient-to-r ${colors.background.main} shadow-xl backdrop-blur-lg relative z-50`}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, type: "spring" }}
        style={{
          borderBottom: `2px solid ${colors.primary.main}33`,
          boxShadow: `0 8px 32px 0 ${colors.primary.main}22`,
        }}
      >
        <div className="flex items-center gap-4">
          <Motion.img
            src="https://img.icons8.com/ios-filled/48/ffffff/source-code.png"
            alt="DevTinder Logo"
            className="w-12 h-12 rounded-full shadow-lg"
            initial={{ rotate: -20, scale: 0.7, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            style={{
              filter: `drop-shadow(0 4px 16px ${colors.primary.main}99)`,
            }}
          />
          <Motion.h1
            className={`text-3xl md:text-4xl font-extrabold ${colors.text.primary} tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500`}
            initial={{ scale: 0.8, letterSpacing: "0.05em" }}
            animate={{ scale: 1, letterSpacing: "0.01em" }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            DevTinder
          </Motion.h1>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  mobileNavOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        <Motion.nav
          className={`hidden md:flex flex-1 justify-end gap-4 px-4 ${colors.text.primary} font-medium items-center`}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {!user ? (
            <>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-4 py-2 rounded-md transition-all duration-300 ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-pink-500 to-yellow-500 text-white shadow-md"
                      : "hover:bg-[#ffffff12]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/login"
                className={`ml-2 px-6 py-2 rounded-xl ${commonStyles.primaryGradient} ${colors.text.primary} font-semibold shadow-lg hover:brightness-110 transition-all duration-300 ${
                  location.pathname === "/login" ? "brightness-125" : ""
                }`}
              >
                Login
              </Link>
            </>
          ) : (
            <div className="relative z-[9999]" id="user-menu">
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="flex items-center focus:outline-none"
              >
                <img
                  src={user?.photoUrl}
                  alt={user.firstName}
                  className="w-10 h-10 rounded-full border-2 border-pink-400 shadow-md object-cover"
                />
                <span className="ml-2 font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                  Welcome Back {user?.firstName}
                </span>
              </button>
              {menuOpen && (
                <Motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-[9999] border border-gray-200"
                >
                  {userNavItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`block px-4 py-2 text-gray-700 ${
                        location.pathname === item.path
                          ? "bg-gradient-to-r from-pink-500 to-yellow-500 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 font-semibold"
                  >
                    Log Out
                  </button>
                </Motion.div>
              )}
            </div>
          )}
        </Motion.nav>
      </Motion.header>

      {mobileNavOpen && (
        <div className="md:hidden flex flex-col items-start gap-3 px-6 py-4 bg-[#242424] text-white shadow-lg z-40">
          {!user ? (
            <>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`w-full px-4 py-2 rounded-md transition-all duration-300 ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-pink-500 to-yellow-500 text-white"
                      : "hover:bg-[#ffffff12]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/login"
                className={`w-full px-4 py-2 mt-2 rounded-md text-white text-center ${
                  location.pathname === "/login"
                    ? "bg-gradient-to-r from-pink-500 to-yellow-500 brightness-125"
                    : "bg-gradient-to-r from-pink-500 to-yellow-500"
                }`}
              >
                Login
              </Link>
            </>
          ) : (
            <>
              {userNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`w-full px-4 py-2 rounded-md ${
                    location.pathname === item.path
                      ? "bg-gradient-to-r from-pink-500 to-yellow-500 text-white"
                      : "hover:bg-[#ffffff12]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-red-500 rounded-md hover:bg-[#ffffff12] text-left"
              >
                Log Out
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Header;