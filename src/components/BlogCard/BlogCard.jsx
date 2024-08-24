import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function BlogCard({ blog, isUser, isUserBlog }) {
  const [expanded, setExpanded] = React.useState(false);
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = async () => {
    const { data } = await axios.delete(
      `https://testrepobackend.onrender.com/api/blogs/delete/${blog._id}`
    );
    if (data?.success) {
      alert("blog deleted successfully");
      window.location.reload();
    }
  };

  const editBlog = () => {
    navigate(`/update-blog/${blog._id}`);
  };

  return (
    <Card
      sx={{
        width: "40%",
        margin: "auto",
        mt: "2",
        padding: "2",
        boxShadow: "5px 5px 10px #ccc",
      }}
    >
      {isUser && (
        <Box display={"flex"}>
          <IconButton sx={{ marginLeft: "auto" }} onClick={editBlog}>
            {" "}
            <EditIcon />{" "}
          </IconButton>
          <IconButton onClick={handleDelete}>
            {" "}
            <DeleteIcon />{" "}
          </IconButton>
        </Box>
      )}
      {isUserBlog && (
        <Box display={"flex"}>
          <IconButton sx={{ marginLeft: "auto" }} onClick={editBlog}>
            {" "}
            <EditIcon />{" "}
          </IconButton>
          <IconButton onClick={handleDelete}>
            {" "}
            <DeleteIcon />{" "}
          </IconButton>
        </Box>
      )}

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={blog.title}
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {blog.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
}
