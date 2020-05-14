import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
   alignItems: 'center'
  },
  display: {
    width: 120,
    height: 120
  }
})
const Profile: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Avatar className={classes.display}>M</Avatar>
    </div>

    
  );
};

export default Profile;
