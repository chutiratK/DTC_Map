import React, { useEffect, useState } from 'react'
import './LocationList.css'
import removeIcon from '../../Assets/remove.png'

const LocationList = ({ searchResults, setSelectedDes }) => {
  const [locations, setLocalLocations] = useState([]);

  const fetchListLocations = async () => {
      await fetch('http://localhost:4000/getLocations')
      .then((res) => res.json())
      .then((data) => { setLocalLocations(data) });
  };

  const displayLocations = searchResults.length > 0 ? searchResults : locations;
  const handleClick = (location) => {
    setSelectedDes({ location });
  };

  const deleteLocation = async (id) => {
    await fetch('http://localhost:4000/removeLocation', {
      method: 'POST',
      headers: {
        Accepts: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({_id: id}),
    })
    await fetchListLocations();
  };

  useEffect(() => {
    fetchListLocations();
  }, []);

  return (
      <div className='list-location-container'>
        <ul>
          {displayLocations.map(location => (
            <li key={location._id}>
              <div className="list-location">
                <div className="title-location" onClick={() => handleClick(location)}>
                  <span>{location.name} - {location.description}</span>
                  <p>{location.province} / {location.district} / {location.postalCode}</p>
                </div>

                <div className="remove-btn">
                  <button onClick={() => deleteLocation(location._id)}>
                    <img src={removeIcon} alt="removeIcon" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
  );
}

export default LocationList