import axios from 'axios';
import { foodTypes } from '../constants/action.types';
import {sortTypes} from '../constants/action.types'
export const getFood = () => async (dispatch, getState) => {
    let res
    try {
        res = await axios.post('http://localhost:8080/food/allfood', {
            page: getState().foodReducers.food.page,
            range: null
        })
    }
    catch (err) {
        console.log(err)
        return
    }
    dispatch(setFood(res.data.data))
    dispatch(setTotalPage(res.data.totalPage))
}
export const setFood = (data) => ({
    type: foodTypes.SET_FOOD,
    data
})
export const setPage = (page) => ({
    type: foodTypes.SET_PAGE,
    page
})
export const setTotalPage = (totalpage) => ({
    type: foodTypes.SET_TOTAL_PAGE,
    totalpage
})
export const authorSetPage = (page) => ({
    type: foodTypes.AUTHOR_SET_PAGE,
    page
})
export const authorSetTotalPage = (totalpage) => ({
    type: foodTypes.AUTHOR_SET_TOTAL_PAGE,
    totalpage
})

export const restaurantSetPage = (page) => ({
    type: foodTypes.RESTAURANT_SET_PAGE,
    page
})
export const restaurantSetTotalPage = (totalpage) => ({
    type: foodTypes.RESTAURANT_SET_TOTAL_PAGE,
    totalpage
})
export const categorySetPage = (page) => ({
    type: foodTypes.CATEGORY_SET_PAGE,
    page
})
export const categorySetTotalPage = (totalpage) => ({
    type: foodTypes.CATEGORY_SET_TOTAL_PAGE,
    totalpage
})
export const publisherSetPage = (page) => ({
    type: foodTypes.PUBLISHER_SET_PAGE,
    page
})
export const publisherSetTotalPage = (totalpage) => ({
    type: foodTypes.PUBLISHER_SET_TOTAL_PAGE,
    totalpage
})
export const deleteFood = (id) => async(dispatch, getState) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/admin/deletefood/' +id)
    }
    catch (err) {
        console.log(err)
        return
    }
    console.log(res)
    dispatch(getFood())
}
export const deleteCategory = (id) => async(dispatch, getState) => {
    console.log(id);
    let res
    try {
        res = await axios.get('http://localhost:8080/admin/deletecategory/' +id)
    }
    catch (err) {
        console.log(err)
        return
    }
    console.log(res)
    dispatch(getCategory())
}

export const deleteRestaurant = (id) => async(dispatch, getState) => {
    console.log(id);
    let res
    try {
        res = await axios.get('http://localhost:8080/admin/deleterestaurant/' +id)
    }
    catch (err) {
        console.log(err)
        return
    }
    console.log(res)
    dispatch(getRestaurant())
}

export const getCategory = () => async (dispatch, getState) =>  {
    let res
    try {
        res = await axios.get('http://localhost:8080/category/all/' + getState().foodReducers.category.page)
    }
    catch (err) {
        return
    }
    dispatch(setCategory(res.data.data))
    dispatch(categorySetTotalPage(res.data.totalPage))
}

export const getRestaurant = () => async (dispatch, getState) =>  {
    let res
    try {
        res = await axios.get('http://localhost:8080/restaurant/all/' + getState().foodReducers.restaurant.page)
    }
    catch (err) {
        return
    }
    dispatch(setRestaurant(res.data.data))
    dispatch(restaurantSetTotalPage(res.data.totalPage))
}

export const getPublisher = () => async (dispatch, getState) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/publisher/all/' + getState().foodReducers.publisher.page)
    }
    catch (err) {
        return
    }
    dispatch(setPublisher(res.data.data))
    dispatch(publisherSetTotalPage(res.data.totalPage))
}

export const getAuthor = () => async (dispatch, getState) => {
    let res
    try {
        res = await axios.get('http://localhost:8080/author/all/' + getState().foodReducers.author.page)
    }
    catch(err) {
        return
    }
    dispatch(setAuthor(res.data.data))
    dispatch(authorSetTotalPage(res.data.totalPage))
}

export const setCategory = (data) => ({
    type: foodTypes.SET_CATEGORY_FOOD,
    data
})

export const setPublisher = (data) => ({
    type: foodTypes.SET_PUBLISHSER,
    data
})

