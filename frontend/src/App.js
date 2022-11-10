import React, { Suspense } from "react";
import "./App.css";
import "./tailwind_compiled.css";

// import CreateCashflow from "./components/cashflow/CreateCashflow";
import Cashflow from "./components/cashflow/Cashflow";

class App extends React.Component {


  render() {
    return (
      <>
        <Cashflow />
      </>
    );
  }
}

export default App;
