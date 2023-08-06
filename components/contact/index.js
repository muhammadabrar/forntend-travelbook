import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Styles from "./contact.module.css";

export default function HomePage() {
  const [search, setsearch] = useState("");
  const [details, setDetails] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setDetails((prev) => {
      return{...prev, [name]: value};
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(details);
  }

  return (
    <>
      <Grid className={Styles.container} id="topmost-container">
        <Grid className={Styles.gridContainer}>
          <Typography className={Styles.heading} variant="h3" component="h3">
            Contact Us
          </Typography>
          <Typography className={Styles.bodyText} variant="body1">
            We’re all ears.
          </Typography>
          <Typography className={Styles.bodyText} variant="body1">
            Experience the vacation of your dreams with itravel. Our consults
            organize round trips, safaris and honeymoons according to your
            wishes. Experience the vacation of your dreams with itravel. Our
            consults organize round trips, safaris and honeymoons according to
            your wishes.
          </Typography>

          <section className={Styles.contactUs}>
            <div className={Styles.row}>
              <div className={Styles.contactCol}>
                <div>
                  <a href="">
                    <i className="fa fa-home" aria-hidden="true"></i>
                  </a>
                  <span>
                    <h5>I-8 Markaz Islamabad</h5>
                    <p>Capital Terriotary of Pakistan</p>
                  </span>
                </div>
                <div>
                  <a href="">
                    <i className="fa fa-phone" aria-hidden="true"></i>
                  </a>
                  <span>
                    <h5>+51 235 3886</h5>
                    <p>Monday - Saturday, 09:00 AM - 05:00 PM</p>
                  </span>
                </div>
                <div>
                  <a href="">
                    <i className="fa fa-envelope-o" aria-hidden="true"></i>
                  </a>
                  <span>
                    <h5>travelbook@gmail.com</h5>
                    <p>Email us your query</p>
                  </span>
                </div>
              </div>
              <div className={Styles.contactCol}>
                <form onSubmit={handleSubmit} method="POST">
                  <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    id=""
                    placeholder="Enter your name"
                    aria-hidden="true"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    id=""
                    placeholder="Enter your email"
                    aria-hidden="true"
                    required
                  />
                  <input
                    type="text"
                    name="subject"
                    onChange={handleChange}
                    id=""
                    placeholder="Message subject"
                    aria-hidden="true"
                    required
                  />
                  <textarea
                    name="message"
                    onChange={handleChange}
                    rows="8"
                    placeholder="Message"
                    required
                  ></textarea>
                  <button className={Styles.heroBtn} type="submit">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </section>
        </Grid>
      </Grid>
    </>
  );
}
