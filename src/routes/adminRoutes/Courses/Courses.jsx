import React, { useEffect, useState } from "react";
import getData from "../../../axios/getData";
import ModalForData from "./components/ModalForData/ModalForData";
import deleteData from "../../../axios/deleteData";
import ErrorModal from "../../../components/ErrorModal/ErrorModal";
const arrayRouteURL = "/courses";
const nameRoute = "cours";
function Courses() {
  let [dataArray, setDataArray] = useState([]);
  let [modalIsActive, setModalIsActive] = useState();
  const [message, setMessage] = useState("");
  let [uploadObject, setUploadObject] = useState(null);
  let [filials, setFilials] = useState([]);

  useEffect(() => {
    getData(arrayRouteURL).then((res) => {
      if (res?.status == 200) {
        setDataArray(res.data);
      }
    });
    getData("/filials").then((res) => {
      if (res?.status == 200) {
        setFilials(res.data);
      }
    });
  }, []);

  function onDelete(id) {
    deleteData(arrayRouteURL + "/" + id).then((res) => {
      if (res.status == 200) {
        getData(arrayRouteURL).then((res) => {
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
    });
  }
  return (
    <div>
      <ErrorModal message={message} />
      <button
        onClick={() => {
          setUploadObject(null);
          setModalIsActive(false);
        }}
      >
      <span className="pluss">+</span> <span>NEW {nameRoute.toUpperCase()}</span>
      </button>
      <ModalForData
        isActive={modalIsActive}
        setModalIsActive={setModalIsActive}
        uploadObject={uploadObject}
        setDataArray={setDataArray}
        filials={filials}
      />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>About</th>
            <th>Price</th>
            <th>Lesson duration</th>
            <th>Total duration</th>
            <th>Exam info</th>
            <th>Start date</th>
            <th>Filial</th>
            <th>Delete</th>
            <th>update</th>
          </tr>
        </thead>
        <tbody>
          {dataArray.length > 0 &&
            dataArray
              .filter((i) => i.cours_is_active)
              .map((item, index) => (
                <tr key={item.cours_id}>
                  <td>{index + 1}</td>
                  <td>{item.cours_name}</td>
                  <td>{item.cours_about}</td>
                  <td>{item.cours_price}</td>
                  <td>{item.cours_lesson_duration}</td>
                  <td>{item.cours_total_duration}</td>
                  <td>{item.cours_exam_info}</td>
                  <td>{item.cours_started_date}</td>
                  <td>
                    {filials.length > 0 &&
                      filials.find((el) => item.cours_filial_id == el.filial_id)
                        .filial_name}
                  </td>
                  <td className="btn">
                    <button onClick={() => onDelete(item.cours_id)}>
                      Delete
                    </button>
                  </td>
                  <td className="btn">
                    <button onClick={() => setUploadObject(item)}>
                      Update
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default Courses;
