import {
    GET_ALL_MAIN_CATEGORY,
    MAIN_CATEGORIES,
    ERR_MAIN_CATEGORIES,
    LOAD_SUB_CAT
} from '../actions/types'


const initialState = {
    allMainCategories: [],
    loadSubCategory: [],
    fetchingMainCategories: false,
    errorFetchingMainCat: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        /**
         * Borrowed
         */

        case GET_ALL_MAIN_CATEGORY:
            return {
                ...state,
                allMainCategories: [],
                fetchingMainCategories: true,
                errorFetchingMainCat: null
            }

        case MAIN_CATEGORIES:
            return {
                ...state,
                fetchingMainCategories: false,
                allMainCategories: action.payload
            }

        case ERR_MAIN_CATEGORIES:
            return {
                ...state,
                fetchingMainCategories: false,
                errorFetchingMainCat: action.payload
            }

        case LOAD_SUB_CAT:
            return {
                ...state,
                loadSubCategory: action.payload
            }

        default:
            return {
                ...state
            }
            break;
    }
}