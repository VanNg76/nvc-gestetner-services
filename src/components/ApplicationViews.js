import React from "react"
import { Route } from "react-router-dom"
import { ProductList } from "./products/ProductList"
import { OrderList } from "./products/OrderList"
import { ServiceForm } from "./forms/ServiceForm"
import { AddProductForm } from "./products/AddProductForm"
import { DownloadOrders } from "./download/DownloadOrders"


export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/products">
                <ProductList />
            </Route>
            <Route exact path="/products/new">
                <AddProductForm />
            </Route>
            <Route path="/services/new">
                <ServiceForm />
            </Route>
            <Route exact path="/orders">
                <OrderList />
            </Route>
            <Route exact path="/orders/download">
                <DownloadOrders />
            </Route>
        </>
    )
}