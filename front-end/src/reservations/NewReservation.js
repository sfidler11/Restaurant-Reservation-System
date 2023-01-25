import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

const axios = require("axios");
const BASE_URL = process.env.REACT_APP_API_BASE_URL + "/reservations";

function CreateReservation() {
    const history = useHistory();
    const [error, setError] = useState(null);

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
    };
    //initialized the data to the initialFormState
    const[data, setData]= useState({...initialFormState});

    //updates the data after the submit button is selected
    const handleDataChange = ({ target }) => {
        setData({
            ...data,
            [target.name]: target.value,
        })
    };

    //updates the values for the reservation in the database, then goes to the dashboard showing the new reservation
    const handleSubmit = (event) => {
        event.preventDefault();
        setData({...initialFormState});
        const reservationAbort = new AbortController();
        axios
            .post(BASE_URL, {
                data: data,
                signal: reservationAbort.signal,
            })
            .then((response) => {
                console.log(response)
                if (response.status - 200 < 100){
                history.push(`/dashboard/${data.reservation_date}`);
                }
            })
            .catch(error => {
                console.log(error, error.response);
                setError(error.response.data.error);
            })
    }

    return (
        <div className="container">
            <h3>Make A Reservation</h3>
            <div>
                <ErrorAlert error={error} />
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="first_name">First Name</label>
                    <input 
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="First Name"
                    onChange={handleDataChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="last_name">Last Name</label>
                    <input 
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Last Name"
                    onChange={handleDataChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="mobile_number">Mobile Number</label>
                    <input 
                    type="text"
                    name="mobile_number"
                    id="mobile_number"
                    placeholder="555-555-5555"
                    onChange={handleDataChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="reservation_date">Reservtion Date</label>
                    <input 
                    type="date"
                    name="reservation_date"
                    id="reservation_date"
                    onChange={handleDataChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="reservation_time">Reservtion Time</label>
                    <input 
                    type="time"
                    name="reservation_time"
                    id="reservation_time"
                    onChange={handleDataChange}
                    required
                    />
                </div>
                <div>
                    <label htmlFor="people">Number of Guests</label>
                    <input 
                    type="number"
                    min="1"
                    name="people"
                    id="people"
                    onChange={handleDataChange}
                    required
                    />
                </div>
                <button className="btn btn-secondary mx-1" onClick={() => history.goBack()}>
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary mx-1">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default CreateReservation;