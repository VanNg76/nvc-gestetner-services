import React, { useEffect, useState } from "react";
// import ReactExport from "react-export-excel";
import ApiManager from "../ApiManager";
            

export const DownloadOrders = () => {
    // const ExcelFile = ReactExport.ExcelFile;
    // const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    // const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    const [orders, setOrders] = useState([])
    const [customers, setCustomers] = useState([])
    
    useEffect(
        () => {
            ApiManager.getDownloadOrders()
                .then(o => setOrders(o))
            ApiManager.getCustomers()
                .then(c => setCustomers(c))
        }, []
    )

    return (
    <></>
    )
}

        // <ExcelFile>
        //     <ExcelSheet data={orders} name="Orders">
        //         <ExcelColumn label="Order No." value="id"/>
        //         <ExcelColumn label="Customer Name" value={col => col.customer.name}/>
        //         <ExcelColumn label="Employee Name" value={col => col.employee.name}/>
        //         <ExcelColumn label="Product Name" value={col => col.product.name}/>
        //         <ExcelColumn label="Unit Price" value={col => col.product.price}/>
        //         <ExcelColumn label="Quantity" value="quantity"/>
        //         <ExcelColumn label="Revenue" value={col => col.product.price * col.quantity}/>
        //         <ExcelColumn label="Est. Delivery Date" value="deliveryDate"/>
        //         <ExcelColumn label="Order Status" value={(col) => col.completed ? "completed" : "incompleted"}/>
        //     </ExcelSheet>

        //     <ExcelSheet data={customers} name="Customers">
        //         <ExcelColumn label="Customer ID" value="id"/>
        //         <ExcelColumn label="Customer Name" value="name"/>
        //         <ExcelColumn label="Email" value="email"/>
        //     </ExcelSheet>
        // </ExcelFile>