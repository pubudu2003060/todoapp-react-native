import { create } from "zustand";
import { taskStore } from "../types/Types";

export const useTaskStore = create<taskStore>((set) => ({
    task: {
        title: '',
        completed: false,
        description: '',
        id: 0,
    },
    addData: (key, value) => {
        set((state) => ({
            task: { ...state.task, [key]: value }
        }));
    },
    removeData: () => {
        set((state) => ({
            task: {
                title: '',
                completed: false,
                description: '',
                id: 0,
            },
        }));
    },
}))