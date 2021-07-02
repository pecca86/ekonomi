import React, { Fragment } from "react";
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
  const onSubmit = (e) => {
    e.preventDefault();
    clearAccountTransactionsByYear();
    const year = e.target[0].value;

    account.accounts.map((account) =>
      getAllAccountTransactionsByYear(account._id, year)
    );
  };

  // GRAPH DATA
  const accounts = [];
  const dataset = [];



  transaction.transactionsByYear.forEach((account) => accounts.push(account));

  for (let i = 0; i < accounts.length; i++) {
    //
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
      "10": [0],
      "11": [0],
      "12": [0],
    };

    const summedArr = []
    let helpArr = []


    //
    let randClr = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, 02)`;

    dataset.push({
      label: `${accounts[i][i].account.name}`,
      data: [],
      fill: false,
      backgroundColor: randClr,
      borderColor: randClr,
    });

    for (let j = 0; j < accounts[i].length; j++) {
      //dataset[i].data.push(accounts[i][j].sum);
      monthlyTransactions[accounts[i][j].transactionDate.substring(5, 7)].push(
        accounts[i][j].sum
      );
    }

    //
    //console.log(`Month ${i} :`, monthlyTransactions);
    for (const month in monthlyTransactions) {
      summedArr.push(monthlyTransactions[month].reduce((a,b) => a+b, 0))
    }
    helpArr = summedArr.splice(0,3)
    summedArr.push(...helpArr)
    console.log(summedArr);
    dataset[i].data.push(...summedArr)
  }

  //console.log("TEST2: ", monthlyTransactions);

  // TESTING
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
    <>
      <div className="header">
        <ul>
          {transaction.transactionsByYear &&
            transaction.transactionsByYear.map((transaction) =>
              //<li>{transaction.sum}</li>
              transaction.map((t) => (
                <li>
                  {t.sum} - {t.account.name} - {t.transactionType} -{" "}
                  {t.transactionDate.substring(5, 7)}
                </li>
              ))
            )}
        </ul>

        <Fragment>
          <div className="row">
            <form onSubmit={onSubmit} className="col s12">
              <div className="row">
                <div className="input-field col s6">
                  <input
                    type="text"
                    placeholder="Enter which year to recieve Graph data from"
                    id="graph-year"
                    name="graph-year"
                  />
                  <label htmlFor="graph-year">Year</label>
                </div>
                <div className="input-field col s6">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Enter"
                  />
                </div>
              </div>
            </form>
          </div>
        </Fragment>
        <div className="links"></div>
      </div>
      <Line data={data} options={options} />
    </>
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
