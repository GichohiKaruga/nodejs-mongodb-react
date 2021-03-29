import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import useStyles from "./styles";
import { createEvent, updateEvent } from "../../actions/events";

const Form = ({ currentId, setCurrentId }) => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    eventDate: "",
    imageFile: "",
    country: "",
    city: "",
  });
  const event = useSelector((state) =>
    currentId ? state.events.find((message) => message._id === currentId) : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (event) setEventData(event);
  }, [event]);

  const clear = () => {
    setCurrentId(0);
    setEventData({
      title: "",
      description: "",
      eventDate: "",
      imageFile: "",
      country: "",
      city: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createEvent(eventData));
      clear();
    } else {
      dispatch(updateEvent(currentId, eventData));
      clear();
    }
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing "${event.title}"` : "Creating an Event"}
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={eventData.title}
          onChange={(e) =>
            setEventData({ ...eventData, title: e.target.value })
          }
        />
        <TextField
          name="country"
          variant="outlined"
          label="Country"
          fullWidth
          value={eventData.country}
          onChange={(e) =>
            setEventData({ ...eventData, country: e.target.value })
          }
        />
        <TextField
          name="city"
          variant="outlined"
          label="City"
          fullWidth
          value={eventData.city}
          onChange={(e) => setEventData({ ...eventData, city: e.target.value })}
        />
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={eventData.description}
          onChange={(e) =>
            setEventData({ ...eventData, description: e.target.value })
          }
        />
        <TextField
          name="eventDate"
          variant="outlined"
          label="Event Date"
          fullWidth
          multiline
          rows={4}
          value={eventData.eventDate}
          onChange={(e) =>
            setEventData({ ...eventData, eventDate: e.target.value })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setEventData({ ...eventData, imageFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
