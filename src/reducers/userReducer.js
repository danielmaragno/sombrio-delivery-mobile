const initialState = {
	token: null,
	id: null,
	name: null,
	address: null,

	isLoadingAddressUpdate: false,
	addressUpdateOk: false
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
		case 'UPDATE_USER_ADDRESS': {
			return {...state, address: action.address, isLoadingAddressUpdate: false}
		}
		case 'RESET_USER': {
			return initialState
		}
		
		case 'LOADING_ADDRESS_UPDATE_TRUE': {
			return {...state, isLoadingAddressUpdate: true}
		}
		case 'LOADING_ADDRESS_UPDATE_FALSE': {
			return {...state, isLoadingAddressUpdate: false}
		}
		case 'ADDRESS_UPDATE_TRUE': {
			return {...state, addressUpdateOk: true}
		}
		case 'ADDRESS_UPDATE_FALSE': {
			return {...state, addressUpdateOk: false}
		}
	}


	return state;
}