import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import ApiManager from "../ApiManager";


export const ProductList = () => {
    const [categories, setCategories] = useState([])
    const [updateProduct, setUpdateProduct] = useState(false)
    const [catId, changeCatId] = useState(0)
    const [filtered, setFilter] = useState([])
    const [purchase, update] = useState({})
    const history = useHistory()
    const [employees, addEmployees] = useState([])

    // to check if employee or customer is logged in
    const currentEmployeeId = parseInt(localStorage.getItem("nvc_employee"))

    useEffect(
        () => {
            ApiManager.getCategories()
                .then(cat => setCategories(cat))
            ApiManager.getProductsbyCat(catId)
                .then(filteredPro => setFilter(filteredPro))
        },
        []
    )

    useEffect(
        () => {
            ApiManager.getProductsbyCat(catId)
                .then(filteredPro => setFilter(filteredPro))
        },
        [updateProduct, catId]
    )

    useEffect(
        () => {
            ApiManager.getEmployees()
                .then(emp => addEmployees(emp))
    }, []
    )

    const isAdministrative = () => {
        const foundEmployee = employees.find(emp => emp.id === currentEmployeeId)
        if (foundEmployee?.administrative) {
            return foundEmployee
        } else {
            return null
        }
    }

    async function savePurchase (event, product) {
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

        return await fetch("http://localhost:8088/orders", fetchOption)
            .then(() => {
                history.push("/orders")
            })
    }

    // update showedAddtionalInfo when the Purchase button clicked
    async function updateShowedAdditionInfo (event, copy) {
        event.preventDefault()
        const fetchOption = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(copy)
        }

        return await fetch(`http://localhost:8088/products/${copy.id}`, fetchOption)
            .then(() => {
                setUpdateProduct(!updateProduct)
            })
    }

    const numberFormat = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    }

    return (
        <>
            <h3>Multifunction Printers & Copiers</h3>
            <p>Our high-quality, multifunction printers and copiers offer many configurations to meet your needs. 
            Personalize your black & white or color copier with options in speed, paper size, finishing and features. 
            See our full line up and discover how our smart technology, superior image quality and document-sharing tools 
            can help increase business productivity.</p>
            
            {
                isAdministrative() ?
                    <div>
                        <button onClick={() => history.push("/products/new")}>Add New Product</button>
                    </div>
                : ""
            }

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
                            <p>Price: ${numberFormat(product.price)}</p>

                            {currentEmployeeId ? "" :
                                <button id={product.id} onClick={
                                    (event) => {
                                        const copy = {...product}
                                        copy.showedAdditionInfo = !copy.showedAdditionInfo
                                        updateShowedAdditionInfo(event, copy)
                                    }
                                }>Purchase</button>
                            }

                            {
                                product.showedAdditionInfo ?
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

