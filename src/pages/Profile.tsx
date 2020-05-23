import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
   alignItems: 'center'
  },
  display: {
    margin: 10,
    width: 120,
    height: 120
  }
})
const Profile: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Avatar className={classes.display}>M</Avatar>
      <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
          variant="outlined"
        />
    </div>

    
  );
};

export default Profile;
