import React from "react";
import PropTypes from "prop-types";
// import Styles from "../styles/post.module.css";
import Styles from "./profile.module.css";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Button, IconButton, TextareaAutosize, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";

import axios from "axios";
import Followcard from "./Followcard";
const EditProfile = (props) => {
  const { onClose, open, id, Name } = props;
  const [name, setname] = useState();
  const [bio, setbio] = useState();
  const [token, settoken] = useState();
  const [user_id, setuser_id] = useState();
  const [Loading, setLoading] = useState(true);
  const [isSuccess, setisSuccess] = useState(false);
  const [IsErr, setIsErr] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const islogin = localStorage.getItem("IsLogin");
    const user_id = localStorage.getItem("user_id");

    setuser_id(user_id);
    settoken(token);
  }, []);
  function handleEdit(e) {
    e.preventDefault();
    const data = {
      name,
      bio,
      token
    };

    axios
      .put(`${process.env.NEXT_PUBLIC_API}/user/profileEdit/${user_id}`, data)
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
  }
  return (
    <>
      <Dialog className={Styles.model} onClose={onClose} open={open}>
        <DialogTitle>Edit Your Profile{Name}</DialogTitle>
        <form onSubmit={(e) => handleEdit(e)} className={Styles.modelBody}>
          <TextField
            label="Name"
            placeholder="Change Your Name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            size="small"
            fullWidth
          />
          <br />
          <br />

          <>
            <TextareaAutosize
              className={Styles.textArea}
              maxRows={4}
              aria-label="maximum height"
              placeholder="Short decription about your self"
              required
              value={bio}
              onChange={(e) => setbio(e.target.value)}
              style={{ width: "100%", height: "100px" }}
            />
          </>
          <Button type="submit" size="small" variant="contained">
            Save
          </Button>
        </form>
      </Dialog>
    </>
  );
};

export default EditProfile;
