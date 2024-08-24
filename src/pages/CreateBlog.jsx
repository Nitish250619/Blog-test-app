import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async(event) => {
    event.preventDefault();
    const userId = localStorage.getItem('userId')

    const {data}= await axios.post('https://testrepobackend.onrender.com/api/blogs/create-blog',{
        title,
        description,
        image: imageUrl,
        user:userId,
    })

    if(data?.success){
        alert('Blog Created Successfully')
    }

    navigate('/my-blogs')

  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: '600px',
        margin: '0 auto',
        padding: 4,
        boxShadow: 2,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" component="h1" textAlign="center" gutterBottom>
        Create Blog
      </Typography>

      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <TextField
        label="Image URL"
        variant="outlined"
        fullWidth
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Enter image URL"
        required
      />

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default CreateBlog;
