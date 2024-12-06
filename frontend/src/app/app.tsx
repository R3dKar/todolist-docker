import React, { useEffect, useRef, useState } from "react";
import { Task } from '../model/task.ts';
import { Grid2 as Grid, TextField, Stack, List, ListItem, IconButton, ListItemText, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const API_HOST = '';

export function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const taskInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetch(`${API_HOST}/api/tasks`)
        .then(response => response.json())
        .then((tasks: Task[]) => setTasks(tasks));
    }, []);

    const addTask = async () => {
        if (taskInputRef.current === null || taskInputRef.current.value === '') return;

        const text = taskInputRef.current.value;
        taskInputRef.current.value = '';

        const newTask: Task = await fetch(`${API_HOST}/api/task`, { 
            method: 'POST', 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ text }) 
        }).then(response => response.json());

        setTasks(tasks => [...tasks, newTask]);
    }

    const removeItem = async (id: number) => {
        await fetch(`${API_HOST}/api/task/${id}`, { method: 'DELETE' });

        setTasks(tasks => tasks.filter(task => task.id !== id));
    }
 
    const renderedTasks = tasks.map(task => (
        <ListItem key={task.id} secondaryAction={
            <IconButton onClick={() => removeItem(task.id)} color="error">
                <DeleteIcon/>
            </IconButton>
        }>
            <ListItemText primary={task.text}/>
        </ListItem>
    ));

    return (
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="start" sx={{ minHeight: '100vh' }}>
            <Paper elevation={4} sx={{ padding: '8px 8px 0', marginTop: '16px' }}>
                <Typography variant="h4" align="center" sx={{ marginBottom: '8px' }}>Список дел</Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <TextField inputRef={taskInputRef} type="text" placeholder="Что бы такого сделать..." fullWidth/>
                    <IconButton onClick={addTask}>
                        <AddIcon/>
                    </IconButton>
                </Stack>
                <List>
                    {renderedTasks}
                </List>
            </Paper>
        </Grid>
    );
}