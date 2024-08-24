import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard/BlogCard";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getUserBlog = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(
        `https://testrepobackend.onrender.com/api/blogs/user-blog/${id}`
      );
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlog();
  }, []);
  return (
    <div>
      {blogs.map((blog, index) => (
        <BlogCard blog={blog} isUserBlog={true} />
      ))}
    </div>
  );
};

export default UserBlogs;
