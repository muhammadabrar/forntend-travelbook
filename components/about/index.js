import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Styles from "./about.module.css";
export default function HomePage() {
  const [search, setsearch] = useState("");

  return (
    <>
      <Grid className={Styles.container} id="topmost-container">
        <Grid className={Styles.gridContainer}>
          <Typography className={Styles.heading} variant="h3" component="h3">
            About Us
          </Typography>
          <Typography className={Styles.bodyText} variant="body1">
            <b>Travel-book</b> a worldwide platform for tours and visiting all
            over the world
          </Typography>
          <Typography className={Styles.bodyText} variant="body1">
            Experience the vacation of your dreams with itravel. Our consults
            organize round trips, safaris and honeymoons according to your
            wishes. Experience the vacation of your dreams with itravel. Our
            consults organize round trips, safaris and honeymoons according to
            your wishes.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
