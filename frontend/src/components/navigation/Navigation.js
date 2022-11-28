import React from 'react';
import "./Navigation.css";
import { BrowserRouter, Redirect, Routes, Switch, Route, Link } from "react-router-dom";
import { Row, Form, Col, Input, Button, message, Image } from "antd";


import About from "../../pages/about/About";

function getNavMenu() {
  return document.getElementById('nav-menu');
}

function showMenu() {
  const navMenu = getNavMenu();
  navMenu.classList.toggle('show');
}

function hideMenu() {
  const navMenu = getNavMenu();
  navMenu.classList.remove('show');
}

function Navigation() {

  return (
    <header className="l-header">
      <nav className="nav bd-grid">
        <div>
          <a href="/" className="nav__logo">ThrivePlus</a>
        </div>

        <div className="nav__toggle" id="nav-toggle" onClick={showMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>

        </div>

        <div className="nav__menu" id="nav-menu" onClick={hideMenu}>
          <div className="nav__close" id="nav-close">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

          </div>

          <ul className="nav__list">
            <li className="nav__item"><a href="/" className="nav__link active">Home</a></li>
            <li className="nav__item"><a href='/about' className="nav__link">About</a></li>
            {/* <li className="nav__item"><a href="plan" className="nav__link">Plan</a></li> */}
            {/* <li className="nav__item"><a href="abort" className="nav__link">Contact</a></li> */}
            <li className="nav__item vertical-line"></li>
            <li className="nav__item auth">
              <a href="/login" className="nav__link">Login</a>
              <a href="/signup" className="navigation__login_button">Start free</a>
            </li>
          </ul>
        </div>
      </nav>

    </header >

  );


}

export default Navigation;
