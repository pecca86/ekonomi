import React from "react";
import { Link } from "react-router-dom";

const TimeIntervall = () => {
  return (
    <div className="mt-5" style={{ height: "300px", overflow: "auto" }}>
      <div class="accordion" id="timeAccordion">
        <div class="accordion-item">
          <h2 class="accordion-header mx-0 my-0 px-0 py-0" id="account-1">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-1"
              aria-expanded="false"
              aria-controls="collapse-1"
            >
              <div class="col-2">14.2.2021</div>
              <div class="col-1">-</div>
              <div class="col-4">15.3.2021</div>
              <div class="col-4">200.40€</div>
            </button>
          </h2>
          <div
            id="collapse-1"
            class="accordion-collapse collapse"
            aria-labelledby="account-1"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
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
          </div>
        </div>
        {/* ITEM 2 */}
        <div class="accordion-item">
          <h2 class="accordion-header mx-0 my-0 px-0 py-0" id="account-2">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-2"
              aria-expanded="false"
              aria-controls="collapse-2"
            >
              <div class="col-2">15.3.2021</div>
              <div class="col-1">-</div>
              <div class="col-4">18.5.2021</div>
              <div class="col-4">-300.40€</div>
            </button>
          </h2>
          <div
            id="collapse-2"
            class="accordion-collapse collapse"
            aria-labelledby="account-2"
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
