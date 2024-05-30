import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import { Button } from '@mui/material'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllEventsActions } from '../Actions/Actions'
import Loading from '../Components/Loading'
import ModalContainer from '../Components/ModalContainer/ModalContainer'
import { toast } from 'react-toastify'
import AddIcon from '@mui/icons-material/Add';


const Calendar = () => {

    // event state
    const { events, loading, error } = useSelector((state) => state.events_list)

    // Events Array
    const [eventsList, setEventsList] = useState([])

    const dispatch = useDispatch()

    // handle Custom Login
    const handleLogin = () => {
        window.location.href = 'https://google-calendar-vskh.onrender.com/google';
    };

    // Dispatch Events Data
    useEffect(() => {
        dispatch(GetAllEventsActions())
    }, [dispatch])



    // Convert Into Desired Format
    useEffect(() => {
        if (events) {
            const updatedEventsList = events && events?.events?.map(i => ({
                title: i?.summary,
                start: new Date(i?.start?.dateTime),
                id: i?.id
            }));

            setEventsList(updatedEventsList);
        }
    }, [events])


    // Modal Code Starts here

    const [event_id, setEventId] = useState()

    const [createEvent, setCreateEvent] = useState(false)

    const [isIndex, setIsIndex] = useState(null);

    const handleModal = (index) => {
        setIsIndex(index);
    };

    const closeModal = () => {
        setIsIndex(null);
    };

    const renderModal = () => {
        if (isIndex !== null) {
            return (
                <ModalContainer
                    Isopen={true}
                    index={isIndex}
                    closeModal={closeModal}
                    onData={closeModal}
                    event_id={event_id}
                    createEvent={createEvent}
                />
            );
        }
        return null;
    };
    // Modal Code ends here


    const handleAdd = (info) => {
        if (info?.event?.id) {
            setEventId(info.event.id)
            handleModal(1)
            setCreateEvent(false)
        }
        else {
            handleModal(1)
            setCreateEvent(true)
        }
        // console.log(info.event.id)
    }

    console.log(error)

    useEffect(() => {
        if (error) {
            toast.error(error);
            localStorage.removeItem("user")
        }
    }, [error])


    return (
        <div className='container-calendar'>
            {
                loading ? <Loading loading={loading} color={"#C738BD"} height={true} size={80} /> : <>
                    <div className="cta-container">
                        {
                            !JSON.parse(localStorage.getItem("user")) && <Button onClick={handleLogin}>LOGIN WITH GOOGLE</Button>
                        }
                        <Button onClick={handleAdd}><AddIcon/> &nbsp; ADD EVENTS</Button>
                    </div>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView='dayGridMonth'
                        eventClick={handleAdd}
                        weekends={false}
                        events={eventsList}
                        eventContent={renderEventContent}
                        eventAdd={handleAdd}
                    />
                </>
            }
            {renderModal()}
        </div>

    )
}

// a custom render function
function renderEventContent(eventInfo) {
    console.log("EVENT INFO: ",eventInfo)
    return (
        <Button>
            <b>{eventInfo.timeText}m</b>&nbsp;
            <b>{eventInfo.event.title}</b>
        </Button>
    )
}

export default Calendar
