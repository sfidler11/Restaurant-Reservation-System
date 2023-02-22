import React from "react";
import CreateOrEditReservation from "./ReservationForm";

//this form is for creating a brand new reservation using the reservation form
function CreateReservation() {
    
    return (
        <div className="container">
            <h3>Make A Reservation</h3>
            <CreateOrEditReservation />
        </div>
    )
}


export default CreateReservation;