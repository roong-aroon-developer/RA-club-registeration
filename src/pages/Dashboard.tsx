import React, { Fragment } from "react";

import Navbar from "../container/Navbar";
import Login from "../container/Login";
import Container from "../component/Container";
import Card from "../container/Card";

import { AuthContext } from "../container/Store/Context";
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
