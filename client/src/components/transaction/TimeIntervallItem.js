import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  deleteTimeSpan,
  deleteTimeIntervalTransaction,
  setCurrentTimeInterval,
} from "../../actions/transaction/transactionActions";
import AccountTransactionItem from "./AccountTransactionItem";

const TimeIntervallItem = ({
  timeSpan,
  sum,
  transactions,
  deleteTimeSpan,
  deleteTimeIntervalTransaction,
  setCurrentTimeInterval,
  account,
  transaction,
}) => {
  const { startDate, endDate, _id } = timeSpan;

  useEffect(() => {
    countTransactionsSums();
    // eslint-disable-next-line
  }, []);

  const [transactionData, setTransactionData] = useState({
    incomes: 0,
    spendings: 0,
  });
  const { incomes, spendings } = transactionData;

  // Count the negative transaction, positive transactions and balance with today's balance
  const countTransactionsSums = async () => {
    if (transactions.length > 0) {
      const transData = { income: 0, spending: 0 };

      transactions.map((transaction) =>
        transaction.transactionType === "Income"
          ? (transData.income += transaction.sum)
          : (transData.spending += transaction.sum)
      );

      setTransactionData({
        ...transactionData,
        incomes: parseFloat(transData.income),
        spendings: parseFloat(transData.spending),
      });
    }
  };

  const onDelete = (e) => {
    e.preventDefault();
    deleteTimeSpan(_id);
    deleteTimeIntervalTransaction(_id);
  };

  if (transaction.loading || account.loading) {
    return <p>loading...</p>;
  }

  return (
    <div className="accordion" id={`timeAccordion-${_id}`}>
      <div className="accordion-item">
        <h2
          className="accordion-header mx-0 my-0 px-0 py-0"
          id={`account-${_id}`}
        >
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse-${_id}`}
            aria-expanded="false"
            aria-controls={`collapse-${_id}`}
          >
            <div className="col-sm-2">
              <Moment format="DD.MM.YYYY">{startDate}</Moment>
            </div>
            <div className="col-sm-1">-</div>
            <div className="col-4">
              <Moment format="DD.MM.YYYY">{endDate}</Moment>
            </div>
            {sum >= 0 ? (
              <div className={`col-3 text-success`}>{sum}€</div>
            ) : (
              <div className={`col-3 text-danger`}>{sum}€</div>
            )}
            <div onClick={onDelete} className="col-1 trash-icon">
              {trash}
            </div>
            <div>
              <a
                className="waves-effect waves-light modal-trigger"
                href="#add-timeintervall-modal"
              >
                <i
                  className=" tiny material-icons prefix text-dark action-icon"
                  onClick={(e) => setCurrentTimeInterval(timeSpan)}
                  data-toggle="modal"
                  data-target="#add-timeintervall-modal"
                >
                  mode_edit
                </i>
              </a>
            </div>
          </button>
        </h2>
        <div
          id={`collapse-${_id}`}
          className="accordion-collapse collapse"
          aria-labelledby={`account-${_id}`}
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body ">
            <div className="row">
              <div className="col col-md-3">
                <div className="col text-success">
                  <strong> Incomes:</strong> {incomes.toFixed(2)}€
                </div>
                <div className="col text-danger">
                  <strong>Spendings:</strong> {spendings.toFixed(2)}€
                </div>
              </div>
              <div className="col col-md-5">
                <div>
                  <strong>With current balance:</strong>
                </div>
                <div>
                  {(parseInt(account.account.balance, 10) + parseInt(sum)).toFixed(2)}€
                </div>
              </div>
            </div>
          </div>

          <div className="mb-0 mt-0 pb-0 pt-0" style={{ overflow: "auto" }}>
            <table className="table-sm mb-2 mt-0 pb-0 pt-0">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Description</th>
                  <th scope="col">Sum</th>
                  <th scope="col">{""}</th>
                </tr>
              </thead>
              <tbody className="bg-light">
                {transactions.map((transaction) => (
                  <AccountTransactionItem
                    key={transaction._id}
                    transaction={transaction}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const trash = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-trash"
    viewBox="0 0 16 16"
  >
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
    <path
      fillRule="evenodd"
      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
    />
  </svg>
);

TimeIntervallItem.propTypes = {
  transaction: PropTypes.object,
  deleteTimeSpan: PropTypes.func.isRequired,
  setCurrentTimeInterval: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  account: state.account,
  transaction: state.transaction,
});

export default connect(mapStateToProps, {
  deleteTimeSpan,
  deleteTimeIntervalTransaction,
  setCurrentTimeInterval,
})(TimeIntervallItem);
