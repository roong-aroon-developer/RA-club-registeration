import React from "react";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import { AuthContext } from "./Store/Context";
import firebase from "../component/Firebase";

import Popup from '../component/Popup';

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
  const { checkSignInAttemp, checkAuth, checkUserInfo } = React.useContext(AuthContext); 

  const popupHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    checkSignInAttemp(false); //close popup
  };

  React.useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        checkUserInfo({
          name: firebase.auth().currentUser?.displayName,
          uid: firebase.auth().currentUser?.uid,
          email: firebase.auth().currentUser?.email,
          phone: firebase.auth().currentUser?.phoneNumber,
          img: firebase.auth().currentUser?.photoURL,
        });
        checkAuth(!!user);
      });
    return () => {
      unregisterAuthObserver();
      checkSignInAttemp(false);
    };
  }, [checkAuth, checkSignInAttemp, checkUserInfo]);
  return (
    <Popup title='Sign-in' open={true} onClose={popupHandler}>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
    </Popup>
  );
};

export default Login;
