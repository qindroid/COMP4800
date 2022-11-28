import React from 'react';

// CSS
import "./Landing.css";

// Components
import Main from "./Main";
import Navbar from "../navigation/Navigation";

const Landing = () => {
    return (
      <div>
        {" "}
        <Navbar />
        <Main />
      </div>
    );
}

export default Landing;


