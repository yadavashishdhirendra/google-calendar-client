import { combineReducers } from "redux";
import { DeleteTaskReducers, GetAllEventsReducers, GetEventByIdReducers, ScheduleEventsReducers, updateEventByIdReducers } from "../Reducers/Reducers";

const RootReducer = combineReducers({
    events_list: GetAllEventsReducers,
    delete_task: DeleteTaskReducers,
    create_event: ScheduleEventsReducers,
    singleEvent: GetEventByIdReducers,
    eventUpdate: updateEventByIdReducers
});

export default RootReducer;