const mongoose = require('mongoose');

// Define package schema
const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
        
    },
    image: {
        type: String, 
     
    },
    price: {
        type: Number,
       
    },
    description: {
        type: String,
     
    }
});

// Create model for "packages" collection using the schema
const Package = mongoose.model('Packages', packageSchema);

module.exports = Package;
