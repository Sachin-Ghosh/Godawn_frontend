// // components/LineGraph.js
// import React from 'react';
// // import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
// import { Line } from 'react-chartjs-2';

// // ChartJS.register(ArcElement, Tooltip, Legend);

// const LineGraph = ({ data }) => {
//   const chartData = {
//     labels: data.labels,
//     datasets: [
//       {
//         label: 'Products Added',
//         fill: false,
//         lineTension: 0.1,
//         backgroundColor: 'rgba(75,192,192,0.4)',
//         borderColor: 'rgba(75,192,192,1)',
//         borderCapStyle: 'butt',
//         borderDash: [],
//         borderDashOffset: 0.0,
//         borderJoinStyle: 'miter',
//         pointBorderColor: 'rgba(75,192,192,1)',
//         pointBackgroundColor: '#fff',
//         pointBorderWidth: 1,
//         pointHoverRadius: 5,
//         pointHoverBackgroundColor: 'rgba(75,192,192,1)',
//         pointHoverBorderColor: 'rgba(220,220,220,1)',
//         pointHoverBorderWidth: 2,
//         pointRadius: 1,
//         pointHitRadius: 10,
//         data: data.productsAdded
//       },
//       {
//         label: 'Products Sold',
//         fill: false,
//         lineTension: 0.1,
//         backgroundColor: 'rgba(255,99,132,0.4)',
//         borderColor: 'rgba(255,99,132,1)',
//         borderCapStyle: 'butt',
//         borderDash: [],
//         borderDashOffset: 0.0,
//         borderJoinStyle: 'miter',
//         pointBorderColor: 'rgba(255,99,132,1)',
//         pointBackgroundColor: '#fff',
//         pointBorderWidth: 1,
//         pointHoverRadius: 5,
//         pointHoverBackgroundColor: 'rgba(255,99,132,1)',
//         pointHoverBorderColor: 'rgba(220,220,220,1)',
//         pointHoverBorderWidth: 2,
//         pointRadius: 1,
//         pointHitRadius: 10,
//         data: data.productsSold
//       }
//     ]
//   };

//   return (
//     <div>
//       <h2>Line Graph</h2>
//       <Line data={chartData} />
//     </div>
//   );
// };

// export default LineGraph;

// components/LineGraph.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const LineGraph = ({ data }) => {
  if (!data || !data.productsAdded || !data.productsSold) {
    // Handle the case when data is undefined or missing required properties
    return <div>No data available</div>;
  }

  const chartData = {
    labels: ['Products Added', 'Products Sold'],
    // labels: data.labels,
    datasets: [
      {
        label: 'Products Added',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [data.productsAdded],
      },
      {
        label: 'Products Sold',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(255,99,132,0.4)',
        borderColor: 'rgba(255,99,132,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255,99,132,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255,99,132,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [data.productsSold]
      }
    ]
  };

  return (
    <div style={{ width: '600px', height: '600px' }}>
      <h2>Line Graph</h2>
      <Line data={chartData} />
    </div>
  );
};

export default LineGraph;
