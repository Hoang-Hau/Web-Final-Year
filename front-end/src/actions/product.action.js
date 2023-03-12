import axios from 'axios'
import { productTypes } from '../constants/action.types'
import storeConfig from '../config/storage.config'
export const getProductDetail = (id) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/food/' + id)
    }
    catch (err) {
        return
    }
    dispatch(setProductDetail(res.data.data))
}

export const getProductRelated = (id) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/food/related/' + id)
    }
    catch (err) {
        return
    }
    dispatch(setProductRelated(res.data.data))
}
export const getNameCategoryByID = (id) => async (dispatch) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/category/name/' + id)
    }
    catch (err) {
        return
    }
    dispatch(setNameCategory(res.data.name))
}


export const setProductDetail = (productDetail) => ({
    type: productTypes.SET_PRODUCT_DETAIL,
    productDetail
})
export const setNameCategory = (name) => ({
    type: productTypes.SET_NAME_CATEGORY,
    name
})


export const setProductRelated = (productrelated) => ({
    type: productTypes.SET_PRODUCT_RELATED,
    productrelated
})


export const submitComment = (name, email, comment, id_product) => async (dispatch, getState) => {
    let id = null
    if (storeConfig.getUser() && storeConfig.getUser().id && storeConfig.getUser().id)
        id = storeConfig.getUser().id
    let res
    try {
        res = await axios.post('http://localhost:8080/comment', {
            id_user: id,
            id_product: id_product,
            name: name,
            comment: comment
        })
    }
    catch (err) {
        console.log(JSON.stringify(err.response))
        return
    }
    dispatch(getCommentByIDProduct(id_product))
}
export const setTotalPage = (totalpage) => ({
    type: productTypes.SET_TOTAL_PAGE,
    totalpage
})
export const setPage = (page) => ({
    type: productTypes.SET_PAGE,
    page
})
export const backPage = () => (dispatch, getState) => {
    let page = getState().productReducers.product.page
    if(page > 1) {
        dispatch(setPage(parseInt(page) - 1))
    }
}

export const nextPage = () => (dispatch, getState) => {
    let page = getState().productReducers.product.page
    let totalpage = getState().productReducers.product.totalpage
    if(page < totalpage) {
        dispatch(setPage(parseInt(page) + 1))
    }
}
export const getCommentByIDProduct = (id) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.post('http://localhost:8080/comment/product', {
             id_product: id,
             page: getState().productReducers.product.page
            })
    }
    catch (err) {
        console.log(JSON.stringify(err.response))
        return
    }
    dispatch(setTotalPage(res.data.totalPage))
    dispatch(setComment(res.data.data))
}
export const setComment = (data) => ({
    type: productTypes.SET_COMMENT,
    data
})

export const addToCart = (product) => async (dispatch, getState) => {
    console.log(product)
    if (getState().userReducers.login.islogin) {
        let res
        try {
            res = await axios.post('http://localhost:8080/cart/addtocard', {
                id_user: storeConfig.getUser().id,
                products: [product]
            })
            console.log('data',res)
        }
        catch (err) {
            console.log(JSON.stringify(err.response))
            return
        }
    } else {
        storeConfig.addProductToCart(product)
    }
}
