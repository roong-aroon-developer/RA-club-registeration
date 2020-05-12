import React, { Fragment } from "react";

import Navbar from "../container/Navbar";
import Login from "../container/Login";
import Container from "../component/Container";
import Card from "../container/Card";

import { AuthContext } from "../container/Store/Context";
import Data from "../club.json";

import firebase from "../component/Firebase";
import "firebase/firestore";


const Dashboard: React.FC = () => {
  let db = firebase.firestore();
  const { search, loggedIn, signInAttemp, userInfo } = React.useContext(AuthContext);
  const [join, setJoin] = React.useState<any>({ available: false });
  const [ currentClub, setCurrentClub ] = React.useState<any>({ club: "" });

  React.useEffect(() => {
    async function fetchData() {
      await db.collection('user')
      .doc(JSON.stringify(userInfo.uid)).get()
      .then( doc => {
        if(doc.exists) {
          setCurrentClub(doc.data());
        }
      });
      const unsub = await db
      .collection("activate")
      .doc("join")
      .onSnapshot((doc) => {
        setJoin(doc.data());
    });
    return () => unsub()
  }
      
    fetchData();
    
  }, [userInfo.uid, currentClub, db]);

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
              join={join.available}
              currentClub={currentClub.club}
            />
          );
        })}
      </Container>
    </Fragment>
  );
};

export default Dashboard;
