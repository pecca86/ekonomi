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
  const test = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
  };


  
  transaction.transactionsByYear.forEach((account) => accounts.push(account));
  //console.log("ACCOUNTS: ", accounts);


  for (let i = 0; i < accounts.length; i++) {
    let randClr = `rgba(${Math.floor(Math.random() * 256)}, 99, ${Math.floor(Math.random() * 256)}, 02)`

    dataset.push({
      label: `Test no ${i}`,
      data: [],
      fill: false,
      backgroundColor: randClr,
      borderColor: randClr,
    });

    for (let j = 0; j < accounts[i].length; j++) {

      console.log(`ACC ARR ${i}: `, accounts[i][j].sum);
      dataset[i].data.push(accounts[i][j].sum)
    }
      
    
  }



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
