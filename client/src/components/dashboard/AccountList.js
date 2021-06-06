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
            <th scope="col">Description</th>
            <th scope="col">Balance</th>
            <th scope="col">{""}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Link to="/account">Varsinainen</Link>
            </td>
            <td>340,50€</td>
            <td>
              <i class="material-icons">insert_chart</i>
            </td>
          </tr>

          <tr>
            <td>Säästö</td>
            <td>12000,44€</td>
            <td>
              <i class="material-icons">insert_chart</i>
            </td>
          </tr>
          <tr>
            <td>Visa Credit</td>
            <td>5,48€</td>
            <td>
              <i class="material-icons">insert_chart</i>
            </td>
          </tr>
          <tr>
            <td>Visa Credit</td>
            <td>5,48€</td>
            <td>
              <i class="material-icons">insert_chart</i>
            </td>
          </tr>
          <tr>
            <td>Visa Credit</td>
            <td>5,48€</td>
            <td>
              <i class="material-icons">insert_chart</i>
            </td>
          </tr>
          <tr>
            <td>Visa Credit</td>
            <td>5,48€</td>
            <td>
              <i class="material-icons">insert_chart</i>
            </td>
          </tr>
          <tr>
            <td>Visa Credit</td>
            <td>5,48€</td>
            <td>
              <i class="material-icons">insert_chart</i>
            </td>
          </tr>
          <tr>
            <td>Visa Credit</td>
            <td>5,48€</td>
            <td>
              <i class="material-icons">insert_chart</i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AccountList;
