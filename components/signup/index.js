import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Item from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Router from "next/router";
const theme = createTheme();

export default function SignUp() {
  const [IsLoading, setIsLoading] = useState(false);
  const [Err409, setErr409] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("firstName") + " " + formData.get("lastName"),
    };
    await axios
      .post(`${process.env.NEXT_PUBLIC_API}/user`, data)
      .then(function (response) {
        console.log(response);
        setIsLoading(false);
        Router.push("/login");
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        if (error.response.status == 409) {
          setErr409(true);
        } else {
          setError(true);
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {error && (
            <>
              <Alert severity="error">
                Something is wrong — Please try again!
              </Alert>
            </>
          )}
          {Err409 && (
            <Link href="../login">
              <Alert severity="error">
                You are already registered — Please login!
              </Alert>
            </Link>
          )}

          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="Email Address"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: "20px", height: 40 }}
              disabled={IsLoading}
            >
              Sign Up
            </Button>
            <Grid container>
              <Item
                sx={{ display: "block", textAlign: "center", mt: 2, mb: 2 }}
              >
                <Link href="../login" variant="body1">
                  {"Already have an account? Sign in"}
                </Link>
              </Item>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
