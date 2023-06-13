import React, { useEffect, useState } from "react";
import getData from "../../axios/getData";
import ModalForData from "./components/ModalForData/ModalForData";
import deleteData from "../../axios/deleteData";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
const arrayRouteURL = "/centers";
const nameRoute = "center";
function Centers() {
  let [dataArray, setDataArray] = useState([]);
  let [modalIsActive, setModalIsActive] = useState();
  const [message, setMessage] = useState("");
  let [uploadObject, setUploadObject] = useState(null);
  let [categories, setCatgories] = useState([]);

  useEffect(() => {
    getData(arrayRouteURL).then((res) => {
      if (res?.status == 200) {
        setDataArray(res.data);
      }
    });
    getData("/categories").then((res) => {
      if (res?.status == 200) {
        setCatgories(res.data);
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
        categories={categories}
      />
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>About</th>
            <th>Phone</th>
            <th>Telegram</th>
            <th>Instagram</th>
            <th>Category</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {dataArray.length > 0 &&
            dataArray
              .filter((i) => i.center_is_active)
              .map((item, index) => (
                <tr key={item.center_id}>
                  <td>{index + 1}</td>
                  <td>{item.center_name}</td>
                  <td>{item.center_about}</td>
                  <td>{item.center_phone}</td>
                  <td>{item.center_telegram}</td>
                  <td>{item.center_instagram}</td>
                  <td>
                    {categories?.length > 0 &&
                      categories?.find((el) => {
                        return item.center_category_id == el.category_id;
                      })?.category_name
                    }
                  </td>
                  <td className="btn">
                    <button onClick={() => onDelete(item.center_id)}>
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

export default Centers;
