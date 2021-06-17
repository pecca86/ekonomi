import React, { Fragment, Suspense } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//import TimeIntervallItem from "./TimeIntervallItem";
// Testing suspense for showing loading text while waiting for data
const TimeIntervallItem = React.lazy(() => import("./TimeIntervallItem"));

const TimeIntervall = ({ account, transaction }) => {
  if (transaction.loading || account.loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-5" style={{ height: "300px", overflow: "auto" }}>
      <Fragment>
        <Suspense fallback={<p>Loading Time Intervals...</p>}>
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
        </Suspense>
      </Fragment>
    </div>
  );
};

TimeIntervall.propTypes = {
  account: PropTypes.object.isRequired,
  transaction: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  account: state.account,
  transaction: state.transaction,
});

export default connect(mapStateToProps)(TimeIntervall);
