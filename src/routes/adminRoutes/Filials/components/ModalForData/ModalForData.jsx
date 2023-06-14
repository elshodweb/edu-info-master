import React, { useEffect, useState } from "react";
import postData from "../../../../../axios/postData";
import getData from "../../../../../axios/getData";
import updateData from "../../../../../axios/updateData";
import ErrorModal from "../../../../../components/ErrorModal/ErrorModal";
function ModalForData({ isActive, centers, uploadObject, setDataArray }) {
  const [obj, setObj] = useState({
    name: "",
    about: "",
    telegram: "",
    centerId: "",
    phone: "",
    location: "",
  });
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (uploadObject) {
      setObj({
        name: uploadObject.filial_name,
        telegram: uploadObject.filial_telegram,
        centerId: uploadObject.filial_center_id,
        phone: uploadObject.filial_phone,
        location: uploadObject.filial_location,
      });
    } else {
      setObj({
        name: "",
        about: "",
        telegram: "",
        centerId: "",
        phone: "",
        location: "",
      });
    }
  }, [uploadObject]);

  let func = (res) => {
    if (res && res.status === 200) {
      getData("/filials").then((res) => {
        if (res?.status == 200) {
          setDataArray(res.data);
        }
      });
    } else {
      setMessage(res);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
    setObj({
      name: "",
      about: "",
      telegram: "",
      centerId: "",
      phone: "",
      location: "",
    });
  };

  function submitForm(e) {
    e.preventDefault();
    if (uploadObject) {
      updateData("/filials/" + uploadObject.filial_id, obj).then((res) => {
        func(res);
      });
    } else {
      postData("/filials", obj).then((res) => {
        func(res);
      });
    }
  }
  return (
    <div className={isActive ? "modal active" : "modal"}>
      <ErrorModal message={message} />
      <form onSubmit={submitForm}>
        <input
          type="text"
          value={obj.name}
          placeholder="filial name"
          onChange={(e) => setObj({ ...obj, name: e.target.value })}
        />

        <input
          type="text"
          value={obj.phone}
          placeholder="filial phone"
          onChange={(e) => setObj({ ...obj, phone: e.target.value })}
        />
        <input
          type="text"
          value={obj.telegram}
          placeholder="filial telegram"
          onChange={(e) => setObj({ ...obj, telegram: e.target.value })}
        />
        <input
          type="text"
          value={obj.location}
          placeholder="filial location"
          onChange={(e) => setObj({ ...obj, location: e.target.value })}
        />
        <select
          value={obj.centerId}
          onChange={(e) => setObj({ ...obj, centerId: e.target.value })}
        >
          {centers.length > 0 &&
            centers
              .filter((i) => i.center_is_active)
              .map((center) => (
                <option key={center.center_id} value={center.center_id}>
                  {center.center_name}
                </option>
              ))}
        </select>
        <button>{uploadObject ? "save" : "add"}</button>
      </form>
    </div>
  );
}

export default ModalForData;
