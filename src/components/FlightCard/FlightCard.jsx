import "./FlightCard.css";

export default function FlightCard({ flightData }) {
  if (!flightData) {
    return null;
  }

  const { airline, flight_number, flight_status, departure, arrival } =
    flightData;

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    return date.toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <article className="flight-card">
      <header className="flight-card__header">
        <h2 className="flight-card__airline">{flightData.airline?.name}</h2>
        <span
          className={`flight-card__status flight-card__status--${flightData.flight_status?.toLowerCase()}`}
        >
          {flightData.flight_status || "Unknown"}
        </span>
      </header>

      <section className="flight-card__route">
        <p>
          {flightData.flight?.iata} ({flightData.flight?.number})
        </p>
        <p>
          {flightData.departure?.iata} → {flightData.arrival?.iata}
        </p>
      </section>

      <section className="flight-card__times">
        <p>Departs: {formatDateTime(flightData.departure?.scheduled)}</p>
        <p>Arrives: {formatDateTime(flightData.arrival?.scheduled)}</p>
      </section>

      <footer className="flight-card__footer">
        <small>Departure airport: {flightData.departure?.airport || "-"}</small>
        <br />
        <small>Arrival airport: {flightData.arrival?.airport || "-"}</small>
      </footer>
    </article>
  );
}
