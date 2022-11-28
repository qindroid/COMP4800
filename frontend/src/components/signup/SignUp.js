import React from "react";
import { Row, Form, Col, Input, Button, message, Image } from "antd";
import axios from "axios";
import utils from "../../common/Utils";
import "./SignUp.css";
import "../../store";
import store from "../../store";
import login_logo from "../../images/logo-color.png";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { Link } from "react-router-dom";
import PricingCard from "./CardItem";
import "./CardItem.css";
import { USER_REGISTER_ROUTE } from "../../common/urls";

import Navbar from "../navigation/Navigation";


const cardsData = [
  {
    id: 1,
    type: "free",
    title: "Free Plan",
    description: "7 days free premium trial",
    price: 0.0,
    recurrency: 0.0,
    mostPopular: false,
    data: ["Free charts", "1 Cashflow"],
    clickMe: Date.now() + 1000 * 60 * 60 * 24 * 7,
  },
  {
    id: 2,
    type: "pro",
    title: "Pro Plan",
    description: "30 days",
    price: 9.99,
    recurrency: 8.99,
    mostPopular: true,
    data: ["Advanced charts", "Unlimited Cashflow", "24/7 Support"],
    clickMe: Date.now() + 1000 * 60 * 60 * 24 * 30,
  },
];
let _expired = new Date();
class SignUp extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    this.id = 0;
    this.formRef = React.createRef();

    this.onFinish = this.onFinish.bind(this);
    // this.onGoback = this.onGoback.bind(this);

    this.state = {
      isAdmin: false,
    };
  }

  componentDidMount() {
    window.document.title = "SignUp - JLLSS";
  }

  setLoading(bLoading) {
    let action = {
      type: "setLoading",
      value: bLoading,
    };

    store.dispatch(action);
  }

  onFinish(values) {
    this.setLoading(true);
    let url = USER_REGISTER_ROUTE;
    let self = this;
    console.log("values", url);
    values["firstname"] = values["username"];
    values["lastname"] = values["username"];
    // values["expired"] = _expired;
    axios({
      method: "POST",
      url: url,
      data: values,
    })
      .then(function (res) {
        self.setLoading(false);
        console.log(values);
        message.success("Create user successfully");
        self.props.history.push("/login");
      })
      .catch(function (err) {
        self.setLoading(false);
        message.error(err.message);
      });
  }

  onGoback() {
    // this.props.history.push("/login");
  }

  render() {
    return (
      <>
        <Navbar />
        <Row justify="center" align="middle" className="container">
          <Col span={10}>
            <Row className="logo">
              <Image preview={false} src={login_logo} />
            </Row>
            {/* User Enter username & password */}
            <Form name="basic" onFinish={this.onFinish} ref={this.formRef}>
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input the username",
                  },
                ]}
              >
                <Input placeholder="Username" size="large" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "The length is at least 5",
                    min: 5,
                  },
                ]}
              >
                <Input.Password placeholder="Password" size="large" />
              </Form.Item>

              <div className="app-wrapper">
                {cardsData.map((props) => {
                  return (
                    <PricingCard
                      {...props}
                      key={props.id}
                      clickMe={() => {
                        _expired = props.clickMe;
                      }}
                    />
                  );
                })}
              </div>

            </Form>
          </Col>
        </Row>
      </>
    );
  }
}

export default withCookies(SignUp);
