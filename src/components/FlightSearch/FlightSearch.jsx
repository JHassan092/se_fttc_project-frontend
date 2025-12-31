import { useState } from "react";

import "./FlightSearch.css";

export default function FlightSearch({ onSearch }) {
  const [flightNumber, setFlightNumber] = useState("");
  const [error, setError] = useState(null);

  const isValidFlightNumber = (value) => /^[A-Za-z]{2,3}\d{1,4}$/.test(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = flightNumber.trim().toUpperCase();

    if (!isValidFlightNumber(trimmed)) {
      setError("Please enter a valid flight number (e.g., AA123)");
      return;
    }

    setError("");
    onSearch(trimmed);
  };

  return (
    <section className="flight-search">
      <h2 className="flight-search__title" id="flight-search__title">
        Search Flights
      </h2>

      <form className="flight-search__form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="flight-input" className="flight-search__label">
          Flight Number:
        </label>

        <div className="flight-search__controls">
          <input
            id="flight-input"
            name="FlightNumber"
            type="text"
            className="flight-search__input"
            placeholder="e.g. DL404"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            required
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "flight-input-error" : undefined}
            inputMode="text"
            autoComplete="off"
          />
          <button className="flight-search__button" type="submit">
            Search
          </button>
        </div>

        {error && (
          <p
            id="flight-input-error"
            className="flight-search__error"
            role="alert"
          >
            {error}
          </p>
        )}

        <p className="flight-search__hint">
          Format: two or three letters + digits (e.g., DL404, AA1234).
        </p>
      </form>
    </section>
  );
}
