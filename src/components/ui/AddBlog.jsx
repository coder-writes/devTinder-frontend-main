// src/components/ui/AddBlog.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [blog, setBlog] = useState({ title: "", content: "", author: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const stored = JSON.parse(localStorage.getItem("blogs")) || [];
    const newBlog = {
      id: Date.now().toString(),
      ...blog,
      date: new Date().toLocaleDateString(),
    };
    localStorage.setItem("blogs", JSON.stringify([newBlog, ...stored]));
    navigate("/blogs");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#232526] to-[#414345] text-white px-6 py-12">
      <div className="max-w-2xl mx-auto bg-[#2c2f33] p-8 rounded shadow-lg">
        <h2 className="text-3xl font-bold text-purple-400 mb-6">Add a New Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="title"
            value={blog.title}
            onChange={handleChange}
            placeholder="Blog Title"
            className="w-full px-4 py-2 rounded bg-[#3c3f41] text-white"
            required
          />
          <input
            name="author"
            value={blog.author}
            onChange={handleChange}
            placeholder="Author Name"
            className="w-full px-4 py-2 rounded bg-[#3c3f41] text-white"
            required
          />
          <textarea
            name="content"
            value={blog.content}
            onChange={handleChange}
            placeholder="Write your blog content here..."
            rows={6}
            className="w-full px-4 py-2 rounded bg-[#3c3f41] text-white"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded font-semibold"
          >
            Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
