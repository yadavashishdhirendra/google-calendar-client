import React, { useEffect, useState } from 'react'
import { HeadingTitle } from '../ModalContainer'
import { Button } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteTaskActions, GetEventByIdActions, ScheduleEventActions, UpdatedEventByIdActions } from '../../../Actions/Actions'
import { toast } from 'react-toastify'
import Select from 'react-select'
import Loading from '../../Loading'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import AvTimerIcon from '@mui/icons-material/AvTimer';

dayjs.extend(utc);
dayjs.extend(timezone);

const options = [
    {
        id: 1,
        value: "yadavashishdhirendra@gmail.com",
        label: "Ashish Yadav"
    },
    {
        id: 2,
        value: "mahimayadav196@gmail.com",
        label: "Mahima Yadav"
    }
]

const dropdown_styles = {
    option: (defaultStyles, state) => ({
        ...defaultStyles,
        color: state.isSelected ? "#000" : "#1C1C1C",
        backgroundColor: state.isSelected ? "#a0a0a0" : "#fffff",
        whiteSpace: "nowrap", // Allow text to wrap within the option
        overflow: "hidden", // Allow long words to break into multiple lines
        textOverflow: "ellipsis",
        fontSize: "14px",
    }),

    noOptionsMessage: (provided) => ({
        ...provided,
        color: "#000",
        fontSize: "14px",
    }),

    control: (defaultStyles) => ({
        ...defaultStyles,
        backgroundColor: "#E5E6FF",
        border: "none",
        boxShadow: "none",
        fontSize: "16px",
        borderRadius: "5px",
        padding: "0px 0px",
        minHeight: "58px",
        height: "58px",
        marginTop: "5px",
        "&:hover": {
            border: "none !important",
        },
    }),
    menu: (provided, state) => ({
        ...provided,
        fontSize: "12px", // Replace 'Your desired font' with the font you want to use
        maxWidth: "300px",
        overflowX: "auto",
        whiteSpace: "nowrap",
        borderRadius: "3px",
        // Add other menu styles if needed
    }),
    singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#1C1C1C" }),
};

