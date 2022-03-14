import React, { useState } from "react"
import { useHistory } from "react-router-dom"

export const ServiceForm = () => {
    const [service, update] = useState({ });
    const history = useHistory()

    const saveService = (event) => {
        event.preventDefault()
        
        const newService = {
            description: service.description,
            customerId: parseInt(localStorage.getItem("nvc_customer")),
            employeeId: 1,
            completed: false
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newService)
        }

        return fetch("http://localhost:8088/serviceTickets", fetchOption)
            .then(() => {
                window.alert("Your request has been submitted")
                history.push("/orders")
            })
    }

    return (
        <form className="serviceForm">
            <h2 className="serviceForm__title">New Service Request</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        onChange={
                            (evt) => {
                                const copy = {...service}
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            
            <button className="btn btn-primary" onClick={saveService}>
                Submit request
            </button>
        </form>
    )
}
