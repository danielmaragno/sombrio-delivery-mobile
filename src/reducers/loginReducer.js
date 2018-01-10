const initialState = {
	id: 'daniel',
	passwd: 'gremiofbpa',
	token: null,
	isLoading: false,
	errorFlag: false
}

export default function reducer(state=initialState, action) {

	switch (action.type) {
		case 'CHANGE_ID': {
			return {...state, id: action.payload.id}
		}
		case 'CHANGE_PASSWD': {
			return {...state, passwd: action.payload.passwd}
		}
		case 'EXEC_LOGIN': {
			return {...state, isLoading: true, errorFlag: false}
		}
		case "EXEC_LOGIN_REJECTED": {
			return {...state, isLoading: false, errorFlag: true}
		}
		case "EXEC_LOGIN_FULFILLED": {
			return {...state, isLoading: false, token: action.payload.token}
		}
		case "LOGIN_FLAG_ERROR_FALSE": {
			return {...state, errorFlag: false}
		}
		case 'LOGIN_CLEAR_PASSWD_FIELD': {
			return {...state, errorFlag: false, passwd: initialState.passwd}
		}
	}

	return state;
}