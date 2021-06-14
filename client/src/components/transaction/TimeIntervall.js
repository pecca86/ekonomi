import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TimeIntervallItem from "./TimeIntervallItem";
import {
  setTimeintervallTransactions,
  flushTimeIntervalls,
} from "../../actions/transaction/transactionActions";

import TESTITEM from "./TESTITEM";

const TimeIntervall = ({
  account,
  transaction,
  setTimeintervallTransactions,
  flushTimeIntervalls,
}) => {
  useEffect(() => {
    flushTimeIntervalls();
    //setQueries(account.account.accountQueries);
    // MAKE A REQ BASED ON ACCOUNT QUERIES
    if (transaction.timeSpans.data) {
      {
        transaction.timeSpans.data.map((query) =>
          setTimeintervallTransactions(
            {
              startDate: query.startDate,
              endDate: query.endDate,
            },
            account.account._id
          )
        );
      }
    }
  }, [setTimeintervallTransactions]);

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
                key={interval.id}
                startDate={interval.timeSpan.startDate}
                endDate={interval.timeSpan.endDate}
                sum={interval.calculatedTransactionSum}
                id={interval.id}
                transactions={interval.timeintervalTransactions}
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
  flushTimeIntervalls,
})(TimeIntervall);
