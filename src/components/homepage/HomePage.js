import React, { useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { getProducts } from "../ApiManager";


export const HomePage = () => {
    const [products, createProducts] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            getProducts()
                .then(productData => {
                    createProducts(productData)
                    })
        },
        []
    )

    return (
        <>
            <h1>NVC Gestetner Services</h1>
            <button className="navbar__item active" onClick={
                 () => {
                     history.push("/login")
                 }
            }>Login</button>

            {
                products.map(product => {
                    return (
                        <div key={`product--${product.id}`} className="products">
                            <img className="image" src={product.imageLink} alt="Images" />
                            <p>{product.name}: ${product.price}</p>
                        </div>
                    )
                })
            }
        </>
        
    )

}