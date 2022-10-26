import React from 'react';

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

  /*===== MENU SHOW Y HIDDEN =====*/
  return (
    <header class="l-header">
      <nav class="nav bd-grid">
        <div>
          <a href="/" class="nav__logo">Cashflowify</a>
        </div>

        <div class="nav__toggle" id="nav-toggle" onClick={showMenu}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>

        </div>

        <div class="nav__menu" id="nav-menu" onClick={hideMenu}>
          <div class="nav__close" id="nav-close">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

          </div>

          <ul class="nav__list">
            <li class="nav__item"><a href="/" class="nav__link active">Home</a></li>
            <li class="nav__item"><a href='about' class="nav__link">About</a></li>
            <li class="nav__item"><a href="plan" class="nav__link">Plan</a></li>
            <li class="nav__item"><a href="#contact" class="nav__link">Contact</a></li>
          </ul>
        </div>
      </nav>
    </header>

  );

}

export default Navigation;