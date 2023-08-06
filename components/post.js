import React, { useEffect, useState } from "react";
import Styles from "../styles/post.module.css";
import Image from "next/Image";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Backdrop from "@mui/material/Backdrop";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { Button, Container, Divider } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import AddReviewDialog from "./addreview";
import Reviews from "./Reviews";
const Post = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl1, setAnchorEl1] = useState(null);
  const router = useRouter();
  const { slug } = router.query;

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
  const [data, setdata] = useState();
  const [Loading, setLoading] = useState(true);
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

    axios
      .get(`${process.env.NEXT_PUBLIC_API}/post/${slug}/`)
      .then(function (response) {
        console.log(response);
        if (response.data != null) {
          setdata(response.data);
          if(response.data.user != null || response.data.post != null)
                setLoading(false);
         
        }
      })
      .catch(function (error) {
        console.log(error);
      });

      // if (data?.user?._id != user_id) {
      //       console.log("geting follower");
      //       axios
      //         .get(
      //           `${process.env.NEXT_PUBLIC_API}/user/IsFollow/${response.data.user._id}/${user_id}`
      //         )
      //         .then(function (response) {
      //           console.log(response);
      //       console.log("get follower");

      //           if (response.data != null) {
      //             setIsFollow(true);
      //             setfollow_id(response.data);
      //           }
      //           setLoading(false);
      //         })
      //         .catch(function (error) {
      //           console.log(error);
      //         });
      //     }
  }, [slug]);

  function follow(action) {
    if (action == "follow") {
      const postdata = {
        Follow: data?.user._id,
        Followby: user_id,
        token: config,
      };

      axios
        .post(`${process.env.NEXT_PUBLIC_API}/user/follow/`, postdata)
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
  const [AddReview, setAddReview] = useState(false);
  if (Loading) {
    return (
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={Loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  }

  return (
    <>
      <Container>
        <h1>{data?.post?.title}</h1>

        <div className={Styles.PostImage}>
          <Image
            className={Styles.Post_Image}
            layout="fill"
            // width={100}
            // height={100}
            src={`${process.env.NEXT_PUBLIC_API}/public/${data?.post?.Image}`}
          />
        </div>
        <CardHeader
          avatar={
            <Avatar
              aria-label="user"
              alt={data?.user.name}
              src={`${process.env.NEXT_PUBLIC_API}/public/dps/${data?.user?.Image}`}
            />
          }
          action={
            <>
              {data?.user?._id != user_id && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => follow(IsFollow ? "unfollow" : "follow")}
                >
                  {IsFollow ? "Unfollow" : "Follow"}
                </Button>
              )}
              {data?.user?._id == user_id && (
                <Button variant="contained" size="small">
                  Edit
                </Button>
              )}
            </>
          }
          title={data?.user.name}
          subheader={data?.post.createdAt}
        />
        <h1>{data?.post?.Location}</h1>
        <p>{data?.post?.description}</p>
        <Divider />
        <div className={Styles.Dflex}>
          <h1>Reviews</h1>
          <Button
            onClick={() => setAddReview(true)}
            variant="contained"
            size="small"
          >
            Post review
          </Button>
        </div>

        <Reviews post_id={data?.post?._id} />
        <AddReviewDialog
          open={AddReview}
          onClose={() => setAddReview(false)}
          post_id={data?.post?._id}
        />
      </Container>
    </>
  );
};

export default Post;