const CreateEditEvents = ({ close, event_id, create_event }) => {
    const dispatch = useDispatch()

    // Delete Task State
    const { delete: delete_event, loading, error } = useSelector((state) => state.delete_task)

    // Create Task State
    const { schedule_event, loading: create_loading, error: create_error } = useSelector((state) => state.create_event)

    // Get Event By Id State
    const { event, loading: single_event_loading, error: single_event_error } = useSelector((state) => state.singleEvent)

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [attendees, setAttendees] = useState([])
    const [startDate, setStartDate] = useState("")
    const [endDate, setendDate] = useState("")

    const handleStartDate = (date) => {
        const newDate = dayjs(date);

        // Convert the date to ISO 8601 format
        const isoFormattedDate = newDate.toISOString();
        setStartDate(isoFormattedDate)
    }

    const handleEndDate = (date) => {
        const newDate = dayjs(date);

        // Convert the date to ISO 8601 format
        const isoFormattedDate = newDate.toISOString();
        setendDate(isoFormattedDate)
    }

    // Handling Delete Task
    const [isDeleted, setIsDeleted] = useState(false)
    const handleDeleteTask = () => {
        setIsDeleted(true)
        dispatch(DeleteTaskActions(event_id))
    }

    useEffect(() => {
        if (delete_event && delete_event?.success === true && isDeleted) {
            toast.success(delete_event && delete_event.message)
            setIsDeleted(false)
        }
        if (error && isDeleted) {
            toast.error(error)
            setIsDeleted(false)
        }
    }, [delete_event, error, isDeleted])

    console.log(title, description, attendees, startDate, endDate)


    const handleAttendees = (val) => {
        setAttendees(val)
    }

    const [isCreated, setIsCreated] = useState(false)

    const handleCreateEvents = () => {
        let attendees_string = attendees.map((obj) => obj.value)
        const formattedAttendees = attendees_string.map(email => ({ email }));
        setIsCreated(true)
        dispatch(ScheduleEventActions(title, description, startDate, endDate, formattedAttendees))
    }


    useEffect(() => {
        if (schedule_event && schedule_event?.success === true && isCreated) {
            toast.success(schedule_event && schedule_event.message)
            setIsCreated(false)
        }
        if (schedule_event && schedule_event?.success === false && isCreated) {
            toast.success(schedule_event && schedule_event.message)
            setIsCreated(false)
        }
        if (create_error && isCreated) {
            toast.error(create_error)
            setIsCreated(false)
        }
    }, [schedule_event, create_error, isCreated])



    const [isFetched, setisFetched] = useState(false)

    useEffect(() => {
        if (!create_event) {
            dispatch(GetEventByIdActions(event_id))
            setisFetched(true)
        }
    }, [create_event, event_id, dispatch])

    useEffect(() => {
        if (event && event.success === true && isFetched) {
            toast.success("Event Retrieved Successfully")
            setisFetched(true)
            console.log(event?.event)
            setTitle(event?.event?.summary)
            setDescription(event?.event?.description)
            const options = event?.event?.attendees?.map((attendee, index) => {
                return {
                    id: index + 1,
                    value: attendee.email,
                    label: attendee.email
                };
            });
            setAttendees(options)
            setStartDate(event?.event?.start?.dateTime)
            setendDate(event?.event?.end?.dateTime)
        }
        if (single_event_error && isFetched) {
            toast.error(single_event_error)
        }
    }, [single_event_error, event, isFetched])


    console.log("DATE: ", startDate)

    // Handle Update

    // update event state
    const { updated_event, loading: updated_loading, error: updated_error } = useSelector((state) => state.eventUpdate)
    const [isUpdated, setIsUpdated] = useState(false)
    const handleUpdateEvents = () => {
        let attendees_string = attendees?.map((obj) => obj.value)
        const formattedAttendees = attendees_string.map(email => ({ email }));
        setIsUpdated(true)
        dispatch(UpdatedEventByIdActions(title, description, startDate, endDate, formattedAttendees, event_id))
    }

    useEffect(() => {
        if (updated_event && updated_event?.success === true && isUpdated) {
            toast.success(updated_event && updated_event?.message)
            setIsUpdated(false)
        }
        if (updated_event && updated_event?.success === false && isUpdated) {
            toast.error(updated_event && updated_event?.message)
            setIsUpdated(false)
        }
        if (updated_error && isUpdated) {
            toast.error(updated_error)
            setIsUpdated(false)
        }
    }, [updated_event, updated_error, isUpdated])

    console.log(updated_event)

    return (
        <>
            <HeadingTitle title={`CREATE EVENT`} center={false} closeModal={close} />

            {
                single_event_loading ? <Loading mt={true} loading={single_event_loading} color={"#C738BD"} size={80} /> : <>
                    {
                        !create_event && <div className="action-icons">
                            <Button onClick={() => handleDeleteTask()}>
                                {
                                    loading ? <Loading loading={loading} color={"#C738BD"} /> : <Delete />
                                }
                            </Button>
                        </div>
                    }

                    <div className="create-input-form">
                        <div>
                            <label htmlFor="">Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} name="" id="" placeholder="Event Title" />
                        </div>
                        <div>
                            <label htmlFor="">Description</label>
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} name="" id="" placeholder="Description" />
                        </div>
                        <div>
                            <label htmlFor="">Select Attendees</label>
                            <Select
                                placeholder="Select Attendees"
                                value={attendees}
                                onChange={handleAttendees}
                                options={options}
                                isMulti
                                styles={dropdown_styles}
                            />
                        </div>
                        <div className='date-picker-filter'>
                            <label htmlFor="">Start Date Time</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DateTimePicker"]}>
                                    <DateTimePicker inputProps={{
                                        placeholder: "Placeholder"
                                    }} value={dayjs(startDate)} label="Start Date Time" onChange={(date) => handleStartDate(date.$d)} sx={{
                                        "&: .MuiOutlinedInput-root": {
                                            "&:hover > fieldset": {
                                                borderColor: "none",
                                                border: 0
                                            }
                                        },
                                        backgroundColor: "#E5E6FF",
                                        border: 0,
                                        borderRadius: "5px",
                                        borderColor: "none"
                                    }} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className='date-picker-filter'>
                            <label htmlFor="">End Date Time</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DateTimePicker"]}>
                                    <DateTimePicker value={dayjs(endDate)} label="End Date Time" onChange={(date) => handleEndDate(date.$d)} sx={{
                                        "&: .MuiOutlinedInput-root": {
                                            "&:hover > fieldset": {
                                                borderColor: "none",
                                                border: 0
                                            }
                                        },
                                        backgroundColor: "#E5E6FF",
                                        border: 0,
                                        borderRadius: "5px",
                                        borderColor: "none"
                                    }} />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className="schedule-event">
                        {
                            !create_event ? <Button onClick={handleUpdateEvents}>{updated_loading ? <Loading loading={updated_loading} /> : <span><AvTimerIcon /> &nbsp;Update Event</span>}</Button> : <Button onClick={handleCreateEvents}>{create_loading ? <Loading loading={create_loading} /> : <span><AvTimerIcon /> &nbsp;Schedule Event</span>}</Button>
                        }
                    </div>
                </>
            }
        </>
    )
}

export default CreateEditEvents