import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { TextareaAutosize } from "@mui/material";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import Styles from "./upload/upload.module.css";
const EditpostComp = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [Location, setLocation] = useState();
  const [token, settoken] = useState();
  const [Loading, setLoading] = useState(true);
  const [IsErr, setIsErr] = useState(false);
  const [post_id, setpost_id] = useState();
  const [IsErr400, setIsErr400] = useState(false);
  const [user_id, setuser_id] = useState();
  const [isSuccess, setisSuccess] = useState(false);
  const [config, setconfig] = useState();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const islogin = localStorage.getItem("IsLogin");
    const user_id = localStorage.getItem("user_id");

    setuser_id(user_id);
    settoken(token);
    const config = {
      headers: {
        Authorization: token,
      },
    };
    setconfig(config);
    if (slug) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API}/post/${slug}`, config)
        .then(function (response) {
          console.log(response);
          const data = response.data;

          setTitle(response.data.post.title);
          setLocation(response.data.post.Location);
          setdescription(response.data.post.description);
          setpost_id(response.data.post._id);

          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [slug]);
  console.log("id: " + post_id);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setIsErr(false);

    setIsErr400(false);
    setisSuccess(false);
    const data = {
      title,
      description,
      Location,
      token,
      user_id,
    };

    axios
      .put(`${process.env.NEXT_PUBLIC_API}/post/${post_id}`, data, config)
      .then(function (response) {
        setLoading(false);
        setisSuccess(true);
        console.log(response);
      })
      .catch(function (error) {
        setLoading(false);

        console.log(error.response.status);
        console.log(error);

        setIsErr(true);
      });
  };
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
      <Grid
        sx={{
          marginTop: 6,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          flexWrap: "wrap",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          sx={{ textAlign: "center", mb: "12px" }}
        >
          Edit the post
        </Typography>
        {isSuccess && (
          <div className={Styles.alert}>
            <Alert severity="success">
              Your post has been submitted successfully — thanks
            </Alert>
          </div>
        )}
        {IsErr && (
          <div className={Styles.alert}>
            <Alert severity="error">
              Something is wrong — Please try again!
            </Alert>
          </div>
        )}
        {IsErr400 && (
          <div className={Styles.alert}>
            <Alert severity="error">
              Slug must be unique — Please try again!
            </Alert>
          </div>
        )}
      </Grid>

      <Grid container spacing={2} justifyContent="center">
        <form onSubmit={(e) => handleSubmit(e)} sx={{ m: "0px auto" }}>
          <Grid
            className={Styles.inputGrid}
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{ ml: 1 }}
          >
            <Item>
              <TextField
                onChange={(e) => setTitle(e.target.value)}
                maxRows={4}
                value={title}
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                size="small"
              />
            </Item>
            <Item>
              <TextField
                onChange={(e) => setLocation(e.target.value)}
                value={Location}
                maxRows={4}
                require
                fullWidth
                id="Location"
                label="Location"
                name="Location"
                size="small"
              />
            </Item>

            <Item>
              <TextareaAutosize
                className={Styles.textArea}
                maxRows={4}
                aria-label="maximum height"
                placeholder="Short decription about your experience there"
                required
                value={description}
                onChange={(e) => setdescription(e.target.value)}
                style={{ width: "100%", height: "100px" }}
              />
            </Item>

            <Item sx={{ alignItems: "baseLine" }}>
              <Button
                type="submit"
                disabled={Loading}
                fullWidth
                variant="contained"
              >
                {Loading ? "Loading.." : "Update"}
              </Button>
            </Item>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

export default EditpostComp;
