import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import "./ServiceForm.css"

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
                window.alert("Your request has been submitted !")
                history.push("/orders")
            })
    }

    return (
        <form className="serviceForm">
            <h2 className="serviceForm__title">New Service Request</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label><br></br>
                    <textarea
                        autoFocus
                        placeholder="Brief description of problem"
                        onChange={
                            (evt) => {
                                const copy = {...service}
                                copy.description = evt.target.value
                                update(copy)
                            }
                        }
                    />
                </div>
            </fieldset>
            
            <button className="button-submit" onClick={(evt) => {
                // check if user has not input description or description is empty
                if (Object.keys(service).length === 0 || service.description === "") {
                    window.alert("Enter brief description of your issue ...")
                } else {
                    saveService(evt)
                }
            }}>
                Submit request
            </button>
        </form>
    )
}
