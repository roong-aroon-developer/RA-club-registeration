import React, { useState } from "react";

type info = {
    name: string | null | undefined;
    email: string | null | undefined;
    phone: string | null | undefined
    img: string | null | undefined;
}

export type initialType = {
    loggedIn: boolean;
    signInAttemp: boolean;
    userInfo: info
    checkAuth: (event: boolean) => void;
    checkSignInAttemp: (event: boolean) => void;
    checkUserInfo: (event: info) => void;
}

export const AuthContext = React.createContext({} as initialType);

export const Store: React.FC = props => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [signInAttemp, setSignInAttemp] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<info>({
        name: "",
        email: "",
        phone: "",
        img: ""
    });
    
    
    const checkAuth = (e:boolean) => {
        setLoggedIn(e);
    }

    const checkSignInAttemp = (e: boolean) => {
        setSignInAttemp(e);
    }

    const checkUserInfo = (e: info) => {
        setUserInfo({
            name: e.name,
            email: e.email,
            phone: e.phone,
            img: e.img
        })
    }

    return (
        <AuthContext.Provider value={{ loggedIn, signInAttemp, userInfo,checkAuth, checkSignInAttemp, checkUserInfo}}>
            {props.children}
        </AuthContext.Provider>

    )
}