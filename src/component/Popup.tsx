import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';


const useStyles = makeStyles({
  root: {
    textAlign: "center",
    padding: 10,
  },
  margin: {
    marginLeft: 15,
    marginRight: 15
  }

});

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type propTypes = {
  title: string;
  open: boolean;
  onClose: (e: React.MouseEvent) => void;
};

const Popup: React.FC<propTypes> = (props) => {
  const classes = useStyles();

  return (
    <Dialog
      className={classes.root}
      onClose={props.onClose}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="simple-dialog-title"
      open={props.open}
      maxWidth="md"
    >
      <DialogTitle>{props.title}</DialogTitle>
      <div className={classes.margin}>
        {props.children}
      </div>
    </Dialog>
  );
};

export default Popup;
