import React from "react";
import CreateOrEditReservation from "./ReservationForm";

//this form is for creating a brand new reservation using the reservation form
function CreateReservation() {
    
    return (
        <div className="container-fluid">
            <h3 className="col-12 text-center">Make A Reservation</h3>
            <CreateOrEditReservation />
        </div>
    )
}


export default CreateReservation;