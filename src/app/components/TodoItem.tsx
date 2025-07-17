import { Button, Checkbox, Typography, TextField } from "@mui/material";
import { Todo } from "../types/interface";
import { useState } from "react";

interface TodoProps {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleSave = () => {
    if (editTitle.trim() === "") return;
    onEdit({ ...todo, title: editTitle });
    setIsEditing(false);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
      <Checkbox checked={todo.completed} onChange={() => onToggle(todo)} />

      {isEditing ? (
        <>
          <TextField
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            variant="outlined"
            size="small"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") setIsEditing(false);
            }}
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </>
      ) : (
        <>
          <Typography
            style={{
                flexGrow: 1,
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#888" : "inherit" }}
          >
            {todo.title}
          </Typography>
          <Button variant="text" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </>
      )}
      <Button variant="text" color="error" onClick={() => onDelete(todo.id)}>
        Delete
      </Button>
    </div>
  );
}