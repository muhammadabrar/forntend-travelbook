import React, { useState, useEffect } from "react";
import Chat from "../../components/chat";
import Router from "next/router";
import Navbar from "../../components/navbar";
import styles from "../../styles/chat.module.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { Button, Container, TextField } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
export default function ChatPage() {
  const [isLoading, setisLoading] = useState(true);
  const [config, setconfig] = useState();
  const [user_id, setuser_id] = useState();
  const [isLogin, setisLogin] = useState();
  const [data, setdata] = useState();
  const [token, settoken] = useState();
  const [Error, setError] = useState(false);
  const [msg, setmsg] = useState("");
  const [refresh, setrefresh] = useState(1);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const islogin = localStorage.getItem("IsLogin");
    const user_id = localStorage.getItem("user_id");
    setisLogin(islogin);
    setuser_id(user_id);
    settoken(token);
    const config = {
      headers: {
        Authorization: token,
      },
    };
    setconfig(config);
    if (islogin) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API}/chat`)
        .then(function (response) {
          console.log(response);
          setdata(response.data);
          setisLoading(false);
        })
        .catch(function (error) {
          console.log(error);
          setisLoading(false);

          setError(true);
        });
    } else {
      Router.push(`/login`);
    }
  }, [refresh]);

  function postMsg() {
    const msgData = {
      msg,
      token,
      user_id,
    };
    axios
      .post(`${process.env.NEXT_PUBLIC_API}/chat`, msgData)
.then(function (response) {
        console.log(response);
        setrefresh(refresh + 1);
        setmsg("");
      })
      .catch(function (error) {
        console.log(error);

        setError(true);
      });
  }
  return (
    <>
      <Navbar />
      <Container>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h1>Chat Room</h1>
          </div>
          <div className={styles.cardBody}>
            {data?.map((item, i) =>
              user_id != item.user_id ? (
                <div className={styles.msgcardL}>
                  <p className={styles.Name}>{item.name}</p>
                  <p className={styles.msg}> {item.msg}</p>
                  <p className={styles.date}>{item.data}</p>
                </div>
              ) : (
                <div className={styles.msgcardR}>
                  <p className={styles.msg}> {item.msg}</p>
                  <p className={styles.date}> {item.date}</p>
                </div>
              )
            )}
          </div>
          <div className={styles.cardFooter}>
            <TextField
              placeholder="write your msg"
              size="small"
              fullWidth
              className={styles.input}
              value={msg}
              onChange={(e) => setmsg(e.target.value)}
            />
            <Button onClick={() => postMsg()} variant="outlined">
              Send
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
