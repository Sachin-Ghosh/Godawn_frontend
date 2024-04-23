
// import React, { useState, useEffect } from 'react';
// import Calendar from '../components/Calendar';
// import PieChart from '../components/PieChart';
// import LineGraph from '../components/LineGraph';
// import { useAuth } from '@/context/AuthContext';
// import { BiSolidReport } from "react-icons/bi";

// const ReportPage = () => {
//   const { authUser } = useAuth();
//   const [pieChartDate, setPieChartDate] = useState(new Date());
//   const [lineGraphDate, setLineGraphDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedOptionPie, setSelectedOptionPie] = useState('date'); // Default option is 'date' for pie chart
//   const [selectedOptionLine, setSelectedOptionLine] = useState('year'); // Default option is 'date' for line grapE
//   const [pieChartData, setPieChartData] = useState(null);
//   const [lineGraphData, setLineGraphData] = useState(null);
//   const isAdmin = authUser && authUser.role === 'Admin'; 

//   useEffect(() => {
//     if (isAdmin) {
//     fetchData();
//   }
//   }, [pieChartDate, lineGraphDate, selectedDate, selectedOptionPie, selectedOptionLine]);

//   const fetchPieChartData = async () => {
//     try {
//       const year = selectedDate.getFullYear();
//       let month, day;
//       switch (selectedOptionPie) {
//         case 'month':
//           month = selectedDate.getMonth() + 1;
//           break;
//         case 'date':
//           month = selectedDate.getMonth() + 1;
//           day = selectedDate.getDate();
//           break;
//         default:
//           break;
//       }
//       // Constructing the URL for totalProductsSold
//       let urlSold = `${process.env.API_URL}api/reports/totalProductsSold/${year}`;
//       if (selectedOptionPie === 'month' || selectedOptionPie === 'date') {
//         urlSold += `/${month}`;
//       }
//       if (selectedOptionPie === 'date' && day) {
//         urlSold += `/${day}`;
//       }
      
//       // Constructing the URL for totalProductsAdded
//       let urlAdded = `${process.env.API_URL}api/reports/totalProductsAdded/${year}`;
//       if (selectedOptionPie === 'month' || selectedOptionPie === 'date') {
//         urlAdded += `/${month}`;
//         if (day) {
//           urlAdded += `/${day}`;
//         }
//       }
//       console.log('Pie Chart Data URL - Sold:', urlSold);
//       console.log('Pie Chart Data URL - Added:', urlAdded);
  
//       const soldResponse = await fetch(urlSold);
//       const addedResponse = await fetch(urlAdded);
//       if (!soldResponse.ok || !addedResponse.ok) {
//         throw new Error('Failed to fetch data');
//       }
//       const soldData = await soldResponse.json();
//       const addedData = await addedResponse.json();
//       return {
//         totalProductsSold: soldData.totalProductsSold,
//         totalProductsAdded: addedData.totalProductsAdded
//       };
//     } catch (error) {
//       console.error('Error fetching pie chart data:', error);
//       throw error;
//     }
//   };
  
  

//   const fetchLineGraphData = async () => {
//     const lineGraphData = {};
//     try {
//       const year = selectedDate.getFullYear();
//       switch (selectedOptionLine) {
//         case 'month':
//           for (let month = 1; month <= 12; month++) {
//             // Log the URL before making the fetch request
//           const url = `${process.env.API_URL}api/reports/totalProductsSold/${year}/${month}`;
//           console.log('Line Graph Data URL:', url);
          
//           const soldResponse = await fetch(url);
//             const addedResponse = await fetch(`${process.env.API_URL}api/reports/totalProductsAdded/${year}/${month}`);
//             if (!soldResponse.ok || !addedResponse.ok) {
//               throw new Error(`Failed to fetch data for month ${month}`);
//             }
//             const soldData = await soldResponse.json();
//             const addedData = await addedResponse.json();
//             lineGraphData[month] = {
//               productsSold: soldData.totalProductsSold,
//               productsAdded: addedData.totalProductsAdded
//             };
//           }
//           break;
//         case 'year':
//           for (let month = 1; month <= 12; month++) {
//            // Log the URL before making the fetch request
//           const url = `${process.env.API_URL}api/reports/totalProductsSold/${year}/${month}`;
//           console.log('Line Graph Data URL:', url);
          
