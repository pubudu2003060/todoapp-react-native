export type Task = {
    title: string;
    completed: boolean;
    description: string;
    id: number;
};

export type ListItemProps = {
    item: Task;
    confirmDelete: (id: number) => void;
};

export type ItemToolsProps =  {
    item: Task;
}

export type EditItemProps = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    item: Task;
}

export type DeleteConfirmationProps = {
    visible: boolean;
    onClose: () => void;
    onDelete: () => void;
  }

