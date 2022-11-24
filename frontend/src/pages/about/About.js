// CSS
import "./About.css";
import { UilLinkedin, UilGithub, UilEnvelope } from '@iconscout/react-unicons'

import Navbar from "../../components/navigation/Navigation";


import React from "react";
import { gsap } from "gsap";
const { useLayoutEffect, useRef } = React;


function About() {

  const app = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from('.about__title', { opacity: 0, duration: 1.3, delay: 0.5, y: 30 })
      gsap.from('.about__column', { opacity: 0, duration: 1, delay: 0.8, y: 50 })

    }, app);
    return () => ctx.revert();
  }, []);


  return (
    <>
      <Navbar />
      <about ref={app}>
        <section className="about">
          <div class="w-full">
            <h1 className="text-5xl text-center w-full text-neutral-700 about__title">Our Team</h1>
          </div>
          <div class="about__row">
            {/* <!-- Column 1--> */}
            <div class="about__column">
              <div class="about__card">
                <div class="img-container flex">
                  <img src="https://i.kym-cdn.com/entries/icons/original/000/026/152/gigachad.jpg" />
                </div>
                <h3>Dinh Phi Long Nguyen</h3>
                <p>Developer</p>
                <div class="icons">
                  <a href="https://www.linkedin.com/in/dinhplnguyen/" target="_blank">
                    <UilLinkedin />
                  </a>
                  <a href="#">
                    <UilGithub />
                  </a>
                  <a href="#">
                    <UilEnvelope />
                  </a>
                </div>
              </div>
            </div>
            {/* <!-- Column 1--> */}
            <div class="about__column">
              <div class="about__card">
                <div class="img-container flex">
                  <img src="https://i.kym-cdn.com/entries/icons/original/000/026/152/gigachad.jpg" />
                </div>
                <h3>Dinh Phi Long Nguyen</h3>
                <p>Developer</p>
                <div class="icons">
                  <a href="https://www.linkedin.com/in/dinhplnguyen/" target="_blank">
                    <UilLinkedin />
                  </a>
                  <a href="#">
                    <UilGithub />
                  </a>
                  <a href="#">
                    <UilEnvelope />
                  </a>
                </div>
              </div>
            </div>
            <div className="break"></div>
            {/* <!-- Column 1--> */}
            <div class="about__column">
              <div class="about__card">
                <div class="img-container flex">
                  <img src="https://i.kym-cdn.com/entries/icons/original/000/026/152/gigachad.jpg" />
                </div>
                <h3>Dinh Phi Long Nguyen</h3>
                <p>Developer</p>
                <div class="icons">
                  <a href="https://www.linkedin.com/in/dinhplnguyen/" target="_blank">
                    <UilLinkedin />
                  </a>
                  <a href="#">
                    <UilGithub />
                  </a>
                  <a href="#">
                    <UilEnvelope />
                  </a>
                </div>
              </div>
            </div>
            {/* <!-- Column 2--> */}
            <div class="about__column">
              <div class="about__card">
                <div class="img-container">
                  <img src="profile-img-2.png" />
                </div>
                <h3>Bryant Hall</h3>
                <p>Developer</p>
                <div class="icons">
                  <a href="#">
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i class="fab fa-linkedin"></i>
                  </a>
                  <a href="#">
                    <i class="fab fa-github"></i>
                  </a>
                  <a href="#">
                    <i class="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>
            {/* <!-- Column 3--> */}
            <div class="about__column">
              <div class="about__card">
                <div class="img-container">
                  <img src="profile-img-3.png" />
                </div>
                <h3>Hope Watkins</h3>
                <p>Designer</p>
                <div class="icons">
                  <a href="#">
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a href="#">
                    <i class="fab fa-linkedin"></i>
                  </a>
                  <a href="#">
                    <i class="fab fa-github"></i>
                  </a>
                  <a href="#">
                    <i class="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </about>
    </>
  );
}

export default About;