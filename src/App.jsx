import { Route, Router, Routes } from "react-router-dom";
import IsAuth from "./routes/IsAuth/IsAuth";
import Login from "./routes/Login/Login";
import Dashboard from "./routes/Dashboard/Dashboard";
import axiosInstance from "./axios";
import { useState } from "react";
import "./sass/index.scss";
import Categories from "./routes/Categories/Table";
import Centers from "./routes/Centers/Centers";
import Filials from "./routes/Filials/Filials";
import Courses from "./routes/Courses/Courses";
import ErrorModal from "./components/ErrorModal/ErrorModal";
function App() {
  const [isAuth, setIsAuth] = useState(null);
  const [message, setMessage] = useState("");

  async function verifyToken() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        let res = await axiosInstance.get("/verify-token", {
          headers: {
            ["access-token"]: `${token}`,
          },
        });
        if (res.status == 200) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        setMessage(error?.response?.data?.message);
        setTimeout(() => {
          setMessage("");
        }, 3000);
      }
    } else {
      setIsAuth(false);
    }
  }
  return (
    <div className="App">
      <ErrorModal message={message} />
      <Routes>
        <Route
          path="login"
          element={<Login isAuth={isAuth} verifyToken={verifyToken} />}
        />
        <Route
          path="*"
          element={<IsAuth isAuth={isAuth} verifyToken={verifyToken} />}
        >
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<Categories />} />
            <Route path="centers" element={<Centers />} />
            <Route path="filials" element={<Filials />} />
            <Route path="courses" element={<Courses />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
