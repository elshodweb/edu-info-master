import React, { useEffect, useState } from "react";
import "./UserCenter.scss";
import getData from "../../../axios/getData";
import { Link } from "react-router-dom";
import telegram from "../../../assets/isons/telegram-black.png";
import instagram from "../../../assets/isons/instagram-black.png";
import phone from "../../../assets/isons/phone-black.png";
import clock from "../../../assets/isons/clock.png";
import Loading from "../../../components/Loading/Loading";

function UserCenter({ setIds, ids }) {
  let [dataArray, setDataArray] = useState(null);
  useEffect(() => {
    getData("/centers").then((res) => {
      if (res?.status === 200) {
        setDataArray(
          res.data.filter(
            (i) => i.center_is_active && i.center_category_id === ids.category
          )
        );
      }
    });
  }, []);
  if (dataArray === null) {
    return <Loading />;
  }
  return (
    <div className="centers">
      <h1 className="path">
        <Link to={"/categories"}>Categories</Link>
        <span> / </span>
        <Link to={"/centers"}>Centers</Link>
      </h1>
      {dataArray.length > 0 ? (
        dataArray.map((item, index) => {
          return (
            <div className="center" key={index}>
              <div className="center-info">
                <div className="center__row">
                  <div className="center__section">
                    <Link
                      onClick={() => setIds({ ...ids, center: item.center_id })}
                      to={"/filials"}
                    >
                      <div className="center__name">{item.center_name}</div>
                    </Link>
                    <div>
                      <div className="center__item">
                        <img width={20} src={instagram} alt="instagram" />
                        <span>{item.center_instagram}</span>
                      </div>
                      <div className="center__item">
                        <img width={20} src={phone} alt="phone" />
                        <span>{item.center_phone}</span>
                      </div>
                      <div className="center__item">
                        <img width={20} src={telegram} alt="telegram" />
                        <span>{item.center_telegram}</span>
                      </div>
                    </div>
                  </div>
                  <div className="center__section">
                    <div className="center__descr">{item.center_about}</div>
                    <div className="center__item center__item-date">
                      <span>
                        <img width={20} src={clock} alt="clock" />{" "}
                      </span>
                      <strong>
                        {item.center_created_at
                          .split(".")[0]
                          .replace("T", "  ")}
                      </strong>
                    </div>
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

export default UserCenter;
