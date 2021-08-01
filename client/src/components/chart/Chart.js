import React, { useState, useEffect } from "react";
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
  // Get current date that will be used in our Graph
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentDay = currentDate.getDate();
  let currentYear = currentDate.getFullYear();

  useEffect(() => {
    clearAccountTransactionsByYear();
    account.accounts.map((account) =>
      getAllAccountTransactionsByYear(
        account._id,
        currentYear,
        currentMonth + 1,
        currentDay
      )
    );
    // eslint-disable-next-line
  }, []);

  const [withCurrentBalance, setWithCurrentBalance] = useState(true);

  // === GRAPH DATA ===
  if (transaction.transactionsByYear <= 0) {
    return <p>No Transasction Data to show...</p>;
  }

  const accounts = [];
  const dataset = [];

  // Push accounts from state into helper array
  transaction.transactionsByYear.forEach((account) => accounts.push(account));

  // Iterate trough arrays and form the data so we can put it inside our graph
  for (let i = 0; i < accounts.length; i++) {
    // Create an object with each month and an array of the transactions sum starting at 0
    const monthlyTransactions = {
      1: [0],
      2: [0],
      3: [0],
      4: [0],
      5: [0],
      6: [0],
      7: [0],
      8: [0],
      9: [0],
      10: [0],
      11: [0],
      12: [0],
    };

    // Create helper arrays where we count the sum of monthly transactions for each account
    let summedArr = [];

    // Create a random color for each account
    let randClr = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * (256 - 100) + 100)}, 02)`;

    // Push the initial account data to the graph with an empty data array
    dataset.push({
      label:
        accounts[i].length > 0 && typeof accounts[i][0] !== "undefined"
          ? `${accounts[i][0].account.name}`
          : "No transactions",
      data: [],
      fill: false,
      backgroundColor: randClr,
      borderColor: randClr,
    });

    // Push data according to the key representing each month into our transaction object
    let monthIndex = 1;
    for (let j = 0; j < accounts[i].length; j++) {
      // Substring takes the month out of the string 2002-02-28
      if (typeof accounts[i][0] !== "undefined") {
        // convert transactionDate strings month into an interger
        monthIndex = parseInt(accounts[i][j].transactionDate.substring(5, 7));
        // subtract current month from the monthindex so that the transaction is shown correctly in the graph
        // To get the transaction set to the correct month we either add or subtract
        if (monthIndex - currentMonth <= 0) {
          monthIndex += currentMonth;
        } else {
          monthIndex -= currentMonth;
        }
        monthlyTransactions[monthIndex].push(accounts[i][j].sum);
      }
    }

    // Count the combined value of transaction for each month and push it into our helper array
    for (const month in monthlyTransactions) {
      summedArr.push(monthlyTransactions[month].reduce((a, b) => a + b, 0));
    }

    // put balance into a variable so we can accumulate the sum to it
    let currentBalance = 0;
    if (typeof accounts[i][0] !== "undefined") {
      currentBalance = accounts[i][0].account.balance;
    }

    // Check if user wants to take into account the Accounts balance in the calculation of monthly transactions
    if (withCurrentBalance && accounts[i].length > 0) {
      for (let i = 0; i < summedArr.length; i++) {
        let tempSum = summedArr[i];
        summedArr[i] += currentBalance;
        currentBalance += tempSum;
      }
    }
    // push the data into our dataset that is then sent to our graph
    dataset[i].data.push(...summedArr);
  }

  // CHART STUFF
  const months = [
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
  ];
  // Order the months to begin with current month
  const graphMonths = months.slice(currentMonth, months.length);
  months.slice(0, currentMonth).map((month) => graphMonths.push(month));

  // Graph data
  const data = {
    labels: graphMonths,
    datasets: dataset,
  };

  // Graph options
  const options = {
    aspectRatio: window.innerWidth < 800 ? 1.2 : 2,
    plugins: {
      title: {
        display: true,
        text: `Account Transactions ${currentDay}.${
          currentMonth + 1
        }.${currentYear} - ${currentMonth}/${currentYear + 1}`,
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
      <div className="input-field">
        <p>
          <label>
            <input
              type="checkbox"
              className="form-check-input"
              checked={withCurrentBalance}
              value={withCurrentBalance}
              onChange={(e) => setWithCurrentBalance(!withCurrentBalance)}
            />
            <span>With Account Balance</span>
          </label>
        </p>
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
