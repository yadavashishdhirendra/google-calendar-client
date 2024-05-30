import axios from "axios";
import { DELETE_TASK_FAILURE, DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS, GET_ALL_EVENTS_FAILURE, GET_ALL_EVENTS_REQUEST, GET_ALL_EVENTS_SUCCESS, GET_EVENT_BY_ID_FAILURE, GET_EVENT_BY_ID_REQUEST, GET_EVENT_BY_ID_SUCCESS, SCHEDULE_EVENT_FAILURE, SCHEDULE_EVENT_REQUEST, SCHEDULE_EVENT_SUCCESS, UPDATE_EVENT_BY_ID_FAILURE, UPDATE_EVENT_BY_ID_REQUEST, UPDATE_EVENT_BY_ID_SUCCESS } from "../Constants/constants";

// const BASE_URI = process.env.REACT_APP_BASE_URI

// Login User Actions
export const GetAllEventsActions = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_ALL_EVENTS_REQUEST,
        });

        const { data } = await axios.get(`https://google-calendar-vskh.onrender.com/events`);
        dispatch({
            type: GET_ALL_EVENTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_EVENTS_FAILURE,
            payload: error.message,
        });
    }
};

// Delete Task Actions
export const DeleteTaskActions = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_TASK_REQUEST,
        });

        const { data } = await axios.delete(`https://google-calendar-vskh.onrender.com/delete-event/${id}`);
        dispatch({
            type: DELETE_TASK_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: DELETE_TASK_FAILURE,
            payload: error.message,
        });
    }
};

// Schedule Event Actions
export const ScheduleEventActions = (title, description, startdateTime, endDateTime, attendees) => async (dispatch) => {
    try {
        dispatch({
            type: SCHEDULE_EVENT_REQUEST,
        });

        const { data } = await axios.post(`https://google-calendar-vskh.onrender.com/create-events`, { title, description, startdateTime, endDateTime, attendees });
        dispatch({
            type: SCHEDULE_EVENT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: SCHEDULE_EVENT_FAILURE,
            payload: error.message,
        });
    }
};

// Get Event By Id Actions
export const GetEventByIdActions = (id) => async (dispatch) => {
    try {
        dispatch({
            type: GET_EVENT_BY_ID_REQUEST,
        });

        const { data } = await axios.get(`https://google-calendar-vskh.onrender.com/event/${id}`);
        dispatch({
            type: GET_EVENT_BY_ID_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_EVENT_BY_ID_FAILURE,
            payload: error.message,
        });
    }
};

// Update Event By Id Actions
export const UpdatedEventByIdActions = (title, description, startdateTime, endDateTime, attendees, id) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_EVENT_BY_ID_REQUEST,
        });

        const { data } = await axios.put(`https://google-calendar-vskh.onrender.com/update-events/${id}`, {
            title, description, startdateTime, endDateTime, attendees
        });
        dispatch({
            type: UPDATE_EVENT_BY_ID_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_EVENT_BY_ID_FAILURE,
            payload: error.message,
        });
    }
};