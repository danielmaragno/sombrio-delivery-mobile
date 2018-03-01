const initialState = {
	// name: "Daniel Maragno",
	// id: "danielcoelho.esk@gmail.com",
	// passwd: "daniel",
	// passwdConf: "daniel",
	name: null,
	id: null,
	passwd: null,
	passwdConf: null,

	isLoading: false,
	errorFlag: false,
	okFlag: false
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
		case 'REGISTER_RESET_PASSWD': {
			return {...state, passwd: initialState.passwd, passwdConf: initialState.passwdConf}
		}
		case 'REGISTER_RESET_FLAGS': {
			return {...state, isLoading: initialState.isLoading, errorFlag: initialState.errorFlag, okFlag: initialState.okFlag}	
		}
		case 'EXEC_REGISTER': {
			return {...state, isLoading: true, errorFlag: false}
		}
		case 'EXEC_REGISTER_ERROR_ID_CUPLICATE': {
			return {...state, isLoading: false, errorFlag: true}
		}
		case 'EXEC_REGISTER_OK': {
			return {...state, isLoading: false, okFlag: true}
		}
	
	}

	return state;
}