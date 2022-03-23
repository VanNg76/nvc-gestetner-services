import React, { useEffect, useState } from "react"
import ApiManager from "../ApiManager"
import "./OrderList.css"


export const OrderList = () => {
    // employees' array
    const [allOrders, addAllOrders] = useState([])
    const [allTickets, addAllTickets] = useState([])
    const [updateOrder, setUpdateOrder] = useState(false)
    const [updateTicket, setUpdateTicket] = useState(false)
    const [employees, addEmployees] = useState([])
    const [customers, addCustomers] = useState([])

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
                .then(emp => addEmployees(emp))
            ApiManager.getCustomers()
                .then(cus => addCustomers(cus))
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

    const customerName = (id) => {
        const findCustomer = customers.find(cus => cus.id === id)
        return (findCustomer?.name)
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
                <h2>NVC Gestetner Services Employee-site</h2>
                <h3>Hi, {employeeName(currentEmployeeId)} !</h3>
                <div className="part">
                    <div className="view">
                        <h4>All current orders:</h4>
                        <ul>
                            {allOrders.map(order => {
                                return (
                                    <div key={`order--${order.id}`}>
                                    {order.completed ? "" :
                                        <li>
                                            Product Name: <span>{order.product.name}</span><br></br>
                                            Quantity: {order.quantity}<br></br>
                                            Estimate delivery date: {order.deliveryDate}<br></br>
                                            <label className="completeLabel">Completed: </label>
                                            <input type="checkbox" className="completeCheck" id={`orderComplete--${order.id}`} onChange={
                                                (event) => {
                                                    const copy = { ...order }
                                                    copy.completed = true
                                                    delete copy.product
                                                    changeOrder(event, copy)
                                                }
                                            }></input>
                                            <button className="button-cancel" onClick={() => {
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
                    </div>

                    <div className="view">
                        <h4>All current service request(s):</h4>
                        <ul>
                            {allTickets.map(ticket => {
                                return (
                                    <div key={`ticket--${ticket.id}`}>
                                    {ticket.completed ? "" :
                                        <li>
                                            Description: {ticket.description}<br></br>
                                            Assigned to: <span>{employeeName(ticket.employeeId)}</span><br></br>
                                            
                                            <label className="completeLabel">Re-assign request to: </label>
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
                                            <br></br>

                                            <label className="completeLabel">Completed: </label>
                                            <input type="checkbox" className="completeCheck" id={`ticketComplete--${ticket.id}`} onChange={
                                                (evt) => {
                                                    const copy = {...ticket}
                                                    copy.completed = true
                                                    changeTicket(evt, copy)
                                                }
                                            }></input>
                                            
                                            <button className="button-cancel" onClick={() => {
                                                window.alert("This service is not available")
                                                deleteEmployeeTicket(ticket.id)
                                            }}>Delete</button><br></br>
                                            <br></br>
                                        </li>
                                    }
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        :
        <>
            <h3>Hi, {customerName(currentCustomerId)} !</h3>
            <div className="part">
                <div className="view">
                    <h4>Your current order(s):</h4>
                    <ul>
                        {
                            orders.map(order => {
                                return (
                                    <div key={`order--${order.id}`}>
                                        {order.completed ? "" :
                                            <li>
                                                Product Name: <span>{order.product.name}</span><br></br>
                                                Quantity: {order.quantity}<br></br>
                                                Estimate delivery date: {order.deliveryDate}<br></br>
                                                Price per unit: {numberFormat(order.product.price)}<br></br>
                                                Total: <strong>{numberFormat(order.product.price * order.quantity)}</strong><br></br>
                                                
                                                <button className="button-cancel" onClick={() => {
                                                    deleteOrder(order.id)
                                                }}>Cancel</button>
                                            </li>
                                        }
                                    </div>
                                )
                            })
                        }
                    </ul>
                    <div className="totalRev">Total Order(s): {numberFormat(totalRevenue)}</div>
                </div>

                <div className="view">
                    <h4>Your current service request(s):</h4>
                    <ul>
                        {
                            tickets.map(ticket => {
                                return (
                                    <div key={`ticket--${ticket.id}`}>
                                        {ticket.completed ? "" :
                                            <li>
                                                <div>Description: {ticket.description}</div>
                                                
                                                <button className="button-cancel" onClick={() => {
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
            </div>
        </>
        }
    </>
    )
}

