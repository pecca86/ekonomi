import React from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//For fetching data

const TransactionsPerTypeChart = ({ transaction }) => {
  // === DATA COLLECTION ===
  const transactionDescriptions = [];
  transaction.transactionsByYear.forEach((transaction) =>
    //transactionDescriptions.push(transaction.description)
    transaction.forEach((t) => transactionDescriptions.push(t.description))
  );

  //console.log("FIRST: ", transactionDescriptions);

  // Take only unique descriptions
  const distinctDescriptions = [...new Set(transactionDescriptions)];

  // Dummy data for graph data for testing purposes
  const dummyData = [];
  for (let i = 0; i < distinctDescriptions.length; i++) {
    let value = Math.floor(Math.random() * (5000 - 100 + 1));
    dummyData.push(value);
  }

  // Get all transactions according to description and set into an array
  const labels = distinctDescriptions;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Transaction Description",
        data: dummyData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
          "rgba(150, 203, 150, 0.2)",
          "rgba(90, 90, 207, 0.2)",
          "rgba(201, 130, 130, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
          "rgba(150, 203, 150)",
          "rgba(90, 90, 207)",
          "rgba(201, 130, 130)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Graph options
  const options = {
    aspectRatio: window.innerWidth < 400 ? 1.2 : 2,
    plugins: {
      title: {
        display: true,
        text: `Transactions / Type`,
      },
      legend: {
        fullSize: false,
        position: "bottom",
        labels: {
          boxWidth: 5,
          boxHeight: 5,
        },
      },
    },
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

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

TransactionsPerTypeChart.propTypes = {
  transaction: PropTypes.object,
};

const mapStateToProps = (state) => ({
  transaction: state.transaction,
});

export default connect(mapStateToProps)(TransactionsPerTypeChart);
