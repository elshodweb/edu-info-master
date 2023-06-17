import React, { useEffect, useState } from "react";
import postData from "../../../../../axios/postData";
import getData from "../../../../../axios/getData";
import updateData from "../../../../../axios/updateData";
import ErrorModal from "../../../../../components/ErrorModal/ErrorModal";
function ModalForData({ isActive, uploadObject, setDataArray }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (uploadObject) {
      setName(uploadObject.category_name);
    } else {
      setName("");
    }
  }, [uploadObject]);

  function submitForm(e) {
    e.preventDefault();
    if (uploadObject) {
      updateData("/categories/" + uploadObject.category_id, { name }).then(
        (res) => {
          if (res && res.status === 200) {
            getData("/categories").then((res) => {
              if (res?.status === 200) {
                setDataArray(res.data);
              }
            });
          } else {
            setMessage(res);
            setTimeout(() => {
              setMessage("");
            }, 3000);
          }
          setName("");
        }
      );
    } else {
      postData("/categories", { name }).then((res) => {
        if (res && res.status === 200) {
          getData("/categories").then((res) => {
            if (res?.status === 200) {
              setDataArray(res.data);
            }
          });
        } else {
          setMessage(res);
          setTimeout(() => {
            setMessage("");
          }, 3000);
        }
        setName("");
      });
    }
  }
  return (
    <div className={isActive ? "modal active" : "modal"}>
      <h2 className="title-modal">
        {uploadObject ? "Change data" : "Add new data"}
      </h2>
      <ErrorModal message={message} />
      <form onSubmit={submitForm}>
        <input
          type="text"
          value={name}
          placeholder="category name"
          onChange={(e) => setName(e.target.value)}
        />
        <button>{uploadObject ? "save" : "add"}</button>
      </form>
    </div>
  );
}

export default ModalForData;
