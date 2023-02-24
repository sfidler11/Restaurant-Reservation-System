import React, {useEffect, useState} from "react";
import { useParams } from "react-router";
import CreateOrEditReservation from "./ReservationForm";
import { formatAsDate } from "../utils/date-time";

const axios = require("axios");
const BASE_URL = process.env.REACT_APP_API_BASE_URL;


function EditReservation() {
    const [thisReservation, setThisReservation] = useState();
    let { reservation_id } = useParams();
    let reservationName = ""
    //loads the reservation based on the reservation ID in the parameters
    useEffect(() => {
        const loadAbort = new AbortController();
        async function loadReservation() {
            await axios
                .get(`${BASE_URL}/reservations/${reservation_id}`, {
                    signal: loadAbort
                })
                .then((response) => {
                    setThisReservation({...response.data.data, reservation_date: formatAsDate(response.data.data.reservation_date)})
                })
                .catch((error) => {
                    console.log(error)
                })
                return () => loadAbort.abort();
        }

        loadReservation();
    }, [reservation_id])

    if(thisReservation) {
        reservationName = `${thisReservation.first_name} ${thisReservation.last_name}`
    };

    return(
        <div>
            <h3>Edit Reservation For {reservationName} </h3>
            {thisReservation && 
            (<CreateOrEditReservation thisReservation={thisReservation}/>)
            }
        </div>
    )
}

export default EditReservation;