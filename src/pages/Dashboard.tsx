import React, { Fragment } from "react";

import Navbar from "../component/Navbar";
import Login from "../component/Login";
import Container from "../component/Container";
import Card from "../component/Card";

import { AuthContext } from "../component/Store/Context";
import Data from "../club.json";

const Dashboard: React.FC = () => {
  const { search, loggedIn, signInAttemp } = React.useContext(AuthContext);
  return (
    <Fragment>
      <Navbar />
      {!loggedIn && signInAttemp ? <Login /> : <Fragment></Fragment>}
      <Container>
        {Data.filter(
          (data) =>
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data.description.toLowerCase().includes(search.toLowerCase())
        ).map((data) => {
          return (
            <Card
              title={data.name}
              id={data.id}
              key={data.id}
              description={data.description}
              maxApplicant={data.maxApplicant}
            />
          );
        })}
      </Container>
    </Fragment>
  );
};

export default Dashboard;
