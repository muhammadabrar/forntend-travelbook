import axios from "axios";
import React, { useEffect, useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Container, IconButton, CardHeader } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";

import Avatar from "@mui/material/Avatar";
const Reviews = ({ post_id }) => {
  const [data, setdata] = useState();
  const [IsLoading, setIsLoading] = useState(true);
  const [user_id, setuser_id] = useState();
  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    setuser_id(user_id)
//     const token = localStorage.getItem("token");
//     const config = {
//       headers: {
//         Authorization: token,
//       },
//     };

    axios
      .get(`${process.env.NEXT_PUBLIC_API}/post/rating/${post_id}`)
      .then(function (response) {
        console.log(response);
        setdata(response.data);

        setIsLoading(false)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [post_id]);

  if (IsLoading) {
      return (
        <>
        <h1>Laoding...</h1>
        </>
      );
    }
  return( <Container>
      {data?.map((data, i)=>
      <>
       <CardHeader
          avatar={
            <Avatar
              aria-label="user"
              alt={data?.user}
              src={`${process.env.NEXT_PUBLIC_API}/public/dps/${data?.user_Image}`}
            />
          }
          action={
            <>
             
              {data?.user_id == user_id && (
                <IconButton  variant="contained" size="small">
                  <DeleteOutline style={{color: "red"}}/>
                </IconButton>
              )}
            </>
          }
          title={data?.user}
          subheader={data?.date}
        />
        <p>{data?.comment}</p>
      </>)}
      {data.length<1 && <h1>No Review</h1>}

  </Container>);
};

export default Reviews;
