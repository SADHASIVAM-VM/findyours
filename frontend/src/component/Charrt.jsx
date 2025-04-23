import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const Charrt = ({userDataCount, reportDataCount}) => {
  // Mock data for Users and Reports over 6 months
  var userData=[];
  for(let i =1; i<=userDataCount; i+=5){
    userData.push(i)
  }
  var reportData =[];
  for(let i=1; i<=reportDataCount; i++){
    reportData.push(i)
  }
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // Months
    datasets: [
        
      {
        label: "New Users",
        data: userData, // Number of users per month
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235)",
        tension: 1, // Curve effect
        fill: true,
      },
      {
        label: "Reports",
        data: reportData, // Number of reports per month
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 1,

        fill: true,
      },
    ],
  };

  // Chart Options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(0,0,0,0.7)",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Count",
          font: {
            size: 14,
          },
        },
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default Charrt;
