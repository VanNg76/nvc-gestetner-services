import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBarHomepage = (props) => {

    return (
        <section className="navbar__area">
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/homepage">Home</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/about">About Us</Link>
                </li>
            </ul>
        </section>
    )
}