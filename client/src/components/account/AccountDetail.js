import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateAccount } from "../../actions/account/accountActions";

const AccountDetail = ({ account, updateAccount }) => {
  const {
    account: { IBAN, name, balance, savingsGoal, _id },
  } = account;

  useEffect(() => {
    setFormData({
      iban: IBAN,
      name: name,
      balance: balance,
      savingsGoal: savingsGoal,
    });
  }, [IBAN, name, balance, savingsGoal]);

  // Component state for showing or hiding edit fields
  const [hideItem, setHideItem] = useState({
    hideIban: true,
    hideName: true,
    hideBalance: true,
    hideSavingsGoal: true,
  });

  // Component state for taking input from edit fields
  const [formData, setFormData] = useState({
    iban: IBAN,
    name: name,
    balance: balance,
    savingsGoal: savingsGoal,
  });

  // when changing values in edit fields
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Toggle show / hide edit field
  const onToggleIban = (e) => {
    setHideItem({ ...hideItem, hideIban: !hideItem.hideIban });
    setFormData({ ...formData, iban: IBAN });
  };
  const onToggleName = (e) => {
    setHideItem({ ...hideItem, hideName: !hideItem.hideName });
    setFormData({ ...formData, name: name });
  };
  const onToggleBalance = (e) => {
    setHideItem({ ...hideItem, hideBalance: !hideItem.hideBalance });
    setFormData({ ...formData, balance: balance });
  };
  const onToggleSavingsGoal = (e) => {
    setHideItem({ ...hideItem, hideSavingsGoal: !hideItem.hideSavingsGoal });
    setFormData({ ...formData, savingsGoal: savingsGoal });
  };

  // Submit when green checkmark is clicked
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      IBAN: formData.iban,
      name: formData.name,
      balance: formData.balance,
      savingsGoal: formData.savingsGoal,
    };
    updateAccount(data, _id);

    setHideItem({
      ...hideItem,
      hideBalance: true,
      hideIban: true,
      hideName: true,
      hideSavingsGoal: true,
    });
  };

  return (
    <div className="container shadow-sm p-3 mb-0 mt-1 bg-body rounded">
      {/* BALANCE */}
      <div className="row justify-content-start mt-3">
        <div className="col-7 fs-4 ">Balance</div>
        <div
          className={`col-3 fs-4 ${
            balance >= 0 ? "text-success" : "text-danger"
          } `}
        >
          {hideItem.hideBalance && <Fragment>{balance.toFixed(2)}€</Fragment>}
        </div>
        <div className="col-1">
          <span>
            {hideItem.hideBalance ? (
              <i
                onClick={onToggleBalance}
                className="material-icons prefix text-dark action-icon"
              >
                mode_edit
              </i>
            ) : (
              <span>
                <i
                  onClick={onToggleBalance}
                  className="material-icons prefix text-danger action-icon"
                >
                  close
                </i>

                <i
                  onClick={onSubmit}
                  className="material-icons prefix text-success action-icon"
                >
                  check
                </i>
              </span>
            )}
          </span>
        </div>
        {hideItem.hideBalance ? (
          ""
        ) : (
          <p>
            <input
              onChange={onChange}
              type="number"
              name="balance"
              value={formData.balance}
            />
          </p>
        )}
      </div>
      {/* NAME */}
      <div className="row justify-content-start mt-0 mb-1">
        <div className="col-10 fs-6 fw-light">
          {hideItem.hideName && <Fragment>{name}</Fragment>}
        </div>
        <div className="col-1 fs-6">
          <span>
            {hideItem.hideName ? (
              <i
                onClick={onToggleName}
                className="tiny material-icons prefix action-icon"
              >
                mode_edit
              </i>
            ) : (
              <span>
                <i
                  onClick={onToggleName}
                  className="material-icons prefix text-danger action-icon"
                >
                  close
                </i>

                <i
                  onClick={onSubmit}
                  className="material-icons prefix text-success action-icon"
                >
                  check
                </i>
              </span>
            )}
          </span>
        </div>
        {hideItem.hideName ? (
          ""
        ) : (
          <p>
            <input
              onChange={onChange}
              type="text"
              name="name"
              value={formData.name}
            />
          </p>
        )}
      </div>

      {/* IBAN */}
      <div className="row justify-content-start mt-0 mb-0">
        <div className="col-10 fs-6 fw-light">
          {hideItem.hideIban && <Fragment>{IBAN}</Fragment>}
        </div>
        <div className="col-1 fs-6">
          <span>
            {hideItem.hideIban ? (
              <i
                onClick={onToggleIban}
                className=" tiny material-icons prefix action-icon"
              >
                mode_edit
              </i>
            ) : (
              <span>
                <i
                  onClick={onToggleIban}
                  className="material-icons prefix text-danger action-icon"
                >
                  close
                </i>

                <i
                  onClick={onSubmit}
                  className="material-icons prefix text-success action-icon"
                >
                  check
                </i>
              </span>
            )}
          </span>
        </div>
        {hideItem.hideIban ? (
          ""
        ) : (
          <p>
            <input
              onChange={onChange}
              type="text"
              name="iban"
              value={formData.iban}
            />
          </p>
        )}
      </div>
      {/* SAVINGS GOAL */}
      <div className="row justify-content-start mt-3">
        <div className="col-7 fs-6 fw-light">Savings Goal</div>
        <div
          className={`col-3 fs-6 ${
            balance >= 0 ? "text-success" : "text-danger"
          } `}
        >
          {hideItem.hideSavingsGoal && <Fragment>{savingsGoal.toFixed(2)}€</Fragment>}
        </div>
        <div className="col-1">
          <span>
            {hideItem.hideSavingsGoal ? (
              <i
                onClick={onToggleSavingsGoal}
                className="tiny material-icons prefix text-dark action-icon"
              >
                mode_edit
              </i>
            ) : (
              <span>
                <i
                  onClick={onToggleSavingsGoal}
                  className="material-icons prefix text-danger action-icon"
                >
                  close
                </i>

                <i
                  onClick={onSubmit}
                  className="material-icons prefix text-success action-icon"
                >
                  check
                </i>
              </span>
            )}
          </span>
        </div>
        {hideItem.hideSavingsGoal ? (
          ""
        ) : (
          <p>
            <input
              onChange={onChange}
              type="number"
              name="savingsGoal"
              value={formData.savingsGoal}
            />
          </p>
        )}
      </div>
    </div>
  );
};

AccountDetail.propTypes = {
  updateAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  account: state.account,
});

export default connect(mapStateToProps, { updateAccount })(AccountDetail);
