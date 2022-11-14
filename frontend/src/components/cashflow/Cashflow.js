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
import "./Cashflow.css";

class CashflowManager extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    constructor(props){
        super(props);


        this.createCashflow = this.createCashflow.bind(this);

    }
    createCashflow() {
        let self = this;
        const { cookies } = self.props;
    
        console.log("createCashflow works!");
        axios({
          method: "post",
          url: utils.getDomain() + "api/cashflow/create",
          headers: {token: cookies.get("token")},
          // data: {
          //   Type: "Income",
          //   Amount: 100,
          //   Description: "Digimon stickers",
          //   ReferenceType: "Stickers",
          // },
          data: {
            type: document.getElementById("type").value,
            amount: document.getElementById("amount").value,
            description: document.getElementById("description").value,
            referenceType: document.getElementById("referenceType").value,
          },
        })
          .then(function (res) {
            if (0 === res.data.code) {
              //console.log(res.data.data);
              console.log(res.data.message);

            } else {
              console.log("error");
              message.error(res.data.message);
              console.log(res.data.message);
            }
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
                  <input type="text" id="type" class="input__style focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label for="type" class="label__style">Type</label>
              </div>
              <div class="relative z-0 mb-6 w-full group">
                  <input type="text" id="amount" class="input__style focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label for="amount" class="label__style">Amount</label>
              </div>
              <div class="relative z-0 mb-6 w-full group">
                  <input type="text" id="description" class="input__style focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label for="description" class="label__style">Description</label>
              </div>
              <div class="relative z-0 mb-6 w-full group">
                  <input type="text" id="referenceType" class="input__style focus:ring-0 focus:border-blue-600 peer"  placeholder=" " required />
                  <label for="referenceType" class="label__style">Reference Type</label>
              </div>
              <button class="createCashflow__button" onClick={this.createCashflow}>Create Cashflow</button>
            </form>
          </div>
        );

    }

}

export default withCookies(CashflowManager);