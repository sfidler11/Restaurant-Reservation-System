import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";

const axios = require("axios");
const BASE_URL = process.env.REACT_APP_API_BASE_URL + "/tables";

function NewTable() {
    const history = useHistory();
    const initialTableState = {
        table_name: "",
        capacity: 0,
    };
    //initializes the table data to what is set in initiableTableState
    const [data, setData] = useState(initialTableState);
    const [error, setError] = useState(null);

    //updates the form data when there is a change to it
    const handleDataChange = (event) => {
        event.preventDefault();
        if (event.target.name !== "capacity") {
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

    //when the submit button is clicked, it sends the form data to the db, sets the form data to the initialTableState, and navigates to the dashboard
    const handleSubmit = (event) => {
        event.preventDefault();
        setData({...initialTableState});
        const tableAbort = new AbortController();
        axios
            .post(BASE_URL, {
                data: data,
                signal: tableAbort.signal,
            })
            .then((response) => {
                console.log(response)
                if(response.status - 200 < 100) {
                    history.push(`/dashboard`);

                }
            })
            .catch((error) => {
                console.log(error, error.response);
                setError(error.response.data.error);
            })
    }

    return (
        <div className="container">
            <h3 className="col-12 text-center">Create A Table</h3>
            <div>
                <ErrorAlert error={error} />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group alert alert-secondary">
                    <label htmlFor="table_name">Table Name</label>
                    <input
                    type="text"
                    name="table_name"
                    id="table_name"
                    className="form-control"
                    placeholder="Insert Table Name"
                    onChange={handleDataChange}
                    required
                    />
                </div>
                <div className="form-group alert alert-secondary">
                    <label htmlFor="capacity">Table Capacity</label>
                    <input 
                    type="number"
                    min="1"
                    name="capacity"
                    id="capacity"
                    className="form-control"
                    placeholder="1"
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

export default NewTable;