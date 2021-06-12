import React, { Fragment } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TimeIntervallTransaction from "./TimeIntervallTransaction";

const TimeIntervallItem = ({ startDate, endDate, id, sum, transactions }) => {
  return (
    <div className="accordion" id={`timeAccordion-${id}`}>
      <div className="accordion-item">
        <h2
          className="accordion-header mx-0 my-0 px-0 py-0"
          id={`account-${id}`}
        >
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse-${id}`}
            aria-expanded="false"
            aria-controls={`collapse-${id}`}
          >
            <div className="col-sm-2">
              <Moment format="DD.MM.YYYY">{startDate}</Moment>
            </div>
            <div className="col-sm-1">-</div>
            <div className="col-4">
              <Moment format="DD.MM.YYYY">{endDate}</Moment>
            </div>
            <div className="col-3">{sum}€</div>
            <div className="col-1 trash-icon">{trash}</div>
          </button>
        </h2>
        <div
          id={`collapse-${id}`}
          className="accordion-collapse collapse"
          aria-labelledby={`account-${id}`}
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body ">
            <div className="col">
              <strong> Incomes:</strong> 20€
            </div>
            <div className="col">
              <strong>Spendings:</strong> -200€
            </div>
            <div className="col">
              <strong>Total including Balance:</strong> 40€
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
                {transactions.map((e) => (
                  <TimeIntervallTransaction
                    key={e._id}
                    sum={e.sum}
                    date={e.transactionDate}
                    description={e.description}
                    id={e.id}
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
};

const mapStateToProps = (state) => ({
  account: state.account,
});

export default connect(mapStateToProps)(TimeIntervallItem);
