import React, { Suspense } from "react";
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter,
} from "react-router-dom";
import { Cookies, CookiesProvider } from "react-cookie";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./App.css";
import "./tailwind_compiled.css";
import store from "./store";

// Pages 
import Navbar from "./components/navigation/Navigation";
import Landing from "./components/landing/Landing";
import About from "./pages/about/About";
import Error from "./pages/404/404";

const Login = React.lazy(() => import("./components/login/Login"));
const SignUp = React.lazy(() => import("./components/signup/SignUp"));
const Main = React.lazy(() => import("./components/main/Main"));

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      bLoading: false,
    };
  }

  componentDidMount() {
    let self = this;
    this.unsubscribe = store.subscribe(() => {
      self.setState({
        bLoading: store.getState().bLoading,
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }


  render() {
    return (
      <CookiesProvider>
        <Suspense
          fallback={
            <Spin
              size="large"
              tip="Loading..."
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            >
              <div className="App" />
            </Spin>
          }
        >
          <Spin
            size="large"
            spinning={this.state.bLoading}
            tip="Loading..."
            indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
          >
            <div className="App">
              <BrowserRouter>
                <Switch>

                  <Redirect path="/" to="/landing" exact />

                  <Route path="/landing" component={Landing} />
                  <Route path="/about" component={About} />

                  <Route path="/login" component={Login} exact />
                  <Route path="/SignUp" component={SignUp} exact />
                  <Route path="/main" component={Main} />

                  <Route path="/*" component={Error} />
                </Switch>
              </BrowserRouter>
            </div>
          </Spin>
        </Suspense>
      </CookiesProvider>
    );
  }
}

export default App;
