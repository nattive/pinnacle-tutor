import {
    EXPAND_NAV,
} from "../actions/types";

const initialState = {
    expanded: false,
}

export default function(state = initialState, action) {
    switch (action.type) {

        case EXPAND_NAV:
            return {
                ...state,
                expanded: action.payload
            }


        default:
            return {
                ...state
            }
            break;
    }
}