import React, { useState } from 'react'
import './SearchLocation.css'

const SearchLocation = ({ setSearchResults }) => {
    const [query, setQuery] = useState('');
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:4000/getLocations?search=${query}`);
            const results = await response.json();
            setSearchResults(results);
        } catch (error) {
            setError('error while searching for locations');
        }
    };

    return (
        <div className='search-input'>
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="ค้นหาสถานที่"
            />
            <button onClick={handleSearch}>ค้นหา</button>
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default SearchLocation