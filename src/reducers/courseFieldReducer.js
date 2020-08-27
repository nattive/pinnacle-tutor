import {
    SET_SUB_CATEGORY_ID,
    SET_VIDEO_URL,
    SET_BANNER,
    SET_IS_PO,
    SET_IS_CAREER,
    SET_IS_FREE,
    SET_PRICE,
    SET_OBJECTIVE,
    SET_DIFFICULTY,
    SET_DESCRIPTION,
    SET_TITLE,
    COURSE_UPLOADED
} from "../actions/types";

const initialState = {
    title: '',
    videoUrl: '',
    sub_category_id: '',
    banner: '',
    isPO: false,
    isCareer: false,
    isFree: false,
    price: '',
    objective: '',
    tutor_id: '',
    course_difficulty: '',
    description: '',
    uploadedCourse: {}
}

export default function(state = initialState, action) {
    switch (action.type) {
        /**
         * Borrowed
         */

        case SET_SUB_CATEGORY_ID:
            return {
                ...state,
                sub_category_id: action.payload
            }


        case SET_BANNER:
            return {
                ...state,
                banner: action.payload
            }


        case SET_VIDEO_URL:
            return {
                ...state,
                videoUrl: action.payload
            }


        case SET_IS_PO:
            return {
                ...state,
                isPO: action.payload
            }


        case SET_IS_CAREER:
            return {
                ...state,
                isCareer: action.payload
            }


        case SET_IS_FREE:
            return {
                ...state,
                isFree: action.payload
            }


        case SET_PRICE:
            return {
                ...state,
                price: action.payload
            }


        case SET_OBJECTIVE:
            return {
                ...state,
                objective: action.payload
            }


        case SET_DIFFICULTY:
            return {
                ...state,
                course_difficulty: action.payload
            }


        case SET_DESCRIPTION:
            return {
                ...state,
                description: action.payload
            }


        case SET_TITLE:
            return {
                ...state,
                title: action.payload
            }


        case COURSE_UPLOADED:
            return {
                ...state,
                uploadedCourse: action.payload
            }


        default:
            return {
                ...state
            }
            break;
    }
}