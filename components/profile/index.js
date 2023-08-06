import React, { useEffect, useState } from "react";
import Styles from "./profile.module.css";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/ListItem";
import profilePic from "../../public/profilePic.png";
import Image from "next/Image";
import Typography from "@mui/material/Typography";
import { Avatar, Button, Container } from "@mui/material";
import { useRouter } from "next/router";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import PostCard from "./PostCard";
import Link from "next/link";
import FollowModel from "./followModel";
import FollowingModel from "./FollowingModel";
import EditProfile from "./editProfile";
export default function ProfilePage() {
  const [user, setuser] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const router = useRouter();
  const [Err401, setErr401] = useState(false);
  const [Err400, setErr400] = useState(false);

  const [error, setError] = useState(false);
  const { id } = router.query;
  const [data, setdata] = useState();
  const [config, setconfig] = useState();
  const [Refresh, setRefresh] = useState();
  const [user_id, setuser_id] = useState();
  const [IsFollowers, setIsFollowers] = useState(false);
  const [IsFollowing, setIsFollowing] = useState(false);
  const [IsEdit, setIsEdit] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const islogin = localStorage.getItem("IsLogin");
    const user_id = localStorage.getItem("user_id");
    setuser_id(user_id);

    const config = {
      headers: {
        Authorization: token,
      },
    };
    setconfig(config);
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/user/profile/${id}`)
      .then(function (response) {
        console.log(response);
        setdata(response.data);
        setisLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setisLoading(false);
        if (error.response.status == 401) {
          setErr401(true);
        } else {
          setError(true);
        }
      });
  }, [id, Refresh]);

  console.log(config);
  function DeletePost(post_id) {
    if (!id == user_id) {
      return null;
    }
    axios
      .delete(
        `${process.env.NEXT_PUBLIC_API}/post/deletePost/${post_id}/${id}/${config.headers.Authorization}`,
        {
          headers: {
            Authorization: config.headers.Authorization,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        setRefresh(Refresh + 1);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // const [Image, setImage] = useState();
  // function handleDP(e) {

  // }
  function UploadDp(e) {
    if (!id == user_id) {
      return null;
    }
    const PhotoName = `${id} - ${e.target.files[0].name}`;

    const formData = new FormData();
    formData.append("file", e.target.files[0], PhotoName);
    const Alldata = JSON.stringify({
      Image: PhotoName,
    });
    formData.append("data", Alldata);
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API}/user/${id}/${config.headers.Authorization}`,
        formData
      )
      .then(function (response) {
        console.log(response);
        setRefresh(Refresh + 1);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  if (isLoading) {
    return (
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  }

  return (
    <div className={Styles.page}>
      <Grid
        className={Styles.container}
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid className={Styles.left} item xs={4} md={4} lg={4}>
          <Item>
            <div className={Styles.profilePic}>
              <Grid
                className={Styles.uploadDP}
                variant="outlined"
                component="label"
                sx={{ border: "none" }}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API}/public/dps/${data?.user?.Image}`}
                  className={Styles.profilePicture}
                  layout="fill"
                  alt={"dp"}
                />
                
                {user_id == id ? <
              >
                 <input type="file" onChange={(e) => UploadDp(e)} hidden />
              </>: null}
              </Grid>
              {/* {user_id == id ? <Button
                className={Styles.uploadBtn}
                variant="contained"
                component="label"
                size="small"
                sx={{ mr: 2 }}
              >
                Upload Profile
                 <input type="file" onChange={(e) => UploadDp(e)} hidden />
              </Button>: null} */}
            </div>
          </Item>
        </Grid>
        <Grid className={Styles.right} item xs={8} md={8} lg={8}>
          <Item className={Styles.Title}>
            <Typography className={Styles.heading} variant="h4">
              {data?.user?.name}
            </Typography>
            {user_id == id && <Button onClick={()=> setIsEdit(true)}   size="small" variant="contained">
              Edit profile
            </Button>}
          </Item>
          <Item>
            <Typography className={Styles.subText} variant="p">
              {data?.posts?.length} Posts
            </Typography>
           <><Button onClick={()=> setIsFollowers(true)}  className={Styles.subText} variant="p">
              {data?.Followers} Followers
            </Button>
            
            </>
          <>  <Button onClick={()=> setIsFollowing(true)}  className={Styles.subText} variant="p">
              {data?.Followings} Following
            </Button>
            </>
          </Item>
          <Item>
           {data?.user?.bio  && <Typography className={Styles.subText} variant="6">
              {data?.user?.bio}
            </Typography>}
          </Item>
     
        </Grid>
      </Grid>
      {/* <Grid
        className={Styles.containerStories}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid className={Styles.stories}>
          <Avatar
            className={Styles.storiesPic}
            alt="Peggy Carter"
            src="Peggy_Carter.jpg"
          />
        </Grid>
        <Grid className={Styles.stories}>
          <Avatar
            className={Styles.storiesPic}
            alt="Peggy Carter"
            src="Peggy_Carter2.jpg"
          />
        </Grid>
        <Grid className={Styles.stories}>
          <Avatar
            className={Styles.storiesPic}
            alt="Peggy Carter"
            src="Peggy_Carter3.jpg"
          />
        </Grid>
        <Grid className={Styles.stories}>
          <Avatar
            className={Styles.storiesPic}
            alt="Peggy Carter"
            src="Peggy_Carter4.webp"
          />
        </Grid>
      </Grid> */}
      {/* <Grid
        className={Styles.containerButtons}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Button className={Styles.buttons}>Posts</Button>
        <Button className={Styles.buttons}>Videos</Button>
        <Button className={Styles.buttons}>Reels</Button>
        <Button className={Styles.buttons}>Guides</Button>
      </Grid> */}
      <Container>
        <div className={Styles.cardGrid}>
          {data?.posts?.map((item, i) => (
            <Item key={i} className={Styles.cardItem}>
              <PostCard data={item} user={data?.user} userPost={user_id == id} DeletePost={DeletePost} />
            </Item>
          ))}
        </div>
      </Container>
      <FollowModel
          open={IsFollowers}
          onClose={() => setIsFollowers(false)}
          id={id}
        />
             <FollowingModel
          open={IsFollowing}
          onClose={() => setIsFollowing(false)}
          id={id}
        />
         <EditProfile
          open={IsEdit}
          onClose={() => setIsEdit(false)}
          id={id}
          Name={data?.user?.name}
        />
    </div>
  );
}
