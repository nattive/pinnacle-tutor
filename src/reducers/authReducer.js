import {
    IS_LOGGING,
    ERROR_LOGGING_IN,
    LOGGED_IN,
    IS_REGISTERING,
    HAS_ERRORS,
    ERROR_REGISTERING_IN,
    REGISTERED,
    USER,
    IS_CREATING_TUTOR,
    ERROR_CREATING_TUTOR,
    TUTOR,
} from "../actions/types";

const initialState = {
    isLogin: false,
    user: {},
    loggingIn: false,
    isRegistering: false,
    registered: false,
    loginError: null,
    registerError: null,
    hasError: null,
    token: null,
    isCreatingTutor: false,
    createTutorError: null,
    tutor: {},
    authErrors: {}
}

export default function(state = initialState, action) {
    switch (action.type) {

        case IS_LOGGING:
            return {
                ...state,
                loggingIn: true,
                loginError: null
            }


        case ERROR_LOGGING_IN:
            return {
                ...state,
                loggingIn: false,
                loginError: action.payload,
            }


        case LOGGED_IN:
            return {
                ...state,
                loggingIn: false,
                isLogin: action.payload,
                user: action.payload,
                loginError: null,
            }


        case IS_REGISTERING:
            return {
                ...state,
                isRegistering: true,
                registerError: null,
                authErrors: {},
                loginError: null,
            }


        case ERROR_REGISTERING_IN:
            return {
                ...state,
                isRegistering: false,
                registerError: action.payload
            }


        case REGISTERED:
            return {
                ...state,
                isRegistering: false,
                token: action.payload,
            }

        case USER:
            return {
                ...state,
                loginError: null,
                user: action.payload
            }

        case HAS_ERRORS:
            return {
                ...state,
                isRegistering: false,
                hasError: action.payload,
            }

        case IS_CREATING_TUTOR:
            return {
                ...state,
                isCreatingTutor: true,
                createTutorError: null,
            }

        case ERROR_CREATING_TUTOR:
            return {
                ...state,
                isCreatingTutor: false,
                createTutorError: action.payload,
            }


        case TUTOR:
            return {
                ...state,
                createTutorError: null,
                isCreatingTutor: false,
                tutor: action.payload,
            }


        default:
            return {
                ...state
            }
            break;
    }
}