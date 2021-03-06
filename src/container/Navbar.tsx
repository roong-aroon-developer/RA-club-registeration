import React from "react";
import { NavLink } from 'react-router-dom'
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Searchbox from "./Search";

import firebase from "firebase/app";
import "firebase/auth";

import { AuthContext } from "./Store/Context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    bar: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    signin: {
      color: "#fff",
      borderColor: "#fff",
      borderRadius: 15,
    },
    img: {
      width: "32px",
      height: "auto",
    },
  })
);

const Navbar: React.FC = () => {
  const classes = useStyles();

  const { loggedIn, userInfo, checkAuth, checkSignInAttemp } = React.useContext(
    AuthContext
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    firebase.auth().signOut();
    checkAuth(false);
    handleClose();
  };

  const handleSigninAttemp = () => {
    checkSignInAttemp(true);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.bar}>
          <div>
            <img
              className={classes.img}
              alt="logo"
              width={32}
              src={require("../assets/logo.png")}
            ></img>
          </div>
          <Searchbox />
          {loggedIn ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar alt="profile" src={userInfo.img}></Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem><NavLink to="/profile" style={{textDecoration: "none"}}>Profile</NavLink></MenuItem>
                <MenuItem onClick={handleSignout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Button
                variant="outlined"
                className={classes.signin}
                onClick={handleSigninAttemp}
              >
                Sign in
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
