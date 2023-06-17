import axiosInstance from ".";

const deleteData = async (path) => {
  try {
    let res = await axiosInstance.delete(path, {
      headers: {
        "access-token": localStorage.getItem("token"),
      },
    });
    if (res.status === 200) {
      return res;
    }
  } catch (error) {
    return error.response.data.message;
  }
};
export default deleteData;
