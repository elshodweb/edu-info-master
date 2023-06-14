import { Route, Routes } from "react-router-dom";
import IsAuth from "./routes/adminRoutes/IsAuth/IsAuth";
import Dashboard from "./routes/adminRoutes/Dashboard/Dashboard";
import axiosInstance from "./axios";
import { useState } from "react";
import "./sass/index.scss";
import Categories from "./routes/adminRoutes/Categories/Table";
import Centers from "./routes/adminRoutes/Centers/Centers";
import Filials from "./routes/adminRoutes/Filials/Filials";
import Courses from "./routes/adminRoutes/Courses/Courses";
import ErrorModal from "./components/ErrorModal/ErrorModal";
import About from "./routes/userRoutes/About/About";
import Login from "./routes/adminRoutes/Login/Login";
import UserCategory from "./routes/userRoutes/UserCategory/UserCategory";
import UserPage from "./routes/userRoutes/UserPage/UserPage";
import UserCenter from "./routes/userRoutes/UserCenter/UserCenter";
import UserFilial from "./routes/userRoutes/UserFilial/UserFilial";
import UserCours from "./routes/userRoutes/UserCours/UserCours";
import SingleCourse from "./routes/userRoutes/SingleCourse/SingleCourse";
function App() {
  const [isAuth, setIsAuth] = useState(null);
  const [message, setMessage] = useState("");
  const [ids,setIds] = useState(null);

  async function verifyToken() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        let res = await axiosInstance.get("/verify-token", {
          headers: {
            ["access-token"]: token,
          },
        });

        if (res.status === 200) {
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
  console.log(ids);
  return (
    <div className="App">
      <ErrorModal message={message} />
      <Routes>
        <Route path="*" element={<UserPage />}>
          <Route index element={<About />} />
          <Route path="categories" element={<UserCategory setIds={setIds} />} />
          <Route path="centers" element={<UserCenter ids={ids} setIds={setIds} />} />
          <Route path="filials" element={<UserFilial ids={ids} setIds={setIds} />} />
          <Route path="courses" element={<UserCours ids={ids} setIds={setIds} />} />
          <Route path="courses/:id" element={<SingleCourse ids={ids} setIds={setIds} />} />
        </Route>
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
