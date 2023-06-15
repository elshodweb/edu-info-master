import axiosInstance from ".";

const postData = async (path, data) => {
  try {
    let res = await axiosInstance.post(path, data, {
      headers: {
        ["access-token"]: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    if (res?.status === 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
    return error.response.data.message;
  }
};
export default postData;
