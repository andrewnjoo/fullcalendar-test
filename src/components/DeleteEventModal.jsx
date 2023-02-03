import React from 'react';
import { Dialog } from '@headlessui/react';

import { useEventsStore } from '../store/eventsStore';

export function DeleteEventModal({ open, setOpen, eventName }) {
  const deleteEvent = useEventsStore((state) => state.deleteEvent);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteEvent({ title: eventName });
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <Dialog.Title>Delete event</Dialog.Title>
          <button onClick={(e) => handleSubmit(e)} className="mr-2 rounded-md bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none sm:col-start-2 sm:text-sm">Submit</button>
          <button onClick={() => setOpen(false)} className="rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:col-start-1 sm:mt-0 sm:text-sm">Cancel</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
