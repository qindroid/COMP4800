import React, { Suspense } from "react";
// import {
//   HashRouter as Router,
//   Route,
//   Redirect,
//   Switch,
//   Routes,
// } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CookiesProvider } from "react-cookie";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import "./App.css";
import "./tailwind_compiled.css";
import "./chat.css";
import store from "./store";

// Pages
import Landing from "./components/landing/Landing";
import About from "./pages/about/About";

// Components
import Navigation from "./components/navigation/Navigation";

const Login = React.lazy(() => import("./components/login/Login"));
const Main = React.lazy(() => import("./components/main/Main"));
const Sample = React.lazy(() => import("./components/sample/Sample"));

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
      <div>
        <Navigation />

        <React.StrictMode>
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Router>
        </React.StrictMode>
      </div>
      // <CookiesProvider>
      //   <Suspense
      //     fallback={
      //       <Spin
      //         size="large"
      //         tip="Loading..."
      //         indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      //       >
      //         <div className="App" />
      //       </Spin>
      //     }
      //   >
      //     <Spin
      //       size="large"
      //       spinning={this.state.bLoading}
      //       tip="Loading..."
      //       indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      //     >
      //       <div class="chat-notification">
      //         <div class="chat-notification-logo-wrapper">
      //           <img
      //             class="chat-notification-logo"
      //             src="/img/logo.svg"
      //             alt="ChitChat Logo"
      //           />
      //         </div>
      //         <div class="chat-notification-content">
      //           <h4 class="chat-notification-title">ChitChat</h4>
      //           <p class="chat-notification-message">You have a new message!</p>
      //         </div>
      //       </div>

      //       <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
      //         <div class="shrink-0">
      //           <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo"></img>
      //         </div>
      //         <div>
      //           <div class="text-xl font-medium text-black">ChitChat</div>
      //           <p class="text-slate-500">You have a new message!</p>
      //         </div>
      //       </div>

      //       <div className="App">
      //         <Router>
      //           <Switch>
      //             <Redirect path="/" to="/login" exact />
      //             <Route path="/login" component={Login} exact />
      //             <Route path="/main" component={Main} />
      //             <Route path="/sample" component={Sample} />
      //           </Switch>
      //         </Router>
      //       </div>
      //     </Spin>
      //   </Suspense>
      // </CookiesProvider>
    );
  }
}

export default App;
