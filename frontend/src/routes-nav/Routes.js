import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import CompaniesList from "./CompaniesList";
import JobsList from "./JobsList";
import CompanyDetail from "./CompanyDetail";
import LoginForm from "./auth-forms/LoginForm";
import SignupForm from "./SignupForm";
import ProfileEditForm from "./ProfileEditForm";

const Routes = () => {
    return(
        <Switch>
            <Route exact path="/" >
                <Home />
            </Route>
            <Route exact path="/companies" >
                <CompaniesList />
            </Route>
            <Route path="/companies/:companyName" >
                <CompanyDetail />
            </Route>
            <Route exact path="/jobs" >
                <JobsList />
            </Route>
            <Route exact path="/login" >
                <LoginForm />
            </Route>
            <Route exact path="/signup" >
                <SignupForm />
            </Route>
            <Route exact path="/profile" >
                <ProfileEditForm />
            </Route>
            <Route>
                <h1>Page Not Found</h1>
            </Route>
        </Switch>
    )
}

export default Routes;