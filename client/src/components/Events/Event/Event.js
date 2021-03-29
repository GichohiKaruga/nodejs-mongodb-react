import { deleteEvent } from "../../../util";
import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";

import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import useStyles from "./style";

const Event = ({ event, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          event.imageFile ||
          "https://cdn.pixabay.com/photo/2018/05/31/11/54/celebration-3443779_1280.jpg"
        }
        title={event.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{event.country}</Typography>
        <Typography variant="h6">{event.city}</Typography>
        <Typography variant="body2">
          {moment(event.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(event._id)}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {event.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {event.description}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deleteEvent(event._id))}
        >
          <DeleteIcon fontSize="small" /> Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Event;
