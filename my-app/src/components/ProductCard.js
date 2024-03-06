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
    <div className="bg-white shadow-lg rounded-lg p-6 m-4">
      <h2 className="text-xl text-gray-500 font-bold">Product Type: {product.type}</h2>
      {/* <h2 className="text-xl text-gray-500 font-semibold">{product.name}</h2> */}
      <p className="text-gray-500">Product Name: {product.name}</p>
      <p className="text-gray-500">Product Description: {product.description}</p>
      <p className="text-gray-700">Unit Price: ₹{product.unitPrice}</p>
      <p className="text-gray-700">Quantity: {product.quantity}</p>
      <button className="btn btn-secondary" onClick={handleEdit}>
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
