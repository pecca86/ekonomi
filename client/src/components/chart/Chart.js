import React from "react";
import { Bar, Line } from "react-chartjs-2";

const Chart = () => {
  return (
    <>
      <div className="header">
        <h5 className="title">
          Balance 2021 - Varsinainen (FI29 4434 4032 2405 33)
        </h5>
        <div className="links"></div>
      </div>
      <Line data={data} options={options} />
    </>
  );
};

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Balance (€)",
      data: [1200, 1900, 3000, 5000, 2000, 3000, 600, 700, 800, 900, 1400, 2000],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)",
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};
export default Chart;
