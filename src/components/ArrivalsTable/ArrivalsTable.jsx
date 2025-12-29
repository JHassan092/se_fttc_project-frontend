import "./ArrivalsTable.css";

export default function ArrivalsTable({ flights }) {
  if (!flights || flights.length === 0) {
    return <p>No arrivals found.</p>;
  }

  return (
    <table className="arrivals-table">
      <thead>
        <tr>
          <th>Airline</th>
          <th>Flight</th>
          <th>From</th>
          <th>Scheduled Arrival</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {flights.map((f, idx) => (
          <tr key={idx}>
            <td>{f.airline?.name}</td>
            <td>{f.flight?.iata || f.flight?.number}</td>
            <td>
              {f.departure?.iata} ({f.departure?.airport})
            </td>
            <td>{new Date(f.arrival?.scheduled).toLocaleString()}</td>
            <td>{f.flight_status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
