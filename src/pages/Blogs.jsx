import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = async () => {
    try {
      const { data } = await axios.get(
        "https://testrepobackend.onrender.com/api/blogs/all-blog"
      );
      if (data?.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <div>
      {blogs.map((blog, index) => (
        <BlogCard
          blog={blog}
          isUser={localStorage.getItem("userId") === blog.user}
        />
      ))}
    </div>
  );
};

export default Blogs;
