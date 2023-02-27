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
  //sets the date to the date defined in the url
  date = query.get("date") || date;

  //converts the date from the URL to [day] [month] [date] [year] format
  let dateConvert = new Date(`${date}T00:00:00`);
  let displayDate = dateConvert.toDateString();

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
  
  return (
    <main>
      <div>
        <ErrorAlert error={reservationsError} />
      </div>
      <div className="container-fluid col-12 text-center">
        <h1 className="center-align">Dashboard</h1>
          <h4 className="bg-white mb-2">Reservations for {displayDate}</h4>
        <div>
          <button className="btn btn-outline-info" onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>
            Previous Day
          </button>
          <button className="btn btn-outline-info mx-2" onClick={() => history.push(`/dashboard/?date=${today()}`)}>
            Today
          </button>
          <button className="btn btn-outline-info" onClick={() => history.push(`/dashboard/?date=${next(date)}`)}>
            Next Day
          </button>
        </div>
      </div>
      <div className="container">
        <div className="row">
        <div className= "col">
            <h4>Reservations</h4>
            <div>
              <ReservationsList reservations={reservations}/>
            </div>
        </div>
        <div className="col">
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
