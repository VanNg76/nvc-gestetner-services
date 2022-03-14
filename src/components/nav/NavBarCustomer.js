import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBarCustomer = (props) => {

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
                    <Link className="navbar__link" to="/services/new">Request Service</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/orders">Orders and Service Requests</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/homepage"
                        onClick={
                            () => {
                                localStorage.removeItem("nvc_customer")
                            }
                        }
                    >Logout</Link>
                </li>
            </ul>
            
        </>
    )
}