export const setAuthor = (data) => ({
    type: foodTypes.SET_AUTHOR,
    data
})
export const setRestaurant = (data) => ({
    type: foodTypes.SET_RESTAURANT,
    data
})
export const addCategorySuccess = () =>({
    type: foodTypes.ADD_CATEGORY_SUCCESS
})
export const addCategotyFail = () => ({
    type: foodTypes.ADD_CATEGORY_FAIL
})
export const updateCategorySuccess = () => ({
    type: foodTypes.UPDATE_CATEGORY_SUCCESS
})
export const updateCategoryFail = () => ({
    type: foodTypes.UPDATE_CATEGORY_FAIL
})
export const resetCategory = () => ({
    type: foodTypes.RESET_CATEGORY
})
export const addCategory =  (name) => async (dispatch, getState) => {
    dispatch(resetCategory())
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/addcategory', {
            name: name
        })
    }
    catch(err) {
        dispatch(addCategotyFail())
        return
    } 
    dispatch(addCategorySuccess())
    dispatch(getCategory())
}

export const updateCategory =  (id, name) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/updatecategory', {
            id: id,
            name: name
        })
    }
    catch(err) {
        dispatch(updateCategoryFail())
        return
    } 
    dispatch(updateCategorySuccess())
    dispatch(getCategory())
}
export const addAuthorSuccess = () =>({
    type: foodTypes.ADD_AUTHOR_SUCCESS
})
export const addAuthorFail = () => ({
    type: foodTypes.ADD_AUTHOR_FAIL
})
export const updateAuthorSuccess = () => ({
    type: foodTypes.UPDATE_AUTHOR_SUCCESS
})
export const updateAuthorFail = () => ({
    type: foodTypes.UPDATE_AUTHOR_FAIL
})
export const resetAuthor = () => ({
    type: foodTypes.RESET_AUTHOR
})
export const addAuthor =  (name) => async (dispatch, getState) => {
    dispatch(resetAuthor())
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/addauthor', {
            name: name
        })
    }
    catch(err) {
        dispatch(addAuthorFail())
        return
    } 
    dispatch(addAuthorSuccess())
    dispatch(getAuthor())
}

export const updateAuthor =  (id, name) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/updateauthor', {
            id: id,
            name: name
        })
    }
    catch(err) {
        dispatch(updateAuthorFail())
        return
    } 
    dispatch(updateAuthorSuccess())
    dispatch(getAuthor())
}

export const addRestaurantSuccess = () =>({
    type: foodTypes.ADD_RESTAURANT_SUCCESS
})
export const addRestaurantFail = () => ({
    type: foodTypes.ADD_RESTAURANT_FAIL
})
export const updateRestaurantSuccess = () => ({
    type: foodTypes.UPDATE_RESTAURANT_SUCCESS
})
export const updateRestaurantFail = () => ({
    type: foodTypes.UPDATE_RESTAURANT_FAIL
})
export const resetRestaurant = () => ({
    type: foodTypes.RESET_RESTAURANT
})
export const addRestaurant =  (name) => async (dispatch, getState) => {
    dispatch(resetRestaurant())
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/addrestaurant', {
            name: name
        })
    }
    catch(err) {
        dispatch(addRestaurantFail())
        return
    } 
    dispatch(addRestaurantSuccess())
    dispatch(getRestaurant())
}

export const updateRestaurant =  (id, name) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/updaterestaurant', {
            id: id,
            name: name
        })
    }
    catch(err) {
        dispatch(updateRestaurantFail())
        return
    } 
    dispatch(updateRestaurantSuccess())
    dispatch(getRestaurant())
}


export const addPublisherSuccess = () =>({
    type: foodTypes.ADD_PUBLISHER_SUCCESS
})
export const addPublisherFail = () => ({
    type: foodTypes.ADD_PUBLISHER_FAIL
})
export const updatePublisherSuccess = () => ({
    type: foodTypes.UPDATE_PUBLISHER_SUCCESS
})
export const updatePublisherFail = () => ({
    type: foodTypes.UPDATE_PUBLISHER_FAIL
})
export const resetPublisher = () => ({
    type: foodTypes.RESET_PUBLISHER
})
export const addPublisher =  (name) => async (dispatch, getState) => {
    dispatch(resetPublisher())
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/addpublisher', {
            name: name
        })
    }
    catch(err) {
        dispatch(addPublisherFail())
        return
    } 
    dispatch(addPublisherSuccess())
    dispatch(getPublisher())
}

