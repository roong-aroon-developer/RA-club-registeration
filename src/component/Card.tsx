import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LockIcon from "@material-ui/icons/Lock";

import firebase from './Firebase';
import 'firebase/firestore'

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

  const [join, setJoin] = React.useState<any>(false)

  React.useEffect(()=> {
    const unsub = db.collection('activate').doc('join').onSnapshot(doc => {
      setJoin(doc.data())
      console.log(doc.data())
    });

    return () => unsub()
  }, [])

  return (
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
        {join.available ? (
          <Button size="small" color="primary">
            Join
          </Button>
        ) : (
          <Button size="small" variant="outlined" disabled>
            <LockIcon fontSize="small" />
            Join
          </Button>
        )}

        <Typography className={classes.totalBox}>
          5/{props.maxApplicant}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default MediaCard;
