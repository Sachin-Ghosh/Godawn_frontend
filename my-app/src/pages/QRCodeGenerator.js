
import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { IoQrCodeOutline } from "react-icons/io5";

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

    // Prepare data for QR code generation
    const data = `Type: ${formData.type}\nName: ${formData.name}\nDescription: ${formData.description}\nUnit Price: ${formData.unitPrice}\nQuantity: ${formData.quantity}`;

    try {
        // Fetch the QR code image data from the backend
        const response = await fetch(`${process.env.API_URL}api/QRCode/generateQRCode`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data, fileName: formData.name }), // Send data and filename
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
      const response = await fetch(`${process.env.API_URL}api/QRCode/downloadQRCode/${formData.name}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'image/png',
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
      link.download = `${formData.name}.png`; // Set the filename for the downloaded file
  
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
    <div className="  min-h-screen mx-auto px-4 py-8 select-none  bg-gradient-to-r from-cyan-900 to-cyan-950">
     <div className='flex justify-between pt-2 bg-white bg-opacity-25 mb-3 rounded-xl mt-11'>
      <h1 className=' text-bold shadow-2xl bg-cyan-50 bg-opacity-65 rounded-lg  pt-4 mt-4 ml-4 pb-5 pr-5 pl-5 text-3xl  text-neutral font-semibold mb-6 flex align-middle gap-3'> <IoQrCodeOutline  size={45}/> QRCodeGenerator</h1>
      </div>
      <div className='flex align-middle mt-10 gap-40 ml-32'>
      <form onSubmit={handleGenerateQRCode} className='bg-white px-14  py-14'>
        <div className="mb-4 ">
          <label className="block text-gray-700">Product Type:</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="form-input  text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Product Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Product Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-textarea  text-gray-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Unit Price:</label>
          <input
            type="number"
            name="unitPrice"
            value={formData.unitPrice}
            onChange={handleChange}
            className="form-input text-gray-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="form-input text-gray-500"
          />
        </div>
        <button type="submit" className="btn btn-primary">Generate QR Code</button>
      </form>
      <div className=" bg-white px-3 py-3 w-auto h-96">
        <QRCode value={JSON.stringify(formData)} />
        <button className="btn btn-primary mt-4" onClick={handleDownload}>Download QR Code</button>
      </div>
      </div>
    </div>
  );
};

export default QRCodeGeneratorPage;
