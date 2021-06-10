import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const AccountListItem = ({account}) => {
  return (
    <tr>
      <td>
        <Link to="/account">{account.name}</Link>
      </td>
      <td>{account.balance}€</td>
      <td>
        <i className="material-icons">insert_chart</i>
      </td>
    </tr>
  );
};

AccountListItem.propTypes ={
  account: PropTypes.object.isRequired,
}

export default AccountListItem;
