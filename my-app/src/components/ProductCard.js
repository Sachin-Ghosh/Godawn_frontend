// components/ProductCard.js
import React from 'react';
import { useState } from 'react';
import ProductModal from './ProductModal';



const ProductCard = ({ product,onUpdate }) => {

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [error, setError] = useState(null);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="bg-white shadow-2xl w-96 rounded-lg p-4 m-3">
      <h2 className="text-xl text-white bg-slate-500 rounded-xl pl-3 mb-3 shadow-2xl pb-2 pt-2 font-bold">Product Type: {product.type}</h2>
      {/* <h2 className="text-xl text-gray-500 font-semibold">{product.name}</h2> */}
      <div className='bg-slate-500 rounded-xl p-3 shadow-2xl'>
      <p className="text-white ">Product Name: {product.name}</p>
      <p className="text-white">Product Description: {product.description}</p>
      <p className="text-white">Unit Price: ₹{product.unitPrice}</p>
      <p className="text-white">Quantity: {product.quantity}</p>
      </div>
      <button className=" btn  bg-green-500 text-black border-green-500 mt-3 btn-secondary shadow-2xl" onClick={handleEdit}>
        Edit
      </button>
      <ProductModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        product={product}
        onUpdate={onUpdate}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ProductCard;
