import './App.css';
import NavBar from './components/Header/NavBar';
import { Routes , Route } from "react-router-dom";
import Blogs from "./pages/Blogs"
import Login from "./pages/Login"
import Register from "./pages/Register"
import UserBlogs from './pages/UserBlogs';
import CreateBlog from './pages/CreateBlog';
import UpdatedBlog from './pages/UpdatedBlog';

function App() {
  return (
    <div>
      <NavBar/>
      <Routes>
      <Route path="/" element={<Blogs/>} />
      <Route path="/blogs" element={<Blogs/>} />
      <Route path="/my-blogs" element={<UserBlogs/>} />
      <Route path="/update-blog/:id" element={<UpdatedBlog/>} />
      <Route path="/create-blogs" element={<CreateBlog/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
