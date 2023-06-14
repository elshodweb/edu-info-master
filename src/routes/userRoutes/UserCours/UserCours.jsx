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
            // && i.cours_category_id === id
          )
        );
      }
    });
  }, []);
  if (dataArray === null) {
    return "...loading";
  }
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
              <div className="cours-info">
                <Link to={"/courses/" + item.cours_id}>
                  <div
                    onClick={() => setIds({ cours: item.cours_id })}
                    className="cours-name"
                  >
                    {item.cours_name}
                  </div>
                </Link>
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
