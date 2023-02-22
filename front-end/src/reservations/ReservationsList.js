import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import ReservationCard from "./ReservationCard";

function ReservationsList({ reservations }) {
    const history = useHistory();
    let printReservations;
    //prints the reservations on the dashboard
    if(reservations.length > 0) {
        printReservations = reservations.map((reservation) => {
                return (
                    <div>
                        <ReservationCard reservation={reservation}/>
                    </div>
                );
            
        })
    }
    return (
        <div>{printReservations}</div>
    )
 }

export default ReservationsList;