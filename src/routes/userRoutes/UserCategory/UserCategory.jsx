import React, { useEffect, useState } from "react";
import "./UserCategory.scss";
import icon from "./../../../assets/isons/rectangle.png";
import getData from "../../../axios/getData";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
function UserCategory({ ids,setIds }) {
  let [dataArray, setDataArray] = useState(null);
  useEffect(() => {
    getData("/categories").then((res) => {
      if (res?.status == 200) {
        setDataArray(res.data);
      }
    });
  }, []);
  if (dataArray === null) {
    return <Loading />;
  }
  return (
    <div className="categories">
      <h1 className="path">
        <Link to={"/categories"}>Categories</Link>
      </h1>
      {dataArray.length > 0 &&
        dataArray
          .filter((i) => i.category_is_active)
          .map((item, index) => {
            return (
              <div className="category" key={index}>
                <div className="category-info">
                  <Link to={"/centers"}>
                    <div
                      onClick={() => {
                        setIds({...ids, category: item.category_id });
                      }}
                      className="category-name"
                    >
                      <img width={25} src={icon} alt="icon" />
                      <span>{item.category_name}</span>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
    </div>
  );
}

export default UserCategory;
