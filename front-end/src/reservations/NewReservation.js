import React from "react";
import CreateOrEditReservation from "./ReservationForm";

//this form is for creating a brand new reservation using the reservation form
function CreateReservation() {
    
    return (
        <div class="container-fluid">
            <h3 class="col-12 text-center">Make A Reservation</h3>
            <CreateOrEditReservation />
        </div>
    )
}


export default CreateReservation;