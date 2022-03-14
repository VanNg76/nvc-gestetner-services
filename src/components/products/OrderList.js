import React, { useEffect, useState } from "react"
import ApiManager from "../ApiManager"


export const OrderList = () => {
    // employees' array
    const [allOrders, addAllOrders] = useState([])
    const [allTickets, addAllTickets] = useState([])
    const [updateOrder, setUpdateOrder] = useState(false)
    const [updateTicket, setUpdateTicket] = useState(false)
    const [employees, addEmployees] = useState([])

    // customers' array
    const [orders, addOrders] = useState([])
    const [tickets, addTickets] = useState([])
    const [totalRevenue, addRevenue] = useState()
    
    // to check if employee or customer is logged in
    const currentCustomerId = parseInt(localStorage.getItem("nvc_customer"))
    const currentEmployeeId = parseInt(localStorage.getItem("nvc_employee"))

    // employee to get all orders and re-load the array whenever updateOrder changed
    useEffect(
        () => {
            ApiManager.getAllOrders()
                .then(allOrder => {
                        addAllOrders(allOrder)
                    })
        }, [updateOrder]
    )

    // employee to get all tickets and re-load the array whenever updateTicket changed
    useEffect(
        () => {
            ApiManager.getAllServiceTickets()
                .then(allTicket => {
                    addAllTickets(allTicket)
                })
        }, [updateTicket]
    )

    // customer to get their orders
    useEffect(
        () => {
            if (currentCustomerId) {
                ApiManager.getOrders(currentCustomerId)
                    .then(order => {
                        addOrders(order)
                    })
            }
        },
        []
    )
    
    // customer to get their tickets
    useEffect(
        () => {
            if (currentCustomerId) {
                ApiManager.getServiceTickets(currentCustomerId)
                    .then(ticket => {
                        addTickets(ticket)
                    })
            }
        },
        []
    )

    useEffect(
        () => {
            ApiManager.getEmployees()
                .then(emp => {
                    addEmployees(emp)
                })
        }, []
    )
    
    // calculate customers init total revenue and re-calculate whenever orders changed
    useEffect(
        () => {
            if (currentCustomerId) {
                calculateRev(orders)
            }
        },
        [orders]
    )

    const calculateRev = (array) => {
        const incompletedArray = array.filter(order => order.completed === false)
        const revArray = incompletedArray.map(order => order.product.price * order.quantity)
        const totalRev = revArray.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
        addRevenue(totalRev)
    }

    // update completed order
    async function changeOrder (event, copy) {
        event.preventDefault()
        const fetchOption = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        }

        return await fetch(`http://localhost:8088/orders/${copy.id}`, fetchOption)
            .then(() => {
                setUpdateOrder(!updateOrder)
            })
    }

    // update completed ticket
    async function changeTicket (event, copy) {
        event.preventDefault()
        const fetchOption = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        }

        return await fetch(`http://localhost:8088/serviceTickets/${copy.id}`, fetchOption)
            .then(() => {
                setUpdateTicket(!updateTicket)
            })
    }

    async function deleteOrder (id) {
        await fetch(`http://localhost:8088/orders/${id}`, {
            method: "DELETE"
        })

        // update orders array to eliminate the deleted one!
        const copy = orders.filter(order => order.id !== id)
        addOrders(copy)
    }

    async function deleteEmployeeOrder (id) {
        await fetch(`http://localhost:8088/orders/${id}`, {
            method: "DELETE"
        })

        // update orders array to eliminate the deleted one!
        const copy = allOrders.filter(order => order.id !== id)
        addAllOrders(copy)
    }

    async function deleteTicket (id) {
        await fetch(`http://localhost:8088/serviceTickets/${id}`, {
            method: "DELETE"
        })

        // update tickets array to eliminate the deleted one!
        const copy = tickets.filter(ticket => ticket.id !== id)
        addTickets(copy)
    }

    async function deleteEmployeeTicket (id) {
        await fetch(`http://localhost:8088/serviceTickets/${id}`, {
            method: "DELETE"
        })

        // update tickets array to eliminate the deleted one!
        const copy = allTickets.filter(ticket => ticket.id !== id)
        addAllTickets(copy)
    }

    const employeeName = (id) => {
        const findEmployee = employees.find(emp => emp.id === id)
        return (findEmployee?.name)
    }

    const numberFormat = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    }


    return (
        <>
        {currentEmployeeId ?
            <div>
                <h3>All current orders:</h3>
                <ul>
                    {allOrders.map(order => {
                        return (
                            <div key={`order--${order.id}`}>
                            {order.completed ? "" :
                                <li>
                                    Product Name: {order.product.name}<br></br>
                                    Quantity: {order.quantity}<br></br>
                                    Estimate delivery date: {order.deliveryDate}<br></br>
                                    <label>Completed: </label>
                                    <input type="checkbox" id={`orderComplete--${order.id}`} onChange={
                                        (event) => {
                                            const copy = { ...order }
                                            copy.completed = true
                                            delete copy.product
                                            changeOrder(event, copy)
                                        }
                                    }></input>
                                    <button onClick={() => {
                                        window.alert("This product is no more available")
                                        deleteEmployeeOrder(order.id)
                                    }}>Delete</button>
                                </li>
                            }
                            </div>
                        )
                    })
                    }
                </ul>

                <h3>All current service request(s):</h3>
                <ul>
                    {allTickets.map(ticket => {
                        return (
                            <div key={`ticket--${ticket.id}`}>
                            {ticket.completed ? "" :
                                <li>
                                    Description: {ticket.description}<br></br>
                                    Assigned to: {employeeName(ticket.employeeId)}<br></br>

                                    <label>Completed: </label>
                                    <input type="checkbox" id={`ticketComplete--${ticket.id}`} onChange={
                                        (evt) => {
                                            const copy = {...ticket}
                                            copy.completed = true
                                            changeTicket(evt, copy)
                                        }
                                    }></input>
                                    
                                    <button onClick={() => {
                                        window.alert("This service is not available")
                                        deleteEmployeeTicket(ticket.id)
                                    }}>Delete</button><br></br>
                                    
                                    <label>Re-assign ticket to: </label>
                                    <select id="technician" onChange={
                                        (event) => {
                                            const copy = {...ticket}
                                            copy.employeeId = parseInt(event.target.value)
                                            changeTicket(event, copy)
                                        }
                                    }>
                                        <option value="">Select technician:</option>
                                        {
                                            employees.map(employee => {
                                                return <option key={`employees--${employee.id}`} value={employee.id}>{employee.name}</option>
                                            })
                                        }
                                    </select>
                                </li>
                            }
                            </div>
                        )
                    })}
                </ul>
            </div>
        :
            <div>
                <p>Your current order(s):</p>
                <ul>
                    {
                        orders.map(order => {
                            return (
                                <div key={`order--${order.id}`}>
                                    {order.completed ? "" :
                                        <li>
                                            Product Name: {order.product.name}<br></br>
                                            Quantity: {order.quantity}<br></br>
                                            Estimate delivery date: {order.deliveryDate}<br></br>
                                            Price per unit: {numberFormat(order.product.price)}<br></br>
                                            Total: {numberFormat(order.product.price * order.quantity)}<br></br>
                                            
                                            <button onClick={() => {
                                                deleteOrder(order.id)
                                            }}>Cancel</button>
                                        </li>
                                    }
                                </div>
                            )
                        })
                    }
                </ul>
                <p>Total Price of current Order(s): {numberFormat(totalRevenue)}</p>

                <p>Your current service request(s):</p>
                <ul>
                    {
                        tickets.map(ticket => {
                            return (
                                <div key={`ticket--${ticket.id}`}>
                                    {ticket.completed ? "" :
                                        <li>
                                            <div>Description: {ticket.description}</div>
                                            
                                            <button onClick={() => {
                                                deleteTicket(ticket.id)
                                            }}>Cancel</button>
                                        </li>
                                    }
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
        }
    </>
    )
}

