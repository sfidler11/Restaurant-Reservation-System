import React, {useState, useEffect} from "react";
import ReservationCard from "./ReservationCard"; 
const axios = require("axios");
const BASE_URL = process.env.REACT_APP_API_BASE_URL + "/reservations?mobile_number=";

function SearchByNumber() {
    const [reservations, setReservations] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState("");

    //when submitted, sets the value of the phone number as submitted by the user
    const handleNumberChange = (event) => {
        event.preventDefault();
        setPhoneNumber(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const submitAbort = new AbortController();
        axios
            .get((`${BASE_URL}${phoneNumber}`), {
                signal: submitAbort,
            })
            .then((response) => {
                setReservations(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //initializes the list to a message. if reservations are found then the list is passed into the "ResevationCard" componenet
    let reservationList = "No reservations found";
    if(reservations.length > 0) {
        reservationList = reservations.map((reservation) => {
            return(
                <div>
                <ReservationCard reservation={reservation}/>
            </div>
            )
        })
    } 
    
    return(
        <div>
            <h3 class="col-12 text-center">Seach For A Reservation</h3>
            <form onSubmit={handleSubmit}>
                <div class="form-group alert alert-secondary">
                    <label htmlFor="mobile_number">Reservation Phone Number</label>
                    <input 
                    name="mobile_number"
                    id="mobile_number"
                    placeholder="Enter a customer's phone number"
                    class="form-control"
                    onChange={handleNumberChange}
                    required
                    />
                </div>
                <div>
                    <button type="submit" class="btn btn-primary">Find</button>
                </div>
            </form>
            <div>
                {reservationList}
            </div>
        </div>
    )
}

export default SearchByNumber;