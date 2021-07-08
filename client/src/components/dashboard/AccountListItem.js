import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const AccountListItem = ({ account }) => {
  return (
    <tr>
      <td>
        <Link to={`/account/${account._id}`}>{account.name}</Link>
      </td>
      <td>{""}</td>
      <td className={account.balance < 0 ? 'text-danger' : 'text-success'}>{account.balance}€</td>
    </tr>
  );
};

AccountListItem.propTypes = {
  account: PropTypes.object.isRequired,
};

export default AccountListItem;
