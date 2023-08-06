import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/navbar";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import Link from "next/link";
import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PostCard from "../../components/profile/PostCard";
import Item from "@mui/material/ListItem";

const Search = () => {
  const [search, setsearch] = useState();
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState();
  const [error, setError] = useState(false);
  const [posts, setposts] = useState();
  useEffect(() => {
    const getposts = localStorage.getItem("posts");
    setposts(JSON.parse(getposts));
  }, []);
  useEffect(() => {
    handleSearch();
  }, [search]);
  const handleSearch = async () => {
    // console.log(posts[0].post);
    if (search) {
      const results = posts.filter((item) =>
        item.post.title.toLowerCase().includes(search)
      );
      console.log("result :", results);
      setdata(results);
    }
  };

  if (loading) {
    return (
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container>
        <div className="page">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              borderRadius: "2rem",
              // width: 600,
            }}
          >
            <InputBase
              sx={{ ml: 1, p: "0 1rem", flex: 1 }}
              placeholder="Search..."
              inputProps={{ "aria-label": "search google maps" }}
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />
            <>
              <IconButton
                onClick={() => handleSearch()}
                sx={{ p: "10px" }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </>
          </Paper>
          {data && <h1>Search result for {search}</h1>}
          {data?.map((data, i) => (
            <Item key={i}>
              <PostCard data={data.post} user={data.user} />
            </Item>
          ))}
        </div>
        {data?.length < 1 && <h1>No results</h1>}
      </Container>
    </>
  );
};

export default Search;
