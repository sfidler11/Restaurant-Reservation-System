import React from "react";
import ReservationCard from "./ReservationCard";

function ReservationsList({ reservations }) {
    let printReservations;
    //prints the reservations on the dashboard
    if(reservations.length > 0) {
        printReservations = reservations.map((reservation) => {
            if(reservation.status !== "cancelled") {
                return (
                    <div>
                        <ReservationCard reservation={reservation}/>
                    </div>
                );
            }
        })
    }
    return (
        <div>{printReservations}</div>
    )
 }

export default ReservationsList;