import React from "react";
import M from "materialize-css/dist/js/materialize.min.js";

const AddTimeintervallModal = () => {
  return (
    <div id="add-timeintervall-modal" className="modal mt-5">
      <div className="modal-content mb-3">
        <h4>New Time Intervall</h4>
        <form action="">
          {/* START DATE */}
          <label htmlFor="startDate" className="active">
            Start Date
          </label>
          <input type="date" name="startDate" id="" />

          {/* END DATE */}
          <label htmlFor="endDate" className="active">
            End Date
          </label>
          <input type="date" name="endDate" id="" />

          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddTimeintervallModal;
