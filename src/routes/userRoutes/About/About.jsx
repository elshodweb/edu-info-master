import React from "react";
import "./About.scss";
import section1 from "./../../../assets/img/section-1.jpg";
import section2 from "./../../../assets/img/section-2.jpg";
import section4 from "./../../../assets/img/section-4.jpg";
import section5 from "./../../../assets/img/section-5.jpg";
import { Link } from "react-router-dom";
function About() {
  return (
    <div className="about">
      <div className="about__title">
        EDU-INFO : Information portal about training courses{" "}
      </div>
      <div className="about__descr">
        <div className="about__row">
          {" "}
          <img src={section1} alt="descrip-img" />
          <p>
          Welcome to our course site! Here you
             find useful information about various educational software
             courses available offline. Our site provides a convenient
             the ability to view information about courses by category.
          </p>
        </div>

        <div className="about__row">
          {" "}
          <p>
          On each page of the course you will be able to familiarize yourself with the main
             details such as price, exam requirements, contact
             phone numbers, social media links, addresses and duration
             course. We strive to provide complete information that will help
             you decide on the most suitable course for
             achieve your learning goals.
          </p>
          <img src={section2} alt="descrip-img" />
        </div>

        <div className="about__row">
          <img src={section4} alt="descrip-img" />{" "}
          <p>
          We also provide the opportunity to contact course providers
             directly through the contact details listed on the course page. This
             allows you to get more information or ask questions,
             related to a particular course before making the final
             solution.
          </p>
        </div>

        <div className="about__row">
          {" "}
          <p>
          We are constantly updating our course database to offer you
             the most up-to-date information. Our goal is to help you find the best
             a course that meets your needs and interests in the field
             education. Use our site and we hope you find
             This is the course that will help you succeed!
          </p>
          <img src={section5} alt="descrip-img" />
        </div>

        <div className="about__btn">
          <Link id="animatedButton" to={"/Categories"}>
            Courses
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
