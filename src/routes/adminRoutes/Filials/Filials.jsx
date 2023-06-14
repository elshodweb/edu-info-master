import React, { useEffect, useState } from "react";
import getData from "../../../axios/getData";
import ModalForData from "./components/ModalForData/ModalForData";
import deleteData from "../../../axios/deleteData";
import ErrorModal from "../../../components/ErrorModal/ErrorModal";
const arrayRouteURL = "/filials";
const nameRoute = "filial";
function Filials() {
  let [dataArray, setDataArray] = useState([]);
  let [modalIsActive, setModalIsActive] = useState();
  const [message, setMessage] = useState("");
  let [uploadObject, setUploadObject] = useState(null);
  let [centers, setCenters] = useState([]);

  useEffect(() => {
    getData(arrayRouteURL).then((res) => {
      if (res?.status == 200) {
        setDataArray(res.data);
      }
    });
    getData("/centers").then((res) => {
      if (res?.status == 200) {
        setCenters(res.data);
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
        centers={centers}
      />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Telegram</th>
            <th>Location</th>
            <th>Center name</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {dataArray.length > 0 &&
            dataArray
              .filter((i) => i.filial_is_active)
              .map((item, index) => (
                <tr key={item.filial_id}>
                  <td>{index + 1}</td>
                  <td>{item.filial_name}</td>
                  <td>{item.filial_phone}</td>
                  <td>{item.filial_telegram}</td>
                  <td>{item.filial_location}</td>
                  <td>
                    {centers?.length > 0 &&
                      centers?.find(
                        (el) => item.filial_center_id == el.center_id
                      )?.center_name}
                  </td>
                  <td className="btn">
                    <button onClick={() => onDelete(item.filial_id)}>
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

export default Filials;
