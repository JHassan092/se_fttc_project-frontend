import FlightSearch from "../components/FlightSearch/FlightSearch.jsx";
import FlightCard from "../components/FlightCard/FlightCard.jsx";
import ArrivalsTable from "../components/ArrivalsTable/ArrivalsTable.jsx";

import {
  fetchFlightByNumber,
  fetchArrivalsByAirport,
} from "../services/aviationstack.js";
import { useState } from "react";
import AirportSearch from "../components/AirportSeach/AirportSearch.jsx";

export default function Home() {
  const [flight, setFlight] = useState(null);
  const [airportFlights, setAirportFlights] = useState([]);

  const [lastQuery, setLastQuery] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (flightNumber) => {
    try {
      setError("");
      setLastQuery(flightNumber);

      const result = await fetchFlightByNumber(flightNumber);
      if (result && result.length > 0) {
        setFlight(result);
      } else {
        setError("No flight found for the given number.");
        setFlight(null);
      }
    } catch (err) {
      setError("Could not load flight data");
      setFlight(null);
    }
  };

  const handleAirportSearch = async (airportCode) => {
    try {
      setError("");

      const results = await fetchArrivalsByAirport(airportCode);
      setAirportFlights(results);
    } catch (err) {
      setError("Could not load arrivals");
      setAirportFlights([]);
    }
  };

  return (
    <main className="home">
      <FlightSearch onSearch={handleSearch} />
      {error && <p className="home__error">{error}</p>}
      <div className="flight-card__container">
        {Array.isArray(flight) &&
          flight.map((f, idx) => <FlightCard key={idx} flightData={f} />)}
      </div>

      {lastQuery && <p className="home__note">Last search: {lastQuery}</p>}

      <button onClick={() => handleAirportSearch("JFK")}>Show arrivals</button>

      <AirportSearch onSearch={handleAirportSearch} />

      {error && <p className="home__error">{error}</p>}
      {airportFlights.length > 0 && <ArrivalsTable flights={airportFlights} />}
    </main>
  );
}
