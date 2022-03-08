import React from "react"
import { Route } from "react-router-dom"
import { ProductList } from "./products/ProductList"


export const ApplicationViews = () => {
    return (
        <>
            <Route path="/products">
                <ProductList />
            </Route>
        </>
    )
}