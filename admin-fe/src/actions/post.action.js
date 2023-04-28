import axios from 'axios'
import { postTypes } from '../constants/action.types';

export const getPost = () => async (dispatch, getState) => {
    let res
    try {
       
        res = await axios.post('http://localhost:8080/article/allarticle', {
            page: getState().postReducers.post.page,
        })
        console.log('data',res);
    }
    catch (err) {
        console.log(err)
        return
    }
    dispatch(setPost(res.data.data))
    dispatch(setTotalPage(res.data.totalPage))
}
export const setPost = (data) => ({
    type: postTypes.SET_POST,
    data
})
export const setPage = (page) => ({
    type: postTypes.SET_PAGE,
    page
})
export const setTotalPage = (totalpage) => ({
    type: postTypes.SET_TOTAL_PAGE,
    totalpage
})

export const addPost = (title, content) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/addarticle', {
            title: title,
            content: content,
        });
    }
    catch(err) {
        dispatch(addPostFail())
        return
    } 
    dispatch(addPostSuccess())
    dispatch(getPost())
}
export const addPostSuccess = () => ({
    type: postTypes.ADD_POST_SUCCESS
})
export const addPostFail = () => ({
    type: postTypes.ADD_POST_FAIL
})