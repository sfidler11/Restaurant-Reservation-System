import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import AllOfTheTables from "../tables/ListTables";
import ErrorAlert from "../layout/ErrorAlert";
const axios = require("axios");
const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`;

function SeatReservation() {
    const { reservation_id } = useParams();
    const [updateTable, setUpdateTable] = useState(null);
    const [thisReservation, setThisReservation] = useState("");
    const [seatError, setSeatError] = useState(null);
    let reservationName = "";
    const history = useHistory();
    //imports the list of tables
    const tables = AllOfTheTables();

    //if tables has not been rendered, the form will display loading until tables are read
    let formOptions = "Loading...";
    if (tables) {
        formOptions = tables.map((table) => {
        return (
            <option value={table.table_id}>
                {table.table_name} - {table.capacity}
            </option>
        )
    });
    }

    //loads the reservation based on the reservation ID in the parameters, to get the reservation name
    useEffect(() => {
        async function loadReservation() {
            await axios
                .get(`${BASE_URL}/reservations/${reservation_id}`)
                .then((response) => {
                    setThisReservation(response.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        loadReservation();
    }, [reservation_id])

    //sets the reservations name afte the reservations is loaded on the page
    if(thisReservation) {
        reservationName = `${thisReservation.data.first_name} ${thisReservation.data.last_name}`
    };

    //updates the reservation id in the table chosen to the reservation ID in the URL params
    const handleChange = (event) => {
        event.preventDefault();
        setUpdateTable(event.target.value)
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const seatAbort = new AbortController();
            await axios
                .put(`${BASE_URL}/tables/${updateTable}/seat`, {
                data: { reservation_id: reservation_id },
                signal: seatAbort,
            })
                .then((response) => {
                    if(response.status - 200 < 100) {
                        history.push("/dashboard");
                    }
                })
                .catch(error => {
                    //console.log(error, error.response);
                    setSeatError(error.response.data.error);
                })
    }

    return (
        <div>
            <h4 className="col text-center"> Seat Reservation For {reservationName}</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group alert alert-secondary">
                    <label>Choose a table for the reservation</label>
                    <ErrorAlert error={seatError} />
                    <select 
                    name="table_id"
                    className="form-control"
                    onChange={handleChange}
                    required
                    >
                        <option>Select The Table</option>
                        {formOptions}
                    </select >
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

export default SeatReservation;