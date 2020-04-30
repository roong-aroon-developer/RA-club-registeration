import React, { useState } from "react";

export type initialType = {
    loggedIn: boolean;
    signInAttemp: boolean;
    checkAuth: (event: boolean) => void;
    checkSignInAttemp: (event: boolean) => void;
}

export const AuthContext = React.createContext({} as initialType);

export const Store: React.FC = props => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [signInAttemp, setSignInAttemp] = useState<boolean>(false)
    
    const checkAuth = (e:boolean) => {
        setLoggedIn(e);
    }

    const checkSignInAttemp = (e: boolean) => {
        setSignInAttemp(e);
    }

    return (
        <AuthContext.Provider value={{ loggedIn, signInAttemp,checkAuth, checkSignInAttemp}}>
            {props.children}
        </AuthContext.Provider>

    )
}