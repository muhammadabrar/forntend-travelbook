import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Item from "@mui/material/ListItem";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Router from "next/router";

const theme = createTheme();

export default function LogIn() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const [Err401, setErr401] = useState(false);
  const [Err400, setErr400] = useState(false);

  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      password,
      email,
    };
console.log(data);
    await axios
      .post(`${process.env.NEXT_PUBLIC_API}/user/login`, data)
      .then(function (response) {
        console.log( response.data);
        setIsLoading(false);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', response.data.user._id);
        localStorage.setItem('user_Name', response.data.user.name);
        localStorage.setItem('IsLogin', true);


        Router.push(`/profile?id=${response.data.user._id}`);

      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        if (error.response.status == 401) {
          setErr401(true);
        } else {
          if (error.response.status == 400) {
            setErr400(true);
          } else {
            setError(true);
          }
        }
      });
  };
  return (
    <ThemeProvider theme={theme}>
      <Typography
        justifyContent="center"
        component="h3"
        variant="h3"
        sx={{ mt: 5, textAlign: "center", fontWeight: "" }}
      >
        <Avatar
          alt="Login Image"
          src="/login_2.png"
          sx={{ width: 70, height: 70, m: "10px auto" }}
        ></Avatar>
        Login to your Account
      </Typography>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            flexWrap: "wrap",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          {error && (
            <>
              <Alert severity="error">
                Something is wrong — Please try again!
              </Alert>
            </>
          )}
           {Err401 && (
            <Link href="/signup">
              <Alert severity="error">
                User Not Found — Please register!
              </Alert>
            </Link>
          )}
          {Err400 && (
            <Link href="/signup">
              <Alert severity="error">
                Password is invalid — Please Try again!
              </Alert>
            </Link>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address or Username"
              name="email"
              type={"email"}
              onChange={(e) => setemail(e.target.value)}
              value={email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
            />

            <Item>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Stay logged in"
                sx={{ display: "flex", float: "left" }}
              />

              <Link href="#" variant="body1" sx={{ ml: "auto" }}>
                Forgot password?
              </Link>
            </Item>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: "20px", height: 40 }}
            >
              Login
            </Button>
            <Grid container>
              <Item
                sx={{ display: "block", textAlign: "center", mt: 2, mb: 2 }}
              >
                <Link href="../signup" variant="body1">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Item>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