//           const soldResponse = await fetch(url);
//             const addedResponse = await fetch(`${process.env.API_URL}api/reports/totalProductsAdded/${year}/${month}`);
//             if (!soldResponse.ok || !addedResponse.ok) {
//               throw new Error(`Failed to fetch data for month ${month}`);
//             }
//             const soldData = await soldResponse.json();
//             const addedData = await addedResponse.json();
//             lineGraphData[month] = {
//               productsSold: soldData.totalProductsSold,
//               productsAdded: addedData.totalProductsAdded
//             };
//           }
//           break;
//         default:
//           break;
//       }
//       return lineGraphData;
//     } catch (error) {
//       console.error('Error fetching line graph data:', error);
//       throw error;
//     }
//   };

// const fetchData = async () => {
//     try {
//       const pieDataResponse = await fetchPieChartData();
//       console.log('Pie Data Response:', pieDataResponse); // Add this line
//       const lineGraphDataResponse = await fetchLineGraphData();
//       console.log('Line Graph Data Response:', lineGraphDataResponse); // Add this line
//       if (!pieDataResponse || !lineGraphDataResponse) {
//         throw new Error('Failed to fetch data for one or more charts');
//       }
//       setPieChartData(pieDataResponse);
//       setLineGraphData(lineGraphDataResponse);
//     } catch (error) {
//       console.error('Error fetching report data:', error);
//       // Handle errors here
//       setPieChartData(null);
//       setLineGraphData(null);
//     }
//   };
  
  
//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };
  
//   const handleOptionChangePie = (option) => {
//     setSelectedOptionPie(option);
//   };

//   const handleOptionChangeLine = (option) => {
//     setSelectedOptionLine(option);
//   };
//   return (
//     <div className='bg-gradient-to-r from-cyan-900 to-cyan-950 min-h-screen mx-auto px-4 py-8 select-none '>
//       <div className='flex justify-between pt-2 bg-white bg-opacity-25 mb-3 rounded-xl mt-11'>
//       <h1 className=' text-bold shadow-2xl bg-cyan-50 bg-opacity-65 rounded-lg  pt-4 mt-4 ml-4 pb-5 pr-5 pl-5 text-3xl  text-neutral font-semibold mb-6 flex align-middle gap-3'>  <BiSolidReport size={45} />Report Page</h1>
//       </div>
//       {isAdmin ? (
//         <div className=' mt-16 bg-gradient-to-r from-cyan-900 to-cyan-950'>

//       <div style={{ display: "flex" }}>
//         <div  className='bg-white shadow-2xl w-96 rounded-lg p-4 m-3'style={{ flex: 1 }}>
//           <select
//            className=' text-black'
//             value={selectedOptionPie}
//             onChange={(e) => handleOptionChangePie(e.target.value)}
//           >
//             <option value="date">Date</option>
//             <option value="month">Month</option>
//             <option value="year">Year</option>
//           </select>
//           <Calendar
//             selectedDate={selectedDate}
//             handleDateChange={handleDateChange}
//           />
//         </div>
//         {/* Similar dropdown and calendar for line graph */}
//         <div className='bg-white shadow-2xl w-96 rounded-lg p-4 m-3' style={{ flex: 1 }}>
//           <select
//             value={selectedOptionLine}
//             onChange={(e) => handleOptionChangeLine(e.target.value)}
//             className=' text-black'
//           >
//             <option value="date">Date</option>
//             <option value="month">Month</option>
//             <option value="year">Year</option>
//           </select>
//           <Calendar
//             selectedDate={selectedDate}
//             handleDateChange={handleDateChange}
//           />
//         </div>
//       </div>
//       <div style={{ display: "flex" }}>
//         <div style={{ flex: 1 }}>
//           {pieChartData !== null ? (
//             <PieChart pieData={pieChartData} />
//           ) : (
//             <div>No data available for pie chart</div>
//           )}
//         </div>
//         <div style={{ flex: 1 }}>
//           {lineGraphData !== null ? (
//             <LineGraph lineGraphData={lineGraphData} />
//           ) : (
//             <div>No data available for line graph</div>
//           )}
//         </div>
//       </div>
//       </div>
//        ) : (
//         <div>
//           <p>You do not have permission to access this page.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReportPage;


