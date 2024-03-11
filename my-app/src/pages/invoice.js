import React, { useState } from 'react';
// import InvoicePDF from './InvoicePDF';
import dynamic from 'next/dynamic';
const InvoicePDF = dynamic(() => import('../components/InvoicePdf'));

export default function Invoice() {

  const [customerName, setCustomerName] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState();
  const [unitPrice, setUnitPrice] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState('Pending');

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    setQuantity(newQuantity);
    setTotalPrice(newQuantity * unitPrice);
  };

  const handleUnitPriceChange = (e) => {
    const newUnitPrice = parseInt(e.target.value);
    setUnitPrice(newUnitPrice);
    setTotalPrice(quantity * newUnitPrice);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.API_URL}api/invoices`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName,
          productName,
          quantity,
          unitPrice,
          totalPrice,
          paymentStatus,
        }),
      });
      if (!response.ok) {
        throw new Error('Error generating invoice');
      }
      const data = await response.json();
      console.log(data);
      // Handle success or display the generated invoice
    } catch (error) {
      console.error('Error generating invoice:', error);
      // Handle error
    }
  };

  return (
 <div className='bg-gradient-to-r from-cyan-500 to-cyan-700 min-h-screen pt-36'>
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg  ">
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Customer Name:</label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="input input-bordered"
        />
      </div>
      <div>
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name:</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="input input-bordered"
        />
      </div>
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={handleQuantityChange}
          className="input input-bordered"
        />
      </div>
      <div>
        <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700">Unit Price:</label>
        <input
          type="number"
          id="unitPrice"
          value={unitPrice}
          onChange={handleUnitPriceChange}
          className="input input-bordered"
        />
      </div>
      <div>
        <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700">Total Price:</label>
        <input
          type="number"
          id="totalPrice"
          value={totalPrice}
          readOnly
          className="input input-bordered"
        />
      </div>
      <div>
        <label htmlFor="paymentStatus" className="block text-sm font-medium text-gray-700">Payment Status:</label>
        <select
          id="paymentStatus"
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          className="select select-bordered"
        >
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      <button type="submit" className="btn bg-green-500 border-green-500 btn-secondary">Generate Invoice</button>
    </form>
    <InvoicePDF
        invoice={{
          customerName,
          productName,
          quantity,
          unitPrice,
          totalPrice,
          paymentStatus,
        }}
      />
  </div>
  </div>
  );
}
