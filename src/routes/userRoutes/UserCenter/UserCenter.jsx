import React, { useEffect, useState } from "react";
import "./UserCenter.scss";
import getData from "../../../axios/getData";
import { Link, NavLink } from "react-router-dom";
function UserCenter({ setIds, ids }) {
  let [dataArray, setDataArray] = useState(null);
  useEffect(() => {
    getData("/centers").then((res) => {
      if (res?.status == 200) {
        setDataArray(
          res.data.filter(
            (i) => i.center_is_active
            // && i.center_category_id === id
          )
        );
      }
    });
  }, []);
  if (dataArray === null) {
    return "...loading";
  }
  return (
    <div className="centers">
    <h1 className="path">
      <Link to={"/categories"}>Categories</Link>/
      <Link to={"/centers"}>Centers</Link>
    </h1>
      {dataArray.length > 0 ? (
        dataArray.map((item, index) => {
          return (
            <div className="center" key={index}>
              <div className="center-info">
                <Link to={"/filials"}>
                  <div
                    onClick={() => setIds({ center: item.center_id })}
                    className="center-name"
                  >
                    {item.center_name}
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

export default UserCenter;
