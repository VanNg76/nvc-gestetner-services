import React, { useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import ApiManager from "../ApiManager";
import "./HomePage.css";


export const HomePage = () => {
    const [bw, addBW] = useState([])
    const [color, addColor] = useState([])
    const [wf, addWF] = useState([])
    const [consumable, addConsumable] = useState([])

    const history = useHistory()

    useEffect(
        () => {
            ApiManager.getBW()
                .then(pro => addBW(pro))
            ApiManager.getColor()
                .then(pro => addColor(pro))
            ApiManager.getWF()
                .then(pro => addWF(pro))
            ApiManager.getConsumable()
                .then(pro => addConsumable(pro))
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
                <button className="button--login" onClick={
                    () => {
                        history.push("/login")
                    }
                }>Login</button>
            }

            <h1>Welcome to NVC Gestetner Services</h1>
            <h2>Gestetner Multifunction Printers & Copiers</h2>
            <p>Our high-quality, multifunction printers and copiers offer many configurations to meet your needs. 
            Personalize your black & white or color copier with options in speed, paper size, finishing and features. 
            See our full line up and discover how our smart technology, superior image quality and document-sharing tools 
            can help increase business productivity.</p>
            <br></br>

            <h3>BLACK & WHITE PRINTERS</h3>
            <div className="pro-by-cat">
                {bw?.map(product => {
                    return (
                        <section key={`product--${product.id}`} className="products">
                            <img className="image" src={product.imageLink} alt="Images" />
                            <h5>{product.name}</h5>
                            <p>{product.description}</p>
                            <p>Price: <strong>{numberFormat(product.price)}</strong></p>
                        </section>
                    )
                })}
            </div>

            <h3 className="colorCat">COLOR PRINTERS</h3>
            <div className="pro-by-cat">
                {color?.map(product => {
                    return (
                        <section key={`product--${product.id}`} className="products">
                            <img className="image" src={product.imageLink} alt="Images" />
                            <h5 className="colorCat">{product.name}</h5>
                            <p>{product.description}</p>
                            <p>Price: <strong>{numberFormat(product.price)}</strong></p>
                        </section>
                    )
                })}       
            </div>

            <h3>WIDE FORMAT PRINTERS</h3> 
            <div className="pro-by-cat">
                {wf?.map(product => {
                    return (
                        <section key={`product--${product.id}`} className="products">
                            <img className="image" src={product.imageLink} alt="Images" />
                            <h5>{product.name}</h5>
                            <p>{product.description}</p>
                            <p>Price: <strong>{numberFormat(product.price)}</strong></p>
                        </section>
                    )
                })}
            </div>

            <h3>CONSUMABLES</h3>
            <div className="pro-by-cat">
                {consumable?.map(product => {
                    return (
                        <section key={`product--${product.id}`} className="products">
                            <img className="image" src={product.imageLink} alt="Images" />
                            <h5>{product.name}</h5>
                            <p>{product.description}</p>
                            <p>Price: <strong>{numberFormat(product.price)}</strong></p>
                        </section>
                    )
                })}
            </div>
            
        </>
    )
}