import React from "react";

const TimeIntervallTransaction = () => {
  return (
    <div className="mb-0 mt-0 pb-0 pt-0" style={{ overflow: "auto" }}>
      <table className="table-sm mb-2 mt-0 pb-0 pt-0">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Description</th>
            <th scope="col">Sum</th>
            <th scope="col">{""}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>24.2.2021</td>
            <td>Lön</td>
            <td>340,50€</td>
            <td>{trash}</td>
          </tr>
        </tbody>
      </table>
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

export default TimeIntervallTransaction;
