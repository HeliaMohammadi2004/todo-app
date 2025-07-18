import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import { Button, TextField, Stack } from "@mui/material";
import { useState } from "react";

interface TodoFormProps {
  onAdd: (title: string) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          placeholder="Add a new task..."
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          size="small"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<AddTaskOutlinedIcon />}
        >
            Add
        </Button>
      </Stack>
    </form>
  );
}
