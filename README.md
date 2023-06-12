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
![dashboard](/images/dashboard.png)

### Search
![search empty](/images/searchEmpty.png)

![search complete](/images/searchComplete.png)

### New Reservation
![new reservation](/images/makeAReservation.png)

### New Table
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