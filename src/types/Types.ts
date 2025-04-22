export type Task = {
    title: string;
    completed: boolean;
    description: string;
    id: number;
};

export type editTask = {
    title: string;
    description: string;
};

export type ListItemProps = {
    item: Task;
};

export type ItemToolsProps = {
    item: Task;
}

export type EditItemProps = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    item: Task;
}

export type UserContextType = {
    editTask: (itemId: number, newValue: object) => void
};

export type taskStore = {
    task: Task,
    addData: (key: string, value: string) => void,
    removeData: () => void,
}

export type tasksStore = {
    taskList: Task[],
    modalVisible: boolean,
    taskToDelete: number | null,
    setTaskList:(initialTaskList:Task[]) => void,
    addTask: () => void,
    editTask: (itemId: number, newValue: object) => void,
    confirmDelete: (id: number) => void,
    handleDelete: () => void,
    closeModel:() => void
}
