import axios from "axios";

export const getPost = () => async (dispatch, getState) => {
  let res;
  try {
    res = await axios.post("http://localhost:8080/article/allarticle", {
      page: getState().postReducers.post.page,
    });
    console.log("data", res);
  } catch (err) {
    console.log(err);
    return;
  }
  dispatch(setPost(res.data.data));
  dispatch(setTotalPage(res.data.totalPage));
};
