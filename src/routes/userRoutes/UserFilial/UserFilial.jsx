import React, { useEffect, useState } from "react";
import "./UserFilial.scss";
import getData from "../../../axios/getData";
import { Link } from "react-router-dom";
function UserFilial({ setIds, ids }) {
  let [dataArray, setDataArray] = useState(null);
  useEffect(() => {
    getData("/filials").then((res) => {
      if (res?.status == 200) {
        setDataArray(
          res.data.filter(
            (i) => i.filial_is_active
            // && i.filial_category_id === id
          )
        );
      }
    });
  }, []);
  if (dataArray === null) {
    return "...loading";
  }
  return (
    <div className="filials">
    <h1 className="path">
      <Link to={"/categories"}>Categories</Link>/
      <Link to={"/centers"}>Centers</Link>/
      <Link to={"/filials"}>Filials</Link>
    </h1>
      {dataArray.length > 0 ? (
        dataArray.map((item, index) => {
          return (
            <div className="filial" key={index}>
              <div className="filial-info">
                <Link to={"/courses"}>
                  <div
                    onClick={() => setIds({ filial: item.filial_id })}
                    className="filial-name"
                  >
                    {item.filial_name}
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

export default UserFilial;
