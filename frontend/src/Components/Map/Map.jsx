import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css'
import Search from '../SearchLocation/SearchLocation'
import LocationList from '../LocationList/LocationList';
import L from 'leaflet'

const markIcon = new L.Icon({
    iconUrl: require("../../Assets/location.png"),
    iconSize: [37, 40],
    iconAnchor: [17, 46],
    popupAnchor: [3, -46],
})
const markDestinationIcon = new L.Icon({
    iconUrl: require("../../Assets/redLocation.png"),
    iconSize: [37, 40],
    iconAnchor: [17, 46],
    popupAnchor: [3, -46],
})

const Map = () => {
    const [center, setCenter] = useState({lat:13.7331, lng:100.5605});
    const [searchResults, setSearchResults] = useState([]);
    const [userPosition, setUserPosition] = useState(null);
    const [selectedDes, setSelectedDes] = useState(null);
    const [destination, setDestination] = useState(null);
    const [route, setRoute] = useState([]);
    const zoom = 9;

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setUserPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
        });
    }, []);

    useEffect(() => {
        if (selectedDes && selectedDes.location) {
            setDestination({
                lat: selectedDes.location.latitude,
                lng: selectedDes.location.longitude
            });
        }
    }, [selectedDes]);

    useEffect(() => {
        if (userPosition && destination) {
            getRoute(userPosition, destination);
        }
    }, [userPosition, destination]);

    const getRoute = async (start, end) => {
        if (start && end && start.lat && start.lng && end.lat && end.lng) {
            const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${start.lng},${start.lat};${end.lng},${end.lat}?geometries=geojson&access_token=pk.eyJ1IjoieHN6YyIsImEiOiJjbHkxcWMzMHcweXZvMmlzMjB5ZzFrdXNoIn0.THOn7Gn6e431TbiayuyyjQ`);
            const data = await response.json();
            if (data.routes && data.routes.length > 0) {
                const routeCoordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
                setRoute(routeCoordinates);
            } else {
                console.error('No route found');
            }
        } else {
            console.error('Invalid coordinates');
        }
    };

    return (
        <div className='home-container'>
            <div className="sideBar">
            <div className="search-input">
                    <Search setSearchResults={setSearchResults} />
                </div>
                <div className="listLocation">
                    <h1>All Locations</h1>
                    <LocationList searchResults={searchResults} setSelectedDes={setSelectedDes} />
                </div>
            </div>
            <div className="map">
                <MapContainer center={center} zoom={zoom} className='map-container'>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                    />
                    {destination && (
                        <Marker key={selectedDes.location._id} position={[selectedDes.location.latitude, selectedDes.location.longitude]} icon={markDestinationIcon}>
                            <Popup>
                                {selectedDes.location.name}
                            </Popup>
                        </Marker>
                    )}
                    {userPosition && (
                        <Marker position={[userPosition.lat, userPosition.lng]} icon={markIcon}>
                            <Popup>
                                You are here
                            </Popup>
                        </Marker>
                    )}
                    {route.length > 0 && (
                        <Polyline positions={route} color="blue" />
                    )}
                </MapContainer>
            </div>
        </div>
    )
}

export default Map;