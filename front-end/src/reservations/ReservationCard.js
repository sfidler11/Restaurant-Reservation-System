import React from "react";
import { Link } from "react-router-dom";

function ReservationCard({ reservation }) {
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
                {reservation.status}

                {(reservation.status === "booked") && (
                <Link 
                to={`/reservations/${reservation.reservation_id}/seat`}
                >
                    Seat
                </Link>)
                }
        </div>
    )
}

export default ReservationCard;