import React from "react";
import { Link } from "react-router-dom";

const AccountListItem = () => {
  return (
    <tr>
      <td>
        <Link to="/account">Varsinainen</Link>
      </td>
      <td>340,50€</td>
      <td>
        <i className="material-icons">insert_chart</i>
      </td>
    </tr>
  );
};

export default AccountListItem;
