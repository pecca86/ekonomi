import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TimeIntervallItem from "./TimeIntervallItem";
import {
  setQueries,
  setTimeintervallTransactions,
} from "../../actions/transaction/transactionActions";

import TESTITEM from "./TESTITEM";

const TimeIntervall = ({
  account,
  transaction,
  setQueries,
  setTimeintervallTransactions,
}) => {
  useEffect(() => {
    setQueries(account.account.accountQueries);
    // MAKE A REQ BASED ON ACCOUNT QUERIES
    if (account.account.accountQueries) {
      {
        account.account.accountQueries.map((query) =>
          setTimeintervallTransactions(
            {
              startDate: query.transactionDate.gte,
              endDate: query.transactionDate.lte,
            },
            account.account._id
          )
        );
      }
    }
  }, [setQueries]);

  return (
    <div className="mt-5" style={{ height: "300px", overflow: "auto" }}>
      <Fragment>
        <ul>
          {account.account.accountQueries.map((interval) => (
            <TimeIntervallItem
              key={interval.id}
              startDate={interval.transactionDate.gte}
              endDate={interval.transactionDate.lte}
              sum={interval.timeintervalSum}
              id={interval.id}
              transactions={interval.timeintervalTransactions}
            />
          ))}
        </ul>
      </Fragment>
      <Fragment>
        {transaction.timeintervalTransactions.map((tit) => (
          <TESTITEM data={tit} />
        ))}
      </Fragment>
    </div>
  );
};

TimeIntervall.propTypes = {
  account: PropTypes.object.isRequired,
  transaction: PropTypes.object.isRequired,
  setQueries: PropTypes.func,
  setTimeintervallTransactions: PropTypes.func,
};

const mapStateToProps = (state) => ({
  account: state.account,
  transaction: state.transaction,
});

export default connect(mapStateToProps, {
  setQueries,
  setTimeintervallTransactions,
})(TimeIntervall);
