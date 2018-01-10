const initialState = {
	id: null,
	passwd: null,
	passwdConf: null,
	name: null,

	isLoading: false,
	errorFlag: false
}

export default function reducer(state=initialState, action){

	switch(action.type){

		case 'REGISTER_CHANGE_ID': {
			return {...state, id: action.payload}
		}
		case 'REGISTER_CHANGE_PASSWD': {
			return {...state, passwd: action.payload}
		}
		case 'REGISTER_CHANGE_PASSWD_CONF': {
			return {...state, passwdConf: action.payload}
		}
		case 'REGISTER_CHANGE_NAME': {
			return {...state, name: action.payload}
		}
	
	}

	return state;
}