export const updatePublisher =  (id, name) => async (dispatch, getState) => {
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/updatepublisher', {
            id: id,
            name: name
        })
    }
    catch(err) {
        dispatch(updatePublisherFail())
        return
    } 
    dispatch(updatePublisherSuccess())
    dispatch(getPublisher())
}
export const backPage = () => (dispatch, getState) => {
    let page = getState().foodReducers.food.page
    if(page > 1) {
        dispatch(setPage(parseInt(page) - 1))
    }
}

export const nextPage = () => (dispatch, getState) => {
    let page = getState().foodReducers.author.page
    let totalpage = getState().foodReducers.author.totalpage
    if(page < totalpage) {
        dispatch(setPage(parseInt(page) + 1))
    }
}
export const authorBackPage = () => (dispatch, getState) => {
    let page = getState().foodReducers.food.page
    if(page > 1) {
        dispatch(authorSetPage(parseInt(page) - 1))
    }
}

export const authorNextPage = () => (dispatch, getState) => {
    let page = getState().foodReducers.author.page
    let totalpage = getState().foodReducers.author.totalpage
    if(page < totalpage) {
        dispatch(authorSetPage(parseInt(page) + 1))
    }
}
export const categoryBackPage = () => (dispatch, getState) => {
    let page = getState().foodReducers.category.page
    if(page > 1) {
        dispatch(categorySetPage(parseInt(page) - 1))
    }
}

export const categoryNextPage = () => (dispatch, getState) => {
    let page = getState().foodReducers.category.page
    let totalpage = getState().foodReducers.category.totalpage
    if(page < totalpage) {
        dispatch(categorySetPage(parseInt(page) + 1))
    }
}
export const publisherBackPage = () => (dispatch, getState) => {
    let page = getState().foodReducers.publisher.page
    if(page > 1) {
        dispatch(publisherSetPage(parseInt(page) - 1))
    }
}

export const publisherNextPage = () => (dispatch, getState) => {
    let page = getState().foodReducers.publisher.page
    let totalpage = getState().foodReducers.publisher.totalpage
    if(page < totalpage) {
        dispatch(publisherSetPage(parseInt(page) + 1))
    }
}
export const billBackPage = () => (dispatch, getState) => {
    let page = getState().foodReducers.bill.page
    if(page > 1) {
        dispatch(billSetPage(parseInt(page) - 1))
    }
}

