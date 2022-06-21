import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import ApiManager from "../ApiManager";
import "./AddProductForm.css"


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

        return await fetch("https://coral-app-cuq3h.ondigitalocean.app//products", fetchOption)
            .then(() => {
                history.push("/products")
            })
    }

    return (
        <form className="addProductForm">
            <h2 className="addProductForm__title">Add New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label className="addLabel" htmlFor="name">Product name: </label>
                    <br></br>
                    <input
                        autoFocus
                        type="text"
                        className="addInput"
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
                    <label className="addLabel" htmlFor="description">Product description: </label>
                    <br></br>
                    <input
                        type="text"
                        className="addInput"
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
                    <label className="addLabel" htmlFor="price">Product price: </label>
                    <br></br>
                    <input
                        type="number"
                        min={0}
                        className="addInput"
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
                    <label className="addLabel" htmlFor="category">Select product category: </label>
                    <br></br>
                    <select className="addSelect" id="category" onChange={
                        (evt) => {
                            const copy = {...product}
                            copy.categoryId = evt.target.value
                            addProduct(copy)
                        }
                    }>
                        <option value="">Select category</option>
                        {
                            categories?.map(category => {
                                return <option key={`categories--${category.id}`} value={category.id}>{category.type}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>

            <button className="button-add" onClick={saveProduct}>
                Add Product
            </button>
        </form>
    )
}