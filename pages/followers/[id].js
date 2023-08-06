import React, { useEffect, useState } from 'react';
import Navbar from "../../components/navbar";
import { useRouter } from "next/router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from 'axios';
const Followers = () => {
  const router = useRouter();

      const { id } = router.query;
      const [isLoading, setisLoading] = useState(true);

      const [data, setdata] = useState();
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
            <>
            <Navbar/>
            
                  <h1>Follower</h1>
                  
            </>
      );
}

export default Followers;
