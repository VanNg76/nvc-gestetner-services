import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import ApiManager from "../ApiManager";
// import { getCategories } from "../ApiManager";

export const AddProductForm = () => {
    const [categories, addCategories] = useState()
    const [product, addProduct] = useState({ });
    const history = useHistory()

    useEffect(
        () => {
            ApiManager.getCategories()
                .then(cat => addCategories(cat))
        },
        []
    )

    async function saveProduct (event) {
        event.preventDefault()
        
        const newProduct = {
            name: product.name,
            description: product.description,
            imageLink: "/images/IM2500.jpg",
            showedAdditionInfo: false,
            categoryId: parseInt(product.categoryId),
            price: parseInt(product.price)
        }
        
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        }

        return await fetch("http://localhost:8088/products", fetchOption)
            .then(() => {
                history.push("/products")
            })
    }

    return (
        <form className="addProductForm">
            <h2 className="addProductForm__title">Add Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Product name: </label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter product name"
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.name = evt.target.value
                                addProduct(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Product description: </label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Enter product description"
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.description = evt.target.value
                                addProduct(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Product price: </label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="Enter product price"
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.price = evt.target.value
                                addProduct(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="category">Select product category: </label>
                    <select id="category" onChange={
                        (evt) => {
                            const copy = {...product}
                            copy.categoryId = evt.target.value
                            addProduct(copy)
                        }
                    }>
                        <option value="">Select category:</option>
                        {
                            categories?.map(category => {
                                return <option key={`categories--${category.id}`} value={category.id}>{category.type}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>

            <button className="btn btn-primary" onClick={saveProduct}>
                Add Product
            </button>
        </form>
    )
}