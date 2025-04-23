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

export type taskStore = {
    task: Task,
    addData: (key: string, value: string) => void,
    removeData: () => void,
}

export type tasksStore = {
    taskList: Task[],
    taskToDelete: number | null,
    setTaskList:(initialTaskList:Task[]) => void,
    addTask: () => void,
    editTask: (itemId: number, newValue: object) => void,
    confirmDelete: (id: number) => void,
    handleDelete: () => void,
    doneTask:(id:number) => void,
}

export type  deleteContextType = {
    deleteModelVisible: boolean;
    setDeleteModelVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export type  doneContextType = {
    doneModelVisible: boolean;
    setDoneModelVisible: React.Dispatch<React.SetStateAction<boolean>>;
    toggleCheckBox: boolean;
    setToggleCheckBox: React.Dispatch<React.SetStateAction<boolean>>;
}
