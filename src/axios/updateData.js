import axiosInstance from ".";

const updateData = async (path, data) => {
  try {
    let res = await axiosInstance.put(path, data, {
      headers: {
        "access-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    return error.response.data.message;
  }
};
export default updateData;
