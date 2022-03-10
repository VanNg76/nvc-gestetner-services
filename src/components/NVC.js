import React from "react";
import { NavBar } from "./nav/NavBar";
import { ApplicationViews } from "./ApplicationViews";
import { Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { HomePage } from "./homepage/HomePage";

export const NVC = () => {
    return (
        <>
            <Route
                render={() => {
                    if (localStorage.getItem("nvc_customer") || localStorage.getItem("nvc_employee")) {
                        return (
                            <>
                                <NavBar />
                                <ApplicationViews />
                            </>
                        )
                    } else {
                        return <Redirect to="/homepage" />;
                    }
                }}
            />

            <Route path="/homepage">
                <HomePage />
            </Route>

            <Route path="/login">
                <Login />
            </Route>

            <Route path="/register">
                <Register />
            </Route>
        </>
    )
}
