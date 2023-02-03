/* eslint-disable */

import React from 'react';
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react' 
import interactionPlugin from "@fullcalendar/interaction"

function App () {
  const [events, setEvents] = React.useState([
    { title: 'event 1', date: '2023-04-01', number: 1 },
    { title: 'event 2', date: '2023-04-02', number: 2 },
  ])

  const getLastEvent = () => {
    return events[events.length - 1].number
  }

  const handleEventClick = (arg) => {
    if (confirm('delete')) {
      setEvents((prevState) => {
        return prevState.filter((event) => {
          return event.title !== arg.event.title
        })
      })
    }
  }
  const handleDateClick = (arg) => {
    console.log('test')
    if (confirm('add')) {
      let number = getLastEvent() + 1
      setEvents((prevState) => {
        return [...prevState, { title: `event ${number}`, date: arg.dateStr, number }]
      })
    }
  }
  return (
    <div className="App" style={{margin: '30px'}}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        height={400}
        contentHeight='auto'
      />
    </div>
  );
}

export default App;
