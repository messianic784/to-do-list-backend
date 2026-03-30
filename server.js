const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // This MUST be here for the Add button to work!

let todos = []; // Start with an empty list

// GET all
app.get('/todos', (req, res) => {
    res.json(todos);
});

// POST (Add)
app.post('/todos', (req, res) => {
    console.log("Received task:", req.body); // This will show in your terminal
    const newTodo = {
        id: Date.now(),
        task: req.body.task,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT (Edit)
app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    const item = todos.find(t => t.id == id);
    if (item) {
        item.task = req.body.task;
        res.json(item);
    } else {
        res.status(404).send("Not found");
    }
});

// DELETE
app.delete('/todos/:id', (req, res) => {
    todos = todos.filter(t => t.id != req.params.id);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});