import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setAlert } from "../../actions/alerts/alertActions";
import { addTimeSpan } from "../../actions/transaction/transactionActions";

const AddTimeintervallModal = ({ setAlert, addTimeSpan, account }) => {
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
    } else {
      addTimeSpan(formData, account.account._id)
    }
  };

  return (
    <div id="add-timeintervall-modal" className="modal mt-5">
      <div className="modal-content mb-3">
        <h4>New Time Intervall</h4>
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
  addTimeSpan: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  account: state.account,
});

export default connect(mapStateToProps, { setAlert, addTimeSpan })(AddTimeintervallModal);
