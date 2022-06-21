import React, { useRef, useState } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const existDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`https://coral-app-cuq3h.ondigitalocean.app//customers?email=${email}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const existingEmployeeCheck = () => {
        return fetch(`https://coral-app-cuq3h.ondigitalocean.app//employees?email=${email}`)
            .then(res => res.json())
            .then(emp => emp.length ? emp[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("nvc_customer", exists.id)
                    history.push("/products")
                } else {
                    existingEmployeeCheck()
                        .then(empExists => {
                            if (empExists) {
                                localStorage.setItem("nvc_employee", empExists.id)
                                history.push("/orders")
                            } else {
                                existDialog.current.showModal()
                            }
                        })
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>NVC Gestetner Services</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label className="loginLabel" htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="button--signin">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}

