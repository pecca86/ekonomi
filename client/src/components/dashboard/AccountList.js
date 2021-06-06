import React from "react";
import { Link } from "react-router-dom";
import AddAccountModal from "../account/AddAccountModal";
import AddAccountBtn from "../account/AddAccountBtn";

const AccountList = () => {
  return (
    <div className="mt-5" style={{ height: "300px", overflow: "auto" }}>
      <AddAccountBtn />
      <AddAccountModal />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">IBAN</th>
            <th scope="col">Description</th>
            <th scope="col">Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Link to="account">FI29 4434 4032 2405 33</Link>
            </td>
            <td>Varsinainen</td>
            <td>340,50€</td>
          </tr>

          <tr>
            <td>FI29 5555 4033 2405 33</td>
            <td>Säästö</td>
            <td>12000,44€</td>
          </tr>
          <tr>
            <td>FI29 6767 8888 2405 12</td>
            <td>Visa Credit</td>
            <td>5,48€</td>
          </tr>
          <tr>
            <td>FI29 6767 8888 2405 12</td>
            <td>Visa Credit</td>
            <td>5,48€</td>
          </tr>
          <tr>
            <td>FI29 6767 8888 2405 12</td>
            <td>Visa Credit</td>
            <td>5,48€</td>
          </tr>
          <tr>
            <td>FI29 6767 8888 2405 12</td>
            <td>Visa Credit</td>
            <td>5,48€</td>
          </tr>
          <tr>
            <td>FI29 6767 8888 2405 12</td>
            <td>Visa Credit</td>
            <td>5,48€</td>
          </tr>
          <tr>
            <td>FI29 6767 8888 2405 12</td>
            <td>Visa Credit</td>
            <td>5,48€</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AccountList;
