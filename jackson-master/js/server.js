const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://sudeepanirmani77:LVbR685FZRJzfIsx@cluster0.4tqjr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define a schema and model for the form data
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email, subject, message } = req.body;

    const newContact = new Contact({ name, email, subject, message });

    newContact.save()
        .then(() => {
            res.json({ success: true, message: 'Form submitted successfully!' });
        })
        .catch(err => {
            res.status(500).json({ success: false, message: 'Error saving data: ' + err });
        });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
