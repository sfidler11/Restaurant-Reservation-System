import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

function ReservationsList({ reservations }) {
    const history = useHistory();
    let printReservations;
    //prints the reservations on the dashboard
    if(reservations.length > 0) {
        printReservations = reservations.map((reservation) => {
            return (
                <div>
                    <div>
                        <h5>Reservation For {reservation.first_name} {reservation.last_name}</h5>
                    </div>
                    <div>
                        Phone Number: {reservation.mobile_number}
                    </div>
                    <div>
                        Party Size: {reservation.people}
                    </div>
                    <div>
                        Reservation Date: {reservation.reservation_date}
                    </div>
                    <div>
                        Reservation Time: {reservation.reservation_time}
                    </div>
                    <Link 
                    to={`/reservations/${reservation.reservation_id}/seat`}
                    >
                        Seat
                    </Link>
                </div>
            );
        })
    }

//if there are no reservations, returns the below message
else {
    return (
        <div>
            <h5>There are no reservations listed</h5>
        </div>
    )
}
    return (
        <div>{printReservations}</div>
    )
 }

export default ReservationsList;