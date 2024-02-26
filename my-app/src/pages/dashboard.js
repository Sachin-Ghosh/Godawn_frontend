// import React, { useState } from 'react';
// import Link from 'next/link'; // Import Link from next.js for navigation

// const Dashboard = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status

//   // Function to handle user logout
//   const handleLogout = () => {
//     // Implement logout logic here
//     setIsLoggedIn(false); // Update login status
//   };

//   return (
//     <div className="container mx-auto px-8 py-16">
//       <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between">
//         <div className="max-w-lg">
//           <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-center lg:text-left mb-8">
//             Work, Achieve, Faster
//           </h1>
//           <p className="text-lg lg:text-xl font-semibold text-center lg:text-left mb-12">
//             Godown makes the inventory more precise and comfortable for customers.
//           </p>
//           <div className="flex justify-center lg:justify-start">
//             {isLoggedIn ? (
//               <button
//                 onClick={handleLogout}
//                 className="bg-black text-white py-3 px-8 rounded-full text-xl font-semibold shadow-md hover:bg-gray-800 transition duration-300 ease-in-out"
//               >
//                 Logout
//               </button>
//             ) : (
//               <Link href="/login">
                
//                   Login
                
//               </Link>
//             )}
//           </div>
//         </div>
//         <div className="max-w-lg lg:w-2/3 lg:pl-16">
//           <img
//             className="w-full rounded-xl shadow-lg"
//             src="/screenshot-20240206-132036removebgpreview-1@2x.png"
//             alt="Warehouse Inventory Management System"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState } from 'react';
import Link from 'next/link'; // Import Link from next.js for navigation

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status

  // Function to handle user logout
  const handleLogout = () => {
    // Implement logout logic here
    setIsLoggedIn(false); // Update login status
  };

  // Sample data for inventory overview
  const inventoryOverview = {
    totalProducts: 1200,
    totalCategories: 25,
    totalLocations: 10,
  };

  // Sample data for recent activities
  const recentActivities = [
    {
      id: 1,
      action: 'Added new product',
      timestamp: '2024-02-25T12:00:00Z',
    },
    {
      id: 2,
      action: 'Updated inventory quantity',
      timestamp: '2024-02-24T09:30:00Z',
    },
    {
      id: 3,
      action: 'Generated inventory report',
      timestamp: '2024-02-23T15:45:00Z',
    },
  ];

  return (
    <div className="container min-h-screen mx-auto px-8 py-16">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Warehouse Dashboard</h1>
        {isLoggedIn && (
          <button onClick={handleLogout} className="text-gray-600 hover:text-red-500">
            Logout
          </button>
        )}
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Inventory Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-semibold text-gray-800">Total Products</h3>
              <p className="text-2xl font-bold text-blue-600">{inventoryOverview.totalProducts}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-semibold text-gray-800">Total Categories</h3>
              <p className="text-2xl font-bold text-blue-600">{inventoryOverview.totalCategories}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-lg font-semibold text-gray-800">Total Locations</h3>
              <p className="text-2xl font-bold text-blue-600">{inventoryOverview.totalLocations}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
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