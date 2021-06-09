import React from "react";
import AddAccountModal from "../account/AddAccountModal";
import AddAccountBtn from "../account/AddAccountBtn";
import AccountListItem from "./AccountListItem";

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
          <AccountListItem />
          <AccountListItem />
          <AccountListItem />
          <AccountListItem />
          <AccountListItem />
          <AccountListItem />
        </tbody>
      </table>
    </div>
  );
};

export default AccountList;
