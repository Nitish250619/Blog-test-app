import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../redux/store";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
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
        "https://testrepobackend.onrender.com/api/users/login",
        {
          email: inputs.email,
          password: inputs.password,
        }
      );
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        alert("user login successfully");
        navigate("/");
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
          Login
        </Button>
        <Button
          sx={{ borderRadius: 3, marginTop: 3 }}
          onClick={() => navigate("/register")}
        >
          Not a User ? Please Register
        </Button>
      </Box>
    </form>
  );
};

export default Login;
