import React from "react";
import AllOfTheTables from "./ListTables";
const axios = require("axios");
const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`;

function TablesList() {
    let tables = AllOfTheTables();
    const handleFinishClick = async (event) => {
        event.preventDefault();
        let tableId = event.target.value;
        //displays a window prompt to confirm that the user wants to finish the reservation
        const finishReservationPrompt = window.confirm("Is this table ready to seat new guests? This cannot be undone.");
        if(finishReservationPrompt) {
            await axios
                .delete(`${BASE_URL}/tables/${tableId}/seat`)
                //.then(window.location.reload())
                .catch(error => {
                    return error;
                })
                window.location.reload();
        }
    };

    //returns a list of the tables with the name, capacity, occupied status, and finish button
    let tableList;
    if(tables){
        tableList = tables.map((table) => {
            function tableStatus() {
                //sets the status for the table list to either free or occupied
                if(table.reservation_id) {
                    return (
                        <div data-table-id-status={table.table_id}
                        value="occupied">
                            Occupied
                            <div>
                            <button className="btn btn-primary"
                            value={table.table_id}
                            data-table-id-finish={table.table_id}
                            onClick={handleFinishClick}
                            >
                            Finish
                            </button>
                            </div>
                        </div>
                    );
                }
                else {
                    return(
                        <div data-table-id-status={table.table_id}
                        value="free">
                            Free
                        </div>
                    );
                }
            }
            return (
                <div key={table.table_id} className="container">
                    <div className="border rounded my-3">
                        <div className="bg-info text-white p-1">
                            <h5>Table: {table.table_name}</h5>
                        </div>
                        <div className="col">
                            <div className="row">
                                Seats {table.capacity}
                            </div>
                            <div className="row">
                                {tableStatus()}
                            </div>
                            
                        </div>
                    </div>
                </div>
            )
        });
    }

    return(
        <div>
            {tableList}
        </div>
    )
}

export default TablesList;