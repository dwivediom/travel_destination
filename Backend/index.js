require("dotenv").config() 

const express = require('express');
const mongoose = require('mongoose');
const apiRoutes = require('./routes'); // Import the router file
const cors = require("cors")
const bodyparser = require('body-parser')


// MongoDB URI (replace <username>, <password>, <dbname> with your MongoDB credentials)
const mongoURI = "mongodb+srv://programmerspark21:oM32WQZHMT8BwHsO@cluster0.3ya16sw.mongodb.net/"



// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Create Express server
const app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json() )


app.use(cors());
app.use('/api', apiRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
