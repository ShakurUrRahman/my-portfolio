import React from 'react';
import { products } from '../data';
import Product from './Product';
import '../Styles/ProductList.css'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductList = () => {
    return (
        <div className="pl">
            <div className="pl-texts">
                <h1 className="pl-title">My Projects</h1>
                <p className="pl-desc">
                    Here I am introducing you with my various significant projects where I implemented many kinds of tech and framework.
                </p>
            </div>
            <div className="pl-list">
                {products.map((item, idx) => (
                    <Product
                        key={item.id}
                        item={item}
                        id={idx}
                    />
                ))}
            </div>
            <Button style={{ marginTop: "20px", backgroundColor: "#21325e" }} variant="contained"><Link style={{ textDecoration: "none", color: "white", padding: "10px" }} to="/projects">All Projects</Link></Button>
        </div>
    );
};

export default ProductList;