import React from "react";

const TransactionList = () => {
  return (
    <div style={{ height: "300px", overflow: "auto" }}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Account</th>
            <th scope="col">Description</th>
            <th scope="col">Sum</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Varsinainen</td>
            <td>Lön</td>
            <td>340,50€</td>
            <td>24.5.2021</td>
          </tr>
          <tr>
            <td>Varsinainen</td>
            <td>Studieböcker</td>
            <td>-10€</td>
            <td>24.5.2021</td>
          </tr>
          <tr>
            <td>Säästö</td>
            <td>Lön</td>
            <td>3,50€</td>
            <td>30.5.2021</td>
          </tr>
          <tr>
            <td>Varsinainen</td>
            <td>Bensin</td>
            <td>100,50€</td>
            <td>28.5.2021</td>
          </tr>
          <tr>
            <td>Varsinainen</td>
            <td>Hyra</td>
            <td>-1340,50€</td>
            <td>28.5.2021</td>
          </tr>
          <tr>
            <td>Säästö</td>
            <td>Lön</td>
            <td>340,50€</td>
            <td>24.5.2021</td>
          </tr>
          <tr>
            <td>Visa Credit</td>
            <td>Lön</td>
            <td>340,50€</td>
            <td>24.5.2021</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
