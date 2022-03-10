import React from "react"
import { Route } from "react-router-dom"
import { ProductList } from "./products/ProductList"
import { OrderList } from "./products/OrderList"
import { ServiceForm } from "./forms/ServiceForm"


export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/products">
                <ProductList />
            </Route>
            <Route path="/services/new">
                <ServiceForm />
            </Route>
            <Route path="/orders">
                <OrderList />
            </Route>
        </>
    )
}