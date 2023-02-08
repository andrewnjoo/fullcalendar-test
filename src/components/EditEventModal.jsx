import React from 'react';
import { Dialog } from '@headlessui/react';
import { FiEdit } from 'react-icons/fi';
import { AiTwotoneDelete } from 'react-icons/ai';

import { useEventsStore } from '../store/eventsStore';

export function EditEventModal({ open, setOpen, eventName }) {
  const [inputText, setInputText] = React.useState(eventName);
  const [enabled, setEnabled] = React.useState(false);
  const deleteEvent = useEventsStore((state) => state.deleteEvent);
  const updateEvent = useEventsStore((state) => state.updateEvent);

  const handleEdit = (e) => {
    e.preventDefault();
    setOpen(false);
    setEnabled(false);
    updateEvent({ title: eventName, newTitle: inputText });
  };

  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    deleteEvent({ title: eventName });
    setOpen(false);
  };

  const handleClose = () => {
    setEnabled(false);
    setInputText(eventName);
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div className="my-2 flex flex-col">
            <div className="flex flex-row mb-3">
              <button
                onClick={() => setEnabled(!enabled)}
                className="flex items-center justify-between"
              >
                <FiEdit className="mr-2" size={24} />
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center justify-between"
              >
                <AiTwotoneDelete className="mr-2" size={24} />
              </button>
            </div>
            {enabled ? (
              <input
                type="text"
                name="title"
                id="title"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            ) : (
              <div className="flex items-center my-3 mx-3">
                <span>{inputText}</span>
              </div>
            )}
          </div>
          <div className="" />
          <button
            disabled={!enabled}
            onClick={(e) => handleEdit(e)}
            className={`mr-2 rounded-md px-4 py-2 text-base font-medium text-white shadow-sm sm:col-start-2 sm:text-sm ${
              enabled
                ? 'bg-indigo-600 hover:bg-indigo-700'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          >
            Save
          </button>
          {/* ^ Greyed out until edited */}
          <button
            onClick={handleClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:col-start-1 sm:mt-0 sm:text-sm"
          >
            Cancel
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
