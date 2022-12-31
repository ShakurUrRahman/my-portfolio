import React from 'react';
import About from '../../Components/About';
import Contact from '../../Components/Contact';
import ProductList from '../../Components/ProductList';
import Home from '../Home';

const Homepage = () => {
    return (
        <div>
            <Home></Home>
            <About></About>
            <ProductList></ProductList>
            <Contact></Contact>
        </div>
    );
};

export default Homepage;