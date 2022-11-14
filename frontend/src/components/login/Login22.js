import React from "react";
import { Row, Form, Col, Input, Button, message, Image } from "antd";
import axios from "axios";
import utils from "../../common/Utils";
import "./Login.css";
import "../../store";
import store from "../../store";
import login_logo from "../../images/logo-color.png";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { Link } from "react-router-dom";


class Login extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    this.onFinish = this.onFinish.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }

  componentDidMount() {
    window.document.title = "Login - JLLSS";

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
      .post(utils.getDomain() + "api/user/login", values)
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
      // <div class="login">
      //   <div class="login__content">
      //     <div class="login__img">
      //       <img src={login_logo} alt="" />
      //     </div>

      //     {/* User Enter username & password */}
      //     <div class="login__forms">
      //       <Form name="basic" onFinish={this.onFinish} class="login__registre" id="login-in">
      //         <h1 class="login__title">Sign In</h1>
      //         <i class='bx bx-user login__icon'></i>
      //         <Form.Item class="login__box"
      //           name="username"
      //           rules={[
      //             {
      //               required: true,
      //               message: "Please input the username",
      //             },
      //           ]}
      //         >
      //           <Input type="text" placeholder="Username" class="login__input" />
      //         </Form.Item>

      //         <Form.Item
      //           name="password"
      //           rules={[
      //             {
      //               required: true,
      //               message: "Please input the password",
      //             },
      //           ]}
      //         >
      //           <Input.Password placeholder="Password" size="large" />
      //         </Form.Item>

      //         <Form.Item>
      //           {/* Click to login */}
      //           <Button type="primary" htmlType="submit" block>
      //             Login
      //           </Button>
      //         </Form.Item>
      //         {/* Click to SignUp */}
      //         <Button color="primary" onClick={""} block>
      //           <Link to={"/SignUp"} target="_blank">
      //             SignUp
      //           </Link>
      //         </Button>
      //       </Form>
      //     </div>
      //   </div>
      // </div>

      <div class="login">
        <div class="login__content">

          <div class="login__img">
            <img src={login_logo} alt="" />
          </div>

          <div class="login__forms">
            <Form onFinish={this.onFinish} action="" class="login__registre" id="login-in">
              <h1 class="login__title">Sign In</h1>

              <div class="login__box">
                <i class='bx bx-user login__icon'></i>
                <Input placeholder="Username" class="login__input" />
              </div>

              <div class="login__box">
                <i class='bx bx-lock-alt login__icon'></i>
                <Input type="password" placeholder="Password" class="login__input" />
              </div>

              <Input type="submit" value="Send" class="login__buton" />

              <div>
                <span class="login__signin" id="sign-up">Sign Up</span>
              </div>
            </Form>
          </div>
        </div>
      </div>

      // <div class="login">
      //   <div class="login__content">
      //     <div class="login__img">
      //       <img src="assets/img/img-login.svg" alt="" />
      //     </div>

      //     <div class="login__forms">
      //       <form onFinish={this.onFinish} action="" class="login__registre" id="login-in">
      //         <h1 class="login__title">Sign In</h1>

      //         <div class="login__box">
      //           <i class='bx bx-user login__icon'></i>
      //           <input placeholder="Username" class="login__input" />
      //         </div>

      //         <div class="login__box">
      //           <i class='bx bx-lock-alt login__icon'></i>
      //           <input type="password" placeholder="Password" class="login__input" />
      //         </div>

      //         <a href="#" class="login__button">Sign In</a>
      //         <input type="submit" value="Send" class="login__buton" />

      //         <div>
      //           <span class="login__signin" id="sign-up">Sign Up</span>
      //         </div>
      //       </form>
      //     </div>
      //   </div>
      // </div>

    );
  }
}

export default withCookies(Login);