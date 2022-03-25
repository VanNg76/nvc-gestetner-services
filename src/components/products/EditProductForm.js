import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import ApiManager from "../ApiManager";
import "./EditProductForm.css"


export const EditProductForm = ({productId}) => {
    const [products, addProducts] = useState([])
    const [product, addProduct] = useState({ })
    const history = useHistory()

    useEffect(
        () => {
            ApiManager.getProducts()
                .then(p => addProducts(p))
                .then(() => {
                    const currentProduct = products.find(p => p.id === parseInt(productId))
                    addProduct(currentProduct)
                })
        },
        [product]
    )

    async function saveEditProduct (event, copy) {
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
                history.push("/products")
            })
    }

    return (
        <form className="editProductForm">
            <h2 className="editProductForm__title">Edit Product Price</h2>
            <fieldset>
                <div className="form-group">
                    <label className="editLabel" htmlFor="price">Product price: </label>
                    <br></br>
                    <input
                        type="number"
                        min={0}
                        className="editInput"
                        placeholder={product.price}
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.price = evt.target.value
                                addProduct(copy)
                            }
                        } />
                </div>
            </fieldset>

            <button className="button-edit" onClick={() => saveEditProduct }>
                Done
            </button>
        </form>
    )
}