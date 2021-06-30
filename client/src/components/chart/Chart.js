import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import { getAllAccountTransactionsByYear } from "../../actions/transaction/transactionActions";

const Chart = ({ getAllAccountTransactionsByYear, transaction }) => {
  return (
    <>
      <div className="header">
        <ul>
          {transaction.transactionsByYear &&
            transaction.transactionsByYear.map((transaction) =>
              //<li>{transaction.sum}</li>
              transaction.map((t) => (
                <li>
                  {t.sum} {t.account.name}
                </li>
              ))
            )}
        </ul>
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
      data: [
        1200, 1900, 3000, 5000, 2000, 3000, 600, 700, 800, 900, 1400, 2000,
      ],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)",
    },
    {
      label: "Sparkonto (€)",
      data: [200, 900, 300, 500, 200, 300, 600, 70, 80, 90, 140, 200],
      fill: false,
      backgroundColor: "rgb(255, 200, 132)",
      borderColor: "rgba(255, 200, 132, 0.2)",
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

const mapStateToProps = (state) => ({
  transaction: state.transaction,
});

export default connect(mapStateToProps, { getAllAccountTransactionsByYear })(
  Chart
);
