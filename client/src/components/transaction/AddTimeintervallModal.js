import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAlert } from "../../actions/alerts/alertActions";
import {
  addTimeSpan,
  updateTimeInterval,
} from "../../actions/transaction/transactionActions";

const AddTimeintervallModal = ({
  setAlert,
  addTimeSpan,
  updateTimeInterval,
  account,
  transaction,
}) => {
  useEffect(() => {
    if (transaction.currentTimeInterval) {
      setFormData({
        startDate: transaction.currentTimeInterval.startDate,
        endDate: transaction.currentTimeInterval.endDate,
      });
    }
  }, [transaction.currentTimeInterval]);

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
  });

  // STATE FUNCTIONS
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData.endDate < formData.startDate) {
      setAlert("Start Date can not be greater than End Date!", "danger");
    } else if (transaction.currentTimeInterval) {
      updateTimeInterval(formData, transaction.currentTimeInterval._id, account.account._id);
    } else {
      addTimeSpan(formData, account.account._id);
    }
  };

  return (
    <div id="add-timeintervall-modal" className="modal mt-5">
      <div className="modal-content mb-3">
        <h4>
          {transaction.currentTimeInterval
            ? "Edit Time Interval"
            : "New Time Interval"}
        </h4>
        <form onSubmit={onSubmit}>
          {/* START DATE */}
          <label htmlFor="startDate" className="active">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={onChange}
            required
          />

          {/* END DATE */}
          <label htmlFor="endDate" className="active">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={onChange}
            required
          />

          <button className="btn btn-success modal-close">Submit</button>
        </form>
      </div>
    </div>
  );
};

AddTimeintervallModal.propTypes = {
  setAlert: PropTypes.func,
  account: PropTypes.object.isRequired,
  transaction: PropTypes.object.isRequired,
  addTimeSpan: PropTypes.func.isRequired,
  updateTimeInterval: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  account: state.account,
  transaction: state.transaction,
});

export default connect(mapStateToProps, {
  setAlert,
  addTimeSpan,
  updateTimeInterval,
})(AddTimeintervallModal);
