import { create } from 'zustand';

export const useEventsStore = create((set) => ({
  events: [
    { title: 'event 1', date: '2023-02-01' },
    { title: 'event 2', date: '2023-02-02' },
  ],

  addEvent: (event) => set((state) => ({
    events: [...state.events, event],
  })),

  deleteEvent: (event) => set((state) => ({
    events: state.events.filter((e) => e.title !== event.title),
  })),
}));
