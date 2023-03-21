import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import formatPhoneNumber from "../utils/formatPhoneNumber";

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

    const handlePhoneNumberChange = (event) => {
        event.preventDefault();
        const formattedNumber = formatPhoneNumber(event.target.value);
        setData({
            ...data,
            mobile_number: formattedNumber,
        })
    }

    //updates the values for the reservation in the database, then goes to the dashboard showing the new reservation
    const handleSubmit = async (event) => {
        event.preventDefault();
        const reservationAbort = new AbortController();
        try {
          if (reservation_id) {
            //sets reservation data if it the user is editing a reservation
            setData({...thisReservation})
            await axios.put(`${BASE_URL}/reservations/${reservation_id}`, {
              data: data,
              signal: AbortController.signal,
            });
          } else {
            //sets the data to the base data
            setData({...initialFormState})
            await axios.post(`${BASE_URL}/reservations`, {
              data: data,
              signal: AbortController.signal,
            });
          }
          history.push(`/dashboard?date=${data.reservation_date}`);
        } catch (error) {
          setError(error.response.data.error);
        }
        return () => reservationAbort.abort();
      };

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
                    name="mobile_number"
                    type="text"
                    id="mobile_number"
                    className="form-control"
                    value={data.mobile_number}
                    placeholder="555-555-5555"
                    onChange={handlePhoneNumberChange}
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