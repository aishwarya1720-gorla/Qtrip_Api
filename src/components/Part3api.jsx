import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";


function Part3api() {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://content-qtripdynamic-qa-backend.azurewebsites.net/api/v1/cities")
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
        setFilteredCities(data); 
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  
  const handleSearch = () => {
    const results = cities.filter((city) =>
      city.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCities(results);
    if (results.length === 0) {
      alert("No results found");
    }
  };


  const handleCityClick = (cityId) => {
    navigate(`/${cityId}`);
  };

  return (
  
    <div className="app-container">
       <div id="d1">
   <h1 id="heading">Welcome to Trip</h1>
   <p id="para">Explore the world with fantastic places to venture around</p>
   <input
        id="searchapi"
        type="text"
        placeholder="Search a City"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Search on Enter key press
      />
   </div>
      <div className="city-grid">
        {filteredCities.length > 0 ? (
          filteredCities.map((city) => (
            <div
              className="city-card"
              key={city.id}
              onClick={() => handleCityClick(city.id)}
            >
              <div className="image-container">
                <img src={city.image} alt={city.city} className="city-image" />
                <p className="city-name" style={{ fontSize: '18px', marginBottom: '40px',marginLeft:'25px' }}>
  {city.city.toUpperCase()}
</p>
<p className="city-name" style={{ fontSize: '14px', marginBottom: '16px',marginLeft:'25px' }}>
  {city.description.toUpperCase()}
</p>
              </div>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}
export default Part3api;
