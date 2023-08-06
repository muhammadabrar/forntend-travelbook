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

import Styles from "./upload.module.css";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [Location, setLocation] = useState();
  const [Image, setImage] = useState();
  const [slug, setslug] = useState();
  const [Loading, setLoading] = useState(false);
  const [IsErr, setIsErr] = useState(false);

  const [IsErr400, setIsErr400] = useState(false);
const [ImageErr, setImageErr] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [submit, setsubmit] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");
    console.log(user_id);
    console.log(token);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    };
    if (submit) {
      if(!Image){
        setImageErr(true)
        return  null
      }
      const PhotoName = `${slug} - ${Image.name}`;

      const formData = new FormData();
      formData.append("file", Image, PhotoName);
      const Alldata = JSON.stringify({
        title,
        description,
        Location,
        Image: PhotoName,
        slug,
        token,
        user_id: user_id,
      });
      formData.append("data", Alldata);

      axios
        .post(`${process.env.NEXT_PUBLIC_API}/post/${token}`, formData)
        .then(function (response) {
          setLoading(false);
          setisSuccess(true);
          console.log(response);
        })
        .catch(function (error) {
          setLoading(false);

          console.log(error.response.status);
          console.log(error);

          if (error.response.status == 400) {
            console.log("400: " + error);
            setIsErr400(true);
          }
        });
    }
  }, [submit]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    setsubmit(true);
    setIsErr400(false);
    setisSuccess(false);
  };

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
          Where did you visit?
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
        {
          ImageErr &&
          <div className={Styles.alert}>
          <Alert severity="error">
            Please upload Image — try again!
          </Alert>
        </div>
        }
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
                autoComplete="title"
                autoFocus
              />
            </Item>
            <Item>
              <TextField
                onChange={(e) => setLocation(e.target.value)}
                value={Location}
                margin="normal"
                required
                fullWidth
                id="title"
                label="Location"
                name="title"
                size="small"
                autoComplete="title"
              />
            </Item>
            <Item>
              <TextField
                onChange={(e) => setslug(e.target.value)}
                value={slug}
                margin="normal"
                required
                fullWidth
                id="title"
                label="Slug"
                name="title"
                size="small"
                autoComplete="title"
                helperText="Note: Slug must be unique"
                error={IsErr400 && "true"}
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
                className={Styles.uploadBtn}
                variant="outlined"
                component="label"
                sx={{ mr: 2 }}
              >
                Upload images
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  name="files"
                  hidden
                />
              </Button>
              <Button
                type="submit"
                disabled={Loading}
                fullWidth
                variant="contained"
              >
                {Loading ? "Loading.." : "Submit to Post"}
              </Button>
            </Item>
          </Grid>
        </form>
      </Grid>
    </>
  );
}
