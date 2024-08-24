import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    blogs:[],
  });
  const handleInputChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://testrepobackend.onrender.com/api/users/register",
        {
          username: inputs.name,
          email: inputs.email,
          password: inputs.password,
          blogs:inputs.blogs,
        }
      );
      if (data.success) {
        alert("user register successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        maxWidth={450}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        margin={"auto"}
        padding={5}
        borderRadius={5}
      >
        <Typography variant="h4" padding={3} textAlign={"center"}>
          Register
        </Typography>
        <TextField
          placeholder="Name"
          value={inputs.name}
          label="Name"
          variant="outlined"
          name="name"
          margin="normal"
          type="text"
          required
          onChange={handleInputChange}
        />
        <TextField
          placeholder="Email"
          label="Email"
          value={inputs.email}
          variant="outlined"
          name="email"
          margin="normal"
          type="text"
          required
          onChange={handleInputChange}
        />
        <TextField
          placeholder="Password"
          label="Password"
          value={inputs.password}
          variant="outlined"
          name="password"
          margin="normal"
          type="text"
          required
          onChange={handleInputChange}
        />
        <Button
          sx={{ borderRadius: 3, marginTop: 3 }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Register
        </Button>
        <Button
          sx={{ borderRadius: 3, marginTop: 3 }}
          onClick={() => navigate("/login")}
        >
          Already Registerd ? Please Login
        </Button>
      </Box>
    </form>
  );
};

export default Register;
