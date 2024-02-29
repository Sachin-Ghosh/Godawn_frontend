
// import React, { useState } from 'react';
// import Link from 'next/link'; // Import Link from next.js for navigation

// const Dashboard = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status

//   // Function to handle user logout
//   const handleLogout = () => {
//     // Implement logout logic here
//     setIsLoggedIn(false); // Update login status
//   };

//   // Sample data for inventory overview
  // const inventoryOverview = {
  //   totalProducts: 1200,
  //   totalCategories: 25,
  //   totalLocations: 10,
  // };

  // // Sample data for recent activities
  // const recentActivities = [
  //   {
  //     id: 1,
  //     action: 'Added new product',
  //     timestamp: '2024-02-25T12:00:00Z',
  //   },
  //   {
  //     id: 2,
  //     action: 'Updated inventory quantity',
  //     timestamp: '2024-02-24T09:30:00Z',
  //   },
  //   {
  //     id: 3,
  //     action: 'Generated inventory report',
  //     timestamp: '2024-02-23T15:45:00Z',
  //   },
  // ];

//   return (
//     <div className="container min-h-screen mx-auto px-8 py-16">
//       <header className="flex items-center justify-between mb-8">
//         <h1 className="text-3xl font-bold ">Warehouse Dashboard</h1>
//         {isLoggedIn && (
//           <button onClick={handleLogout} className="text-gray-600 hover:text-red-500">
//             Logout
//           </button>
//         )}
//       </header>
//       <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Inventory Overview</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="bg-gray-100 p-4 rounded-md">
//               <h3 className="text-lg font-semibold text-gray-800">Total Products</h3>
//               <p className="text-2xl font-bold text-blue-600">{inventoryOverview.totalProducts}</p>
//             </div>
//             <div className="bg-gray-100 p-4 rounded-md">
//               <h3 className="text-lg font-semibold text-gray-800">Total Categories</h3>
//               <p className="text-2xl font-bold text-blue-600">{inventoryOverview.totalCategories}</p>
//             </div>
//             <div className="bg-gray-100 p-4 rounded-md">
//               <h3 className="text-lg font-semibold text-gray-800">Total Locations</h3>
//               <p className="text-2xl font-bold text-blue-600">{inventoryOverview.totalLocations}</p>
//             </div>
//           </div>
//         </div>
        // <div className="bg-white p-6 rounded-lg shadow-md">
        //   <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        //   <ul className="divide-y divide-gray-200">
        //     {recentActivities.map(activity => (
        //       <li key={activity.id} className="py-2">
        //         <p className="text-sm text-gray-600">{activity.action}</p>
        //         <p className="text-xs text-gray-400">{new Date(activity.timestamp).toLocaleString()}</p>
        //       </li>
        //     ))}
        //   </ul>
        // </div>
//       </section>
      
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link from next.js for navigation
import { getCookie } from "../utils/myCookie";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
// import { router  } from "next/dist/client/router";

const Dashboard = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status
  const [ProductData, setProductData] = useState(0); // State for total quantities
  const [totalSales, setTotalSales] = useState(0); // State for total sales
  // const [recentActivities, setRecentActivities] = useState([]);


  const inventoryOverview = {
    totalProducts: 37,
  };

    // Sample data for recent activities
    const recentActivities = [
      {
        id: 1,
        action: 'Added new product',
        timestamp: '2024-03-01T12:00:00Z',
      },
      {
        id: 2,
        action: 'Updated inventory quantity',
        timestamp: '2024-03-01T09:30:00Z',
      },
      {
        id: 3,
        action: 'Generated invoice',
        timestamp: '2024-03-01T15:45:00Z',
      },
    ];

  // // Function to handle user logout
  // const handleLogout = () => {
  //   // Implement logout logic here
  //   setIsLoggedIn(false); // Update login status
  // };
  // useEffect(() => {
  //   fetchRecentActivities();
  // }, []);

  // const fetchRecentActivities = async () => {
  //   try {
  //     const response = await fetch(`${process.env.API_URL}api/inventory/recent-activities`); // Assuming the endpoint for recent activities is /api/products/recent-activities
  //     const data = await response.json();
  //     setRecentActivities(data.recentActivities);
  //   } catch (error) {
  //     console.error('Error fetching recent activities:', error);
  //   }
  // };


  React.useEffect(() => {
    // console.log("token", token);
    const token = getCookie("token");

    if (!token) {
      router.push("/login");
    }
  }, []);

  // Fetch total quantities from the backend
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}api/inventory`);
        if (!response.ok) {
          throw new Error('Failed to fetch total quantities');
        }
        // const data = await response.json();
        // setProductData(data.ProductData);
        const { totalCount } = await response.json();
        setProductData(totalCount);
      } catch (error) {
        console.error('Error fetching total quantities:', error);
      }
    };

    fetchProductData();
  }, []);

  // Fetch total sales from the backend
  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        const response = await fetch(`${process.env.API_URL}api/sales`);
        if (!response.ok) {
          throw new Error('Failed to fetch total sales');
        }
        // const data = await response.json();
        // Calculate total sales
        // const total = data.reduce((acc, sale) => acc + sale.soldQuantity, 0);
        const { totalCount } = await response.json();
        setTotalSales(totalCount);
      } catch (error) {
        console.error('Error fetching total sales:', error);
      }
    };

    fetchTotalSales();
  }, []);

  return (
    <div className="container min-h-screen mx-auto px-8 py-16">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold ">Warehouse Dashboard</h1>
        {/* {isLoggedIn && (
          <button onClick={handleLogout} className="text-gray-600 hover:text-red-500">
            Logout
          </button>
        )} */}
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Inventory Overview</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-800">Total Products</h3>
            <p className="text-2xl font-bold text-blue-600">{ProductData}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Sales Data</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <h3 className="text-lg font-semibold text-gray-800">Total Sales</h3>
            <p className="text-2xl font-bold text-blue-600">{totalSales}</p>
          </div>
        </div> */}
      <div className="bg-white p-6 rounded-lg shadow-md">
           <h2 className="text-xl font-semibold mb-4 text-gray-800">Inventory Overview</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="bg-gray-100 p-4 rounded-md">
               <h3 className="text-lg font-semibold text-gray-800">Total Products</h3>
               {/* <p className="text-2xl font-bold text-blue-600">{ProductData}</p>
                */}
                <p className="text-2xl font-bold text-blue-600">{inventoryOverview.totalProducts}</p>
             </div>
             <div className="bg-gray-100 p-4 rounded-md">
               <h3 className="text-lg font-semibold text-gray-800">Total Sales</h3>
               <p className="text-2xl font-bold text-blue-600">{totalSales}</p>
             </div>
             {/* <div className="bg-gray-100 p-4 rounded-md">
               <h3 className="text-lg font-semibold text-gray-800">Total Locations</h3>
               <p className="text-2xl font-bold text-blue-600">{inventoryOverview.totalLocations}</p>
             </div> */}
           </div>
         </div>  
         <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activities</h2>
          <ul className="divide-y divide-gray-200">
            {recentActivities.map(activity => (
              <li key={activity.id} className="py-2">
                <p className="text-sm text-gray-600">{activity.action}</p>
                <p className="text-xs text-gray-400">{new Date(activity.timestamp).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
           </section>
    </div>
  );
};

export default Dashboard;
