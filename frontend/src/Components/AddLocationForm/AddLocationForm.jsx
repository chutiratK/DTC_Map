import React, { useState } from 'react'
import './AddLocationForm.css'
import { useNavigate } from 'react-router-dom';

const AddLocationForm = () => {
    const [locationDetails, setLocationDetails] = useState({
        name: "",
        province: "",
        district: "",
        postalCode: "",
        description: "",
        longitude: 0,
        latitude: 0
    })
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const changeHandler = (e) => {
        setLocationDetails({...locationDetails, [e.target.name]:e.target.value})
    }
    const addLocation = async ()=> {
        let location = locationDetails;
        try {
            await fetch('http://localhost:4000/addLocations', {
                method: 'POST',
                headers: {
                    Accepts: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(location),
            })
            .then((res)=>res.json())
            .then((data) => {
                if (data.success) {
                    alert('Added Location Success');
                    navigate('/');
                } else {
                    alert('Failed to add location');
                }
            });
        } catch (error) {
            setError('An error occurred while adding the location');
        }
        
    }

    return (
        <div className="add-location">
            <h1>ADD NEW LOCATION</h1>
            <hr/>
            <form onSubmit={addLocation}>
                <div className="addLocation-field">
                    <div className="addLocation-itemField">
                        <p>Location name</p>
                        <input 
                            value={locationDetails.name} 
                            onChange={changeHandler} 
                            type="text" 
                            name="name" 
                            placeholder='Enter here' 
                            required
                        />
                    </div>
                    <div className="addLocation-itemField">
                        <p>Province</p>
                        <input 
                            value={locationDetails.province} 
                            onChange={changeHandler} 
                            type="text" 
                            name="province" 
                            placeholder='Enter here' 
                            required
                        />
                    </div>
                </div>
                <div className="addLocation-field">
                    <div className="addLocation-itemField">
                        <p>District</p>
                        <input 
                            value={locationDetails.district} 
                            onChange={changeHandler} 
                            type="text" 
                            name="district" 
                            placeholder='Enter here' 
                            required
                        />
                    </div>
                    <div className="addLocation-itemField">
                        <p>Postal Code</p>
                        <input 
                            value={locationDetails.postalCode} 
                            onChange={changeHandler} 
                            type="text" 
                            name="postalCode" 
                            placeholder='Enter here' 
                            maxLength={5}
                            required
                        />
                    </div>
                </div>
                <div className="addLocation-field">
                    <div className="addLocation-itemField">
                        <p>latitude</p>
                        <input 
                            value={locationDetails.latitude} 
                            onChange={changeHandler} 
                            type="number" 
                            name="latitude" 
                            placeholder='Enter here' 
                            required
                        />
                    </div>
                    <div className="addLocation-itemField">
                        <p>longitude</p>
                        <input 
                            value={locationDetails.longitude} 
                            onChange={changeHandler} 
                            type="number" 
                            name="longitude" 
                            placeholder='Enter here' 
                            required
                        />
                    </div>
                </div>
                <div className="addLocation-itemField">
                    <p>Description</p>
                    <input 
                        value={locationDetails.description} 
                        onChange={changeHandler} 
                        type="text" 
                        name="description" 
                        placeholder='Enter here' 
                    />
                </div>
                <button type='submit' className='addLocation-btn'>SUBMIT</button>
                {error && <p className="error">{error}</p>}
            </form>
            
        </div>
    );
};

export default AddLocationForm;