import React, { useEffect, useState } from "react";
import ApiManager from "../ApiManager";
import { CSVLink } from "react-csv";
import "./Download.css"
            

export const Download = () => {
  const [orders, setOrders] = useState([])
  const [customers, setCustomers] = useState([])
  const [tickets, setTickets] = useState([])
  
  useEffect(
    () => {
      ApiManager.getDownloadOrders()
        .then(o => setOrders(o))
      ApiManager.getCustomers()
        .then(c => setCustomers(c))
      ApiManager.getDownloadServiceTickets()
        .then(t => setTickets(t))
    }, []
  )

  const orderHeaders = [
    { label: "Order ID", key: "id" },
    { label: "Customer ID", key: "customerId" },
    { label: "Customer Name", key: "customer.name" },
    { label: "Employee Name", key: "employee.name" },
    { label: "Product Name", key: "product.name" },
    { label: "Unit Price", key: "product.price" },
    { label: "Quantity", key: "quantity" },
    { label: "Est. Delivery Date", key: "deliveryDate" },
    { label: "Order Status", key: "completed" }
  ]

    const customerHeaders = [
      { label: "Customer ID", key: "id" },
      { label: "Customer Name", key: "name" },
      { label: "Email", key: "email" }
    ]

    const ticketHeaders = [
      { label: "Ticket ID", key: "id" },
      { label: "Customer Name", key: "customer.name" },
      { label: "Employee Name", key: "employee.name" },
      { label: "Description", key: "description" },
      { label: "Order Status", key: "completed" }
    ]
    
    return (
      <ul>
        <li className="downloadLi">
          <CSVLink data={orders} headers={orderHeaders}>
            Download Orders
          </CSVLink>
        </li>
        <li className="downloadLi">
          <CSVLink data={tickets} headers={ticketHeaders}>
            Download Service Requests
          </CSVLink>
        </li>
        <li className="downloadLi">
          <CSVLink data={customers} headers={customerHeaders}>
            Download Customers
          </CSVLink>
        </li>
      </ul>
    )
  }
  
