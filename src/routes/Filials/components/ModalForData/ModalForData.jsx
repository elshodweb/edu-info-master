import React, { useEffect, useState } from "react";
import postData from "../../../../axios/postData";
import getData from "../../../../axios/getData";
import updateData from "../../../../axios/updateData";
import ErrorModal from "../../../../components/ErrorModal/ErrorModal";
function ModalForData({ isActive, centers, uploadObject, setDataArray }) {
  const [obj, setObj] = useState({
    name: "",
    about: "",
    telegram: "",
    categoryId: "",
    phone: "",
    instagram: "",
  });
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (uploadObject) {
      setObj({
        name: uploadObject.filial_name,
        telegram: uploadObject.filial_telegram,
        categoryId: uploadObject.filial_center_id,
        phone: uploadObject.filial_phone,
        instagram: uploadObject.filial_location,
      });
    } else {
      setObj({
        name: "",
        about: "",
        telegram: "",
        categoryId: "",
        phone: "",
        instagram: "",
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
      categoryId: "",
      phone: "",
      instagram: "",
    });
  };

  function submitForm(e) {
    e.preventDefault();
    if (uploadObject) {
      updateData("/filials/" + uploadObject.center_id, obj).then((res) => {
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
          placeholder="center name"
          onChange={(e) => setObj({ ...obj, name: e.target.value })}
        />

        <input
          type="text"
          value={obj.about}
          placeholder="center about"
          onChange={(e) => setObj({ ...obj, about: e.target.value })}
        />
        <input
          type="text"
          value={obj.phone}
          placeholder="center phone"
          onChange={(e) => setObj({ ...obj, phone: e.target.value })}
        />
        <input
          type="text"
          value={obj.telegram}
          placeholder="center telegram"
          onChange={(e) => setObj({ ...obj, telegram: e.target.value })}
        />
        <input
          type="text"
          value={obj.instagram}
          placeholder="center instagram"
          onChange={(e) => setObj({ ...obj, instagram: e.target.value })}
        />
        <select
          value={obj.categoryId}
          onChange={(e) => setObj({ ...obj, categoryId: e.target.value })}
        >
          {centers.length>0 && centers.filter(i=>i.center_is_active).map((center) => (
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
