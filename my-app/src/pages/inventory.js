
import React, { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import ProductModal from '@/components/ProductModal';

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


   const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.API_URL}api/inventory`);
      if (!response.ok) {
        throw new Error('Error fetching products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error.message);
    
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const updateProducts = () => {
    fetchProducts(); // Call fetchProducts function to update products
  };




  return (
    <div className="container min-h-screen mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Inventory Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onUpdate={updateProducts} />
        ))}
      </div>
      <button
        className="btn btn-primary fixed bottom-6 right-6"
        onClick={handleAddProduct}
      >
        Add New Product
      </button>
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        updateProducts={updateProducts}
      />
    </div>
  );
};

export default InventoryPage;
