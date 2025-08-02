import React from "react";
import { useParams, Link } from "react-router-dom";

const dummyBlogs = [
  {
    id: "1",
    title: "Getting Started with MERN Stack",
    content: `The MERN stack consists of MongoDB, Express.js, React, and Node.js. It's a popular choice for building full-stack web applications using JavaScript.
    
    With MongoDB as the NoSQL database, Express and Node handling the backend, and React powering the frontend, the MERN stack allows for rapid development and easy deployment.

    📌 Pro Tip: Start with the backend and set up your REST APIs before connecting the frontend.`,
    author: "Jane Doe",
    date: "August 1, 2025",
  },
  {
    id: "2",
    title: "Why TypeScript is a Game Changer for React Devs",
    content: `TypeScript brings static typing to JavaScript, helping catch bugs early and improve code maintainability.
    
    Features like interfaces, type aliases, and generics make your components robust and reusable.

    💡 Remember: TypeScript doesn't replace JS — it enhances it.`,
    author: "Dev Ninja",
    date: "July 28, 2025",
  },
  {
    id: "3",
    title: "Mastering Tailwind CSS for Modern UI",
    content: `Tailwind CSS is a utility-first framework that allows you to build beautiful UIs quickly.

    🔧 Instead of writing custom CSS, you apply pre-defined utility classes directly in your JSX.
    
    Example:
    \`<div className="bg-gray-800 text-white p-4 rounded shadow">\`

    Great for creating responsive, dark-mode-ready, and highly customizable designs.`,
    author: "UI Pro",
    date: "July 22, 2025",
  },
  {
    id: "4",
    title: "React Router v6 — All You Need to Know",
    content: `React Router v6 introduces significant changes: nested routes, useRoutes hook, route ranking, and much more.

    ✅ Simpler API
    ✅ Better performance
    ✅ Easier code splitting

    Be sure to migrate carefully from v5 — many methods are deprecated.`,
    author: "Routing Guru",
    date: "July 18, 2025",
  },
];

const BlogDetail = () => {
  const { blogId } = useParams();
  const blog = dummyBlogs.find((b) => b.id === blogId);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#232526] to-[#414345] text-white">
        <h2 className="text-xl">Blog not found.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#232526] to-[#414345] text-white px-6 md:px-16 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
          {blog.title}
        </h1>
        <p className="text-sm text-gray-400 mb-8">
          By <span className="text-purple-300">{blog.author}</span> on{" "}
          {blog.date}
        </p>

        <div className="prose prose-invert max-w-none text-gray-200 whitespace-pre-line leading-relaxed">
          {blog.content}
        </div>

        <div className="mt-12">
          <Link
            to="/blogs"
            className="text-purple-400 hover:text-purple-300 underline transition"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;