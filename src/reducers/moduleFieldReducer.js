import {
    SET_MODULE_BANNER,
    SET_MODULE_VIDEO,
    SET_MODULE_PREREQUISITE,
    SET_MODULE_TITLE,
    SET_COURSE_MODULE_ID,
    SET_MODULE_TEXT,
    SET_MODULE_OBJECTIVE,
} from "../actions/types";

const initialState = {
    title: '',
    course_module_id: '',
    text: '',
    objective: '',
    prerequisite: '',
    videoPath: '',
    images: '',
}

export default function(state = initialState, action) {
    switch (action.type) {

        case SET_MODULE_BANNER:
            return {
                ...state,
                images: action.payload
            }

        case SET_MODULE_VIDEO:
            return {
                ...state,
                videoPath: action.payload
            }

        case SET_MODULE_PREREQUISITE:
            return {
                ...state,
                prerequisite: action.payload
            }

        case SET_MODULE_TITLE:
            return {
                ...state,
                title: action.payload
            }

        case SET_COURSE_MODULE_ID:
            return {
                ...state,
                course_module_id: action.payload
            }

        case SET_MODULE_TEXT:
            return {
                ...state,
                text: action.payload
            }

        case SET_MODULE_OBJECTIVE:
            return {
                ...state,
                objective: action.payload
            }

        default:
            return {
                ...state
            }
    }
}