import { Button, Checkbox, Typography } from "@mui/material";
import { Todo } from "../types/interface";

interface todoProps {
    todo: Todo;
    onToggle: (todo: Todo) => void
    onDelete: (id: number) => void
}

export default function TodoItem ({todo, onToggle, onDelete}: todoProps) {
    return (
        <>
        <div>
            <Checkbox
             checked={todo.completed}
             onChange={() => onToggle(todo)}/>
             <Typography
             className={todo.completed ? 'line-through text-gray-400' : ''}
             component="span"
             >
                {todo.title}
             </Typography>
             <Button
             onClick={() => onDelete(todo.id)}
             >Delete</Button>
        </div>
        </>
    )
}