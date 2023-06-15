import React, { useEffect, useState } from "react";
import "./SingleCourse.scss";
import { Link, useParams } from "react-router-dom";
import getData from "../../../axios/getData";
function SingleCourse({ ids }) {
  let { id } = useParams();
  let [data, setData] = useState(null);
  let [filial, setFilial] = useState(null);

  useEffect(() => {
    getData("/courses/" + id).then((res) => {
      if (res?.status == 200) {
        setData(res.data);
        getData("/filials/" + res.data.cours_filial_id).then((res) => {
          if (res?.status == 200) {
            setFilial(res.data);
          }
        });
      }
    });
  }, []);
  if (data === null || filial === null) {
    return "...loading";
  }
  return (
    <div className="single-cours">
      <h1 className="path">
        <Link to={"/categories"}>Categories</Link>/
        <Link to={"/centers"}>Centers</Link>/
        <Link to={"/filials"}>Filials</Link>/
        <Link to={"/courses"}>Courses</Link>/
        <Link to={"/courses/" + data.cours_id}>{data.cours_name}</Link>
      </h1>
      <div className="single-cours__item">
        <strong>name: </strong> <span>{data.cours_name}</span>
      </div>
      <div className="single-cours__item">
        <strong>price: </strong> <span>{data.cours_price}</span>
      </div>
      <div className="single-cours__item">
        <strong>start date: </strong> <span>{data.cours_started_date}</span>
      </div>
      <div className="single-cours__item">
        <strong>total duration: </strong>{" "}
        <span>{data.cours_total_duration}</span>
      </div>
      <div className="single-cours__item">
        <strong>lesson duration: </strong>{" "}
        <span>{data.cours_lesson_duration}</span>
      </div>
      <div className="single-cours__item">
        <strong>exam info: </strong> <span>{data.cours_exam_info}</span>
      </div>
      {
        <>
          <div className="single-cours__item">
            <strong>filial: </strong> <span>{filial.filial_name}</span>
          </div>
          <div className="single-cours__item">
            <strong>location: </strong> <span>{filial.filial_location}</span>
          </div>

          <div className="single-cours__item">
            <strong>admin telegram: </strong>{" "}
            <span>{filial.filial_telegram}</span>
          </div>
          <div className="single-cours__item">
            <strong>filial phone: </strong> <span>{filial.filial_phone}</span>
          </div>
        </>
      }

      <div className="single-cours__item">
        <strong>about: </strong> <span>{data.cours_about}</span>
      </div>

      <div className="single-cours__item">
        <strong>created date: </strong>{" "}
        <span>{data.cours_created_at.split("T")[0]}</span>
      </div>
    </div>
  );
}

export default SingleCourse;