import React, { useState, useEffect } from 'react';
import Calendar from '../components/Calendar';
import PieChart from '../components/PieChart';
import LineGraph from '../components/LineGraph';
import { useAuth } from '@/context/AuthContext';
import { BiSolidReport } from "react-icons/bi";

const ReportPage = () => {
  const { authUser } = useAuth();
  const [pieChartDate, setPieChartDate] = useState(new Date());
  const [lineGraphDate, setLineGraphDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedOptionPie, setSelectedOptionPie] = useState('date'); // Default option is 'date' for pie chart
  const [selectedOptionLine, setSelectedOptionLine] = useState('year'); // Default option is 'date' for line grapE
  const [pieChartData, setPieChartData] = useState(null);
  const [lineGraphData, setLineGraphData] = useState(null);
  const isAdmin = authUser && authUser.role === 'Admin'; 

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [pieChartDate, lineGraphDate, selectedDate, selectedOptionPie, selectedOptionLine]);

  const fetchPieChartData = async () => {
    try {
      const year = selectedDate.getFullYear();
      let month, day;
      switch (selectedOptionPie) {
        case 'month':
          month = selectedDate.getMonth() + 1;
          break;
        case 'date':
          month = selectedDate.getMonth() + 1;
          day = selectedDate.getDate();
          break;
        default:
          break;
      }
      // Constructing the URL for totalProductsSold
      let urlSold = `${process.env.API_URL}api/reports/totalProductsSold/${year}`;
      if (selectedOptionPie === 'month' || selectedOptionPie === 'date') {
        urlSold += `/${month}`;
      }
      if (selectedOptionPie === 'date' && day) {
        urlSold += `/${day}`;
      }
      
      // Constructing the URL for totalProductsAdded
      let urlAdded = `${process.env.API_URL}api/reports/totalProductsAdded/${year}`;
      if (selectedOptionPie === 'month' || selectedOptionPie === 'date') {
        urlAdded += `/${month}`;
        if (day) {
          urlAdded += `/${day}`;
        }
      }
      console.log('Pie Chart Data URL - Sold:', urlSold);
      console.log('Pie Chart Data URL - Added:', urlAdded);
  
      const [soldResponse, addedResponse] = await Promise.all([fetch(urlSold), fetch(urlAdded)]);
      if (!soldResponse.ok || !addedResponse.ok) {
        throw new Error('Failed to fetch data');
      }
      const [soldData, addedData] = await Promise.all([soldResponse.json(), addedResponse.json()]);
      return {
        totalProductsSold: soldData.totalProductsSold,
        totalProductsAdded: addedData.totalProductsAdded
      };
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
      throw error;
    }
  };

  const fetchLineGraphData = async () => {
    const lineGraphData = {};
    try {
      const year = selectedDate.getFullYear();
      switch (selectedOptionLine) {
        case 'month':
          const promisesMonth = [];
          for (let month = 1; month <= 12; month++) {
            const url = `${process.env.API_URL}api/reports/totalProductsSold/${year}/${month}`;
            console.log('Line Graph Data URL:', url);
            promisesMonth.push(fetch(url));
            promisesMonth.push(fetch(`${process.env.API_URL}api/reports/totalProductsAdded/${year}/${month}`));
          }
          const responsesMonth = await Promise.all(promisesMonth);
          for (let month = 1; month <= 12; month++) {
            const [soldResponse, addedResponse] = await Promise.all([responsesMonth.shift(), responsesMonth.shift()]);
            if (!soldResponse.ok || !addedResponse.ok) {
              throw new Error(`Failed to fetch data for month ${month}`);
            }
            const [soldData, addedData] = await Promise.all([soldResponse.json(), addedResponse.json()]);
            lineGraphData[month] = {
              productsSold: soldData.totalProductsSold,
              productsAdded: addedData.totalProductsAdded
            };
          }
          break;
        case 'year':
          const promisesYear = [];
          for (let month = 1; month <= 12; month++) {
            const url = `${process.env.API_URL}api/reports/totalProductsSold/${year}/${month}`;
            console.log('Line Graph Data URL:', url);
            promisesYear.push(fetch(url));
            promisesYear.push(fetch(`${process.env.API_URL}api/reports/totalProductsAdded/${year}/${month}`));
          }
          const responsesYear = await Promise.all(promisesYear);
          for (let month = 1; month <= 12; month++) {
            const [soldResponse, addedResponse] = await Promise.all([responsesYear.shift(), responsesYear.shift()]);
            if (!soldResponse.ok || !addedResponse.ok) {
              throw new Error(`Failed to fetch data for month ${month}`);
            }
            const [soldData, addedData] = await Promise.all([soldResponse.json(), addedResponse.json()]);
            lineGraphData[month] = {
              productsSold: soldData.totalProductsSold,
              productsAdded: addedData.totalProductsAdded
            };
          }
          break;
        default:
          break;
      }
      return lineGraphData;
    } catch (error) {
      console.error('Error fetching line graph data:', error);
      throw error;
    }
  };

  const fetchData = async () => {
    try {
      const [pieDataResponse, lineGraphDataResponse] = await Promise.all([fetchPieChartData(), fetchLineGraphData()]);
      console.log('Pie Data Response:', pieDataResponse); // Add this line
      console.log('Line Graph Data Response:', lineGraphDataResponse); // Add this line
      if (!pieDataResponse || !lineGraphDataResponse) {
        throw new Error('Failed to fetch data for one or more charts');
      }
      setPieChartData(pieDataResponse);
      setLineGraphData(lineGraphDataResponse);
    } catch (error) {
      console.error('Error fetching report data:', error);
      // Handle errors here
      setPieChartData(null);
      setLineGraphData(null);
    }
  };
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  
  const handleOptionChangePie = (option) => {
    setSelectedOptionPie(option);
  };

  const handleOptionChangeLine = (option) => {
    setSelectedOptionLine(option);
  };
  return (
    <div className='bg-gradient-to-r from-cyan-900 to-cyan-950 min-h-screen mx-auto px-4 py-8 select-none '>
      <div className='flex justify-between pt-2 bg-white bg-opacity-25 mb-3 rounded-xl mt-11'>
        <h1 className=' text-bold shadow-2xl bg-cyan-50 bg-opacity-65 rounded-lg  pt-4 mt-4 ml-4 pb-5 pr-5 pl-5 text-3xl  text-neutral font-semibold mb-6 flex align-middle gap-3'>  <BiSolidReport size={45} />Report Page</h1>
      </div>
      {isAdmin ? (
        <div className=' mt-16 bg-gradient-to-r from-cyan-900 to-cyan-950'>
          <div style={{ display: "flex" }}>
            <div className='bg-white shadow-2xl w-96 rounded-lg p-4 m-3' style={{ flex: 1 }}>
              <select
                className=' text-black'
                value={selectedOptionPie}
                onChange={(e) => handleOptionChangePie(e.target.value)}
              >
                <option value="date">Date</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
              <Calendar
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
              />
            </div>
            {/* Similar dropdown and calendar for line graph */}
            <div className='bg-white shadow-2xl w-96 rounded-lg p-4 m-3' style={{ flex: 1 }}>
              <select
                value={selectedOptionLine}
                onChange={(e) => handleOptionChangeLine(e.target.value)}
                className=' text-black'
              >
                <option value="date">Date</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
              <Calendar
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
              />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              {pieChartData !== null ? (
                <PieChart pieData={pieChartData} />
              ) : (
                <div>No data available for pie chart</div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              {lineGraphData !== null ? (
                <LineGraph lineGraphData={lineGraphData} />
              ) : (
                <div>No data available for line graph</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>You do not have permission to access this page.</p>
        </div>
      )}
    </div>
  );
};

export default ReportPage;
