import React, { useEffect, useState } from "react";
import "./UserCours.scss";
import getData from "../../../axios/getData";
import { Link } from "react-router-dom";
function UserCours({ setIds, ids }) {
  let [dataArray, setDataArray] = useState(null);

  useEffect(() => {
    getData("/courses").then((res) => {
      if (res?.status == 200) {
        setDataArray(
          res.data.filter(
            (i) => i.cours_is_active
            && i.cours_filial_id === ids.filial
          )
        );
      }
    });
  }, []);
  if (dataArray === null) {
    return "...loading";
  }

  console.log(dataArray);
  return (
    <div className="courses">
      <h1 className="path">
        <Link to={"/categories"}>Categories</Link>/
        <Link to={"/centers"}>Centers</Link>/
        <Link to={"/filials"}>Filials</Link>/
        <Link to={"/courses"}>Courses</Link>
      </h1>
      {dataArray.length > 0 ? (
        dataArray.map((item, index) => {
          return (
            <div className="cours" key={index}>
              <div className="cours__info">
                <div className="cours__section">
                  <Link to={"/courses/" + item.cours_id}>
                    <div
                      onClick={() => setIds({ ...ids, cours: item.cours_id })}
                      className="cours__name"
                    >
                      {item.cours_name}
                    </div>
                  </Link>
                  <div className="cours__item">
                    <strong>price: </strong>
                    <span>{item.cours_price}</span>
                  </div>
                  <div className="cours__item">
                    <strong>started date: </strong>
                    <span>{item.cours_started_date}</span>
                  </div>
                  <div className="cours__item">
                    <strong>total duration: </strong>
                    <span>{item.cours_total_duration}</span>
                  </div>
                  <div className="cours__item">
                    <strong>lesson duration: </strong>
                    <span>{item.cours_lesson_duration}</span>
                  </div>
                  <div className="cours__item">
                    <strong>exam info: </strong>
                    <span>{item.cours_exam_info}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h2>Bu Categorya bo'yicha hechnarsa topilmadi</h2>
      )}
    </div>
  );
}

export default UserCours;
