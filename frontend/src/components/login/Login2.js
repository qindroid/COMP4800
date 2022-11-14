// import React, { useState } from "react";
// import { Row, Form, Col, Input, Button, message, Image } from "antd";
// import axios from "axios";
// import utils from "../../common/Utils";
// import "./Login.css";
// import "../../store";
// import store from "../../store";
// import login_logo from "../../images/main_logo.png";
// import { instanceOf } from "prop-types";
// import { withCookies, Cookies } from "react-cookie";
// import { useNavigate } from "react-router-dom";

// const About = () => {
//     const navigate = useNavigate();
//     return (navigate("/landing"));
// };

// function Login(props) {

//     const propTypes = useState({
//         cookies: instanceOf(Cookies).isRequired,
//     });

//     const componentDidMount = () => {
//         window.document.title = "Login - JLLSS";

//         checkLogin();
//     }

//     const setLoading = (bLoading) => {
//         let action = {
//             type: "setLoading",
//             value: bLoading,
//         };

//         store.dispatch(action);
//     }

//     const onFinish = (values) => {

//         setLoading(true);

//         let self = this;
//         axios
//             .post(utils.getDomain() + "api/user/login", values)
//             .then(function (res) {
//                 if (0 === res.data.code) {
//                     const { cookies } = propTypes.cookies;
//                     cookies.set("token", res.data.data.token, { path: "/" });

//                     // self.props.navigate("/main");
//                     // NavigateToMain("/main");
//                 } else {
//                     message.error(res.data.message);
//                 }
//                 setLoading(false);
//             })
//             .catch(function (err) {
//                 message.error(err.message);
//                 setLoading(false);
//             });
//     }

//     const checkLogin = () => {
//         let self = this;
//         const { cookies } = propTypes.cookies;

//         if (!cookies.get("token")) {
//             return;
//         }
//         // Get user information API
//         axios({
//             method: "GET",
//             url: utils.getDomain() + "api/user/info",
//             headers: { token: cookies.get("token") },
//         })
//             .then(function (res) {
//                 if (0 === res.data.code) {
//                     console.log("Login success");
//                 }
//             })
//             .catch(function (err) {
//                 message.error(err.message);
//             });
//     }

//     return (
//         <Row justify="center" align="middle" className="container">

//             <Col span={10}>
//                 <Row className="logo">
//                     <Image
//                         preview={false}
//                         src={login_logo}
//                     />
//                 </Row>
//                 {/* User Enter username & password */}
//                 <Form name="basic" onFinish={onFinish}>
//                     <Form.Item
//                         name="username"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: "Please input the username",
//                             },
//                         ]}
//                     >
//                         <Input placeholder="Username" size="large" />
//                     </Form.Item>

//                     <Form.Item
//                         name="password"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: "Please input the password",
//                             },
//                         ]}
//                     >
//                         <Input.Password
//                             placeholder="Password"
//                             size="large"
//                         />
//                     </Form.Item>

//                     <Form.Item>
//                         {/* Click to login */}
//                         <Button type="primary" htmlType="submit" block>
//                             Login
//                         </Button>
//                         {/* {MyBackButton()} */}
//                     </Form.Item>
//                 </Form>
//             </Col>
//         </Row>
//     );

// }

// export default Login;
