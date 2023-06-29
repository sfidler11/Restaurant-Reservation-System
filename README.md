# Periodic Tables Restaurant Reservation System | A Full-Stack Reservation App
The Periodic Tables app is a full-stack reservation system for restaurant managers where users can create and manage restaurant reservations and available tables.

## Installation
1. Fork and clone this repository
2. Run `npm install` to install local dependencies
3. Run `npm run start` to start the application


## Technologies
Javascript, React, Bootstrap 4, HTML, CSS, Express.js, PostgresSQL, Knex.js

![javascript logo](/images/JavaScript.png)
![react logo](/images/React.png)
![bootstrap logo](/images/bootstrap.png)
![html logo](/images/html.png)
![css logo](/images/css.png)
![express logo](/images/express.png)
![postgres elephant](/images/Postgresql_elephant.svg.png)
![knex logo](/images/knex-logo.png)

## Front End
The Periodic Tables app front end was created using React and Bootstrap 4.

### Dashboard
This is the main pafe of the app and includes the following functions:
- The ability to change the reservations date through the `Previous Day`, `Today`, and `Next Day` buttons
- When a reservation falls on selected date, the user can edit take actions on the reservations as described in the "Search" Section
- A static dashboard appears on the left which allows the user to navigate between the `Dashboard`, `Search`, `New Reservation`, and `New Table` sections of the app

![dashboard](/images/dashboard.png)

### Search
This page allows the user to find a reservation based on the customer's phone number.
- The search bar will automatically stylize the entered phone number when a fifth and eigth digit are added to the number
- The search bar only accepts numerical values
- Selecting the `Find` button will locate all reservations that match the phone number added (note: the user does not need to enter a complete phone number, the search function will find all matching reservations wtih whatever numbers are added)
- Located reservations will have the following options available:
`Seat` - brings the user to the "Seat Reservation" screen
`Edit` - brings the user to a new screen to edit the reservation info
`Cancel` - Cancels the reservation after the user confirms that they wish to continue with the action
![search empty](/images/searchEmpty.png)

![search complete](/images/searchComplete.png)

### Seat Reservation
This page allows the user to assign a reservation to an open table. If the table cannot fit the reservation, an error message will appear.

![seat](/images/seatReservation.png)

### New Reservation
Thia page allows the user to create a new reservation, which must include the following:
First and Last Names: Accepts all characters
Phone Number: A ten digit, numeric number
Reservation Date: Has to be a future date and will not accept Tuesday reservations as the restaurant is closed on Tuesdays
Reservation Time: Anytime between the hours of 10:30 AM and 9:30 PM
Number of Guests: Any non-zero positive integer

If any of the information is invalid or missing, the user is shown an error message.

When the user selects `Submit`, the reservation is saved and the user is brought back to the `Dashboard` on the date of the newly created reservation
![new reservation](/images/makeAReservation.png)

### New Table
This page allows the user to create a new table, which must include the following:
Table Name: Accepts all characters
Table Capacity: Any non-zero positive integer
![new table](/images/createTable.png)

## Back End

### Routes 

| Request Type | Route | Description |
| -- | -- | -- |
| Get | `/movies` | Returns all movies currently in the database |
| Get | `/movies/is_showing=true` | Returns all movies that are currently showing in theaters |
| Get | `/movies/:movieId` | Returns a movie based on it's specific ID |
| Get | `/movies/:movieId/reviews` | Returns all reviews for a specific movie |
| Get | `/movies/:movieId/theaters` | Returns all theaters showing a specific movie |
| Get | `/theaters` | Returns all theaters, including the movies shown at each theater |
| Put | `/reviews/:reviewId` | Updates an existing review and returns the updated review with critic info |
| Delete | `/reviews/:reviewId` | Deletes the review record based on a specific review ID |


The deployed app can be found here: 
Frontend - https://restauraunt-reservation-system-frontend.onrender.com/dashboard
Backend - https://restaurant-reservation-system-backend-vgjx.onrender.com/

A more robust readme file will be updated in the near future