import {
    EXPAND_NAV,
    GET_ACTIVITIES,
    ERR_GETTING_ACTIVITIES,
    RECENT_ACTIVITIES
} from "../actions/types";

const initialState = {
    expanded: false,
    gettingActivities: false,
    Activities: [],
    ActivitiesError: null,
}

export default function(state = initialState, action) {
    switch (action.type) {

        case EXPAND_NAV:
            return {
                ...state,
                expanded: action.payload
            }

        case GET_ACTIVITIES:
            return {
                ...state,
                gettingActivities: true,
                ActivitiesError: null,
            }

        case ERR_GETTING_ACTIVITIES:
            return {
                ...state,
                gettingActivities: false,
                ActivitiesError: action.payload,
            }

        case RECENT_ACTIVITIES:
            return {
                ...state,
                gettingActivities: false,
                Activities: action.payload,
            }


        default:
            return {
                ...state
            }
            break;
    }
}