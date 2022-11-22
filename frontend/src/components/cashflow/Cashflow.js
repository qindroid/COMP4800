import axios from "axios";
import utils from "../../common/Utils";
import "../../store";
// import store from "../../store";
// import login_logo from "../../images/main_logo.png";
import { instanceOf } from "prop-types";
// import { Row, Form, Col, Input, Button, message, Image } from "antd";
import { message } from "antd";
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
    console.log("createCashflow");

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
          {/* <label class="inline-block text-sm text-gray-500" for="color">
            Select type
          </label> */}
          <div class="relative z-0 mb-6 w-full group">
            {/* <input
              type="text"
              id="type"
              class="input__style focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label for="type" class="label__style">
              Type
            </label> */}
            {/* <p class="input__style focus:ring-0 focus:border-blue-600 peer">
              Type
            </p> */}
            {/* <select class="type__dropdown focus:shadow-outline"> */}
            <select class="block w-full py-3 pl-4 pr-8 bg-white border border-gray-300 rounded-sm appearance-none cursor-pointer focus:outline-none hover:border-gray-400">
              <option disabled="disabled" selected="selected" value="">
                Select type
              </option>
              <option value="in">In</option>
              <option value="out">Out</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <input
              type="text"
              id="amount"
              class="input__style focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label for="amount" class="label__style">
              Amount
            </label>
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <input
              type="text"
              id="description"
              class="input__style focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label for="description" class="label__style">
              Name of company
            </label>
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <input
              type="text"
              id="referenceType"
              class="input__style focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label for="referenceType" class="label__style">
              Reference Type
            </label>
          </div>
          <button
            type="button"
            class="createCashflow__button"
            onClick={this.createCashflow}
          >
            Create Cashflow
          </button>
        </form>
      </div>
    );
  }
}

export default withCookies(CashflowManager);
