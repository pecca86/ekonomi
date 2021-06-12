import React from "react";

const TESTITEM = ({ data }) => {
  return (
    <div>
      <ul>
        <li>Calc sum: {data.calculatedTransactionSum}£</li>
        <li>
          <ol>
            {data.data.map((entry) => (
              <li>
                {entry.description}: {entry.sum}€ {entry.transactionDate}
              </li>
            ))}
          </ol>
        </li>
      </ul>
    </div>
  );
};

export default TESTITEM;
