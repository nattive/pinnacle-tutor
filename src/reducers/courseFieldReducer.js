import {
    SET_SUB_CATEGORY_ID,
    SET_VIDEO_URL,
    SET_BANNER,
    SET_COURSE_TYPE,
    SET_IS_FREE,
    SET_PRICE,
    SET_BANNER_THUMBNAIL,
    SET_OBJECTIVE,
    SET_DIFFICULTY,
    SET_DESCRIPTION,
    SET_TITLE,
    COURSE_UPLOADED,
    COURSE_FIELD_HAS_ERROR,
    ERR_UPLOADING_COURSE,
    UPLOAD_COURSE
} from "../actions/types";

const initialState = {
    title: '',
    videoUrl: '',
    sub_category_id: '',
    banner_thumbnail: '',
    banner: [],
    isFree: false,
    price: '',
    objective: '',
    tutor_id: '',
    course_difficulty: '',
    courseType: '',
    description: '',
    uploadedCourse: {},
    hasError: false,
    uploadingCourse: false,
    // 
    title: '',
    course_module_id: '',
    stepInModule: '',
    text: '',
    quiz: '',
    objective: '',
    prerequisite: '',
    videoPath: '',
    images: '',
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
                banner: state.banner.concat(action.payload)
            }


        case SET_VIDEO_URL:
            return {
                ...state,
                videoUrl: action.payload
            }


        case SET_COURSE_TYPE:
            return {
                ...state,
                courseType: action.payload
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


        case COURSE_FIELD_HAS_ERROR:
            return {
                ...state,
                hasError: action.payload
            }

        case ERR_UPLOADING_COURSE:
            return {
                ...state,
                updateSuccess: action.payload,
                uploadingCourse: false
            }

        case COURSE_UPLOADED:
            return {
                ...state,
                uploadedCourse: action.payload,
                uploadingCourse: false
            }
        case UPLOAD_COURSE:
            return {
                ...state,
                uploadedCourse: {},
                uploadingCourse: true
            }

        default:
            return {
                ...state
            }
            break;
    }
}