import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LockIcon from "@material-ui/icons/Lock";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Popup from "../component/Popup";

import firebase from "../component/Firebase";
import "firebase/firestore";

import { AuthContext } from "./Store/Context";

const useStyles = makeStyles({
  root: {
    width: 345,
    margin: 20,
    borderRadius: 10,
  },
  media: {
    height: 140,
  },
  totalBox: {
    color: "#fff",
    backgroundColor: "#67B826",
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 5,
  },
});

type cardProps = {
  title: string;
  id: string;
  description: string;
  maxApplicant: number;
  join: any;
  currentClub: any
};

const MediaCard: React.FC<cardProps> = (props) => {
  let db = firebase.firestore();
  const classes = useStyles();

  let joinButton;

  const { userInfo, loggedIn, checkClubChange, onClubChange } = React.useContext(AuthContext);
  const [popup, setPopup] = React.useState<boolean>(false);
  const openPopup = () => {
    setPopup(true);
  };

  const closePopup = () => {
    setPopup(false);
  };

  const onConfirmed = () => {
    verifiledJoinHandler();
    setPopup(false);
  };

  const onCClubChange = () => {
    verifiledJoinHandler();
    db.collection("user")
      .doc(JSON.stringify(userInfo.uid))
      .update({
        club: props.id
    }).then(()=> {
      checkClubChange(!onClubChange);
    })
    setPopup(false);
  }

  const verifiledJoinHandler = () => {
    db.collection("user")
      .doc(JSON.stringify(userInfo.uid))
      .set({
        nickname: "wit",
        name: userInfo.name,
        phone: userInfo.phone,
        class: "3/4",
        club: props.id
    });
  };

  if(!props.join || !loggedIn) {
    joinButton = (
      <Button size="small" variant="outlined" disabled>
          <LockIcon fontSize="small" />
          Join
      </Button>
    )
  }
  else {
    if(props.id === props.currentClub) {
      joinButton = (
        <Button size="small" variant="outlined" disabled>
            <CheckCircleIcon fontSize="small" />
            Joined
        </Button>
      )
    }
    else {
      joinButton = (
        <Button size="small" color="primary" onClick={openPopup}>
                Join
        </Button>
      )
    } 
  }
  
  return (
    <Fragment>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
            {joinButton}
          <Typography className={classes.totalBox}>
            5/{props.maxApplicant}
          </Typography>
        </CardActions>
      </Card>
      { props.currentClub !== "" ? (
        <Popup open={popup} onClose={closePopup} title="confirmation" >
        <Typography>
          โปรดกดปุ่ม"เปลี่ยน" เพื่อเปลี่ยนไปชมรม {props.title}
        </Typography>
        <div>
          <Button
            style={{ margin: 16 }}
            variant="contained"
            color="primary"
            size="medium"
            onClick={onCClubChange}
          >
            เปลี่ยน
          </Button>
        </div>
      </Popup>
      ) : (
        <Popup open={popup} onClose={closePopup} title="Confirmation">
        <Typography>
          โปรดกดปุ่ม"ยืนยัน" เพื่อยืนยันการเข้าชมรม {props.title}
        </Typography>
        <div>
          <Button
            style={{ margin: 16 }}
            variant="contained"
            color="primary"
            size="medium"
            onClick={onConfirmed}
          >
            ยืนยัน
          </Button>
        </div>
      </Popup>
      )
      }
      
    </Fragment>
  );
};

export default MediaCard;
