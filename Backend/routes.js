const  express = require("express")
const router  = express.Router() 

const Package = require('./Modle/Package'); // Import the Package model
const TouristDestination = require('./Modle/Touristdestination'); // Import the TouristDestination model



router.get('/', (req, res) => {
    res.send('API Home');

})
// GET all packages
router.get('/packages', async (req, res) => {
    try {
        const packages = await Package.find();
        res.json(packages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET all tourist destinations
router.get('/tourist_destinations', async (req, res) => {
    try {
        const touristDestinations = await TouristDestination.find();
        res.json(touristDestinations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST a new package
router.post('/packages', async (req, res) => {
    try {
        console.log(req.body)
        const newPackage = new Package(req.body);
        const savedPackage = await newPackage.save();
        res.json(savedPackage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST a new tourist destination
router.post('/tourist_destinations', async (req, res) => {
    try {
        const newTouristDestination = new TouristDestination(req.body);
        const savedTouristDestination = await newTouristDestination.save();
        res.json(savedTouristDestination);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});


// Update a package by ID
router.put('/packages/:id', async (req, res) => {
    try {
        const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedPackage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update a tourist destination by ID
router.put('/tourist_destinations/:id', async (req, res) => {
    try {
        const updatedTouristDestination = await TouristDestination.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTouristDestination);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});



// DELETE a package by ID
router.delete('/packages/:id', async (req, res) => {
    try {
        const deletedPackage = await Package.findByIdAndDelete(req.params.id);
        res.json({ message: 'Package deleted', deletedPackage });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// DELETE a tourist destination by ID
router.delete('/tourist_destinations/:id', async (req, res) => {
    try {
        const deletedTouristDestination = await TouristDestination.findByIdAndDelete(req.params.id);
        res.json({ message: 'Tourist destination deleted', deletedTouristDestination });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Search for packages or tourist destinations by name, city, or address
router.get('/search', async (req, res) => {
    const searchText = req.query.q;
    try {
        const packageResults = await Package.find({
            $or: [
                { name: { $regex: searchText, $options: 'i' } },
                { city: { $regex: searchText, $options: 'i' } },
                { address: { $regex: searchText, $options: 'i' } }
            ]
        });
        const touristDestinationResults = await TouristDestination.find({
            $or: [
                { name: { $regex: searchText, $options: 'i' } },
                { city: { $regex: searchText, $options: 'i' } },
                { address: { $regex: searchText, $options: 'i' } }
            ]
        });
        const results = {
            packages: packageResults,
            touristDestinations: touristDestinationResults
        };
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;

