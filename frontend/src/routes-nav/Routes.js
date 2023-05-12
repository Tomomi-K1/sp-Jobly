import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "../homepage/Home";
import CompaniesList from "../companies/CompaniesList";
import JobsList from "../jobs/JobsList";
import CompanyDetail from "../companies/CompanyDetail";
import LoginForm from "../forms/LoginForm";
import SignupForm from "../forms/SignupForm";
import ProfileEditForm from "../forms/ProfileEditForm";

const Routes = () => {
    return(
        <Switch>
            
            <Route exact path="/" >
                <Home />
            </Route>
            <Route exact path="/login" >
                <LoginForm />
            </Route>
            <Route exact path="/signup" >
                <SignupForm />
            </Route>

            <PrivateRoute exact path="/companies" >
                <CompaniesList />
            </PrivateRoute>
            <PrivateRoute exact path="/companies/:companyName" >
                <CompanyDetail />
            </PrivateRoute>
            <PrivateRoute exact path="/jobs" >
                <JobsList />
            </PrivateRoute>
            <PrivateRoute exact path="/profile" >
                <ProfileEditForm />
            </PrivateRoute>

            <Route>
                <h1>Page Not Found</h1>
            </Route>
        
        </Switch>
    )
}

export default Routes;