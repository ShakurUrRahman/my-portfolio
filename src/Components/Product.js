import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Product.css'

const Product = ({ item }) => {
    const { img, link, id } = item;
    return (
        <div className="p">
            <div className="p-browser" style={{ display: "flex", justifyContent: "space-between", }}>
                <div className='p-browser'>
                    <div className="p-circle"></div>
                    <div className="p-circle"></div>
                    <div className="p-circle"></div>
                </div>
                <Link to={`/product/${id}`} className='see-details' style={{ textDecoration: "none", color: "#21325e" }}>See Details</Link>
            </div>
            <a href={link} target="_blank" rel="noreferrer">
                <img src={img} alt="" className="p-img" />
            </a>
        </div>
    );
};

export default Product;