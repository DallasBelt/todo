import { create } from 'zustand';

type TaskStatus = 'PENDING' | 'ONGOING' | 'FINISHED';

type Task = {
  id: string | null;
  title: string;
  status: TaskStatus;
  description?: string;
};

type Store = {
  createTaskDialog: boolean;
  setCreateTaskDialog: (state: boolean) => void;
  deleteTaskDialog: boolean;
  setDeleteTaskDialog: (state: boolean) => void;
  task: Task;
  setTask: (task: Partial<Task>) => void;
  isEditingTask: boolean;
  setIsEditingTask: (state: boolean) => void;
};

export const useTasksStore = create<Store>((set) => ({
  createTaskDialog: false,
  setCreateTaskDialog: (state) => set({ createTaskDialog: state }),
  deleteTaskDialog: false,
  setDeleteTaskDialog: (state) => set({ deleteTaskDialog: state }),
  task: { id: null, title: '', status: 'PENDING' },
  setTask: (task) =>
    set((state) => ({
      task: { ...state.task, ...task },
    })),
  isEditingTask: false,
  setIsEditingTask: (state) => set({ isEditingTask: state }),
}));
