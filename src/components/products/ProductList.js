import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { getProducts } from "../ApiManager"
import { getCategories } from "../ApiManager";


export const ProductList = () => {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [catId, changeCatId] = useState(0)
    const [filtered, setFilter] = useState([])
    const [purchase, update] = useState({})
    const [showed, updateShowed] = useState(false)
    const history = useHistory()

    // to check if employee or customer is logged in
    const currentEmployeeId = parseInt(localStorage.getItem("nvc_employee"))

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
   
    const savePurchase = (event, product) => {
        event.preventDefault()
        const newPurchase = {
            productId: product.id,
            customerId: parseInt(localStorage.getItem("nvc_customer")),
            employeeId: 1,
            quantity: parseInt(purchase.quantity),
            deliveryDate: purchase.deliveryDate,
            completed: false
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPurchase)
        }

        return fetch("http://localhost:8088/orders", fetchOption)
            .then(() => {
                history.push("/orders")
            })
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
                            {currentEmployeeId ? "" :
                                <button id={product.id} onClick={() => {
                                    updateShowed(true)
                                    debugger
                                }
                                }>Purchase</button>
                            }
                            {
                                showed ?
                                    <div>
                                        <form className="purchaseForm">
                                            <h2 className="purchaseForm__title">Additional Info:</h2>
                                            <fieldset>
                                                <div className="form-group">
                                                    <label htmlFor="quantity">Quantity:</label>
                                                    <input
                                                        required autoFocus
                                                        type="number"
                                                        className="form-control"
                                                        placeholder="Enter quantity"
                                                        onChange={
                                                            (evt) => {
                                                                const copy = {...purchase}
                                                                copy.quantity = evt.target.value
                                                                update(copy)
                                                            }
                                                        } />
                                                </div>
                                            </fieldset>

                                            <fieldset>
                                                <div className="form-group">
                                                    <label htmlFor="deliveryDate">Delivery date:</label>
                                                    <input
                                                        required autoFocus
                                                        type="date"
                                                        className="form-control"
                                                        placeholder="Choose delivery date"
                                                        onChange={
                                                            (evt) => {
                                                                const copy = {...purchase}
                                                                copy.deliveryDate = evt.target.value
                                                                update(copy)
                                                            }
                                                        } />
                                                </div>
                                            </fieldset>
                                            
                                            <button className="btn btn-primary" onClick={
                                                (event) => {
                                                    savePurchase(event, product)
                                                }
                                                }>Place Purchase
                                            </button>
                                        </form>
                                    </div>
                                : ""
                            }
                        </div>
                    )
                })
            }
        </>
    )
}

