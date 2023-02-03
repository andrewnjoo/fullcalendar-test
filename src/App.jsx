import React from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';

import { useEventsStore } from './store/eventsStore';
import { AddEventModal } from './components/AddEventModal';
import { DeleteEventModal } from './components/DeleteEventModal';

function App() {
  const [openAddEventModal, setOpenAddEventModal] = React.useState(false);
  const [openDeleteEventModal, setOpenDeleteEventModal] = React.useState(false);
  const [eventDate, setEventDate] = React.useState('');
  const [deleteEventName, setDeleteEventName] = React.useState('');
  const events = useEventsStore((state) => state.events);

  const handleEventClick = (arg) => {
    setDeleteEventName(arg.event.title);
    setOpenDeleteEventModal(true);
  };
  const handleDateClick = (arg) => {
    setEventDate(arg.dateStr);
    setOpenAddEventModal(true);
  };

  return (
    <div className="App" style={{ margin: '30px' }}>
      <AddEventModal
        open={openAddEventModal}
        setOpen={setOpenAddEventModal}
        eventDate={eventDate}
      />
      <DeleteEventModal
        open={openDeleteEventModal}
        setOpen={setOpenDeleteEventModal}
        eventName={deleteEventName}
      />
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        height={400}
        contentHeight="auto"
        eventMouseEnter={(e) => {
          e.el.style.cursor = 'pointer';
        }}
      />
    </div>
  );
}

export default App;
