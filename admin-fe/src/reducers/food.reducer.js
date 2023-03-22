import { foodTypes } from '../constants/action.types'
import { sortTypes } from '../constants/action.types'

import { combineReducers } from 'redux'
const category = (state = { data: [], page: 1, totalpage: null }, action) => {
    switch (action.type) {
        case foodTypes.SET_CATEGORY_FOOD: {
            return {
                ...state,
                data: action.data
            }
        }
        case foodTypes.ADD_CATEGORY_SUCCESS: {
            return {
                ...state,
                isadd: true
            }
        }
        case foodTypes.ADD_CATEGORY_FAIL: {
            return {
                ...state,
                isadd: false
            }
        }
        case foodTypes.UPDATE_CATEGORY_SUCCESS: {
            return {
                ...state,
                isupdate: true
            }
        }
        case foodTypes.UPDATE_CATEGORY_FAIL: {
            return {
                ...state,
                isupdate: false
            }
        }
        case foodTypes.RESET_CATEGORY: {
            return {
                ...state,
                isadd: null,
                isupdate: null
            }
        }
        case foodTypes.CATEGORY_SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        case foodTypes.CATEGORY_SET_TOTAL_PAGE: {
            return {
                ...state,
                totalpage: action.totalpage
            }
        }
        case foodTypes.UPDATE_ISSEND_SUCCESS: {
            return {
                ...state,
                isupdate: true
            }
        }
        case foodTypes.UPDATE_ISSEND_FAIL: {
            return {
                ...state,
                isupdate: false
            }
        }
        default: return state
    }
}
const publisher = (state = { data: [], page: 1, totalpage: null }, action) => {
    switch (action.type) {
        case foodTypes.SET_PUBLISHSER: {
            return {
                ...state,
                data: action.data
            }
        }
        case foodTypes.ADD_PUBLISHER_SUCCESS: {
            return {
                ...state,
                isadd: true
            }
        }
        case foodTypes.ADD_PUBLISHER_FAIL: {
            return {
                ...state,
                isadd: false
            }
        }
        case foodTypes.UPDATE_PUBLISHER_SUCCESS: {
            return {
                ...state,
                isupdate: true
            }
        }
        case foodTypes.UPDATE_PUBLISHER_FAIL: {
            return {
                ...state,
                isupdate: false
            }
        }
        case foodTypes.RESET_PUBLISHER: {
            return {
                ...state,
                isadd: null,
                isupdate: null
            }
        }
        case foodTypes.PUBLISHER_SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        case foodTypes.PUBLISHER_SET_TOTAL_PAGE: {
            return {
                ...state,
                totalpage: action.totalpage
            }
        }
        default: return state
    }
}
const author = (state = {data: [], page: 1, totalpage: null}, action) => {
    switch(action.type) {
        case foodTypes.SET_AUTHOR: {
            return {
                ...state,
                data: action.data
            }
        }
        case foodTypes.ADD_AUTHOR_SUCCESS: {
            return {
                ...state,
                isadd: true
            }
        }
        case foodTypes.ADD_AUTHOR_FAIL: {
            return {
                ...state,
                isadd: false
            }
        }
        case foodTypes.UPDATE_AUTHOR_SUCCESS: {
            return {
                ...state,
                isupdate: true
            }
        }
        case foodTypes.UPDATE_AUTHOR_FAIL: {
            return {
                ...state,
                isupdate: false
            }
        }
        case foodTypes.RESET_AUTHOR: {
            return {
                ...state,
                isadd: null,
                isupdate: null
            }
        }
        case foodTypes.AUTHOR_SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        case foodTypes.AUTHOR_SET_TOTAL_PAGE: {
            return {
                ...state,
                totalpage: action.totalpage
            }
        }
        default: return state
    }
}

const restaurant = (state = {data: [], page: 1, totalpage: null}, action) => {
    switch(action.type) {
        case foodTypes.SET_RESTAURANT: {
            return {
                ...state,
                data: action.data
            }
        }
        case foodTypes.ADD_RESTAURANT_SUCCESS: {
            return {
                ...state,
                isadd: true
            }
        }
        case foodTypes.ADD_RESTAURANT_FAIL: {
            return {
                ...state,
                isadd: false
            }
        }
        case foodTypes.UPDATE_RESTAURANT_SUCCESS: {
            return {
                ...state,
                isupdate: true
            }
        }
        case foodTypes.UPDATE_RESTAURANT_FAIL: {
            return {
                ...state,
                isupdate: false
            }
        }
        case foodTypes.RESET_RESTAURANT: {
            return {
                ...state,
                isadd: null,
                isupdate: null
            }
        }
        case foodTypes.RESTAURANT_SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        case foodTypes.RESTAURANT_SET_TOTAL_PAGE: {
            return {
                ...state,
                totalpage: action.totalpage
            }
        }
        default: return state
    }
}
const bill = (state = { data: [], page: 1, totalpage: null}, action) => {
    switch(action.type) {
        case foodTypes.BILL_SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        case foodTypes.BILL_SET_TOTAL_PAGE: {
            return {
                ...state,
                totalpage: action.totalpage
            }
        }
        case foodTypes.BILL_SET_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        default: return state
    }
}
const food = (state = {
    data: [], page: 1, totalpage: null, title: 'ALL FOOD', searchtext: '', sortType: sortTypes.SORT_DAY_DECREASED, sortOrder: -1
}, action) => {
    switch(action.type){
        case foodTypes.SET_FOOD: {
            return {
                ...state, 
                data: action.data
            }
        }
        case foodTypes.SET_PAGE: {
            return {
                ...state,
                page: action.page
            }
        }
        case foodTypes.SET_TOTAL_PAGE: {
            return {
                ...state,
                totalpage: action.totalpage
            }
        }
        case foodTypes.ADD_FOOD_SUCCESS: {
            return {
                ...state,
                isadd: true
            }
        }
        case foodTypes.ADD_FOOD_FAIL: {
            return {
                ...state,
                isadd: false
            }
        }
        case foodTypes.UPDATE_FOOD_SUCCESS: {
            return {
                ...state,
                isupdate: true
            }
        }
        case foodTypes.UPDATE_FOOD_FAIL: {
            return {
                ...state,
                isupdate: false
            }
        }
        case foodTypes.RESET_FOOD: {
            return {
                ...state,
                isadd: null,
                isupdate: null
            }
        }
        case foodTypes.SET_RANGE: {
            return {
                ...state,
                range: action.range
            }
        }
        case foodTypes.SET_NAME_TITLE_ITEM: {
            return {
                ...state,
                title: action.title
            }
        }
        case foodTypes.SET_BRANCH_SEARCH_FOOD: {
            return {
                ...state,
                branch: action.branch
            }
        }
        case foodTypes.SET_ID_BRANCH: {
            return {
                ...state,
                id: action.id
            }
        }
        case foodTypes.SET_SORT_TYPE: {
            return {
                ...state,
                sortType: action.sortType,
                sortOrder: action.sortOrder
            }
        }
        case foodTypes.SET_SEARCH_TEXT: {
            return {
                ...state, 
                searchtext: action.searchtext
            }
        }
        default: return state
    }
}
export default combineReducers({
    category,
    publisher,
    food, 
    author,
    restaurant,
    bill
})