import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  FETCH,
} from "../constants/actionTypes";

import * as util from "../util/index.js";

export const getEvents = () => async (dispatch) => {
  try {
    const { data } = await util.fetchEvents();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createEvent = (event) => async (dispatch) => {
  try {
    const { data } = await util.createEvent(event);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateEvent = (id, event) => async (dispatch) => {
  try {
    const { data } = await util.updateEvent(id, event);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchEvent = (id) => async (dispatch) => {
  try {
    const { data } = await util.fetchEvent(id);

    dispatch({ type: FETCH, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    await await util.deleteEvent(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
