// CSS
import "./About.css";
import { UilLinkedin, UilGithub, UilEnvelope } from "@iconscout/react-unicons";

import Navbar from "../../components/navigation/Navigation";

import React from "react";
import { gsap } from "gsap";
const { useLayoutEffect, useRef } = React;

function About() {
  const app = useRef();
  var random1 = "https://avatars.dicebear.com/api/male/" + Math.floor(Math.random() * 100000) + 1 + ".svg";
  var random2 =
    "https://avatars.dicebear.com/api/male/" +
    Math.floor(Math.random() * 100000) +
    1 +
    ".svg";
  var random3 =
    "https://avatars.dicebear.com/api/male/" +
    Math.floor(Math.random() * 100000) +
    1 +
    ".svg";
  var random4 =
    "https://avatars.dicebear.com/api/male/" +
    Math.floor(Math.random() * 100000) +
    1 +
    ".svg";
  var random5 =
    "https://avatars.dicebear.com/api/male/" +
    Math.floor(Math.random() * 100000) +
    1 +
    ".svg";
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about__title", {
        opacity: 0,
        duration: 1.3,
        delay: 0.5,
        y: 30,
      });
      gsap.from(".about__column", {
        opacity: 0,
        duration: 1,
        delay: 0.8,
        y: 50,
      });
    }, app);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />
      <about ref={app}>
        <section className="about">
          <div class="w-full">
            <h1 className="text-5xl text-center w-full text-neutral-700 about__title">
              Our Team
            </h1>
          </div>
          <div class="about__row">
            {/* <!-- Column 1--> */}
            <div class="about__column">
              <div class="about__card">
                <div class="img-container flex">
                  <img src={random5} />
                </div>
                <h3>Dinh Phi Long Nguyen</h3>
                <p>Developer</p>
                <div class="icons">
                  <a
                    href="https://www.linkedin.com/in/dinhplnguyen/"
                    target="_blank"
                  >
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
                  <img src={random1} />
                </div>
                <h3>Lawerence</h3>
                <p>Developer</p>
                {/* <div class="icons">
                  <a
                    href=""
                    target="_blank"
                  >
                    <UilLinkedin />
                  </a>
                  <a href="#">
                    <UilGithub />
                  </a>
                  <a href="#">
                    <UilEnvelope />
                  </a>
                </div> */}
              </div>
            </div>
            <div className="break"></div>
            {/* <!-- Column 1--> */}
            <div class="about__column">
              <div class="about__card">
                <div class="img-container flex">
                  <img src={random2} />
                </div>
                <h3>Shawn</h3>
                <p>Developer</p>
                {/* <div class="icons">
                  <a
                    href=""
                    target="_blank"
                  >
                    <UilLinkedin />
                  </a>
                  <a href="#">
                    <UilGithub />
                  </a>
                  <a href="#">
                    <UilEnvelope />
                  </a>
                </div> */}
              </div>
            </div>
            {/* <!-- Column 2--> */}
            <div class="about__column">
              <div class="about__card">
                <div class="img-container">
                  <img src={random3} />
                </div>
                <h3>Jesse</h3>
                <p>Developer</p>
                {/* <div class="icons">
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
                </div> */}
              </div>
            </div>
            {/* <!-- Column 3--> */}
            <div class="about__column">
              <div class="about__card">
                <div class="img-container">
                  <img src={random4} />
                </div>
                <h3>Simran</h3>
                <p>Developer</p>
                {/* <div class="icons">
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
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </about>
    </>
  );
}

export default About;
