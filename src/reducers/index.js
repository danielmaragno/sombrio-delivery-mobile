import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import login from './loginReducer';
import register from './registerReducer';

export default combineReducers({
	form: formReducer,
	login,
	register
});