import React from "react";
import PropTypes from "prop-types";
// import Styles from "../styles/post.module.css";
import Styles from "./profile.module.css";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Button, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";

import axios from "axios";
import Followcard from "./Followcard";
const FollowModel = (props) => {
  const { onClose, open, id } = props;
  const [data, setdata] = useState();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/user/followers/${id}`)
      .then(function (response) {
        console.log(response);
        setdata(response.data);
        setisLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status == 401) {
          setErr401(true);
        } else {
          setError(true);
        }
      });
  }, [id]);


  if (isLoading) {
    return (
      <>
        <Dialog className={Styles.model} onClose={onClose} open={open}>
          <div style={{ textAlign: "center" }}>
            <h1>Loading...</h1>
          </div>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <Dialog className={Styles.model} onClose={onClose} open={open}>
        <DialogTitle>Followers</DialogTitle>
        {data?.map((data, i) => (
          <>
            <Followcard data={data}/>
          </>
        ))}
      </Dialog>
    </>
  );
};

export default FollowModel;
