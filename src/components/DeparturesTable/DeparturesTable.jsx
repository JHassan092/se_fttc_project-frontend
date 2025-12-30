import "./DeparturesTable.css";

export default function DeparturesTable({ flights }) {
  if (!flights || flights.length === 0) {
    return <p>No Departures found.</p>;
  }

  return (
    <table className="departures-table">
      <thead>
        <tr>
          <th>Airline</th>
          <th>Flight</th>
          <th>Destination</th>
          <th>Scheduled Departure</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {flights.map((f, idx) => {
          return (
            <tr key={idx}>
              <td>{f.airline?.name}</td>
              <td>{f.flight?.iata || f.flight?.number}</td>
              <td>
                {f.arrival?.iata} ({f.arrival?.airport})
              </td>
              <td>{new Date(f.departure?.scheduled).toLocaleString()}</td>
              <td>{f.flight_status}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
