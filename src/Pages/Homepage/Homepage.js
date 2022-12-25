import React from 'react';
import About from '../../Components/About';
import ProductList from '../../Components/ProductList';
import Home from '../Home';

const Homepage = () => {
    return (
        <div>
            <Home></Home>
            <About></About>
            <ProductList></ProductList>
        </div>
    );
};

export default Homepage;