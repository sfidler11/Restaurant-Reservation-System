import React, { useEffect, useState } from "react";
import { useHistory,  } from "react-router";
import useQuery from "../utils/useQuery";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { next, today, previous } from "../utils/date-time";
import ReservationsList from "../reservations/ReservationsList";
import TablesList from "../tables/TablesList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {

  const history = useHistory();
  const query = useQuery();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null); 
  date = query.get("date") || date;   //sets the date to the date defined in the url

  //loads the dashboard with the reservation info.
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }
  

  //console.log("before reservations list", reservations);

  return (
    <main>
      <div>
        <ErrorAlert error={reservationsError} />
      </div>
      <div class="container-fluid">
        <h1 class="center-align">Dashboard</h1>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Reservations for {date}</h4>
        </div>
        <div>
          <button onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>
            Previous Day
          </button>
          <button onClick={() => history.push(`/dashboard/?date=${today()}`)}>
            Today
          </button>
          <button onClick={() => history.push(`/dashboard/?date=${next(date)}`)}>
            Next Day
          </button>
        </div>
      </div>
      <div class="container">
        <div class="row">
        <div class= "col">
            <h4>Reservations</h4>
            <div>
              <ReservationsList reservations={reservations}/>
            </div>
        </div>
        <div class="col">
          <h4>
            Tables
          </h4>
          <div>
            <TablesList />
          </div>
        </div>
        </div>
      </div>
      
    </main>
  );
}

export default Dashboard;
