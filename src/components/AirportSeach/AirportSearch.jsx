import { useState } from "react";

import "./AirportSearch.css";

export default function AirportSearch({ onSearch }) {
  const [airportCode, setAirportCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!airportCode) return;
    onSearch(airportCode.trim().toUpperCase());
    setAirportCode("");
  };

  return (
    <form onSubmit={handleSubmit} className="airport-search">
      <input
        type="text"
        placeholder="Enter airport code (e.g. JFK, LHR, DXB)"
        value={airportCode}
        onChange={(e) => setAirportCode(e.target.value)}
        className="airport-search__input"
      />
      <button type="submit" className="airport-search_btn">
        Search Arrivals
      </button>
    </form>
  );
}
