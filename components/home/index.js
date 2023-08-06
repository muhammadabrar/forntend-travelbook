import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Styles from "./home.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LocationSearchingOutlinedIcon from "@mui/icons-material/LocationSearchingOutlined";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import Link from "next/link";
export default function HomePage() {
const [search, setsearch] = useState('');

  return (
    <>
      <Grid className={Styles.container} id="topmost-container">
        <Grid className={Styles.gridContainer}>
          <Grid item lg={2} md={6} xs={12} sx={{ m: "10px auto" }}>
            <Typography variant="h6" component="p" className={Styles.heading}>
              Travel all over{" "}
              <span className={Styles.headingLast}>the world</span>
            </Typography>
          </Grid>
          <Link href={`/search`}><a>
          <Grid
            className={Styles.searches}
            id="form-grid-container"
            container
            justifyContent="center"
          >
            
            <Grid item lg={4} md={4} s={12} xs={12}>
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  borderRadius:"2rem"
                  // width: 600,
                }}
              >
                <InputBase
                  sx={{ ml: 1, p:"0 1rem", flex: 1 }}
                  placeholder="Search..."
                  inputProps={{ "aria-label": "search google maps" }}
                  value={search}
                  onChange={(e)=> setsearch(e.target.value)}
                />
                <>
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
                </>
              </Paper>
            </Grid>
            </Grid>
            </a></Link>
          
        </Grid>
      </Grid>
    </>
  );
}
