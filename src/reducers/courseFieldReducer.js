import {
    SET_SUB_CATEGORY_ID,
    SET_VIDEO_URL,
    SET_BANNER,
    SET_COURSE_TYPE,
    SET_IS_FREE,
    SET_PRICE,
    IS_UPDATE,
    SET_OBJECTIVE,
    SET_DIFFICULTY,
    SET_DESCRIPTION,
    SET_TITLE,
    COURSE_UPLOADED,
    COURSE_FIELD_HAS_ERROR,
    ERR_UPLOADING_COURSE,
    UPLOAD_COURSE,
    SET_DURATION,
    VIDEO_PUBLIC_ID,
    SET_LANGUAGE,
    SET_CAREER_CATEGORY,
    IMAGE_PUBLIC_ID,
    SET_SUBTITLE
} from "../actions/types";

const initialState = {
    title: '',
    subtitle: '',
    videoUrl: '',
    sub_category_id: '',
    banner_thumbnail: '',
    banner: [],
    isFree: false,
    price: '',
    objective: '',
    duration: '',
    image_public_id: '',
    video_public_id: '',
    language: '',
    tutor_id: '',
    course_difficulty: '',
    courseType: 'isPO',
    career_category_id: '',
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
    isUpdate: false,
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
        case IS_UPDATE:
            return {
                ...state,
                isUpdate: action.payload
            }
        case SET_SUBTITLE:
            return {
                ...state,
                subtitle: action.payload
            }

        case SET_CAREER_CATEGORY:
            return {
                ...state,
                career_category_id: action.payload
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


        case SET_DURATION:
            return {
                ...state,
                duration: action.payload
            }

        case IMAGE_PUBLIC_ID:
            return {
                ...state,
                image_public_id: action.payload
            }



        case VIDEO_PUBLIC_ID:
            return {
                ...state,
                video_public_id: action.payload
            }


        case SET_LANGUAGE:
            return {
                ...state,
                language: action.payload
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