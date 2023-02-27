import React from "react";
import { Link } from "react-router-dom";
import { formatAsDate } from "../utils/date-time";
import { formatAsTime } from "../utils/date-time";
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
        <div className="container">
            <div className="border rounded my-3">
                <div className="bg-info text-white p-2">
                    <h5>Reservation For {reservation.first_name} {reservation.last_name}</h5>
                    <div 
                    className="badge bg-secondary"
                    data-reservation-id-status={reservation.reservation_id}
                    >
                        Status: {reservation.status}
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h6>Phone Number</h6>
                        <p>{reservation.mobile_number}</p>
                    </div>
                    <div className="col">
                        <h6>Party Size</h6>
                        <p>{reservation.people}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h6>Reservation Date</h6>
                        <p>{formatAsDate(reservation.reservation_date)}</p>
                    </div>
                    <div className="col">
                        <h6>Reservation Time</h6>
                        <p>{formatAsTime(reservation.reservation_time)}</p>
                    </div>
                </div>

                
                <div className="row">
                    <div className="col-6">
                    {/* brings the user to the seat screen where the reservation can be seated to a table */}
                    {(reservation.status === "booked") && 
                    (<Link 
                    to={`/reservations/${reservation.reservation_id}/seat`}
                    >
                        <button className="btn btn-primary mx-1">Seat</button>
                    </Link>)
                    }
                    

                    {/* brings the user to the edit screen to edit the reservation */}
                    {(reservation.status === "booked") && 
                    (<Link 
                    to={`/reservations/${reservation.reservation_id}/edit`}
                    >
                        <button className="btn btn-secondary mx-1">Edit</button>
                        </Link>)
                    }
                    
                    </div>
                    <div className="col-6 text-right">
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
            </div>
        </div>
    )
}

export default ReservationCard;