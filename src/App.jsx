import React from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';

import { useEventsStore } from './store/eventsStore';
import { AddEventModal } from './components/AddEventModal';
import { EditEventModal } from './components/EditEventModal';

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

  const handleExport = () => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(events))}`;
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'events.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleLoad = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = (readerEvent) => {
        const content = readerEvent.target.result;
        useEventsStore.setState({ events: JSON.parse(content) });
      };
    };
    input.click();
  };

  return (
    <div className="my-6 mx-2 sm:mx-12">
      <div className="flex justify-center text-3xl font-bold"> Minimal Journal</div>
      <AddEventModal
        open={openAddEventModal}
        setOpen={setOpenAddEventModal}
        eventDate={eventDate}
      />
      <EditEventModal
        open={openDeleteEventModal}
        setOpen={setOpenDeleteEventModal}
        eventName={deleteEventName}
        key={deleteEventName}
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
      <div className="flex flex-row justify-center gap-10">
        <button
          className="my-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleExport}
        >
          Export data as JSON
        </button>
        <button
          className="my-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLoad}
        >
          Load data
        </button>
      </div>
    </div>
  );
}

export default App;
