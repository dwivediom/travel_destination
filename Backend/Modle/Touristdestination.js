const mongoose = require('mongoose');

// Define tourist destination schema
const touristDestinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        latitude: {
            type: Number,
           
        },
        longitude: {
            type: Number,
           
        }
    },
    city: {
        type: String,
        
    },
    address: {
        type: String,
       
    },
    images: [{
        type: String, // Assuming images will be stored as URLs
        
    }],
    description: {
        type: String,
      
    }, 
    type:{
        type:String
    }
});

// Create model for "tourist_destinations" collection using the schema
const TouristDestination = mongoose.model('TouristDestination', touristDestinationSchema);

module.exports = TouristDestination;
