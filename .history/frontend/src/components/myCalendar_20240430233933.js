import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';

const localizer = momentLocalizer(moment);

const MyCalendar = ({ userId }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const res = await axios.get(`http://localhost:5000/api/events/${userId}`);
            setEvents(res.data.map(event => ({
                ...event,
                start: new Date(event.start),
                end: new Date(event.end)
            })));
        };

        fetchEvents();
    }, [userId]);

    return (
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
        />
    );
};

export default MyCalendar;
