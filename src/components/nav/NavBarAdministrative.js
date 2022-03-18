import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBarAdminstrative = (props) => {
    const history = useHistory()

    return (
        <section className="navbar__area">
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/homepage">Home</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/products">Products</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/orders">Orders and Service Requests</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/orders/download">Download File</Link>
                </li>
                
            </ul>

            <button className="button--logout" onClick={
                    () => {
                        localStorage.removeItem("nvc_employee")
                        history.push("/homepage")
                    }
            }>Logout</button>

        </section>
    )
}