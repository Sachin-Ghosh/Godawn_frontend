

import React, { useState, useEffect } from 'react';

const SalesCard = ({ sale }) => {
    const { products, buyerName, soldQuantity } = sale;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                if (sale.products) {
                // const productId = product._id;
                // const productId = sale.productId._id.toString()
                const products = sale.products.toString(); // Optional chaining
                console.log("Products:", products);

                const response = await fetch(`${process.env.API_URL}api/inventory/${products}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                const data = await response.json();
                console.log(data);
                setProduct(data);
                setLoading(false);
            }
            } catch (error) {
                // console.error(error);
                console.error("Fetch Product Data Error:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProductData();
    }, [sale.products]);

    if (loading) {
        return <p>Loading product data...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!product) {
        return <p>Product data not found...</p>;
    }

    const unitPrice = parseFloat(product.products.unitPrice);
// const quantity = parseFloat(soldQuantity);

    // console.log('Product:', product);
    // console.log('Sold Quantity:', soldQuantity);

    // // Calculate total price
    const totalPrice = unitPrice * soldQuantity;
    // console.log('Total Price:', totalPrice);

//     console.log('Unit Price:', unitPrice);
// console.log('Quantity:', quantity);

// const totalPrice = unitPrice * quantity;
// console.log('Total Price:', totalPrice);

    return (
    <div className="bg-white shadow-2xl w-full rounded-lg p-4 m-3">
        <h2 className="text-xl text-white bg-slate-500 rounded-xl pl-3 mb-3 shadow-2xl pb-2 pt-2 font-bold">Product Type: {product.products.type}</h2>
        <div className='bg-slate-500 rounded-xl p-3 shadow-2xl'>
            <p>Buyer: {buyerName}</p>
            <p>Name: {product.products.name}</p>
            <p>Type: {product.products.type}</p>
            <p>Unit Price: {product.products.unitPrice}</p>
            <p>Quantity: {soldQuantity}</p>
            <p>Total Price: {totalPrice}</p>
            </div>  
      </div>
    );
};

export default SalesCard;

