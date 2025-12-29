const BASE_URL = "http://api.aviationstack.com/v1";

const API_KEY = import.meta.env.VITE_AVIATIONSTACK_KEY;

export async function fetchFlightByNumber(flightNumber) {
  try {
    const res = await fetch(
      `${BASE_URL}/flights?access_key=${API_KEY}&flight_iata=${flightNumber}`
    );

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }

    const data = await res.json();

    return data.data;
  } catch (err) {
    console.error("Error fetching flight:", err);
    throw err;
  }
}

export async function fetchArrivalsByAirport(airportCode) {
  try {
    const res = await fetch(
      `${BASE_URL}/flights?access_key=${API_KEY}&arr_iata=${airportCode}`
    );
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);

    const data = await res.json();
    console.log("Arrivals API response:", data);
    return data.data; // array of flights
  } catch (err) {
    console.error("Error fetching arrivals:", err);
    throw err;
  }
}

export async function fetchDeparturesByAirport(airportCode) {
  try {
    const res = await fetch(
      `${BASE_URL}/flights?access_key=${API_KEY}&dep_iata=${airportCode}`
    );
    if (res.ok) throw new Error(`Request failed: ${res.status}`);

    const data = await res.json();
    console.log("Departures APIT response:", data);
    return data.data;
  } catch (err) {
    console.error("Error fetching departures:", err);
    throw err;
  }
}
