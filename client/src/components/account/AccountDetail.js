import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateAccount } from "../../actions/account/accountActions";

const AccountDetail = ({ account, updateAccount }) => {
  const {
    account: { IBAN, name, balance, _id },
  } = account;

  // Component state for showing or hiding edit fields
  const [hideItem, setHideItem] = useState({
    hideIban: true,
    hideName: true,
    hideBalance: true,
  });

  // Component state for taking input from edit fields
  const [formData, setFormData] = useState({
    iban: IBAN,
    name: name,
    balance: balance,
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

  // Submit when green checkmark is clicked
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      IBAN: formData.iban,
      name: formData.name,
      balance: formData.balance,
    };
    updateAccount(data, _id);

    setHideItem({
      ...hideItem,
      hideBalance: true,
      hideIban: true,
      hideName: true,
    });
  };

  return (
    <div className="container shadow-sm p-3 mb-2 mt-1 bg-body rounded">
      {/* BALANCE */}
      <div class="row justify-content-start mt-3">
        <div class="col-4 fs-4">Balance:</div>
        <div
          class={`col-6 fs-4 ${balance >= 0 ? "text-success" : "text-danger"}`}
          fs-2
        >
          {balance}€
        </div>
        <div class="col-1">
          <span>
            {hideItem.hideBalance ? (
              <i
                onClick={onToggleBalance}
                className="material-icons prefix text-dark"
              >
                mode_edit
              </i>
            ) : (
              <span>
                <i
                  onClick={onToggleBalance}
                  className="material-icons prefix text-danger"
                >
                  close
                </i>

                <i
                  onClick={onSubmit}
                  className="material-icons prefix text-success"
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

      {/* IBAN */}
      <div class="row justify-content-start mt-3 mb-1">
        <div class="col-10 fs-6">{IBAN}</div>
        <div class="col-1 fs-6">
          <span>
            {hideItem.hideIban ? (
              <i onClick={onToggleIban} className="material-icons prefix">
                mode_edit
              </i>
            ) : (
              <span>
                <i
                  onClick={onToggleIban}
                  className="material-icons prefix text-danger"
                >
                  close
                </i>

                <i
                  onClick={onSubmit}
                  className="material-icons prefix text-success"
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

      {/* NAME */}
      <div class="row justify-content-start mt-0">
        <div class="col-10 fs-6">{name}</div>
        <div class="col-1 fs-6">
          <span>
            {hideItem.hideName ? (
              <i onClick={onToggleName} className="material-icons prefix">
                mode_edit
              </i>
            ) : (
              <span>
                <i
                  onClick={onToggleName}
                  className="material-icons prefix text-danger"
                >
                  close
                </i>

                <i
                  onClick={onSubmit}
                  className="material-icons prefix text-success"
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
    </div>
  );
};

AccountDetail.propTypes = {
  updateAccount: PropTypes.func.isRequired,
};

export default connect(null, { updateAccount })(AccountDetail);
