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
        EDU-INFO : Информационный портал об учебных курсах
      </div>
      <div className="about__descr">
        <div className="about__row">
          {" "}
          <img src={section1} alt="descrip-img" />
          <p>
            Добро пожаловать на наш сайт, посвященный учебным курсам! Здесь вы
            найдете полезную информацию о различных образовательных программных
            курсах, доступных в офлайн-формате. Наш сайт предоставляет удобную
            возможность просмотра информации о курсах по категориям.
          </p>
        </div>

        <div className="about__row">
          {" "}
          <p>
            На каждой странице курса вы сможете ознакомиться с основными
            деталями, такими как цена, требования к экзамену, контактные
            телефоны, ссылки на социальные сети, адреса и продолжительность
            курса. Мы стремимся предоставить полную информацию, которая поможет
            вам принять решение о выборе наиболее подходящего курса для
            достижения ваших учебных целей.
          </p>
          <img src={section2} alt="descrip-img" />
        </div>

        <div className="about__row">
          <img src={section4} alt="descrip-img" />{" "}
          <p>
            Мы также предоставляем возможность связаться с провайдерами курсов
            напрямую через контактные данные, указанные на странице курса. Это
            позволяет получить дополнительную информацию или задать вопросы,
            связанные с конкретным курсом, прежде чем принять окончательное
            решение.
          </p>
        </div>

        <div className="about__row">
          {" "}
          <p>
            Мы постоянно обновляем нашу базу данных курсов, чтобы предложить вам
            самую актуальную информацию. Наша цель - помочь вам найти лучший
            курс, который отвечает вашим потребностям и интересам в области
            образования. Пользуйтесь нашим сайтом, и мы надеемся, что вы найдете
            именно тот курс, который поможет вам достичь успеха!
          </p>
          <img src={section5} alt="descrip-img" />
        </div>

        <div className="about__btn">
          <Link id="animatedButton" to={"/Categories"}>Курсы</Link>
        </div>
      </div>
    </div>
  );
}

export default About;
