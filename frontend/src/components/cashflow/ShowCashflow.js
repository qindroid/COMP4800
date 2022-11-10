import React from "react";

export const ShowCashflow = ({ cashflow, getCashflow }) => {

  const CashflowRow = (cashflow, index) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{cashflow.word}</td>
      </tr>
    )
  }

  // const CashflowTable = cashflow.map((cashflow, index) => CashflowRow(cashflow, index));

  return (
    <div className="btn">
      <button type="button" onClick={(e) => getCashflow()} className="btn btn-warning">Get all cashflow</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{cashflow}</th>
          </tr>
        </thead>
        <tbody>
          {/* {CashflowTable} */}
        </tbody>
      </table>
    </div>

  );
};