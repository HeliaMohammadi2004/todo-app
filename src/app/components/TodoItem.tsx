import {
  Card,
  Checkbox,
  Typography,
  TextField,
  IconButton,
  Tooltip,
  Box
} from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
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
    <Card variant="outlined" sx={{ p: 2, boxShadow: 2 }}>
      <Box display="flex" alignItems="center" gap={2}>
        <Checkbox checked={todo.completed} onChange={() => onToggle(todo)} />

        {isEditing ? (
          <>
            <TextField
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              size="small"
              fullWidth
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") setIsEditing(false);
              }}
            />
            <Tooltip title="Save">
              <IconButton color="primary" onClick={handleSave}>
                <SaveIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Cancel">
              <IconButton onClick={() => setIsEditing(false)}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Typography
              sx={{
                flexGrow: 1,
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "text.disabled" : "text.primary",
              }}
            >
              {todo.title}
            </Typography>
            <Tooltip title="Edit">
              <IconButton color="primary" onClick={() => setIsEditing(true)}>
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
          </>
        )}

        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => onDelete(todo.id)}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
}