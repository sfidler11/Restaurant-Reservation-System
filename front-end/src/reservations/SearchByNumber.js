import React, {useState, useEffect} from "react";
import ReservationCard from "./ReservationCard"; 
const axios = require("axios");
const BASE_URL = process.env.REACT_APP_API_BASE_URL + "/reservations?mobile_number=";

function SearchByNumber() {
    const [reservations, setReservations] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState("");
    //const [reservationList, setResevationList] = useState("No reservations found")

    //when submitted, sets the value of the phone number as submitted by the user
    const handleNumberChange = (event) => {
        //event.preventDefault();
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
            })
    }

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


    //console.log(reservations);

    //loads the list of reservations that matches the phone number
    // useEffect(() => {
    //     const listAbort = new AbortController();

    //     async function listReservations() {
    //         try {
    //             if(reservations.length > 0 ) {
    //                 return (reservations.map((reservation) => {
    //                     <ReservationCard reservation={reservation} />
    //                 })
    //                 )
    //             }

    //             else {
    //                 return (
    //                     <div>
    //                     No reservations found
    //                     </div>
    //                 )
    //             }
    //         }
    //         catch (error){
    //             console.log("reservation load error", error)
    //         }
    //         return () => listAbort.signal;
    //     }
    //     listReservations();
    // }, [reservations])
    //console.log("resList", reservationList)


    return(
        <div>
            <h3>Seach For A Reservation</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="mobile_number">Reservation Phone Number</label>
                    <input 
                    name="mobile_number"
                    id="mobile_number"
                    placeholder="Enter a customer's phone number"
                    onChange={handleNumberChange}
                    required
                    />
                </div>
                <div>
                    <button type="submit">Find</button>
                </div>
            </form>
            <div>
                {reservationList}
            </div>
        </div>
    )
}

export default SearchByNumber;