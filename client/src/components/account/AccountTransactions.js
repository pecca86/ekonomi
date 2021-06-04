import React from "react";

const AccountTransactions = () => {
  return (
    <div style={{ height: "300px", overflow: "auto" }}>
      <button className="btn btn-primary">Add new Transaction</button>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Type</th>
            <th scope="col">Description</th>
            <th scope="col">Sum</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>24.5.2021</td>
            <td>Income</td>
            <td>Lön</td>
            <td>340,50€</td>
          </tr>
          <tr>
            <td>25.5.2021</td>
            <td>Spending</td>
            <td>Hyra</td>
            <td>1400,50€</td>
          </tr>
          <tr>
            <td>29.6.2021</td>
            <td>Income</td>
            <td>Vårdbidrag</td>
            <td>250,50€</td>
          </tr>
          <tr>
            <td>27.7.2021</td>
            <td>Income</td>
            <td>Lön</td>
            <td>340,50€</td>
          </tr>
          <tr>
            <td>28.7.2021</td>
            <td>Spending</td>
            <td>Pekkas födelsedagspresent</td>
            <td>10000,50€</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AccountTransactions;
