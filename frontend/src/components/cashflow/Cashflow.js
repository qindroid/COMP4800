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
          <div>
            <p>Enter cashflow data:</p>
            <form>
              <div>
                <label for="type"> Type: </label>
                <input type="text" id="type"/>
              </div>
              <div>
                <label for="amount"> Amount: </label>
                <input type="number" id="amount"/>
              </div>
              <div>
                <label for="description"> Description: </label>
                <input type="text" id="description"/>
              </div>
              <div>
                <label for="referenceType"> Reference Type: </label>
                <input type="text" id="referenceType"/>
              </div>
              <button onClick={this.createCashflow}>Create Cashflow</button>
            </form>
          </div>
        );

    }

}

export default withCookies(CashflowManager);