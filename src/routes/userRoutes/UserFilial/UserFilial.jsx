import React, { useEffect, useState } from "react";
import "./UserFilial.scss";
import getData from "../../../axios/getData";
import { Link } from "react-router-dom";
import telegram from "../../../assets/isons/telegram-black.png";
import location from "../../../assets/isons/location-black.png";
import phone from "../../../assets/isons/phone-black.png";
import Loading from "../../../components/Loading/Loading";
function UserFilial({ setIds, ids }) {
  let [dataArray, setDataArray] = useState(null);
  useEffect(() => {
    getData("/filials").then((res) => {
      if (res?.status == 200) {
        setDataArray(
          res.data.filter(
            (i) => i.filial_is_active && i.filial_center_id === ids.center
          )
        );
      }
    });
  }, []);
  if (dataArray === null) {
    return <Loading />;
  }
  return (
    <div className="filials">
      <h1 className="path">
        <Link to={"/categories"}>Categories</Link>
        <span> / </span>
        <Link to={"/centers"}>Centers</Link>
        <span> / </span>
        <Link to={"/filials"}>Filials</Link>
      </h1>
      {dataArray.length > 0 ? (
        dataArray.map((item, index) => {
          return (
            <div className="filial" key={index}>
              <div className="filial__info">
                <Link to={"/courses"}>
                  <div
                    onClick={() => setIds({ ...ids, filial: item.filial_id })}
                    className="filial__name"
                  >
                    {item.filial_name}
                  </div>
                </Link>
                <div className="filial__item">
                  <img width={20} src={location} alt="location" />

                  <span>{item.filial_location}</span>
                </div>
                <div className="filial__item">
                  <img width={20} src={phone} alt="phone" />

                  <span>{item.filial_phone}</span>
                </div>
                <div className="filial__item">
                  <img width={20} src={telegram} alt="telegram" />

                  <span>{item.filial_telegram}</span>
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

export default UserFilial;
