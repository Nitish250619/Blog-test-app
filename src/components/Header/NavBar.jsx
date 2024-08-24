import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { authActions } from "../../redux/store";

const NavBar = () => {
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem('userId')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [value, setValue] = useState(0);

  const handlelogout =()=>{
    try {
      dispatch(authActions.logout())
      alert("logout succesfully")
      navigate("/login")
      localStorage.clear()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4">My Blog App</Typography>
          {isLogin && (
            <Box display={"flex"} marginLeft={"auto"} marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                <Tab label="Create Post" LinkComponent={Link} to="/create-blogs" />
              </Tabs>
            </Box>
          )}
          <Box display={"flex"} marginLeft={"auto"}>
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
            {isLogin && (<Button onClick={handlelogout} sx={{ margin: 1, color: "white" }}  >Logout</Button>)}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
