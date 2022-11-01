import axios from "axios";
import utils from "../../common/Utils";
import "../../store";
import store from "../../store";
import login_logo from "../../images/main_logo.png";
import { instanceOf } from "prop-types";
import { Row, Form, Col, Input, Button, message, Image } from "antd";
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
          data: {
            Type: "Income",
            Amount: 100,
            Description: "Digimon stickers",
            ReferenceType: "Stickers",
          },
        })
          .then(function (res) {
            if (0 === res.data.code) {
              console.log(res.data.data);
            } else {
              console.log("error");
              message.error(res.data.message);
            }
          })
          .catch(function (err) {
            message.error(err.message);
          });
      }
    
    render() {

        return (
          <div>
            <button onClick={this.createCashflow}>Create Cashflow</button>
          </div>
        );

    }

}

export default withCookies(CashflowManager);