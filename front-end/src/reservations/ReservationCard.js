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
        <div class="container border round my-3">
            <div class="border-bottom">
                <h5>Reservation For {reservation.first_name} {reservation.last_name}</h5>
            </div>
            <div class="row">
                <div class="col">
                    <h6>Phone Number</h6>
                     <p>{reservation.mobile_number}</p>
                </div>
                <div class="col">
                    <h6>Party Size</h6>
                    <p>{reservation.people}</p>
                </div>
                <div class="col">
                    <h6>Reservation Date</h6>
                    <p>{reservation.reservation_date}</p>
                </div>
                <div class="col">
                    <h6>Reservation Time</h6>
                    <p>{reservation.reservation_time}</p>
                </div>
                <div class="col">
                    <h6>Status</h6>
                    <p>{reservation.status}</p>
                </div>
            </div>
            <div class="row">
                
                {/* brings the user to the seat screen where the reservation can be seated to a table */}
                {(reservation.status === "booked") && 
                (<button class="btn btn-info mx-1"> <Link 
                to={`/reservations/${reservation.reservation_id}/seat`}
                >
                    Seat
                </Link></button>)
                }
                

                {/* brings the user to the edit screen to edit the reservation */}
                {(reservation.status === "booked") && 
                (<button class="btn btn-Primary mx-1"><Link 
                to={`/reservations/${reservation.reservation_id}/edit`}
                >
                    Edit
                </Link></button>)
                }
                

                <div class="col float-right">
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
    )
}

export default ReservationCard;