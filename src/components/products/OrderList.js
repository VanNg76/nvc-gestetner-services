import React, { useEffect, useState } from "react"
import { getOrders, getAllOrders, getServiceTickets, getAllServiceTickets } from "../ApiManager"


export const OrderList = () => {
    const [allOrders, addAllOrders] = useState([])
    const [allTickets, addAllTickets] = useState([])
    const [orders, addOrders] = useState([])
    const [tickets, addTickets] = useState([])
    const [updateOrder, setUpdateOrder] = useState(false)
    const [updateTicket, setUpdateTicket] = useState(false)
    const [totalRevenue, addRevenue] = useState()
    
    const currentCustomerId = localStorage.getItem("nvc_customer")
    const currentEmployeeId = localStorage.getItem("nvc_employee")

    // employee to get all orders
    useEffect(
        getAllOrders()
            .then((allOrder) => {
                    addAllOrders(allOrder)
                })
        , []
    )

    // employee to get all tickets
    useEffect(
        getAllServiceTickets()
            .then((allTicket) => {
                addAllTickets(allTicket)
            })
        , []
    )

    // customer to get their orders and re-load the array whenever updateOrder changed
    useEffect(
        () => {
            getOrders(parseInt(currentCustomerId))
                .then(order => {
                    addOrders(order)
                })
        },
        [updateOrder]
    )
    
    // customer to get their tickets and re-load the array whenever updateTicket changed
    useEffect(
        () => {
            getServiceTickets(parseInt(currentCustomerId))
                .then(ticket => {
                    addTickets(ticket)
                })
        },
        [updateTicket]
    )
    
    // calculate customers init total revenue and re-calculate whenever orders changed
    useEffect(
        () => {
            calculateRev(orders)
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

    const deleteTicket = (id) => {
        fetch(`http://localhost:8088/serviceTickets/${id}`, {
            method: "DELETE"
        })

        // update tickets array to eliminate the deleted one!
        const copy = tickets.filter(ticket => ticket.id != id)
        addTickets(copy)
        
    }

    return (
        <>
        {currentEmployeeId ?
            <div>
                <p>Current orders:</p>
                <ul>
                    {allOrders.map(order => {
                        return (
                            <li key={`order--${order.id}`}>
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
                            </li>
                        )
                    })
                    }
                </ul>

                <p>Current service request(s):</p>
                <ul>
                    {allTickets.map(ticket => {
                        return (
                            <li>
                                Description: {ticket.description}<br></br>
                                <label>Completed: </label>
                                <input type="checkbox" id={`ticketComplete--${ticket.id}`} onChange={
                                    (evt) => {
                                        const copy = {...ticket}
                                        copy.completed = true
                                        changeTicket(evt, copy)
                                    }
                                }></input>
                            </li>
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
                                            }}>Delete</button>
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
                                            }}>Delete</button>
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

