import { CLEAR_ERRORS, DELETE_TASK_FAILURE, DELETE_TASK_REQUEST, DELETE_TASK_SUCCESS, GET_ALL_EVENTS_FAILURE, GET_ALL_EVENTS_REQUEST, GET_ALL_EVENTS_SUCCESS, GET_EVENT_BY_ID_FAILURE, GET_EVENT_BY_ID_REQUEST, GET_EVENT_BY_ID_SUCCESS, SCHEDULE_EVENT_FAILURE, SCHEDULE_EVENT_REQUEST, SCHEDULE_EVENT_SUCCESS, UPDATE_EVENT_BY_ID_FAILURE, UPDATE_EVENT_BY_ID_REQUEST, UPDATE_EVENT_BY_ID_SUCCESS } from "../Constants/constants";

// Login user Reducers
export const GetAllEventsReducers = (state = { events: {} }, action) => {
    switch (action.type) {
        case GET_ALL_EVENTS_REQUEST:
            return {
                loading: true,
            };
        case GET_ALL_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: action.payload,
            };
        case GET_ALL_EVENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

// Delete Task Reducers
export const DeleteTaskReducers = (state = { delete: {} }, action) => {
    switch (action.type) {
        case DELETE_TASK_REQUEST:
            return {
                loading: true,
            };
        case DELETE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                delete: action.payload,
            };
        case DELETE_TASK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

// Schedule Events Reducers
export const ScheduleEventsReducers = (state = { schedule_event: {} }, action) => {
    switch (action.type) {
        case SCHEDULE_EVENT_REQUEST:
            return {
                loading: true,
            };
        case SCHEDULE_EVENT_SUCCESS:
            return {
                ...state,
                loading: false,
                schedule_event: action.payload,
            };
        case SCHEDULE_EVENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

// Get Event By Id Reducers
export const GetEventByIdReducers = (state = { event: {} }, action) => {
    switch (action.type) {
        case GET_EVENT_BY_ID_REQUEST:
            return {
                loading: true,
            };
        case GET_EVENT_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                event: action.payload,
            };
        case GET_EVENT_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

// Update Event By Id Reducers
export const updateEventByIdReducers = (state = { updated_event: {} }, action) => {
    switch (action.type) {
        case UPDATE_EVENT_BY_ID_REQUEST:
            return {
                loading: true,
            };
        case UPDATE_EVENT_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                updated_event: action.payload,
            };
        case UPDATE_EVENT_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};