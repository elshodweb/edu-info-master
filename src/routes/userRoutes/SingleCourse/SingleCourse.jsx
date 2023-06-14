import React, { useEffect, useState } from "react";
import "./SingleCourse.scss";
import { Link, useParams } from "react-router-dom";
import getData from "../../../axios/getData";
function SingleCourse() {
  let { id } = useParams();
  let [data, setData] = useState(null);
  useEffect(() => {
    getData("/courses/" + id).then((res) => {
      if (res?.status == 200) {
        setData(res.data);
      }
    });
  }, []);
  console.log(data);
  if (data === null) {
    return "...loading";
  }
  return (
    <div>
      <h1 className="path">
        <Link to={"/categories"}>Categories</Link>/
        <Link to={"/centers"}>Centers</Link>/
        <Link to={"/filials"}>Filials</Link>/
        <Link to={"/courses"}>Courses</Link>/
        <Link to={"/courses/" + data.cours_id}>{data.cours_name}</Link>
      </h1>
      SingleCourse: {data.cours_name}
    </div>
  );
}

export default SingleCourse;
