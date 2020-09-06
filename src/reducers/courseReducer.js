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
    GET_COURSE,
    ERR_GETTING_COURSE,
    COURSE,
    ERR_GETTING_ALL_COURSES,
    CREATE_MODULE_HEADER,
    MODULE_HEADER,
    ERR_CREATING_MODULE_HEADER,
    ADD_QUIZ,
    QUIZ_ADDED,
    ERR_ADDING_QUIZ,
    SHOW_COURSE_EDIT_PANEL,
    UPDATE_MODULE_HEADER,
    ERR_UPDATING_MODULE_HEADER,
    MODULE_UPDATED,
    UPDATE_COURSE,
    GET_DISCOUNT,
    DISCOUNT,
    ERROR_GETTING_DISCOUNT,
    CREATE_DISCOUNT,
    DISCOUNT_CREATED,
    ERROR_CREATING_DISCOUNT,
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
    uploadingError: null,
    course: {},
    courses: [],
    isGettingCourse: false,
    errorGettingCourse: null,
    hasCreatedModule: null,
    isCreating: false,
    hasModuleHeader: null,
    errModuleHeader: null,
    errorGettingModule: null,
    isAddingQuiz: false,
    quizAdded: '',
    errorAddingQuiz: null,
    showUpdatePanel: false,
    isUpdatingHeader: false,
    errUpdatingHeader: null,
    headerHasUpdated: null,
    /******** DISCOUNTS****** */
    gettingDiscounts: false,
    discounts: [],
    discountError: null,
    isCreatingDiscounts: false,
    createDiscountError: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        /**
         * Borrowed
         */

        case GET_ALL_MAIN_CATEGORY:
            return {
                ...state,
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
                updateSuccess: action.payload,
                uploadingCourse: false
            }

        case UPDATE_COURSE:
            return {
                ...state,
                updateSuccess: action.payload,
                uploadingCourse: false
            }

        case UPLOAD_COURSE:
            return {
                ...state,
                updateSuccess: action.payload
            }

        case GET_ALL_COURSES:
            return {
                ...state,
                isGettingCourses: true,
                fetchCoursesError: null,
            }

        case ALL_COURSES:
            return {
                ...state,
                isGettingCourses: false,
                courses: action.payload,
            }

        case ERR_GETTING_ALL_COURSES:
            return {
                ...state,
                isGettingCourses: false,
                fetchCoursesError: action.payload
            }

        case GET_COURSE:
            return {
                ...state,
                course: {},
                isGettingCourse: true,
                errorGettingCourse: null
            }

        case ERR_GETTING_COURSE:
            return {
                ...state,
                errorGettingCourse: action.payload,
                isGettingCourse: false,

            }

        case COURSE:
            return {
                ...state,
                course: action.payload,
                isGettingCourse: false,
            }

        case CREATE_MODULE_HEADER:
            return {
                ...state,
                hasCreatedModule: null,
                isCreating: true,
                errorGettingModule: null
            }

        case MODULE_HEADER:
            return {
                ...state,
                hasModuleHeader: action.payload,
                isCreating: false,
            }


        case ERR_CREATING_MODULE_HEADER:
            return {
                ...state,
                errModuleHeader: action.payload,
                isCreating: false,
            }

        case ADD_QUIZ:
            return {
                ...state,
                isAddingQuiz: true,
                quizAdded: '',
                errorAddingQuiz: null,
            }

        case QUIZ_ADDED:
            return {
                ...state,
                isAddingQuiz: false,
                quizAdded: true,
            }

        case ERR_ADDING_QUIZ:
            return {
                ...state,
                errorAddingQuiz: action.payload,
                isAddingQuiz: false,
            }

        case SHOW_COURSE_EDIT_PANEL:
            return {
                ...state,
                showUpdatePanel: action.payload,
            }

        case UPDATE_MODULE_HEADER:
            return {
                ...state,
                isUpdatingHeader: true,
                errUpdatingHeader: null,
            }
        case MODULE_UPDATED:
            return {
                ...state,
                headerHasUpdated: action.payload,
                isUpdatingHeader: false,
            }

        case ERR_UPDATING_MODULE_HEADER:
            return {
                ...state,
                isUpdatingHeader: false,
                errUpdatingHeader: action.payload,
            }


        case GET_DISCOUNT:
            return {
                ...state,
                gettingDiscounts: true,
                discountError: null,
            }


        case DISCOUNT:
            return {
                ...state,
                gettingDiscounts: false,
                discounts: action.payload,
            }


        case ERROR_GETTING_DISCOUNT:
            return {
                ...state,
                gettingDiscounts: false,
                discountError: action.payload,
            }


        case CREATE_DISCOUNT:
            return {
                ...state,
                isCreatingDiscounts: true,
                createDiscountError: null,
            }


        case DISCOUNT_CREATED:
            return {
                ...state,
                discountError: null,
                isCreatingDiscounts: false,
            }


        case ERROR_CREATING_DISCOUNT:
            return {
                ...state,
                gettingDiscounts: false,
                createDiscountError: action.payload,
            }

        default:
            return {
                ...state
            }
            break;
    }
}