export const billNextPage = () => (dispatch, getState) => {
    let page = getState().foodReducers.bill.page
    let totalpage = getState().foodReducers.bill.totalpage
    if(page < totalpage) {
        dispatch(billSetPage(parseInt(page) + 1))
    }
}
export const addFoodSuccess = () => ({
    type: foodTypes.ADD_FOOD_SUCCESS
})
export const addFoodFail = () => ({
    type: foodTypes.ADD_FOOD_FAIL
})
export const updateFoodSuccess = () => ({
    type: foodTypes.UPDATE_FOOD_SUCCESS
})
export const updateFoodFail = () => ({
    type: foodTypes.UPDATE_FOOD_FAIL
})
export const addFood = (category, id_category,restaurant, id_restaurant,name, price, release_date, describe ,chef, file,amount) =>
 async (dispatch, getState) => {
    let data = new FormData()
    data.append('file', file)
    data.append('id_category', id_category) 
    data.append('id_restaurant', id_restaurant) 
    data.append('restaurant',restaurant) 
    data.append('chef', chef) 
    data.append('name', name) 
    data.append('price', price)  
    data.append('release_date', release_date)
    data.append('describe', describe)
    data.append('category', category)
    data.append('amount', amount)
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/addfood', data)
    }
    catch(err) {
        dispatch(addFoodFail())
        return
    } 
    dispatch(addFoodSuccess())
    dispatch(getFood())
}
export const updateFood = (id, name, category,id_category,restaurant, id_restaurant, price, release_date, describe,chef, file,amount) => async (dispatch, getState) => {
    console.log("chef",chef)
    let data = new FormData()
    data.append('file', file)
    data.append('id', id)
    data.append('category', category) 
    data.append('id_category', id_category) 
    data.append('id_restaurant', id_restaurant) 
    data.append('restaurant',restaurant) 
    data.append('chef', chef) 
    data.append('name', name) 
    data.append('price', price)  
    data.append('release_date', release_date)
    data.append('describe', describe)
    data.append('amount', amount)
    let res
    try {
        res = await axios.post('http://localhost:8080/admin/updatefood', data)
        console.log('data',res);
    }
    catch(err) {
        dispatch(updateFoodFail())
        return
    } 
    dispatch(updateFoodSuccess())
    dispatch(getFood())
}
export const setBill = (data) => ({
    type: foodTypes.BILL_SET_DATA,
    data
})
export const billSetPage = (page) => ({
    type: foodTypes.BILL_SET_PAGE,
    page
})
export const billSetTotalPage = (totalpage) => ({
    type: foodTypes.BILL_SET_TOTAL_PAGE,
    totalpage
})
export const getBill = (status) => async(dispatch, getState) => {
    let link = "http://localhost:8080/bill/status/99"
    if(status === "0") {
        link = "http://localhost:8080/bill/status/0"
    }
    if(status === "1") {
        link = "http://localhost:8080/bill/status/1"
    }
    let res = null
    try {
       res =  await axios.get(link)
    }
    catch(err) {
        return
    }
    dispatch(setBill(res.data.data))
    dispatch(billSetTotalPage(res.data.totalPage))

}
export const updateIssendSuccess = () => ({
    type: foodTypes.UPDATE_ISSEND_SUCCESS
})
export const updateIssendFail = () => ({
    type: foodTypes.UPDATE_ISSEND_FAIL
})

export const updateIssend = (name,id) => async (dispatch, getState) => {
    let res
    try {
        console.log(typeof name);
        res = await axios.post('http://localhost:8080/bill/updateissend', {
        name: name,
        id:id
        })
    }
    catch(err) {
        
        dispatch(updateIssendFail())
        return
    } 
    dispatch(updateIssendSuccess())
}
export const setSearchText = (searchtext) => ({
    type: foodTypes.SET_SEARCH_TEXT,
    searchtext
})
export const searchTextSubmit = () => async(dispatch, getState) => {
    dispatch(setPage(1))
    console.log('da vao.....');
    let sorttype = 'release_date'
    let sortorder = '-1'
    let sortType = getState().foodReducers.food.sortType
    if (sortType === sortTypes.SORT_DAY_DECREASED) {
        sorttype = 'release_date'
        sortorder = '-1'
    } else if (sortType === sortTypes.SORT_DAY_INCREASED) {
        sorttype = 'release_date'
        sortorder = '1'
    } else if (sortType === sortTypes.SORT_PRICE_DECREASED) {
        sorttype = 'price'
        sortorder = '-1'
    } else if (sortType === sortTypes.SORT_PRICE_INCREASED) {
        sorttype = 'price'
        sortorder = '1'
    } else if (sortType === sortTypes.SORT_SALES_DECREASED) {
        sorttype = 'sales'
        sortorder = '-1'
    } else if (sortType === sortTypes.SORT_SALES_INCREASED) {
        sorttype = 'sales'
        sortorder = '1'
    } else if (sortType === sortTypes.SORT_VIEWS_DECREASED) {
        sorttype = 'view_counts'
        sortorder = '-1'
    } else if (sortType === sortTypes.SORT_VIEWS_INCREASED) {
        sorttype = 'view_counts'
        sortorder = '1'
    }
    let _link = 'http://localhost:8080/food/allfood';
    console.log('id', getState().foodReducers.food.id);
    console.log('search', getState().foodReducers.food.searchtext);

    let res
    try {
        res = await axios.post(_link, {
            page: 1,
            range: getState().foodReducers.food.range,
            sorttype: sorttype,
            sortorder: sortorder,
            id: getState().foodReducers.food.id,
            searchtext: getState().foodReducers.food.searchtext
        })
    }
    catch (err) {
        console.log(err.response)
        return
    }
    dispatch(setFood(res.data.data))
    dispatch(setTotalPage(res.data.totalPage))
 } 