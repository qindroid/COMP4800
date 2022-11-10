import "./404.css";

import React from "react";
import { gsap } from "gsap";
const { useLayoutEffect, useRef } = React;


function Error() {

  const app = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // gsap.timeline({ repeat: -1 })
      //   .fromTo(".error__img",
      //     { ease: "Power0.easeNone", duration: 2, y: 5 },
      //     { ease: "Power0.easeNone", duration: 2, y: -5 })
      //   .fromTo(".error__img",
      //     { ease: "Power0.easeNone", duration: 2, y: -5 },
      //     { ease: "Power0.easeNone", duration: 2, y: 5 });

      gsap.from('.error__data', { opacity: 0, duration: 1, delay: 0.8, y: 50 })
      gsap.from('.error__img', { opacity: 0, duration: 2, delay: 0.5, y: -50 })

    }, app);
    return () => ctx.revert();
  }, []);

  return (
    <section className="error" ref={app}>
      <div className="error__container container">
        <div className="error__data">
          <span className="error__subtitle">Error 404</span>
          <h1 className="error__title">Hey Bud</h1>
          <p className="error__description">
            We can't seem to find the page <br /> you are looking for.
          </p>
          <a href="/" className="error__button">
            Go Home
          </a>
        </div>

        <div className="error__img">
          <img src="https://raw.githubusercontent.com/bedimcode/responsive-404-page/main/assets/img/ghost-img.png" alt="" />
          <div className="error__shadow"></div>
        </div>
      </div>
    </section>
  );
}

export default Error;