import React, { useEffect, useState } from "react";
import postData from "../../../../../axios/postData";
import getData from "../../../../../axios/getData";
import updateData from "../../../../../axios/updateData";
import ErrorModal from "../../../../../components/ErrorModal/ErrorModal";
function ModalForData({
  isActive,
  filials,
  uploadObject,
  setDataArray,
  setUploadObject,
}) {
  const [obj, setObj] = useState({
    name: "",
    about: "",
    price: "",
    lessonDuration: "",
    totalDuration: "",
    examInfo: "",
    courseStartedDate: "",
    filialId: "",
  });
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (uploadObject) {
      setObj({
        name: uploadObject.cours_name,
        about: uploadObject.cours_about,
        price: uploadObject.cours_price,
        lessonDuration: uploadObject.cours_lesson_duration,
        totalDuration: uploadObject.cours_total_duration,
        examInfo: uploadObject.cours_exam_info,
        courseStartedDate: uploadObject.cours_started_date,
        filialId: uploadObject.cours_filial_id,
      });
    } else {
      setObj({
        name: "",
        about: "",
        price: "",
        lessonDuration: "",
        totalDuration: "",
        examInfo: "",
        courseStartedDate: "",
        filialId: "",
      });
    }
  }, [uploadObject]);

  let func = (res) => {
    if (res && res.status === 200) {
      getData("/courses").then((res) => {
        if (res?.status === 200) {
          setDataArray(res.data);
        }
      });

      setObj({
        name: "",
        about: "",
        price: "",
        lessonDuration: "",
        totalDuration: "",
        examInfo: "",
        courseStartedDate: "",
        filialId: "",
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
      updateData("/courses/" + uploadObject.cours_id, obj).then((res) => {
        func(res);
      });
      setUploadObject(null);
    } else {
      postData("/courses", obj).then((res) => {
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
          placeholder="course name"
          onChange={(e) => setObj({ ...obj, name: e.target.value })}
        />

        <input
          type="text"
          value={obj.price}
          placeholder="course price"
          onChange={(e) => setObj({ ...obj, price: e.target.value })}
        />
        <input
          type="text"
          value={obj.lessonDuration}
          placeholder="course lessonDuration"
          onChange={(e) => setObj({ ...obj, lessonDuration: e.target.value })}
        />
        <input
          type="text"
          value={obj.totalDuration}
          placeholder="course totalDuration"
          onChange={(e) => setObj({ ...obj, totalDuration: e.target.value })}
        />
        <input
          type="text"
          value={obj.examInfo}
          placeholder="course examInfo"
          onChange={(e) => setObj({ ...obj, examInfo: e.target.value })}
        />
        <input
          type="text"
          value={obj.courseStartedDate}
          placeholder="course courseStartedDate"
          onChange={(e) =>
            setObj({ ...obj, courseStartedDate: e.target.value })
          }
        />
        <select
          value={obj.filialId}
          onChange={(e) => setObj({ ...obj, filialId: e.target.value })}
        >
          {filials.length > 0 &&
            filials
              .filter((i) => i.filial_is_active)
              .map((filial) => (
                <option key={filial.filial_id} value={filial.filial_id}>
                  {filial.filial_name}
                </option>
              ))}
        </select>

        <div>
          <textarea
            value={obj.about}
            placeholder="course about"
            onChange={(e) => setObj({ ...obj, about: e.target.value })}
          ></textarea>
        </div>
        <button>{uploadObject ? "save" : "add"}</button>
      </form>
    </div>
  );
}

export default ModalForData;
