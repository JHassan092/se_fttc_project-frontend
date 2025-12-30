import FlightSearch from "../components/FlightSearch/FlightSearch.jsx";
import FlightCard from "../components/FlightCard/FlightCard.jsx";
import ArrivalsTable from "../components/ArrivalsTable/ArrivalsTable.jsx";
import DeparturesTable from "../components/DeparturesTable/DeparturesTable.jsx";
import AirportSearch from "../components/AirportSearch/AirportSearch.jsx";

import {
  fetchFlightByNumber,
  fetchArrivalsByAirport,
  fetchDeparturesByAirport,
} from "../services/aviationstack.js";
import { useState } from "react";

export default function Home() {
  const [flight, setFlight] = useState(null);
  const [airportFlights, setAirportFlights] = useState({
    arrivals: [],
    departures: [],
  });

  const [visibleTable, setVisibleTable] = useState(null);
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

      const arrivals = await fetchArrivalsByAirport(airportCode);
      const departures = await fetchDeparturesByAirport(airportCode);

      setAirportFlights({ arrivals, departures });
    } catch (err) {
      setError("Could not load airport data");
      setAirportFlights({ arrivals: [], departures: [] });
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

      <AirportSearch onSearch={handleAirportSearch} />

      {(airportFlights.arrivals.length > 0 ||
        airportFlights.departures.length > 0) && (
        <div className="table-controls">
          {visibleTable !== "arrivals" && (
            <button onClick={() => setVisibleTable("arrivals")}>
              Show Arrivals
            </button>
          )}
          {visibleTable !== "departures" && (
            <button onClick={() => setVisibleTable("departures")}>
              Show Departures
            </button>
          )}
          {visibleTable && (
            <button onClick={() => setVisibleTable(null)}>Hide Tables</button>
          )}
        </div>
      )}

      {visibleTable === "arrivals" && airportFlights.arrivals.length > 0 && (
        <ArrivalsTable flights={airportFlights.arrivals} />
      )}

      {visibleTable === "departures" &&
        airportFlights.departures.length > 0 && (
          <DeparturesTable flights={airportFlights.departures} />
        )}
    </main>
  );
}
