import React, { useState } from 'react';
import QRCode from 'react-qr-code';

const QRCodeGeneratorPage = () => {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    description: '',
    unitPrice: '',
    quantity: ''
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

const handleGenerateQRCode = async (e) => {
    e.preventDefault();
  
    
    try {
     
      const response = await fetch(`${process.env.API_URL}api/generateQRCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Error generating QR code');
      }
  
      // Convert the response to a blob
      const blob = await response.blob();
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
  
      // Open the URL in a new window for the user to download
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error generating QR code:', error);
      // Handle error - show an alert or notification to the user
    }
  };
  
  const handleDownload = async () => {
    // Logic to download the QR code as an image
    try {
      // Fetch the QR code image data from the backend
      const response = await fetch(`${process.env.API_URL}api/downloadQRCode`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Error downloading QR code');
      }
  
      // Convert the response to a blob
      const blob = await response.blob();
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
  
      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qr-code.png'; // Set the filename for the downloaded file
  
      // Append the anchor element to the body
      document.body.appendChild(link);
  
      // Click the link to trigger the download
      link.click();
  
      // Remove the anchor element from the body
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading QR code:', error);
      // Handle error - show an alert or notification to the user
    }
  };
  



  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">QR Code Generator</h1>
      <form onSubmit={handleGenerateQRCode}>
        <div className="mb-4">
          <label className="block text-gray-700">Product Type:</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="form-input w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Product Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Product Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-textarea w-full"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Unit Price:</label>
          <input
            type="number"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleChange}
            className="form-input w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="form-input w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary">Generate QR Code</button>
      </form>
      <div className="mt-8">
        <QRCode value={JSON.stringify(formData)} />
        <button className="btn btn-primary mt-4" onClick={handleDownload}>Download QR Code</button>
      </div>
    </div>
  );
};

export default QRCodeGeneratorPage;
