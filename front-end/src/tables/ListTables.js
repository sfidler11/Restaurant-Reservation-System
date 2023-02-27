import { useState, useEffect } from "react";
import { listTables } from "../utils/api";

// This will return a list of table as an array to be used in multiple components
// It calls a funntions from utils.api.js 

function AllOfTheTables() {
    const [tables, setTables] = useState([]);
    const [tablesError, setTablesError] = useState(null);
    //loads the list of tables utilizing a useEffect hook
    useEffect(loadTables, []);
    function loadTables() {
        const abortController = new AbortController();
        listTables(abortController.signal)
            .then(setTables)
            .catch((error) => {
                setTablesError(error)
                console.log(tablesError);
            });
        return () => abortController.signal;
    }

    return (tables)
}

export default AllOfTheTables;