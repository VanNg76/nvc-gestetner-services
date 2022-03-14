import React, { useEffect, useState } from "react";
import { NavBarHomepage } from "./nav/NavBarHomepage";
import { NavBarCustomer } from "./nav/NavBarCustomer";
import { NavBarEmployee } from "./nav/NavBarEmployee"
import { NavBarAdminstrative } from "./nav/NavBarAdministrative";
import { ApplicationViews } from "./ApplicationViews";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { HomePage } from "./homepage/HomePage";
import ApiManager from "./ApiManager";
import { About } from "./homepage/About";

export const NVC = () => {
    const [employees, addEmployees] = useState([])

    useEffect(
        () => {
            ApiManager.getEmployees()
                .then(emp => addEmployees(emp))
    }, []
    )

    return (
        <>
            <Route
                render={() => {
                    let admin = false
                    let employee = false
                    let customer = false
                    const isEmployee = localStorage.getItem("nvc_employee")
                    const isCustomer = localStorage.getItem("nvc_customer")
                    if (isEmployee) {
                        const foundEmployee = employees.find(emp => emp.id === parseInt(isEmployee))
                        if (foundEmployee?.administrative) {
                           admin = true
                        } else {
                            employee = true
                        }
                    }
                    if (isCustomer) {
                        customer = true
                    }
                    
                    if (admin) {
                        return (
                            <>
                                <NavBarAdminstrative />
                                <ApplicationViews />
                            </>
                        )
                    } else if (employee) {
                        return (
                            <>
                                <NavBarEmployee />
                                <ApplicationViews />
                            </>
                        )
                    } else if (customer) {
                        return (
                            <>
                                <NavBarCustomer />
                                <ApplicationViews />
                            </>
                        )
                    } else {
                        return (
                            <>
                                <NavBarHomepage />
                                <ApplicationViews />
                            </>
                        )
                    }
                }}
            />

            <Route path="/homepage">
                <HomePage />
            </Route>

            <Route path="/about">
                <About />
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
