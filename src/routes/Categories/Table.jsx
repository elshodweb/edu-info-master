import React, { useEffect, useState } from "react";
import getData from "../../axios/getData";
import ModalForData from "./components/ModalForData/ModalForData";
import deleteData from "../../axios/deleteData";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
const arrayRouteURL = "/categories";
const nameRoute = "category";
function Table() {
  let [dataArray, setDataArray] = useState([]);
  let [modalIsActive, setModalIsActive] = useState();
  const [message, setMessage] = useState("");
  let [uploadObject, setUploadObject] = useState(null);
  useEffect(() => {
    getData(arrayRouteURL).then((res) => {
      if (res?.status == 200) {
        setDataArray(res.data);
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
        NEW {nameRoute}
      </button>
      <ModalForData
        isActive={modalIsActive}
        setModalIsActive={setModalIsActive}
        uploadObject={uploadObject}
        setDataArray={setDataArray}
      />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {dataArray.length>0 && dataArray.filter(i=>i.category_is_active).map((item, index) => (
            <tr key={item.category_id}>
              <td>{index + 1}</td>
              <td>{item.category_name}</td>
              <td className="btn">
                <button onClick={() => onDelete(item.category_id)}>
                  Delete
                </button>
              </td>
              <td className="btn">
                <button onClick={() => setUploadObject(item)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
