import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import TransActionBtn from "./TransActionBtn";
import { Checkbox } from "@material-ui/core";
import {
  addToCurrentTransactions,
  removeFromCurrentTransactions,
} from "../../actions/transaction/transactionActions";

const AccountTransactionItem = ({
  transaction,
  account,
  showDelete,
  addToCurrentTransactions,
  removeFromCurrentTransactions,
}) => {
  const { sum, transactionDate, description, _id, transactionType, category } =
    transaction;

  const [checked, setChecked] = useState({ checked: false });

  const handleChange = (event) => {
    setChecked({ checked: !checked.checked });
    if (checked.checked) {
      removeFromCurrentTransactions(_id);
    } else {
      addToCurrentTransactions(_id);
    }
  };

  return (
    <tr>
      <td>
        <Moment format="D/M/YY">{transactionDate}</Moment>
      </td>
      <td>{description}</td>
      <td>{category ? category.transactionCategory : "FAIL"}</td>
      {transactionType === "Spending" ? (
        <td className="spending">{sum}€</td>
      ) : (
        <td className="income">{sum}€</td>
      )}
      {/* <!-- Example split danger button --> */}

      <td>
        {showDelete ? (
          <Fragment>
            <Checkbox
              checked={checked.checked}
              onClick={handleChange}
              inputProps={{ "aria-label": "primary checkbox" }}
            />
          </Fragment>
        ) : (
          <Fragment>
            <TransActionBtn
              id={_id}
              accountId={account.account._id}
              transaction={transaction}
            />
          </Fragment>
        )}
      </td>
    </tr>
  );
};

AccountTransactionItem.propTypes = {
  account: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  account: state.account,
});

export default connect(mapStateToProps, {
  addToCurrentTransactions,
  removeFromCurrentTransactions,
})(AccountTransactionItem);
