import { Route, Routes } from "react-router-dom";
import IsAuth from "./routes/adminRoutes/IsAuth/IsAuth";
import Dashboard from "./routes/adminRoutes/Dashboard/Dashboard";
import axiosInstance from "./axios";
import { useEffect, useState } from "react";
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
  const [ids, setIds] = useState(JSON.parse(localStorage.getItem("ids")));
  useEffect(() => {
    localStorage.setItem("ids", JSON.stringify(ids));
  }, [ids]);
  async function verifyToken() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        let res = await axiosInstance.get("/verify-token", {
          headers: {
            "access-token": token,
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

  function scrollToTopSmoothly() {
    var duration = 10000; // Длительность анимации в миллисекундах
    var start = null;
    var element = document.documentElement;
    var startScrollTop = element.scrollTop;
    var change = 0 - startScrollTop;
    var currentTime = 0;
  
    function animateScroll(timestamp) {
      if (!start) start = timestamp;
      currentTime += timestamp - start;
      var val = easeInOutQuad(currentTime, startScrollTop, change, duration);
      element.scrollTop = val;
  
      if (currentTime < duration) {
        window.requestAnimationFrame(animateScroll);
      }
    }
  
    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
  
    window.requestAnimationFrame(animateScroll);
  }

  return (
    <div className="App">
      <ErrorModal message={message} />
      <Routes>
        <Route
          path="*"
          index
          element={<Login isAuth={isAuth} verifyToken={verifyToken} />}
        />
        <Route
          path="dashboard"
          element={<IsAuth isAuth={isAuth} verifyToken={verifyToken} />}
        >
          <Route path="*" element={<Dashboard />}>
            <Route index element={<Categories toTop={scrollToTopSmoothly} />} />
            <Route path="centers" element={<Centers toTop={scrollToTopSmoothly} />} />
            <Route path="filials" element={<Filials toTop={scrollToTopSmoothly} />} />
            <Route path="courses" element={<Courses toTop={scrollToTopSmoothly} />} />
          </Route>
        </Route>
        <Route path="*" element={<UserPage />}>
          <Route index element={<About />} />
          <Route path="categories" element={<UserCategory setIds={setIds} />} />
          <Route
            path="centers"
            element={<UserCenter ids={ids} setIds={setIds} />}
          />
          <Route
            path="filials"
            element={<UserFilial ids={ids} setIds={setIds} />}
          />
          <Route
            path="courses"
            element={<UserCours ids={ids} setIds={setIds} />}
          />
          <Route path="courses/:id" element={<SingleCourse ids={ids} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
