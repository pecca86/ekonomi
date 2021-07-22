import React from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//For fetching data

const TransactionsPerTypeChart = ({ transaction, month, day, year }) => {
  // === DATA COLLECTION ===

  // Push all transactions into an array
  const transactionData = [];
  transaction.transactionsByYear.forEach((transaction) =>
    transaction.forEach((t) => transactionData.push(t))
  );

  // Create an object that takes in each unique transaction type and initial value of 0
  const myObj = {};
  for (const transaction of transactionData) {
    myObj[transaction.category] = 0;
  }

  // Then count the sum according to transaction category
  for (const transaction of transactionData) {
    myObj[transaction.category] += transaction.sum;
  }

  // create label and data arrays to put into graph
  const labels = [];
  const graphData = [];
  for (const key in myObj) {
    labels.push(key);
    graphData.push(myObj[key]);
  }

  // Get all transactions according to category and set into an array
  const data = {
    labels: labels,
    datasets: [
      {
        label: `Transactions / Category`,
        data: graphData,
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
        text: `${day}.${month+1}.${year} - ${month}/${year+1}`,
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
