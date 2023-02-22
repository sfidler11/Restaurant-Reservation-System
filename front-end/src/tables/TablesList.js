import React, {useState} from "react";
import AllOfTheTables from "./ListTables";
const axios = require("axios");
const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}`;

function TablesList() {
    let tables = AllOfTheTables();
    const handleFinishClick = async (event) => {
        event.preventDefault();
        let tableId = event.target.value;
        //setTableId(event.target.value)
        //console.log("id", tableId);
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
                        <div>
                            Occupied
                            <button 
                            value={table.table_id}
                            data-table-id-finish={table.table_id}
                            onClick={handleFinishClick}
                            >
                            Finish
                            </button>
                        </div>
                    );
                }
                else {
                    return "Free";
                }
            }
            return (
                <div>
                    <h5>{table.table_name}</h5>
                    Capacity: {table.capacity}
                    <div>{tableStatus()}</div>
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