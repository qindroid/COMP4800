import React from "react";

import CreateCashflow from "./CreateCashflow";
import { ShowCashflow } from "./ShowCashflow";
import { getCashflow, createCashflow } from "../../common/urls";

class Cashflow extends React.Component {

  state = {
    type: "",
    amount: "",
    description: ""
  };

  getCashflow = () => {
    getCashflow()
      .then((response) => {
        console.log(response);
        this.setState({ type: response.word });
      })
      .catch((error) => {
        console.log(error);
      }
      );
  };

  createCashflow = (e) => {
    createCashflow(this.state.cashflow)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onChangeForm = (e) => {
    let cashflow = this.state.cashflow;

    if (e.target.name === "type") {
      cashflow.type = e.target.value;
    } else if (e.target.name === "amount") {
      cashflow.amount = e.target.value;
    } else if (e.target.name === "description") {
      cashflow.description = e.target.value;
    }
    this.setState({ cashflow });
  };

  render() {
    return (
      <>
        <CreateCashflow
          onChangeForm={this.onChangeForm}
          createCashflow={this.createCashflow}
        />
        <ShowCashflow getCashflow={this.getCashflow} cashflow={this.state.type} />
        {/* {this.getCashflow()} */}
      </>
    );
  }
}

export default Cashflow;