import React, { Fragment } from 'react';
import { AuthContext } from './Store/Context';

const Login:React.FC = () => {
    const { checkAuth } = React.useContext(AuthContext)
    return(
        <Fragment>
            <button onClick={()=> { checkAuth(true) }}>login</button>
        </Fragment>
    );
} 

export default Login 