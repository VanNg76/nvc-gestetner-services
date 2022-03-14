import React from "react"
import { Route } from "react-router-dom"
import { ProductList } from "./products/ProductList"
import { OrderList } from "./products/OrderList"
import { ServiceForm } from "./forms/ServiceForm"
import { AddProductForm } from "./products/AddProductForm"


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
            <Route path="/orders">
                <OrderList />
            </Route>
        </>
    )
}