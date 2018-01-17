const initialState = {
	token: null,
	id: null,
	name: null,
	address: null
}

export default function reducer(state=initialState, action){

	switch(action.type){
		case 'FETCH_USER': {
			return {...state, id: action.id, name:action.name, address: action.address}
		}
		case 'FETCH_TOKEN': {
			return {...state, token: action.token}
		}
		case 'FETCH_ID': {
			return {...state, id: action.id}
		}
		case 'RESET_USER': {
			return initialState
		}
	}


	return state;
}