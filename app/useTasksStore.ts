import { create } from 'zustand';

type Store = {
  createTaskDialog: boolean;
  setCreateTaskDialog: (state: boolean) => void;
  deleteTaskDialog: boolean;
  setDeleteTaskDialog: (state: boolean) => void;
  taskId: string | null;
  setTaskId: (id: string | null) => void;
};

export const useTasksStore = create<Store>((set) => ({
  createTaskDialog: false,
  setCreateTaskDialog: (state) => set({ createTaskDialog: state }),
  deleteTaskDialog: false,
  setDeleteTaskDialog: (state) => set({ deleteTaskDialog: state }),
  taskId: null,
  setTaskId: (id) => set({ taskId: id }),
}));
