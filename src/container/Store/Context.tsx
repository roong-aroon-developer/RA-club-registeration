import React, { useState } from "react";

type info = {
  name: string | null | undefined;
  uid: string | null | undefined;
  email: string | null | undefined;
  phone: string | null | undefined;
  img: any;
};

export type initialType = {
  loggedIn: boolean;
  signInAttemp: boolean;
  search: string;
  userInfo: info;
  onClubChange: boolean
  checkAuth: (event: boolean) => void;
  checkSignInAttemp: (event: boolean) => void;
  checkSearch: (event: string) => void;
  checkUserInfo: (event: info) => void;
  checkClubChange: (event: boolean) => void;
};

export const AuthContext = React.createContext({} as initialType);

export const Store: React.FC = (props) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [signInAttemp, setSignInAttemp] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [userInfo, setUserInfo] = useState<info>({
    name: "",
    uid: "",
    email: "",
    phone: "",
    img: "",
  });
  const [ onClubChange, setClubChange ] = useState<boolean>(false);

  const checkAuth = (e: boolean) => {
    setLoggedIn(e);
  };

  const checkSignInAttemp = (e: boolean) => {
    setSignInAttemp(e);
  };

  const checkUserInfo = (e: info) => {
    setUserInfo({
      name: e.name,
      uid: e.uid,
      email: e.email,
      phone: e.phone,
      img: e.img,
    });
  };

  const checkSearch = (e: string) => {
    setSearch(e);
  };

  const checkClubChange = (e: boolean) => {
    setClubChange(e);
  }

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        signInAttemp,
        userInfo,
        search,
        onClubChange,
        checkAuth,
        checkSignInAttemp,
        checkUserInfo,
        checkSearch,
        checkClubChange
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
