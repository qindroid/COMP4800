import React from "react";
import { Row, Col, Input, Form, message, Button, Checkbox } from "antd";
import { DoubleLeftOutlined } from "@ant-design/icons";
import utils from "../../common/Utils";
import axios from "axios";
import store from "../../store";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import {
  USER_DETAIL_ROUTE,
  USER_REGISTER_ROUTE,
  USER_UPDATE_ROUTE,
} from "../../common/urls";

class UserEdit extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    this.id = 0;
    this.formRef = React.createRef();

    this.onFinish = this.onFinish.bind(this);
    this.onGoback = this.onGoback.bind(this);

    this.state = {
      isAdmin: false,
    };
  }

  setLoading(bLoading) {
    let action = {
      type: "setLoading",
      value: bLoading,
    };

    store.dispatch(action);
  }

  loadData(id) {
    this.setLoading(true);

    let self = this;
    const { cookies } = self.props;
    // Staff info API, to get staff detail
    axios({
      method: "Get",
      url: USER_DETAIL_ROUTE + "" + id,
      headers: { token: cookies.get("token") },
    })
      .then(function (res) {
        console.log(res);
        self.setLoading(false);
        if (1 === res.data.code) {
          self.props.history.push("/login");
        } else if (200 === res.status) {
          self.formRef.current.setFieldsValue({
            username: res.data.userName,
            password: res.data.passwordHash,
          });
          self.setState({
            isAdmin: res.data.isAdmin,
          });
        } else {
          message.error(res.data.message);
        }
      })
      .catch(function (err) {
        self.setLoading(false);
        message.error(err.message);
      });
  }

  componentDidMount() {
    window.document.title = "User - JLLSS";

    this.id = this.props.match.params.id;
    if ("0" !== this.id) {
      this.loadData(this.id);
    }

    store.dispatch({
      type: "setMenuItem",
      value: ["/main/user"],
    });
  }

  onFinish(values) {
    this.setLoading(true);
    // if has staaff ==?update, if not ===> create a new one
    let url = "";
    if ("0" !== this.id) {
      url = USER_UPDATE_ROUTE;
      values.id = this.id;
      values.isAdmin = this.state.isAdmin;
      values["firstname"] = values["username"];
      values["lastname"] = values["username"];
      let self = this;
      const { cookies } = self.props;
      axios({
        method: "PUT",
        url: url + "" + this.id,
        headers: { token: cookies.get("token") },
        data: values,
      })
        .then(function (res) {
          self.setLoading(false);
          console.log(res);
          if (1 === res.data.code) {
            self.props.history.push("/login");
          } else if (200 === res.status) {
            self.props.history.push("/main/user");
          } else {
            message.error(res.data.message);
          }
        })
        .catch(function (err) {
          self.setLoading(false);
          message.error(err.message);
        });


    } else {
      url = USER_REGISTER_ROUTE;
      values.id = this.id;
      values.isAdmin = this.state.isAdmin;
      values["firstname"] = values["username"];
      values["lastname"] = values["username"];
      let self = this;
      const { cookies } = self.props;

      axios({
        method: "POST",
        url: url,
        headers: { token: cookies.get("token") },
        data: values,
      })
        .then(function (res) {
          self.setLoading(false);
          console.log(res);
          if (1 === res.data.code) {
            self.props.history.push("/login");
          } else if (200 === res.status) {
            self.props.history.push("/main/user");
          } else {
            message.error(res.data.message);
          }
        })
        .catch(function (err) {
          self.setLoading(false);
          message.error(err.message);
        });
    }

    
  }

  onGoback() {
    this.props.history.push("/main/user/");
  }

  render() {
    return (
      <Col span="24" style={{ backgroundColor: "#fff" }}>
        <Row style={{ marginBottom: "15px" }}>
          <Button
            type="link"
            onClick={this.onGoback}
            icon={<DoubleLeftOutlined />}
          >
            Back
          </Button>
        </Row>
        {/* Enter user detail */}
        <Form
          name="control-ref"
          labelCol={{
            span: 3,
          }}
          wrapperCol={{
            span: 20,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
          ref={this.formRef}
        >
          <Form.Item
            colon={false}
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "The length is at least 1",
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            colon={false}
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
            <Input placeholder="Password" type="password" />
          </Form.Item>
          {/* Check if the new user is admin */}
          <Form.Item colon={false} label="Admin access">
            <Checkbox
              checked={this.state.isAdmin}
              onChange={() => {
                this.setState({
                  isAdmin: !this.state.isAdmin,
                });
              }}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 3,
            }}
          >
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Col>
    );
  }
}

export default withCookies(UserEdit);
