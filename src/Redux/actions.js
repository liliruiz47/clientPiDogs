import axios from 'axios';

export const GET_DOGS = 'GET_DOGS'
export const GET_TEMPERAMENTS = 'GET_TEMPERAMENTS'
export const FILTER_BY_TEMPERAMENT = 'FILTER_BY_TEMPERAMENT'
export const SORT_BY_NAME = 'SORT_BY_NAME'
export const SORT_BY_WEIGHT = 'SORT_BY_WEIGHT'
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN'
export const GET_DOGS_BY_NAME = 'GET_DOGS_BY_NAME'
export const DELETE_DETAILS = 'DELETE_DETAILS'
export const CLEAN_DOG = 'CLEAN_DOG'
export const CLEANER = 'CLEANER'
export const GET_DETAILS = 'GET_DETAILS'
export const POST_DOG = 'POST_DOG'
export const GET_TEMPERAMENTS_LIST = 'GET_TEMPERAMENTS_LIST'






export function getDogs() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/dogs')
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}



    export function getDogsByName(name) {
        return async function (dispatch) {
            const { data } = await axios.get(`http://localhost:3001/dogs?name=${name}`);
            return dispatch({
                type: "GET_DOGS_BY_NAME",
                payload: data
            });
        };
    }
    

export function getTemperaments() {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/temperament', {})
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data
        })
    }
}

export function getTemperamentsList() {
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/temperament');
        var listOfTemperaments = json.data.map(el => el.name)
        return dispatch({
            type: 'GET_TEMPERAMENTS_LIST',
            payload: listOfTemperaments
        });
    }
}


export function filterDogsByTemperament(payload) {
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload
    }
}

export function sortByName(payload) {
    return {
        type: SORT_BY_NAME,
        payload
    }
}

export function sortByWeight(payload) {
    return {
        type: SORT_BY_WEIGHT,
        payload
    }
}

export function filterDogsByOrigin(payload) {
    return {
        type: FILTER_BY_ORIGIN,
        payload
    }
}


export function getDetails(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dogs/` + id);
            console.log(json.data)
            return dispatch({
                type: GET_DETAILS,
                payload: json.data
                })
        } catch (error) {
            console.log(error)
        }
    }
}

export function postDog(payload) {
    return async function ( ) {
        const response = await axios.post('http://localhost:3001/dogs', payload)
        console.log(response)
        return response;
    }

}


export function deleteDetails() {
    return async function (dispatch){
    return dispatch({
        type: DELETE_DETAILS
    })
}
}



