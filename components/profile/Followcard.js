import React from "react";
import Styles from "./profile.module.css";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import Router from "next/router";

import { Button, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
const Followcard = ({ data }) => {
  const [IsFollow, setIsFollow] = useState(false);
  const [Follow, setFollow] = useState();
  const [IsLogin, setIsLogin] = useState(false);
  const [user_id, setuser_id] = useState();
  const [token, settoken] = useState();
  const [Refresh, setRefresh] = useState(1);
  const [Error, setError] = useState(false);
  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    const IsLogin = localStorage.getItem("IsLogin");
    const token = localStorage.getItem("token");
    settoken(token);
    setuser_id(user_id);
    setIsLogin(IsLogin);

    axios
      .get(
        `${process.env.NEXT_PUBLIC_API}/user/IsFollow/${data.Follower_id}/${user_id}`
      )
      .then(function (response) {
        console.log(response);
        if (response.data != null) {
          setIsFollow(true);
          setFollow(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [Refresh]);

  function follow(action) {
    if (!IsLogin) {
      Router.push(`/login`);

      return null;
    }
    if (action == "follow") {
      const followerdata = {
        Follow: data.Follower_id,
        Followby: user_id,
        token: token,
      };
      axios
        .post(`${process.env.NEXT_PUBLIC_API}/user/follow/`, followerdata)
        .then(function (response) {
          console.log(response);
          setIsFollow(true);
          setRefresh(Refresh + 1);
        })
        .catch(function (error) {
          console.log(error);
        });
      return;
    }
    if (action == "unfollow") {
      const followerdata = {
        id: Follow._id,
        Followby: user_id,
        token: token,
      };
      axios
        .post(`${process.env.NEXT_PUBLIC_API}/user/unfollow`, followerdata)
        .then(function (response) {
          console.log(response);
          setIsFollow(false);
          setRefresh(Refresh + 1);
        })
        .catch(function (error) {
          console.log(error);
        });
      return;
    }
  }

  return (
    <>
      <CardHeader
      className={Styles.CardHeader}
        avatar={
          <Avatar
            aria-label="user"
            alt={data.name}
            src={`${process.env.NEXT_PUBLIC_API}/public/dps/${data?.Image}`}
          />
        }
        action={
          user_id != data.Follower_id && (
            <Button onClick={() => follow(IsFollow ? "unfollow" : "follow")}>
              {IsFollow ? "Unfollow" : "Follow"}
            </Button>
          )
        }
        title={
          data ? (
            <Link href={`/profile?id=${data.Follower_id}`}>
              <a>{data.name}</a>
            </Link>
          ) : (
            "Null"
          )
        }
        //     subheader={
        //       <button>follow</button>
        //     }
      />
    </>
  );
};

export default Followcard;
