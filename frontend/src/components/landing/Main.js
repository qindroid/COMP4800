import React from "react";
import { gsap } from "gsap";
const { useLayoutEffect, useRef } = React;

document.addEventListener('mousemove', move);
function move(e) {
  this.querySelectorAll('.move').forEach(layer => {
    const speed = layer.getAttribute('data-speed')

    const x = (window.innerWidth - e.pageX * speed) / 120
    const y = (window.innerHeight - e.pageY * speed) / 120

    layer.style.transform = `translateX(${x}px) translateY(${y}px)`
  })
}

function Main() {
  const app = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from('.nav__logo, .nav__toggle', { opacity: 0, duration: 1, delay: 2, y: 10 })
      gsap.from('.nav__item', { opacity: 0, duration: 1, delay: 2.1, y: 30, stagger: 0.3, })

      gsap.from('.home__title', { opacity: 0, duration: 1, delay: 0.8, y: 30 })
      gsap.from('.home__description', { opacity: 0, duration: 1, delay: 1.0, y: 30 })
      gsap.from('.home__button', { opacity: 0, duration: 1, delay: 1.3, y: 30 })
      gsap.from('.home__img', { opacity: 0, duration: 2, delay: 0.5, y: 30 })

    }, app);
    return () => ctx.revert();
  }, []);

  return (
    <main className="l-main" ref={app}>

      <section className="home" id="home">
        <div className="home__container bd-grid">
          <div className="home__img">
            <img src="https://cdn.dribbble.com/users/725005/screenshots/16460679/dashboard-widgets_4x.png" alt="" data-speed="-2" className="move"></img>
            {/* <img src="https://raw.githubusercontent.com/bedimcode/responsive-landing-page-coffee3d/master/assets/img/img2.png" alt="" data-speed="2" className="move"></img>
            <img src="https://raw.githubusercontent.com/bedimcode/responsive-landing-page-coffee3d/master/assets/img/img3.png" alt="" data-speed="2" className="move"></img>
            <img src="https://raw.githubusercontent.com/bedimcode/responsive-landing-page-coffee3d/master/assets/img/img4.png" alt="" data-speed="-2" className="move"></img>
            <img src="https://raw.githubusercontent.com/bedimcode/responsive-landing-page-coffee3d/master/assets/img/img5.png" alt="" data-speed="-2" className="move"></img>
            <img src="https://raw.githubusercontent.com/bedimcode/responsive-landing-page-coffee3d/master/assets/img/img6.png" alt="" data-speed="2" className="move"></img> */}
          </div>

          <div className="home__data">
            <h1 className="home__title">Cashflow </h1>
            <p className="home__description">Let's help managing your finance <br /> quick and easy.</p>
            <a href="/signup" className="home__button">Get Started</a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Main;