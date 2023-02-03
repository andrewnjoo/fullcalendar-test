import React from 'react';
import { Dialog } from '@headlessui/react';

import { useEventsStore } from '../store/eventsStore';

export function AddEventInput({ eventName, setEventName }) {
  return (
    <div className="my-6">
      <div className="mt-1">
        <label htmlFor="event" className="block text-sm font-medium text-gray-700">
          Event description
          <input
            type="event"
            name="event"
            id="event"
            className="border p-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="e.g. exercise"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

export function AddEventModal({ open, setOpen, eventDate }) {
  const [eventName, setEventName] = React.useState('');
  const addEvent = useEventsStore((state) => state.addEvent);

  const handleClose = () => {
    setOpen(false);
    setEventName('');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent({
      title: eventName,
      date: eventDate,
    });
    setOpen(false);

    setEventName('');
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <Dialog.Title>Add event</Dialog.Title>
          <AddEventInput eventName={eventName} setEventName={setEventName} />
          <button onClick={(e) => handleSubmit(e)} className="mr-2 rounded-md bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none sm:col-start-2 sm:text-sm">Submit</button>
          <button onClick={() => setOpen(false)} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:col-start-1 sm:mt-0 sm:text-sm">Cancel</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
