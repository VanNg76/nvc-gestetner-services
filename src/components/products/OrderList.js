import React, { useEffect, useState } from "react"
import { getOrders, getAllOrders, getServiceTickets, getAllServiceTickets, getEmployees } from "../ApiManager"


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
            getAllOrders()
                .then(allOrder => {
                        addAllOrders(allOrder)
                    })
        }, [updateOrder]
    )

    // employee to get all tickets and re-load the array whenever updateTicket changed
    useEffect(
        () => {
            getAllServiceTickets()
                .then(allTicket => {
                    addAllTickets(allTicket)
                })
        }, [updateTicket]
    )

    // customer to get their orders
    useEffect(
        () => {
            if (currentCustomerId) {
                getOrders(currentCustomerId)
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
                getServiceTickets(currentCustomerId)
                    .then(ticket => {
                        addTickets(ticket)
                    })
            }
        },
        []
    )

    useEffect(
        () => {
            getEmployees()
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
    const changeOrder = (event, copy) => {
        event.preventDefault()
        const fetchOption = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        }

        return fetch(`http://localhost:8088/orders/${copy.id}`, fetchOption)
            .then(() => {
                setUpdateOrder(!updateOrder)
            })
    }

    // update completed ticket
    const changeTicket = (event, copy) => {
        event.preventDefault()
        const fetchOption = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        }

        return fetch(`http://localhost:8088/serviceTickets/${copy.id}`, fetchOption)
            .then(() => {
                setUpdateTicket(!updateTicket)
            })
    }

    const deleteOrder = (id) => {
        fetch(`http://localhost:8088/orders/${id}`, {
            method: "DELETE"
        })

        // update orders array to eliminate the deleted one!
        const copy = orders.filter(order => order.id != id)
        addOrders(copy)
    }

    const deleteEmployeeOrder = (id) => {
        fetch(`http://localhost:8088/orders`, {
            method: "DELETE"
        })

        // update orders array to eliminate the deleted one!
        const copy = allOrders.filter(order => order.id != id)
        addAllOrders(copy)
    }

    const deleteTicket = (id) => {
        fetch(`http://localhost:8088/serviceTickets/${id}`, {
            method: "DELETE"
        })

        // update tickets array to eliminate the deleted one!
        const copy = tickets.filter(ticket => ticket.id != id)
        addTickets(copy)
    }

    const deleteEmployeeTicket = (id) => {
        fetch(`http://localhost:8088/serviceTickets`, {
            method: "DELETE"
        })

        // update tickets array to eliminate the deleted one!
        const copy = allTickets.filter(ticket => ticket.id != id)
        addAllTickets(copy)
    }

    const employeeName = (id) => {
        const findEmployee = employees.find(emp => emp.id === id)
        return (findEmployee?.name)
    }


    return (
        <>
        {currentEmployeeId ?
            <div>
                <p>All current orders:</p>
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
                                        window.alert("This product is not obsolete")
                                        deleteEmployeeOrder(order.id)
                                    }}>Delete</button>
                                </li>
                            }
                            </div>
                        )
                    })
                    }
                </ul>

                <p>All current service request(s):</p>
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
                <p>Your current orders:</p>
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
                                            Price per unit: ${order.product.price}<br></br>
                                            Total: ${order.product.price * order.quantity}<br></br>
                                            
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
                <p>Total Price of current Order(s): ${totalRevenue}</p>

                <p>Your current service request(s):</p>
                <ul>
                    {
                        tickets.map(ticket => {
                            return (
                                <div key={`ticket--${ticket.id}`}>
                                    {ticket.completed ? "" :
                                        <li>
                                            Description: {ticket.description}<br></br>
                                            
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

