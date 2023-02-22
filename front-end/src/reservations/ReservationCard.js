import React from "react";
import { Link } from "react-router-dom";
const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const axios = require("axios");

function ReservationCard({ reservation }) {

    const handleCancel = async (event) => {
        event.preventDefault();
        const cancelAbort = new AbortController();
        let reservationId = event.target.value;
        //displays a window prompt to confirm that the user wants to cancel the reservation
        const cancelResercationPrompt = window.confirm("Do you want to cancel this reservation? This cannot be undone.");
        if(cancelResercationPrompt) {
            await axios
                .put((`${BASE_URL}/reservations/${reservationId}/status`),
                { data : { status : "cancelled" }, signal: cancelAbort,
                 },
                )
                .catch(error => {
                    return error;
                })
                window.location.reload();
        }
    };

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

                <div> 
                {/* brings the user to the seat screen where the reservation can be seated to a table */}
                {(reservation.status === "booked") && 
                (<Link 
                to={`/reservations/${reservation.reservation_id}/seat`}
                >
                    Seat
                </Link>)
                }
                </div>

                <div>
                {/* brings the user to the edit screen to edit the reservation */}
                {(reservation.status === "booked") && 
                (<Link 
                to={`/reservations/${reservation.reservation_id}/edit`}
                >
                    Edit
                </Link>)
                }
                </div>

                <div>
                    <button 
                    className="btn btn-danger mx-1"
                    data-reservation-id-cancel={reservation.reservation_id}
                    value={reservation.reservation_id}
                    onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
        </div>
    )
}

export default ReservationCard;