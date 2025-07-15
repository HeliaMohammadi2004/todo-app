import { Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";

interface todoProps {
    onAdd: (title: string) => void
}

export default function TodoForm({onAdd}: todoProps) {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim()) return;
        onAdd(title);
        setTitle('')
    }

    return (
        <>
        <FormControl>
            <TextField
            placeholder="new task"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            >
            </TextField>
            <Button
            variant="contained"
            onClick={handleSubmit}>
                Add
            </Button>
        </FormControl>
        </>
    )
}