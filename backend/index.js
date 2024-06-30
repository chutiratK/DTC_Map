const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");
const PORT = 4000;

mongoose.connect("mongodb+srv://chubchubjm10:f0832934887@cluster0.1u4qxyy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const Location = mongoose.model('Location', {
    name: {
        type: String,
        required: true, 
    },
    province: {
        type: String,
        required: true, 
    },
    description: {
        type: String,
        required: true, 
    },
    district: {
        type: String,
        required: true, 
    },
    postalCode: {
        type: String,
        required: true, 
    },
    longitude: {
        type: Number,
        required: true, 
    },
    latitude: {
        type: Number,
        required: true, 
    },
});

app.use(express.json());
app.use(cors());

app.get('/getLocations', async (req, res) => {
    const { search } = req.query;
    const query = search ? {
        $or: [
            { name: { $regex: search, $options: 'i' } },
            { province: { $regex: search, $options: 'i' } },
            { district: { $regex: search, $options: 'i' } },
            { postalCode: { $regex: search, $options: 'i' } }
        ]
    } : {};
    try {
        const locations = await Location.find(query);
        res.status(200).send(locations);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching location list', error });
    }
});

app.post('/addLocations', async (req, res) => {
    const { name, province, description, district, postalCode, longitude, latitude } = req.body;
    const newLocation = new Location({
        name, 
        province,
        description,
        district,
        postalCode,
        longitude,
        latitude
    });
    try {
        await newLocation.save();
        res.json({
            success: true,
            newLocation
        });
    } catch (error) {
        res.status(500).send({ message: 'Error adding location', error });
    }
});

app.post('/removeLocation', async (req, res)=> {
    try {
        await Location.findOneAndDelete({ _id: req.body._id });
        res.json({
            success: true
        });
    } catch (error) {
        res.status(500).send({ message: 'Error removing location', error });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
