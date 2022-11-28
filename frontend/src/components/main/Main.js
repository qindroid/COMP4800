import React from "react";
import {Route, Redirect, withRouter, Switch} from "react-router-dom";
import {Layout, Menu, message, Image} from "antd";
import axios from "axios";
import utils from "../../common/Utils";
import {
  UsergroupAddOutlined,
  SettingOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import store from "../../store";
import "./Main.css";
import main_logo from "../../images/logo-color.png";
import {USER_LOGOUT_ROUTE} from "../../common/urls";

const DashboardPage = React.lazy(() => import("../dashboard/Dashboard"));
const CashFlowManagerPage = React.lazy(() => import("../cashflow/Cashflow"));
const PasswordPage = React.lazy(() => import("../password/Password"));
const LogoutPage = React.lazy(() => import("../logout/Logout"));
const StaffPage = React.lazy(() => import("../staff/User"));
const StaffEdit = React.lazy(() => import("../staff/Edit"));
const CashflowPage = React.lazy(() => import("../cashflow/CashflowTable"));

const {Sider} = Layout;

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentItem: [],
    };

    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.setCurrentItem = this.setCurrentItem.bind(this);
    this.onClickLogout = this.onClickLogout.bind(this);
  }

  onMenuItemClick(event) {
    this.setCurrentItem(event.key);
    this.props.history.push(event.key);
  }

  setCurrentItem(item) {
    let action = {
      type: "setMenuItem",
      value: [item],
    };

    store.dispatch(action);
  }

  setLoading(bLoading) {
    let action = {
      type: "setLoading",
      value: bLoading,
    };

    store.dispatch(action);
  }

  onClickLogout() {
    this.setLoading(true);

    let self = this;
    axios
      .get(USER_LOGOUT_ROUTE)
      .then(function (res) {
        if (0 === parseInt(res.data.code) || 1 === parseInt(res.data.code)) {
          self.props.history.push("/");
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

  componentDidMount() {
    this.setLoading(false);
    let self = this;
    self.setState({
      currentItem: store.getState().currentItem,
    });

    this.unsubscribe = store.subscribe(() => {
      if (
        self.state.currentItem.length !== store.getState().currentItem.length ||
        self.state.currentItem[0] !== store.getState().currentItem[0]
      ) {
        self.setState({
          currentItem: store.getState().currentItem,
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <Layout className="container mt-5">
        <Layout>
          <Sider width={200} className="" style={{ background: "#FFFFFF" }}>
            <div className="logo">
              <Image preview={false} src={main_logo} background="white" />
            </div>
            <Menu
              mode="inline"
              defaultSelectedKeys={this.state.currentItem}
              selectedKeys={this.state.currentItem}
              style={{ height: "100%", borderRight: 0 }}
              onClick={this.onMenuItemClick}
              theme="light"
            >
              <Menu.Item key="/main/dashboard" icon={<DashboardOutlined />}>
                Dashboard
              </Menu.Item>
              <Menu.Item key="/main/cashflow" icon={<UsergroupAddOutlined />}>
                Cashflow
              </Menu.Item>
              <Menu.Item key="/main/user" icon={<UsergroupAddOutlined />}>
                Users
              </Menu.Item>
              <Menu.Item key="/main/password" icon={<SettingOutlined />}>
                Password
              </Menu.Item>
              <Menu.Item key="/main/logout" icon={<LogoutOutlined />}>
                Logout
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: "24px 24px 24px" }}>
            <Switch>
              <Redirect from="/main/" to="/main/dashboard" exact />
              <Route path="/main/dashboard" component={DashboardPage} exact />
              <Route
                path="/main/cashflow/add"
                component={CashFlowManagerPage}
                exact
              />
              <Route path="/main/password" component={PasswordPage} exact />
              <Route path="/main/cashflow" component={CashflowPage} exact />
              <Route path="/main/user" component={StaffPage} exact />
              <Route path="/main/user/edit/:id" component={StaffEdit} exact />
              <Route path="/main/logout" component={LogoutPage} exact />
            </Switch>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(Main);
