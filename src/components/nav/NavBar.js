import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <>
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/products">Products</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="#"
                        onClick={
                            () => {
                                localStorage.removeItem("nvc_customer")
                            }
                        }
                    >Logout</Link>
                </li>

            </ul>
            <h1>NVC Gestetner Services</h1>
        </>
    )
}