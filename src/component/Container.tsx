import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "space-around",
  },
});

const Container: React.FC = (props) => {
  const classes = useStyles();
  return <div className={classes.root}>{props.children}</div>;
};

export default Container;
