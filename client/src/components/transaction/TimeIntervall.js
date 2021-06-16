import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TimeIntervallItem from "./TimeIntervallItem";
import {
  setTimeintervallTransactions,
  getTimeSpans
} from "../../actions/transaction/transactionActions";

const TimeIntervall = ({
  account,
  transaction,
  setTimeintervallTransactions,
  getTimeSpans
}) => {


  if (transaction.loading || account.loading) {
    return <p>loading...</p>;
  }

  return (
    <div className="mt-5" style={{ height: "300px", overflow: "auto" }}>
      <Fragment>
        <ul>
          {transaction.timeintervalTransactions.length > 0 &&
            transaction.timeintervalTransactions.map((interval) => (
              <TimeIntervallItem
                key={interval.timeSpan._id}
                startDate={interval.timeSpan.startDate}
                endDate={interval.timeSpan.endDate}
                sum={interval.calculatedTransactionSum}
                id={interval.timeSpan._id}
                transactions={interval.data}
              />
            ))}
        </ul>
      </Fragment>
    </div>
  );
};

TimeIntervall.propTypes = {
  account: PropTypes.object.isRequired,
  transaction: PropTypes.object.isRequired,
  setTimeintervallTransactions: PropTypes.func,
};

const mapStateToProps = (state) => ({
  account: state.account,
  transaction: state.transaction,
});

export default connect(mapStateToProps, {
  setTimeintervallTransactions,
  getTimeSpans
})(TimeIntervall);
