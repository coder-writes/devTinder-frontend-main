import React from 'react';
import { motion } from 'framer-motion';
import { FaRegCalendarAlt, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const dummyBlogs = [
  {
    id: 1,
    title: "Getting Started with MERN Stack",
    author: "Jane Doe",
    date: "August 1, 2025",
    excerpt: "Learn how to build powerful full-stack applications using MongoDB, Express.js, React, and Node.js.",
  },
  {
    id: 2,
    title: "Why TypeScript is a Game Changer for React Devs",
    author: "Dev Ninja",
    date: "July 28, 2025",
    excerpt: "Understand the benefits of adding TypeScript to your React apps and how to migrate safely.",
  },
  {
    id: 3,
    title: "Top 10 GitHub Repos Every Web Dev Should Know",
    author: "Alex Codewell",
    date: "July 22, 2025",
    excerpt: "These open-source gems will supercharge your projects and productivity.",
  },
  {
    id: 4,
    title: "Next.js vs React: What to Use When?",
    author: "Sarah Buildwell",
    date: "July 10, 2025",
    excerpt: "Understand the key differences and when to choose each framework.",
  },
  {
    id: 5,
    title: "How to Deploy MERN Stack Apps on Render",
    author: "Dev Deploy",
    date: "June 29, 2025",
    excerpt: "A beginner-friendly guide to getting your full-stack app live quickly.",
  },
  {
    id: 6,
    title: "React Performance Tips You Should Know",
    author: "PerfMaster",
    date: "June 15, 2025",
    excerpt: "Optimize your React app with these best practices and performance tips.",
  },
];

const BlogSection = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-br from-[#232526] to-[#414345] min-h-screen text-white">
        <div className="flex justify-end mb-4">
  <Link
    to="/blogs/add"
    className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white font-medium"
  >
    + Add Blog
  </Link>
</div>
      <motion.h2
        className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Dev Tinder Blog
      </motion.h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {dummyBlogs.map((blog, index) => (
          <Link to={`/blogs/${blog.id}`} key={blog.id}>
            <motion.div
              className="bg-gray-800/60 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-400 transition-all duration-300 shadow-md hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-purple-300">{blog.title}</h3>
              <div className="flex items-center text-sm text-gray-400 mb-3 space-x-4">
                <span className="flex items-center gap-1"><FaUserAlt /> {blog.author}</span>
                <span className="flex items-center gap-1"><FaRegCalendarAlt /> {blog.date}</span>
              </div>
              <p className="text-gray-300">{blog.excerpt}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;