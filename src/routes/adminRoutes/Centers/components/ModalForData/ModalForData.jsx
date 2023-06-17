import React, { useEffect, useState } from "react";
import postData from "../../../../../axios/postData";
import getData from "../../../../../axios/getData";
import updateData from "../../../../../axios/updateData";
import ErrorModal from "../../../../../components/ErrorModal/ErrorModal";
function ModalForData({
  isActive,
  categories,
  uploadObject,
  setDataArray,
  setUploadObject,
}) {
  const [obj, setObj] = useState({
    name: "",
    about: "",
    telegram: "",
    categoryId: categories?.[0]?.category_id,
    phone: "",
    instagram: "",
  });
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (uploadObject) {
      setObj({
        name: uploadObject.center_name,
        about: uploadObject.center_about,
        telegram: uploadObject.center_telegram,
        categoryId: uploadObject.center_category_id,
        phone: uploadObject.center_phone,
        instagram: uploadObject.center_instagram,
      });
    } else {
      setObj({
        name: "",
        about: "",
        telegram: "",
        categoryId: categories?.[0]?.category_id,
        phone: "",
        instagram: "",
      });
    }
  }, [uploadObject, categories]);
  let func = (res) => {
    if (res && res.status === 200) {
      getData("/centers").then((res) => {
        if (res?.status === 200) {
          setDataArray(res.data);
        }
      });
      setObj({
        name: "",
        about: "",
        telegram: "",
        categoryId: categories?.[0]?.category_id,
        phone: "",
        instagram: "",
      });
    } else {
      setMessage(res);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  };
  function submitForm(e) {
    e.preventDefault();
    if (uploadObject) {
      updateData("/centers/" + uploadObject.center_id, obj).then((res) => {
        func(res);
      });
      setUploadObject(null);
    } else {
      postData("/centers", obj).then((res) => {
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
          {categories.length > 0 &&
            categories
              .filter((i) => i.category_is_active)
              .map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.category_name}
                </option>
              ))}
        </select>
        <div>
          <textarea
            value={obj.about}
            onChange={(e) => setObj({ ...obj, about: e.target.value })}
            placeholder="center about"
          ></textarea>
        </div>
        <button>{uploadObject ? "save" : "add"}</button>
      </form>
    </div>
  );
}

export default ModalForData;
