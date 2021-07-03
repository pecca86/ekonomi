import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";
import {
  getAllAccountTransactionsByYear,
  clearAccountTransactionsByYear,
} from "../../actions/transaction/transactionActions";

const Chart = ({
  getAllAccountTransactionsByYear,
  clearAccountTransactionsByYear,
  transaction,
  account,
}) => {
  const [withCurrentBalance, setWithCurrentBalance] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    clearAccountTransactionsByYear();
    const year = e.target[0].value;

    account.accounts.map((account) =>
      getAllAccountTransactionsByYear(account._id, year)
    );
  };

  // === GRAPH DATA ===
  const accounts = [];
  const dataset = [];

  // Push accounts from state into helper array
  transaction.transactionsByYear.forEach((account) => accounts.push(account));

  // Iterate trough arrays and form the data so we can put it inside our graph
  for (let i = 0; i < accounts.length; i++) {
    // Create an object with each month
    const monthlyTransactions = {
      "01": [0],
      "02": [0],
      "03": [0],
      "04": [0],
      "05": [0],
      "06": [0],
      "07": [0],
      "08": [0],
      "09": [0],
      10: [0],
      11: [0],
      12: [0],
    };

    // Create helper arrays since reduce swithes the order from 1-12 to 10-12, 1-9
    let summedArr = [];
    let helpArr = [];

    // Create a random color for each account
    let randClr = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 02)`;

    // Push the initial account data to the graph with an empty data array
    dataset.push({
      label:
        accounts[i].length > 0
          ? `${accounts[i][0].account.name}`
          : "No transactions",
      data: [],
      fill: false,
      backgroundColor: randClr,
      borderColor: randClr,
    });

    // Push data according to the key representing each month into our transaction object
    for (let j = 0; j < accounts[i].length; j++) {
      // Substring takes the month out of the string 2002-02-28
      monthlyTransactions[accounts[i][j].transactionDate.substring(5, 7)].push(
        accounts[i][j].sum
      );
    }

    // Count the combined value of transaction for each month and push it into our helper array
    for (const month in monthlyTransactions) {
      summedArr.push(monthlyTransactions[month].reduce((a, b) => a + b, 0));
    }

    // since reduce switches the order of months, we temporarely put the first three months (10-12)
    // into an helperArray and then back to the end of summedArr
    helpArr = summedArr.splice(0, 3);
    summedArr.push(...helpArr);

    // Check if user wants to take into account the Accounts balance in the calculation of monthly transactions
    if (withCurrentBalance) {
      summedArr = summedArr.map(
        (sum) => (sum = sum + accounts[i][0].account.balance)
      );
    }
    // push the data into our dataset that is then sent to our graph
    dataset[i].data.push(...summedArr);
  }

  // CHART STUFF
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

    datasets: dataset,
  };
  const options = {
    aspectRatio: window.innerWidth < 400 ? 1.2 : 2,
    plugins: {
      title: {
        display: true,
        text: "Account Transactions / Year",
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
      <div className="header ms-1">
        <Fragment>
          <div className="row">
            <form onSubmit={onSubmit} className="col s12">
              <div className="row">
                <div className="input-field col s6">
                  <input
                    type="text"
                    placeholder="Graph Year"
                    id="graph-year"
                    name="graph-year"
                  />
                </div>
                <div className="input-field col s5">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Enter"
                  />
                </div>
                <div className="input-field col s1">
                  <div className="input-field">
                    <p>
                      <label>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={withCurrentBalance}
                          value={withCurrentBalance}
                          onChange={(e) =>
                            setWithCurrentBalance(!withCurrentBalance)
                          }
                        />
                        <span>With Account Balance</span>
                      </label>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Fragment>
        <div className="links"></div>
      </div>

      <Line data={data} options={options} id="account-chart" />
    </div>
  );
};

Chart.propTypes = {
  transaction: PropTypes.object,
  account: PropTypes.object,
  getAllAccountTransactionsByYear: PropTypes.func,
  clearAccountTransactionsByYear: PropTypes.func,
};

const mapStateToProps = (state) => ({
  transaction: state.transaction,
  account: state.account,
});

export default connect(mapStateToProps, {
  getAllAccountTransactionsByYear,
  clearAccountTransactionsByYear,
})(Chart);
