import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { AuthContext } from "./Store/Context";
import { firebaseConfig } from "../config";

firebase.initializeApp(firebaseConfig);

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 2,
    textAlign: "center",
    transition: 'fade'
  },
  card: {
    position: "fixed",
    backgroundColor: '#fff',
    padding: 10,
    width: 300,
    borderRadius: 10,
    zIndex: 99,
    boxShadow: '15px 15px 102px -30px rgba(0,0,0,0.67)'
  },
  blur: {
    position: "fixed",
    margin: "auto",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 2,
    textAlign: "center",
    backdropFilter: 'blur(10px)',
  }
});

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      customParameters: { hd: "roong-aroon.ac.th" },
    },
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

const Login: React.FC = () => {
  const classes = useStyles();
  const { checkSignInAttemp, checkAuth, checkUserInfo } = React.useContext(AuthContext);
  
  const popupHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    checkSignInAttemp(false); //close popup
  }

  React.useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        checkAuth(!!user);
      }
      );
    return () => {
      unregisterAuthObserver();
      checkSignInAttemp(false);
      checkUserInfo({
        name: firebase.auth().currentUser?.displayName,
        email: firebase.auth().currentUser?.email,
        phone: firebase.auth().currentUser?.phoneNumber,
        img: firebase.auth().currentUser?.photoURL,
      });
    };
  }, );
  return (
    <div className={classes.root} >
      <div className={classes.blur} onClick={popupHandler}></div>
      <div className={classes.card} >
          <p>Sign-in</p>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </div>
    </div>
  );
};

export default Login;
