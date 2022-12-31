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
                    Lama is a creative portfolio that your work has been waiting for.
                    Beautiful homes, stunning portfolio styles & a whole lot more awaits
                    inside.
                </p>
            </div>
            <div className="pl-list">
                {products.map((item) => (
                    <Product
                        key={item.id}
                        item={item}
                    />
                ))}
            </div>
            <Button style={{ marginTop: "20px", backgroundColor: "#21325e" }} variant="contained"><Link style={{ textDecoration: "none", color: "white", padding: "10px" }} to="/projects">All Projects</Link></Button>
        </div>
    );
};

export default ProductList;