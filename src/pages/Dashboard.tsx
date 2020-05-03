import React, { Fragment } from 'react';

import Navbar from '../component/Navbar';
import Login from '../component/Login';
import Container from '../component/Container'
import Card from '../component/Card';

import { AuthContext } from '../component/Store/Context'

const Dashboard:React.FC = ()=>  {
  const { loggedIn, signInAttemp } = React.useContext(AuthContext);
  return (
    <Fragment>
      <Navbar/>
      {!loggedIn && signInAttemp ? (
        <Login />
      ) : (
        <Fragment></Fragment>
      )}
      <Container> 
        <Card />
        <Card />
        <Card />
        <Card />
      </Container>
    </Fragment>
  );
}

export default Dashboard;
