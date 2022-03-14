import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBarAdminstrative = (props) => {
    return (
        <>
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/homepage">Homepage</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/products">Products</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/orders">Orders and Service Requests</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/orders/download">Download Rev File</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/homepage"
                        onClick={
                            () => {
                                localStorage.removeItem("nvc_employee")
                            }
                        }
                    >Logout</Link>
                </li>
            </ul>

        </>
    )
}