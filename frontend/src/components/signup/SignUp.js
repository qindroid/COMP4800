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
  },
];

class SignUp extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    this.onFinish = this.onFinish.bind(this);
    this.checkSignUp = this.checkLogin.bind(this);
  }

  componentDidMount() {
    window.document.title = "SignUp - JLLSS";
    this.checkLogin();
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

    let self = this;
    axios
      .post(utils.getDomain() + "api/user/create", values)
      .then(function (res) {
        if (0 === res.data.code) {
          const { cookies } = self.props;
          cookies.set("token", res.data.data.token, { path: "/" });

          self.props.history.push("/main");
        } else {
          message.error(res.data.message);
        }
        self.setLoading(false);
      })
      .catch(function (err) {
        message.error(err.message);
        self.setLoading(false);
      });
  }

  checkLogin() {
    let self = this;
    const { cookies } = self.props;

    if (!cookies.get("token")) {
      return;
    }
    // Get user information API
    axios({
      method: "GET",
      url: utils.getDomain() + "api/user/info",
      headers: { token: cookies.get("token") },
    })
      .then(function (res) {
        if (0 === res.data.code) {
          self.props.history.push("/main");
        }
      })
      .catch(function (err) {
        message.error(err.message);
      });
  }

  render() {
    return (
      <Row justify="center" align="middle" className="container">
        <Col span={10}>
          <Row className="logo">
            <Image preview={false} src={login_logo} />
          </Row>
          {/* User Enter username & password */}
          <Form name="basic" onFinish={this.onFinish}>
            <Form.Item
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
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input the password",
                },
              ]}
            >
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>

            <Form.Item>
              {/* Click to login */}
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
            {/* Click to SignUp */}
            <Button color="primary" onClick={""} block>
              <Link to={"/main/dashboard"} target="_blank">
                SignUp
              </Link>
            </Button>
          </Form>
        </Col>
        <div className="app-wrapper">
          {cardsData.map((props) => {
            return <PricingCard {...props} key={props.id} clickMe={() => {
                console.log("clicked");
            }} />;
          })}
        </div>
      </Row>
    );
  }
}

export default withCookies(SignUp);
