import { create } from 'zustand';

type Store = {
  createTaskDialog: boolean;
  setCreateTaskDialog: (state: boolean) => void;
};

export const useTasksStore = create<Store>((set) => ({
  createTaskDialog: false,
  setCreateTaskDialog: (state) => set({ createTaskDialog: state }),
}));
