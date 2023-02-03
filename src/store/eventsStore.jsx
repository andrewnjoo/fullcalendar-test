import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useEventsStore = create(
  persist(
    (set) => ({
      events: [],
      addEvent: (event) => set((state) => ({
        events: [...state.events, event],
      })),
      deleteEvent: (event) => set((state) => ({
        events: state.events.filter((e) => e.title !== event.title),
      })),
    }),
    {
      name: 'events-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
