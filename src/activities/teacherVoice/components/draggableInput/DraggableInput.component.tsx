// Code is based off from react beautiful dnd's codebox
// https://codesandbox.io/s/k260nyxq9v
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, Typography } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';

export interface DraggableInputItem {
    id: string;
    title: string;
    data?: any;
}

// helps with reordering the result
const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result as DraggableInputItem[];
};

interface DraggableInputProps {
    items: DraggableInputItem[];
    setItems: (items: DraggableInputItem[]) => void;
}

export const DraggableInput = ({ items, setItems }: DraggableInputProps) => {
    const onDragEnd = (result: any) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const reorderedItems = reorder(
            items,
            result.source.index,
            result.destination.index
        );

        setItems(reorderedItems);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {items.map((item, index) => (
                            <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                            >
                                {(provided) => (
                                    <Card
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        sx={{
                                            backgroundColor: 'neutral.light',
                                            userSelect: 'none',
                                            padding: 2,
                                            margin: `0 0 8px 0`,
                                            display: 'flex',
                                        }}
                                    >
                                        <DragHandleIcon
                                            sx={{
                                                marginRight: 4,
                                                color: 'gray',
                                            }}
                                        />
                                        <Typography>{item.title}</Typography>
                                    </Card>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};
