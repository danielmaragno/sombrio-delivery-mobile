import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import login from './loginReducer';
import register from './registerReducer';
import user from './userReducer';
import pos from './posReducer';
import orders from './ordersReducer';

export default combineReducers({
	form: formReducer,
	login,
	register,
	user,
	pos,
	orders
});