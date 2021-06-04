import React from "react";
import { Link } from "react-router-dom";

const TimeIntervall = () => {
  return (
    <div className="mt-5" style={{ height: "300px", overflow: "auto" }}>
      <button className="btn btn-primary">New Time Intervall</button>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Incomes</th>
            <th scope="col">Spendings</th>
            <th scope="col">Totalt</th>
            <th scope="col">Totalt including balance</th>
            <th scope="col">{""}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>14.1.2021</td>
            <td>15.2.2021</td>
            <td>400,50€</td>
            <td>600,76€</td>
            <td>-200,26€</td>
            <td>0,00€</td>
            <td>{trash}</td>
          </tr>
          <tr>
            <td>14.2.2021</td>
            <td>15.3.2021</td>
            <td>23,50€</td>
            <td>2,76€</td>
            <td>20,26€</td>
            <td>200,00€</td>
            <td>{trash}</td>
          </tr>
          <tr>
            <td>15.5.2021</td>
            <td>16.8.2021</td>
            <td>1000,50€</td>
            <td>600,76€</td>
            <td>400,26€</td>
            <td>2000,00€</td>
            <td>{trash}</td>
          </tr>
          <tr>
            <td>14.1.2021</td>
            <td>15.2.2021</td>
            <td>400,50€</td>
            <td>600,76€</td>
            <td>-200,26€</td>
            <td>0,00€</td>
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
    class="bi bi-trash"
    viewBox="0 0 16 16"
  >
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
    <path
      fill-rule="evenodd"
      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
    />
  </svg>
);

export default TimeIntervall;
