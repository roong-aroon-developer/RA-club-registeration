import React, { Fragment } from 'react';

import Navbar from '../component/Navbar';
import Container from '../component/Container'
import Card from '../component/Card';
import Login from '../component/Login'

import { AuthContext } from '../component/Store/Context';

const Dashboard:React.FC = ()=>  {
  const { loggedIn } = React.useContext(AuthContext);
  return (
    <Fragment>
      <Navbar/>
      {console.log(loggedIn)} 
      <Login />
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
