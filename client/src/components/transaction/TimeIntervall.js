import React from "react";
import TimeIntervallTransaction from "./TimeIntervallTransaction";

const TimeIntervall = () => {
  return (
    <div className="mt-5" style={{ height: "300px", overflow: "auto" }}>
      <div className="accordion" id="timeAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header mx-0 my-0 px-0 py-0" id="account-1">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-1"
              aria-expanded="false"
              aria-controls="collapse-1"
            >
              <div className="col-sm-2">14.2.2021</div>
              <div className="col-sm-1">-</div>
              <div className="col-4">15.3.2021</div>
              <div className="col-3">200.40€</div>
              <div className="col-1 trash-icon">{trash}</div>
            </button>
          </h2>
          <div
            id="collapse-1"
            className="accordion-collapse collapse"
            aria-labelledby="account-1"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
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
            <TimeIntervallTransaction />
          </div>
        </div>
        {/* ITEM 2 */}
        <div className="accordion-item">
          <h2 className="accordion-header mx-0 my-0 px-0 py-0" id="account-2">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-2"
              aria-expanded="false"
              aria-controls="collapse-2"
            >
              <div className="col-sm-2">15.3.2021</div>
              <div className="col-sm-1">-</div>
              <div className="col-4">18.5.2021</div>
              <div className="col-3">-300.40€</div>
              <div className="col-1">{trash}</div>
            </button>
          </h2>
          <div
            id="collapse-2"
            className="accordion-collapse collapse"
            aria-labelledby="account-2"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body mb-0 mt-0 pb-0 pt-0">
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
            <TimeIntervallTransaction />
          </div>
        </div>
        {/* ITEM 3 */}
        <div className="accordion-item">
          <h2 className="accordion-header mx-0 my-0 px-0 py-0" id="account-3">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-3"
              aria-expanded="false"
              aria-controls="collapse-3"
            >
              <div className="col-sm-2">15.3.2021</div>
              <div className="col-sm-1">-</div>
              <div className="col-4">18.5.2021</div>
              <div className="col-3">-300.40€</div>
              <div className="col-1">{trash}</div>
            </button>
          </h2>
          <div
            id="collapse-3"
            className="accordion-collapse collapse"
            aria-labelledby="account-3"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body mb-0 mt-0 pb-0 pt-0">
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
            <TimeIntervallTransaction />
          </div>
        </div>
        {/* ITEM 4 */}
        <div className="accordion-item">
          <h2 className="accordion-header mx-0 my-0 px-0 py-0" id="account-4">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-4"
              aria-expanded="false"
              aria-controls="collapse-4"
            >
              <div className="col-sm-2">15.3.2021</div>
              <div className="col-sm-1">-</div>
              <div className="col-4">18.5.2021</div>
              <div className="col-3">-300.40€</div>
              <div className="col-1">{trash}</div>
            </button>
          </h2>
          <div
            id="collapse-4"
            className="accordion-collapse collapse"
            aria-labelledby="account-4"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body mb-0 mt-0 pb-0 pt-0">
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
            <TimeIntervallTransaction />
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

export default TimeIntervall;
