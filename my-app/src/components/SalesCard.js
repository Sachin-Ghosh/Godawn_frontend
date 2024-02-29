// // SalesCard.js
// import React from 'react';

// const SalesCard = ({ sale }) => {
//   return (
//     <div className="p-4 border rounded-md shadow-md">
//       <p>Buyer: {sale.buyerName}</p>
//       <p>Product ID: {sale.productId}</p>
//       <p>Type: {sale.type}</p>
//       <p>Unit Price: {sale.unitPrice}</p>
//       <p>Total Price: {sale.totalPrice}</p>
//       {/* Add more details as needed */}
//     </div>
//   );
// };

// export default SalesCard;
// import React from 'react';

// const SalesCard = ({ sale }) => {
//     console.log('Sale:', sale);
// //   console.log('Product:', product);
// const { productId, buyerName } = sale;
//   const { name, type, unitPrice, quantity } = productId || {};

//    // Calculate total price
//    const totalPrice = unitPrice * quantity;

//   // Check if product is defined before accessing its properties
// //   if (!product) {
// //     return <p>Error: Product data is missing</p>;
// //   }

//   return (
//     <div className="p-4 border rounded-md shadow-md">
//       <p>Buyer: {buyerName}</p>
//       {/* Check if product.productId exists before accessing it */}
//       {/* {product.productId && <p>Product ID: {product.productId}</p>} */}
//       {/* <p>Product ID: {productId && productId._id}</p>
//       <p>Name: {name}</p>
//       <p>Type: {type}</p>
//       <p>Unit Price: {unitPrice}</p>
//     <p>Quantity: {quantity}</p>
//       <p>Total Price: {totalPrice}</p> */}
//       {/* Add more details as needed */}

//       {productId && (
//         <>
//           <p>Product ID: {productId && productId._id}</p>
//           <p>Name: {name}</p>
//           <p>Type: {type}</p>
//           <p>Unit Price: {unitPrice}</p>
//           <p>Quantity: {quantity || 0}</p> {/* Display 0 if quantity is null */}
//           {/* <p>Total Price: {totalPrice}</p> */}
//           <p>Total Price: {totalPrice || unitPrice * quantity}</p>
//           {/* Additional details */}
//           {/* <p>Description: {description}</p> */}
//         </>
//       )}
//     </div>
//   );
// };

// export default SalesCard;

import React, { useState, useEffect } from 'react';

const SalesCard = ({ sale }) => {
    const { buyerName, soldQuantity } = sale;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                if (sale.productId) {
                // const productId = product._id;
                const productId = sale.productId._id.toString()
                const response = await fetch(`${process.env.API_URL}api/inventory/${productId}`);
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
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProductData();
    }, [sale.productId]);

    if (loading) {
        return <p>Loading product data...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!product) {
        return <p>Loading product data...</p>;
    }

    const unitPrice = parseFloat(product.productId.unitPrice);
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
        <div className="p-4 border rounded-md shadow-md">
            <p>Buyer: {buyerName}</p>
            {/* <p>Product ID: {product._id}</p> */}
            <p>Name: {product.productId.name}</p>
            <p>Type: {product.productId.type}</p>
            <p>Unit Price: {product.productId.unitPrice}</p>
            <p>Quantity: {soldQuantity}</p>
            <p>Total Price: {totalPrice}</p>

            
        </div>
    );
};

export default SalesCard;

