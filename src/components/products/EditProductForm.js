import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import ApiManager from "../ApiManager";
import "./EditProductForm.css"


export const EditProductForm = () => {
    const [products, addProducts] = useState([])
    const [product, addProduct] = useState({ })
    const history = useHistory()
    const { productId } = useParams()

    useEffect(
        () => {
            ApiManager.getProducts()
                .then(p => addProducts(p))
        },
        []
    )
            
    useEffect(() => {
        const currentProduct = products.find(p => p.id === parseInt(productId))
        addProduct(currentProduct)
    }, [products]
    )

    async function saveEditProduct (event) {
        event.preventDefault()
        const fetchOption = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        }

        return await fetch(`https://coral-app-cuq3h.ondigitalocean.app/products/${productId}`, fetchOption)
            .then(() => {
                history.push("/products")
            })
    }

    return (
        <form className="editProductForm">
            <h2 className="editProductForm__title">Edit Product Price</h2>
            <fieldset>
                <div className="form-group">
                    <input
                        type="number"
                        min={0}
                        className="editInput"
                        placeholder="Enter new price..."
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.price = parseInt(evt.target.value)
                                addProduct(copy)
                            }
                        } />
                </div>
            </fieldset>

            <button className="button-edit" onClick={(event) => saveEditProduct (event) }>
                Done
            </button>
        </form>
    )
}