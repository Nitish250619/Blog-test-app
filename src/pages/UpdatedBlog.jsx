import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdatedBlog = () => {
  // State variables to hold the input values
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const id = useParams().id;
  const navigate = useNavigate();

  const getDataOfUpdateBlog = async () => {
    const { data } = await axios.get(
      `http://localhost:8081/api/blogs/get-blog/${id}`
    );
    setTitle(data.blog.title);
    setDescription(data.blog.description);
    setImage(data.blog.image);
  };

  useEffect(() => {
    getDataOfUpdateBlog();
  }, [id]);

  // Handler for form submission
  const handleUpdateBlog = async () => {
    // Your update logic here
    const { data } = await axios.put(
      `https://testrepobackend.onrender.com/api/blogs/update-blog/${id}`,
      { title, description, image }
    );
    // Clear fields after submission
    setTitle("");
    setDescription("");
    setImage("");

    navigate("/my-blogs");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Update Blog
        </Typography>

        {/* Blog Title Input */}
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Blog Description Input */}
        <TextField
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Blog Image URL Input */}
        <TextField
          label="Image URL"
          variant="outlined"
          fullWidth
          value={image}
          onChange={(e) => setImage(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Submit Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleUpdateBlog}
        >
          Update Blog
        </Button>
      </Box>
    </Container>
  );
};

export default UpdatedBlog;
