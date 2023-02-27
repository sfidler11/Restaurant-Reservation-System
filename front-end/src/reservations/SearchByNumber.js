import React, {useState} from "react";
import ReservationCard from "./ReservationCard"; 
import ErrorAlert from "../layout/ErrorAlert";

const axios = require("axios");
const BASE_URL = process.env.REACT_APP_API_BASE_URL + "/reservations?mobile_number=";

function SearchByNumber() {
    const [reservations, setReservations] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState(null);

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
                setError(error)
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
            <div>
                <ErrorAlert error={error} />
            </div>
            <h3 className="col-12 text-center">Seach For A Reservation</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group alert alert-secondary">
                    <label htmlFor="mobile_number">Reservation Phone Number</label>
                    <input 
                    name="mobile_number"
                    id="mobile_number"
                    placeholder="Enter a customer's phone number"
                    className="form-control"
                    onChange={handleNumberChange}
                    required
                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Find</button>
                </div>
            </form>
            <div>
                {reservationList}
            </div>
        </div>
    )
}

export default SearchByNumber;