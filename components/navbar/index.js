import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";
import Button from "@mui/material/Button";
import Styles from "./navbar.module.css";
import { useEffect, useState } from "react";

import Router from "next/router";
import { useRouter } from "next/router";
import { ChatBubble } from "@mui/icons-material";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const router = useRouter();
  const { isLogin } = router.query;

  const [id, setid] = useState();
  const [IsLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const id = localStorage.getItem("user_id");
    const IsLogin = localStorage.getItem("IsLogin");
    const token = localStorage.getItem("token");
    setIsLogin(IsLogin ? IsLogin : false);
    setid(id);
  }, []);


function Logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
  localStorage.removeItem('user_Name');
  localStorage.removeItem('IsLogin');
  Router.push(`/login`);

}


  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {IsLogin && (
        <>
        <Link href={`/profile?id=${id}`}>
          <MenuItem>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Typography>Profile</Typography>
          </MenuItem>
        </Link>
        <Link href={`/chat`}>
        <MenuItem>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <ChatBubble />
          </IconButton>
          <Typography>Chat</Typography>
        </MenuItem>
      </Link>
      </>
      )}
      {IsLogin ? (
        <>
          <Button onClick={()=> Logout()} className={Styles.signInBtn} variant="outlined">
            Logout
          </Button>
        </>
      ) : (
        <Link href={"/login"}>
          <Button className={Styles.signInBtn} variant="outlined">
            Login
          </Button>
        </Link>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "green" }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "#00000055", p: "5px 0px" }}
      >
        <Toolbar>
          <img src="/travel-book-logo.jpeg" />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              fontFamily: "monospace",
              mr: "60px",
              display: { xs: "none", md: "flex" },
            }}
          >
            Travel Book
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ ml: "-10px" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem>
                <Link href="/">
                  <Typography textAlign="center">Home</Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link href="/posts">
                  <Typography textAlign="center">Posts</Typography>
                </Link>
              </MenuItem>

              <MenuItem>
                <Link href="/about">
                  <Typography textAlign="center">About</Typography>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link href="/contact">
                  <Typography textAlign="center">Contact Us</Typography>
                </Link>
              </MenuItem>
              {IsLogin && (
                <MenuItem>
                  <Link href="/upload">
                    <Typography textAlign="center">Upload</Typography>
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="./"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              letterSpacing: ".1rem",
              color: "inherit",
              justifyContent: "center",
              textDecoration: "none",
            }}
          >
            Travel Book
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link href="/">
              <Button
                sx={{
                  color: "white",
                  display: "block",
                  ml: "15px",
                  textTransform: "capitalize",
                }}
              >
                Home
              </Button>
            </Link>
            <Link href="/posts">
              <Button
                sx={{
                  color: "white",
                  display: "block",
                  ml: "15px",
                  textTransform: "capitalize",
                }}
              >
                Posts
              </Button>
            </Link>
            <Link href="/about">
              <Button
                sx={{
                  color: "white",
                  display: "block",
                  ml: "15px",
                  textTransform: "capitalize",
                }}
              >
                About
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                sx={{
                  color: "white",
                  display: "block",
                  ml: "15px",
                  textTransform: "capitalize",
                }}
              >
                Contact Us
              </Button>
            </Link>
            {IsLogin&& <Link href="/upload">
              <Button
                sx={{
                  color: "white",
                  display: "block",
                  ml: "15px",
                  textTransform: "capitalize",
                }}
              >
                Upload
              </Button>
            </Link>}
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {IsLogin && (
              <>
              <Link href={`/profile?id=${id}`}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  // onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Link>
              <Link href={`/chat`}>
              <MenuItem>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <ChatBubble />
                </IconButton>
                <Typography>Chat</Typography>
              </MenuItem>
            </Link>
            </>
            )}
            {IsLogin ? (
              <>
                <Button onClick={()=> Logout()} className={Styles.signInBtn} variant="outlined">
                  Logout
                </Button>
              </>
            ) : (
              <Link href={"/login"}>
                <Button className={Styles.signInBtn} variant="outlined">
                  Login
                </Button>
              </Link>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
