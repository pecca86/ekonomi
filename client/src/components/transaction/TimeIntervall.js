import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TimeIntervallItem from "./TimeIntervallItem";

const TimeIntervall = ({ account, transaction }) => {
  const timeIntervallArray = [];

  const parseTimeintervalls = () => {
    {
      account.account.accountQueries.map((q) =>
        timeIntervallArray.push(JSON.parse(q.toString()))
      );
    }
  };

  return (
    <div className="mt-5" style={{ height: "300px", overflow: "auto" }}>
      <Fragment>
        <ul>
          {parseTimeintervalls()}
          {timeIntervallArray.map((intervall) => (
            <TimeIntervallItem
              key={intervall.id}
              startDate={intervall.transactionDate.gte}
              endDate={intervall.transactionDate.lte}
              id={intervall.id}
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
};

const mapStateToProps = (state) => ({
  account: state.account,
  transaction: state.transaction,
});

export default connect(mapStateToProps)(TimeIntervall);
