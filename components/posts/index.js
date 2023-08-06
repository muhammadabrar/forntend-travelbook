import Grid from "@mui/material/Grid";
import Item from "@mui/material/ListItem";
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
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Styles from "./posts.module.css";
import { Container, Link } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import PostCard from "../profile/PostCard";
import axios from "axios";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

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

export default function Main() {
  const [expanded, setExpanded] = useState(false);
  const [expanded1, setExpanded1] = useState(false);

  const [Loading, setLoading] = useState(true);
  const [IsErr, setIsErr] = useState(false);

  const handlePostClick = () => {};
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [data, setdata] = useState();
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/post`)
      .then(function (response) {
        console.log(response);
        setdata(response.data);
        localStorage.setItem("posts", JSON.stringify(response.data));
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);

        setLoading(false);
      });
  }, []);
  return (
    <Container>
      <Item>
        <Typography className={Styles.heading} variant="h3" component="h3">
          Trending Posts
        </Typography>
      </Item>
      <div className={Styles.cardGrid}>
        {data?.map((data, i) => (
          <Item key={i} className={Styles.cardItem}>
            <PostCard data={data.post} likes={data.post.like} user={data.user} />
          </Item>
        ))}
      </div>
    </Container>
  );
}
