import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import NewTable from "../tables/NewTable";
import SeatReservation from "../reservations/SeatReservation";
import SearchByNumber from "../reservations/SearchByNumber";
import EditReservation from "../reservations/EditReservation";
import CreateReservation from "../reservations/NewReservation";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {

  

  return (
    <Switch>

      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>

      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>

      <Route exact path="/reservations/new">
        <CreateReservation />
      </Route>

      <Route path="/tables/new">
        <NewTable />
      </Route>

      <Route path="/dashboard">
        <Dashboard date={today()}/>
      </Route>

      <Route path="/reservations/:reservation_id/seat">
        <SeatReservation />
      </Route>

      <Route path="/search">
        <SearchByNumber />
      </Route>
      
      <Route path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
