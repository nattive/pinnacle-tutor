import {
    APP_LOADER,
    APP_STOPPED_LOADING,
} from "../actions/types";

const initialState = {
    appIsLoading: false,
    loadingText: '',
}

export default function(state = initialState, action) {
    switch (action.type) {

        case APP_LOADER:
            return {
                ...state,
                appIsLoading: true,
                loadingText: action.payload,
            }

        case APP_STOPPED_LOADING:
            return {
                ...state,
                appIsLoading: false,

            }

        default:
            return {
                ...state
            }
            break;
    }
}