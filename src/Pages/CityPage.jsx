import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CityPage.css";
import Part1nav from "../components/Part1nav";
import Part4foot from "../components/Part4foot";

function CityPage() {
  const { cityId } = useParams();
  const [adventures, setAdventures] = useState([]);
  const [filteredAdventures, setFilteredAdventures] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDuration, setFilterDuration] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://content-qtripdynamic-qa-backend.azurewebsites.net/api/v1/adventures?city=${cityId}`)
      .then((res) => res.json())
      .then((data) => {
        setAdventures(data);
        setFilteredAdventures(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [cityId]);

  const handleFilters = () => {
    let filtered = adventures;

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter((adventure) =>
        adventure.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply duration filter
    if (filterDuration) {
      const [min, max] = filterDuration.split("-");
      filtered = filtered.filter(
        (adventure) => adventure.duration >= min && adventure.duration <= max
      );
    }

    // Apply category filter
    if (filterCategory) {
      filtered = filtered.filter((adventure) => adventure.category === filterCategory);
    }

    setFilteredAdventures(filtered);
  };

  const handleAdventureClick = (adventureId) => {
    navigate(`/adventure/${adventureId}`);
  };

  return (
    <div>
      <Part1nav />
      <h1 id="ch1">Explore all adventures</h1>
      <p id="cp">Here's a list of places that you can explore in the city</p>
      <hr />
      <br />
      <select
        className="select"
        onChange={(e) => setFilterDuration(e.target.value)}
        style={{ height: "40px", width: "200px", marginLeft: "30px" }}
        value={filterDuration}
      >
        <option value="">Filter by Duration (Hours)</option>
        <option value="0-2">0-2 Hours</option>
        <option value="2-6">2-6 Hours</option>
        <option value="6-12">6-12 Hours</option>
        <option value="12-99">12+ Hours</option>
      </select>

      <select
        className="select"
        onChange={(e) => setFilterCategory(e.target.value)}
        style={{ height: "40px", width: "200px", marginLeft: "30px" }}
        value={filterCategory}
      >
        <option value="">Add Category</option>
        <option value="Cycling">Cycling</option>
        <option value="Hiking">Hiking</option>
        <option value="Beach">Beach</option>
        <option value="Party">Party</option>
      </select>

      <input
        id="cs"
        placeholder="Search adventures"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleFilters}>Search & Apply Filters</button>
      <br />
      <br />
      <hr />
      <div className="adventure-grid" style={{ height: "1000px", marginTop: "40px" }}>
        {filteredAdventures.map((adventure) => (
          <div
            key={adventure.id}
            className="adventure-card"
            onClick={() => handleAdventureClick(adventure.id)}
          >
            <button id="acat" style={{ marginLeft: "160px", marginTop: "-20px" }}>
              {adventure.category}
            </button>
            <img
              src={adventure.image}
              alt={adventure.name}
              className="adventure-img"
              style={{ height: "150px", width: "100%" }}
            />
            <p id="aname" style={{ marginTop: "-20px" }}>{adventure.name}</p>
            <p id="acost" style={{ marginTop: "-25px" }}>Rs.{adventure.costPerHead}</p>
            <p id="adur">Duration: {adventure.duration} hours</p>
          </div>
        ))}
      </div>
      <Part4foot />
    </div>
  );
}

export default CityPage;
