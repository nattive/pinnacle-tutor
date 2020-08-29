import {
    GET_ALL_MAIN_CATEGORY,
    MAIN_CATEGORIES,
    ERR_MAIN_CATEGORIES,
    LOAD_SUB_CAT,
    COURSE_FIELD_HAS_ERROR,
    COURSE_UPDATED,
    UPLOAD_COURSE,
    ERR_UPLOADING_COURSE,
    COURSE_UPLOADED,
    GET_ALL_COURSES,
    ALL_COURSES,
    ERR_GETTING_ALL_COURSES,
} from '../actions/types'


const initialState = {
    allMainCategories: [],
    allCategories: [],
    isGettingCourses: false,
    fetchCoursesError: null,
    loadSubCategory: [],
    fetchingMainCategories: false,
    errorFetchingMainCat: null,
    updateSuccess: null,
    updateError: null,
    uploadingCourse: false,
    uploadingError: null

}

export default function (state = initialState, action) {
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

        case COURSE_UPDATED:
            return {
                ...state,
                updateSuccess: action.payload
            }

        case UPLOAD_COURSE:
            return {
                ...state,
                updateSuccess: action.payload
            }

        case GET_ALL_COURSES:
            return {
                ...state,
                allCategories: [],
                isGettingCourses: false,
                fetchCoursesError: null,
            }

        case ALL_COURSES:
            return {
                ...state,
                allCategories: action.payload,
            }

        case ERR_GETTING_ALL_COURSES:
            return {
                ...state,
                fetchCoursesError: action.payload
            }

        default:
            return {
                ...state
            }
            break;
    }
}