import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import login from './loginReducer';
import register from './registerReducer';
import user from './userReducer';
import pos from './posReducer';
import orders from './ordersReducer';
import itemModal from './itemModalReducer';
import cart from './cartReducer';
import address from './addressReducer';
import passwdRecovery from './passwdRecoveryReducer';
import passwdChange from './passwdChangeReducer';

export default combineReducers({
	form: formReducer,
	login,
	register,
	passwdRecovery,
	user,
	pos,
	orders,
	itemModal,
	cart,
	address,
	passwdChange
});