const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());

// In-memory data structure for users
let users = [];

// Helper function for email validation
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// --- CRUD Endpoints ---

// 1. Create (POST)
app.post('/api/users', (req, res) => {
    const { name, email, age } = req.body;

    // Input Validation
    if (!name || !email || age === undefined) {
        return res.status(400).json({ error: 'Missing required fields: name, email, age.' });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }
    if (typeof age !== 'number' || age < 0) {
        return res.status(400).json({ error: 'Age must be a positive number.' });
    }

    const newUser = {
        id: uuidv4(),
        name,
        email,
        age
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// 2. Read All (GET)
app.get('/api/users', (req, res) => {
    res.status(200).json(users);
});

// 3. Read One (GET)
app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json(user);
});

// 4. Update (PUT)
app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found.' });
    }

    // Input Validation
    if (name !== undefined && typeof name !== 'string') {
        return res.status(400).json({ error: 'Name must be a string.' });
    }
    if (email !== undefined && !isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }
    if (age !== undefined && (typeof age !== 'number' || age < 0)) {
        return res.status(400).json({ error: 'Age must be a positive number.' });
    }

    const updatedUser = {
        ...users[userIndex],
        ...(name && { name }),
        ...(email && { email }),
        ...(age !== undefined && { age })
    };

    users[userIndex] = updatedUser;
    res.status(200).json(updatedUser);
});

// 5. Delete (DELETE)
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found.' });
    }

    users.splice(userIndex, 1);
    res.status(204).send(); // 204 No Content
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
