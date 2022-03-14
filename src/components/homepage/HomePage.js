import React, { useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import ApiManager from "../ApiManager";


export const HomePage = () => {
    const [products, createProducts] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            ApiManager.getProducts()
                .then(productData => {
                    createProducts(productData)
                    })
        },
        []
    )

    const numberFormat = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    }

    return (
        <>
            {localStorage.getItem("nvc_customer") || localStorage.getItem("nvc_employee") ?
                "" :
                <button className="navbar__item active" onClick={
                    () => {
                        history.push("/login")
                    }
                }>Login</button>
            }

            <h1>NVC Gestetner Services</h1>
            <h3>Multifunction Printers & Copiers</h3>
            <p>Our high-quality, multifunction printers and copiers offer many configurations to meet your needs. 
            Personalize your black & white or color copier with options in speed, paper size, finishing and features. 
            See our full line up and discover how our smart technology, superior image quality and document-sharing tools 
            can help increase business productivity.</p>

            {
                products?.map(product => {
                    return (
                        <div key={`product--${product.id}`} className="products">
                            <img className="image" src={product.imageLink} alt="Images" />
                            <p>{product.name}: {numberFormat(product.price)}</p>
                        </div>
                    )
                })
            }
        </>
        
    )

}