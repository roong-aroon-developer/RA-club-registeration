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
};

const MediaCard: React.FC<cardProps> = (props) => {
  let db = firebase.firestore();
  const classes = useStyles();

  let joinButton;

  const { userInfo, loggedIn } = React.useContext(AuthContext);
  const [join, setJoin] = React.useState<any>({ available: false });
  const [popup, setPopup] = React.useState<boolean>(false);
  const [ currentClub, setCurrentClub ] = React.useState<any>({ club: ""})
  const [ isLoading, setIsLoading ] = React.useState<boolean>(true)
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

  const verifiledJoinHandler = () => {
    db.collection("club")
      .doc(props.id)
      .collection(JSON.stringify(userInfo.email))
      .doc("info")
      .set({
        nickname: "wit",
        name: userInfo.name,
        phone: userInfo.phone,
        class: "3/4",
      });
  };

  React.useEffect(() => {
    const unsub = db
      .collection("activate")
      .doc("join")
      .onSnapshot((doc) => {
        setJoin(doc.data());
    });
    return () => unsub()
  }, [db]);

  if(join.available && loggedIn) {
    if(props.id === currentClub.club) {
      joinButton = (
        <Button size="small" variant="outlined" disabled>
            <CheckCircleIcon fontSize="small" />
            Joined
        </Button>
      )
    } 
    joinButton = (
      <Button size="small" color="primary" onClick={openPopup}>
              Join
      </Button>
    )
  }
  if(!join.available || !loggedIn) {
    joinButton = (
      <Button size="small" variant="outlined" disabled>
          <LockIcon fontSize="small" />
          Join
      </Button>
    )
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
      <Popup open={popup} onClose={closePopup} title="confirmation">
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
    </Fragment>
  );
};

export default MediaCard;
