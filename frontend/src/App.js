import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./js/containers/Login";
import Register from "./js/containers/Register";
import Tasks from "./js/containers/Tasks";
import withTimeTracker from "./js/hoc/withTimeTracker";
import { NotificationContainer } from "react-notifications";
import Logout from "./js/containers/Logout";

function App({login,logout,register,getTasks,createTask,getPeriodReport,token}) {
  return (
    <div className="App">
      <div className="container">
     <Switch>
        <Route
            path="/login"
            render={() => {return !token ?(<Login login={login} />):(<Redirect to="/tasks" />)}}
          />
        <Route
          path="/register"
          render={() => (<Register register={register} />)}
          />
        <Route
          path="/tasks"
          render={() => {
            return token ? (
              <Tasks getTasks={getTasks} createTask = {createTask} getPeriodReport={getPeriodReport} />
            ) : (
              <Redirect to="/login" />
            );
          }}
          />
          <Route
          path="/logout"
          render={() => {
            return token ? (
              <Logout logout={logout}/>
            ) : (
              <Redirect to="/login" />
            );
          }}
          />
          <Route
            path="/"
            render={() => (<Redirect to="/login" />)}
        />
      </Switch>
      <NotificationContainer leaveTimeout={5000} />
      </div>
    </div>
  );
}

export default withTimeTracker(App);
