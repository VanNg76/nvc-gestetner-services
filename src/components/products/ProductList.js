import React, { useEffect, useState } from "react"
import { getProducts } from "../ApiManager"
import { getCategories } from "../ApiManager";


export const ProductList = () => {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [catId, changeCatId] = useState(0)
    const [filtered, setFilter] = useState([])

    useEffect(
        () => {
            getCategories()
                .then(cat => setCategories(cat))
        },
        []
    )

    useEffect(
        () => {
            getProducts()
                .then(pro => setProducts(pro))
        },
        []
    )

    useEffect(
        () => {
            const filterProducts = products.filter(product => product.categoryId === catId)
            setFilter(filterProducts)
         },
        [catId]
    )

    const savePurchase = (event) => {
        event.preventDefault()
        const newPurchase = {
            productId: parseInt(event.target.id),
            customerId: parseInt(localStorage.getItem("kandy_customer"))
        }
        
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPurchase)
        }
    }
    
    return (
        <>
            <label htmlFor="category">Select category: </label>
            <select id="category" onChange={
                (event) => {
                    changeCatId(parseInt(event.target.value))
                }
            }>
                <option value="">Select category:</option>
                {
                    categories.map(category => {
                        return <option key={`categories--${category.id}`} value={category.id}>{category.type}</option>
                    })
                }
            </select>

            {
                filtered.map(product => {
                    return (
                        <div key={`product--${product.id}`}>
                            <p>Product name: {product.name}</p>
                            <p>Description: {product.description}</p>
                            <p>Price: ${product.price}</p>
                            <button id={product.id}>Purchase</button>
                        </div>
                    )
                })
            }
        </>
    )
}

