import axios from "axios";
import utils from "../../common/Utils";
import "../../store";
// import store from "../../store";
// import login_logo from "../../images/main_logo.png";
import { instanceOf } from "prop-types";
// import { Row, Form, Col, Input, Button, message, Image } from "antd";
import {message} from "antd";
import { withCookies, Cookies } from "react-cookie";
import React from "react";
import { CASHFLOW_CREATE_ROUTE } from "../../common/urls";
import "./Cashflow.css";

class CashflowManager extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    this.createCashflow = this.createCashflow.bind(this);
  }
  createCashflow() {
    let self = this;
    const { cookies } = self.props;

    axios({
      method: "POST",
      url: CASHFLOW_CREATE_ROUTE,
      // headers: { token: cookies.get("token") },
      // data: {
      //   Type: "Income",
      //   Amount: 100,
      //   Description: "Digimon stickers",
      //   ReferenceType: "Stickers",
      // },
      data: {
        type: document.getElementById("type").value,
        amount: parseFloat(document.getElementById("amount").value),
        description: document.getElementById("description").value,
        projectType: document.getElementById("referenceType").value,
      },
    })
      .then(function (res) {
        console.log(res);
        if (200 === res.status) {
          message.success("Cashflow created successfully");
        } else {
          message.error(res.data.message);
        }

        // if (0 === res.data.code) {
        //   //console.log(res.data.data);
        //   console.log(res.data.message);
        // } else {
        //   console.log("error");
        //   message.error(res.data.message);
        //   console.log(res.data.message);
        // }
        //navigate to cashflow page
        self.props.history.push("/main/cashflow");
      })
      .catch(function (err) {
        message.error(err.message);
      });
  }

  render() {
    return (
      <div class="cashflow__container">
        <p class="form__title">Enter cashflow data:</p>
            <form>
              <div class="relative z-0 mb-6 w-full group">
                  <input type="text" id="type" class="input__style focus:ring-0 focus:border-blue-600 peer " placeholder=" " required style= {{ color : "black" }}/>
                  <label for="type" class="label__style">Type</label>
              </div>
              <div class="relative z-0 mb-6 w-full group">
                  <input type="text" id="amount" class="input__style focus:ring-0 focus:border-blue-600 peer" placeholder=" " required style= {{ color : "black" }}/>
                  <label for="amount" class="label__style">Amount</label>
              </div>
              <div class="relative z-0 mb-6 w-full group">
                  <input type="text" id="description" class="input__style focus:ring-0 focus:border-blue-600 peer" placeholder=" " required style= {{ color : "black" }}/>
                  <label for="description" class="label__style">Description</label>
              </div>
              <div class="relative z-0 mb-6 w-full group">
                  <input type="text" id="referenceType" class="input__style focus:ring-0 focus:border-blue-600 peer"  placeholder=" " required style= {{ color : "black" }}/>
                  <label for="referenceType" class="label__style">Reference Type</label>
              </div>
              <button class="createCashflow__button" onClick={this.createCashflow}>Create Cashflow</button>
            </form>
      </div>
    );
  }
}

export default withCookies(CashflowManager);
