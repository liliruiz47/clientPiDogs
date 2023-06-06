import {
    GET_DOGS,
    GET_TEMPERAMENTS,
    FILTER_BY_TEMPERAMENT,
    SORT_BY_NAME,
    SORT_BY_WEIGHT,
    FILTER_BY_ORIGIN,
    GET_DOGS_BY_NAME,
    GET_DETAILS,
    DELETE_DETAILS,
    POST_DOG,
    GET_TEMPERAMENTS_LIST
    
} from "./actions"


const initialState = {
    dogs : [],
    allDogs: [],
    temperament: [],
    detail: [],

} 


function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
                detail: []

            }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperament: action.payload
            }

        case GET_DOGS_BY_NAME:
            return {
                    ...state,
                dogs: action.payload,
                allDogs: action.payload,
                }

        case FILTER_BY_TEMPERAMENT:
            const allDogs = state.allDogs
            const temperamentFiltered = action.payload === 'all' ? allDogs : allDogs.filter(e => {
                if (typeof (e.temperament) === 'string') return e.temperament.includes(action.payload)
                if (Array.isArray(e.temperament)) {
                    let temps = e.temperament.map(e => e.name)
                    return temps.includes(action.payload)
                    }
                    return true
                })
                return {
                    ...state,
                    dogs: temperamentFiltered
                }

                case SORT_BY_NAME:
                    const sortedName = action.payload === 'ABC' ?
                        state.dogs.sort(function (a, b) {
                            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                                return 1;
                            }
                            if (b.name.toLowerCase() > a.name.toLowerCase()) {
                                return -1;
                            }
                            return 0
                        }) :
                        state.dogs.sort(function (a, b) {
                            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                                return -1;
                            }
                            if (b.name.toLowerCase() > a.name.toLowerCase()) {
                                return 1;
                            }
                            return 0
                        })
                    return {
                        ...state,
                        dogs: sortedName
                    }

            case SORT_BY_WEIGHT:
                const sortedWeight = action.payload === 'asc' ?
                    state.dogs.sort(function (a, b) {
                    return parseInt(a.weight_min) - parseInt(b.weight_min)
                }) :
                    state.dogs.sort(function (a, b) {
                    return parseInt(b.weight_max) - parseInt(a.weight_max)
                })
            return {
                ...state,
                dogs: sortedWeight,
            }

            case FILTER_BY_ORIGIN:
                const all = state.allDogs
                const originFiltered = action.payload === 'all' ? all : action.payload === 'created' ? all.filter(e => e.createdInDB) : all.filter(e => !e.createdInDB)
            return {
                ...state,
                dogs: originFiltered,
            }

            case GET_DETAILS:
            return{
                ...state,
                detail: action.payload
            }

            case GET_TEMPERAMENTS_LIST:
            return {
                ...state,
                temperament: action.payload
            }

            case POST_DOG:
            return {
                ...state,
            }

            case DELETE_DETAILS:
            return{
                ...state,
                detail: []
            }
            
        default:
            return state;
    }
}

export default rootReducer;