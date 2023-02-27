import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

/*
Creates the form for users to create or edit reservations
*/

const axios = require("axios");
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

function CreateOrEditReservation({ thisReservation }) {
    const history = useHistory();
    const [error, setError] = useState(null);
    let { reservation_id } = useParams();

    let initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
    };

    //initialized the data to the initialFormState
    const[data, setData]= useState(thisReservation || initialFormState);

    //updates the data after the submit button is selected
    const handleDataChange = (event) => {
        event.preventDefault();
        if (event.target.name !== "people"){
        setData({
            ...data,
            [event.target.name]: event.target.value,
        })
    }
        else {
            setData({
                ...data,
                [event.target.name]: parseInt(event.target.value),
        })
    }
    };

    //updates the values for the reservation in the database, then goes to the dashboard showing the new reservation
    const handleSubmit = (event) => {
        event.preventDefault();
        setData({...initialFormState});
        const reservationAbort = new AbortController();
        if(reservation_id) {
            axios
                .put(`${BASE_URL}/reservations/${reservation_id}`, {
                    data: data,
                    signal: reservationAbort.signal,
                })
                .then((response) => {
                    if(response.status - 200 < 100){
                        history.push(`/dashboard/?date=${data.reservation_date}`);
                    }
                })
                .catch(error => {
                    setError(error.response.data.error)
                })
        }
        else {
            axios
                .post(`${BASE_URL}/reservations`, {
                    data: data,
                    signal: reservationAbort.signal,
                })
                .then((response) => {
                    //console.log(response)
                    if (response.status - 200 < 100){
                    history.push(`/dashboard/?date=${data.reservation_date}`);
                    }
                })
                .catch(error => {
                    console.log(error, error.response);
                    setError(error.response.data.error);
                })
            }
    }

    return (
        <div className="container">
            <div>
                <ErrorAlert error={error} />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group alert alert-secondary">
                    <label htmlFor="first_name">First Name</label>
                    <input 
                    type="text"
                    name="first_name"
                    id="first_name"
                    className="form-control"
                    value={data.first_name}
                    placeholder="First Name"
                    onChange={handleDataChange}
                    required
                    />
                </div>
                <div className="form-group alert alert-secondary">
                    <label htmlFor="last_name">Last Name</label>
                    <input 
                    type="text"
                    name="last_name"
                    id="last_name"
                    className="form-control"
                    value={data.last_name}
                    placeholder="Last Name"
                    onChange={handleDataChange}
                    required
                    />
                </div>
                <div className="form-group alert alert-secondary">
                    <label htmlFor="mobile_number">Mobile Number</label>
                    <input 
                    type="text"
                    name="mobile_number"
                    id="mobile_number"
                    className="form-control"
                    value={data.mobile_number}
                    placeholder="555-555-5555"
                    onChange={handleDataChange}
                    required
                    />
                </div>
                <div className="form-group alert alert-secondary">
                    <label htmlFor="reservation_date">Reservtion Date</label>
                    <input 
                    type="date"
                    name="reservation_date"
                    id="reservation_date"
                    className="form-control"
                    value={data.reservation_date}
                    onChange={handleDataChange}
                    required
                    />
                </div>
                <div className="form-group alert alert-secondary">
                    <label htmlFor="reservation_time">Reservtion Time</label>
                    <input 
                    type="time"
                    name="reservation_time"
                    id="reservation_time"
                    className="form-control"
                    value={data.reservation_time}
                    onChange={handleDataChange}
                    required
                    />
                </div>
                <div className="form-group alert alert-secondary">
                    <label htmlFor="people">Number of Guests</label>
                    <input 
                    type="number"
                    min="1"
                    name="people"
                    id="people"
                    className="form-control"
                    value={data.people}
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


export default CreateOrEditReservation;