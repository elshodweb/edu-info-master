import axiosInstance from ".";

const getData = async (path) => {

    let res = await axiosInstance.get(path, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      return res;
    }
  
};
export default getData;
