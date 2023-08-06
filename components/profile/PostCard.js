import React, { useEffect, useState } from "react";
import Styles from "./profile.module.css";
import Image from "next/Image";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Backdrop from "@mui/material/Backdrop";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import axios from "axios";
import { IconButton } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
const PostCard = ({ data, DeletePost, userPost, user }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);

  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  function deletePost() {
    console.log(data.title);
    DeletePost(data._id);
    handleClose();
  }
  const [user_id, setuser_id] = useState();
  const [IsFollow, setIsFollow] = useState(false);
  const [follow_id, setfollow_id] = useState();
  const [config, setconfig] = useState();
  const [Islike, setIslike] = useState(false);
  const [likes, setlikes] = useState(0);
  useEffect(() => {
    const user_id = localStorage.getItem("user_id");

    for (let i = 0; i < data.like.length; i++) {
      if (data?.like[0] == user_id) {
        setIslike(true);
      }
    }
    setlikes(data?.like?.length);
  }, [data]);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    setconfig(token);
    setuser_id(user_id);
    if (!userPost && user) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API}/user/IsFollow/${user._id}/${user_id}`
        )
        .then(function (response) {
          // console.log(response);
          if (response.data != null) {
            setIsFollow(true);
            setfollow_id(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [IsFollow]);
  function follow(action) {
    if (action == "follow") {
      const data = {
        Follow: user._id,
        Followby: user_id,
        token: config,
      };
      axios
        .post(`${process.env.NEXT_PUBLIC_API}/user/follow/`, data)
        .then(function (response) {
          console.log(response);
          setIsFollow(true);
        })
        .catch(function (error) {
          console.log(error);
        });
      return;
    }
    if (action == "unfollow") {
      const data = {
        id: follow_id._id,
        Followby: user_id,
        token: config,
      };
      axios
        .post(`${process.env.NEXT_PUBLIC_API}/user/unfollow`, data)
        .then(function (response) {
          console.log(response);
          setIsFollow(false);
        })
        .catch(function (error) {
          console.log(error);
        });
      return;
    }
  }
  function like() {
    const likeData = {
      post_id: data._id,
      user_id: user_id,
      token: config,
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/post/like/`, likeData)
      .then(function (response) {
        setIslike(response.data.like);
        if (response.data.like) {
          setlikes(likes + 1);
        } else {
          setlikes(likes - 1);
        }
        console.log(response.data.like);
      })
      .catch(function (error) {
        console.log(error);
      });
    return;
  }
  return (
    <>
      <Card className={Styles.card}>
        {!userPost && (
          <CardHeader
            avatar={
              <Avatar
                aria-label="user"
                alt={user ? user.name : "Null"}
                src={`${process.env.NEXT_PUBLIC_API}/public/dps/${user?.Image}`}
              />
            }
            // action={
            //   user_id != data.user_id? <Button
            //   className={Styles.MenuItem}
            //   size="small"
            //   variant="contained"
            //   onClick={() => follow(IsFollow ? "unfollow" : "follow")}
            // >
            //   {IsFollow ? "Unfollow" : "Follow"}
            // </Button>: null
            // }
            title={
              user ? (
                <Link href={`/profile?id=${user._id}`}>
                  <a>{user.name}</a>
                </Link>
              ) : (
                "Null"
              )
            }
            subheader={
              user_id != data.user_id ? (
                <button
                  size="small"
                  variant="contained"
                  onClick={() => follow(IsFollow ? "unfollow" : "follow")}
                >
                  {IsFollow ? "Unfollow" : "Follow"}
                </button>
              ) : null
            }
          />
        )}
        <div className={Styles.PostImage}>
          <Image
            className={Styles.Post_Image}
            layout="fill"
            src={`${process.env.NEXT_PUBLIC_API}/public/${data.Image}`}
          />
        </div>
        <CardContent>
          <h4 className={Styles.PostLocation}>{data.Location}</h4>
          <Link href={`post/${data.slug}`}>
            <a>
              <h2 className={Styles.PostTitle}>{data.title}</h2>
            </a>
          </Link>
          <p className={Styles.PostDec}>{data.description}</p>

          {/* {data.like?.map((like, i)=>{
            {like.user_id==data.user_id}
          })} */}
          <button
            size="small"
            
            onClick={() => like()}
            className={Styles.like}
          >
             {Islike ? <FavoriteIcon className={Styles.likeIcon}/>: <FavoriteBorderIcon className={Styles.unlikeIcon}/>} {likes}
          </button>
        </CardContent>
        {userPost && (
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            className={Styles.MenuBtn}
          >
            <MoreVertIcon />
          </IconButton>
        )}
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          className={Styles.Menu}
        >
          <MenuItem className={Styles.MenuItem} onClick={() => deletePost()}>
            Delete
          </MenuItem>
          <MenuItem className={Styles.MenuItem}>
            <Link href={`/editpost/${data.slug}`}>Edit</Link>
          </MenuItem>
        </Menu>

        <Menu
          id="public-menu"
          anchorEl={anchorEl1}
          open={open1}
          onClose={handleClose1}
          className={Styles.Menu}
        >
          {user_id != data.user_id && (
            <MenuItem
              className={Styles.MenuItem}
              onClick={() => follow(IsFollow ? "unfollow" : "follow")}
            >
              {IsFollow ? "Unfollow" : "Follow"}
            </MenuItem>
          )}
          <MenuItem className={Styles.MenuItem} onClick={handleClose1}>
            Go to post
          </MenuItem>
          <MenuItem className={Styles.MenuItem} onClick={handleClose1}>
            Copy link..
          </MenuItem>
          <MenuItem className={Styles.MenuItem} onClick={handleClose1}>
            Cancel
          </MenuItem>
        </Menu>
      </Card>
    </>
  );
};

export default PostCard;
