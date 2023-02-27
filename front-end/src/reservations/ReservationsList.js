import React from "react";
import ReservationCard from "./ReservationCard";

function ReservationsList({ reservations }) {
    let printReservations;
    //prints the reservations on the dashboard
    if(reservations.length > 0) {
        printReservations = reservations.map((reservation) => {
            if(reservation.status !== "cancelled") {
                return (
                     <ReservationCard reservation={reservation}
                     key={reservation.reservation_id}/>
                );
            }
        })
    }
    return (
        <div>{printReservations}</div>
    )
 }

export default ReservationsList;