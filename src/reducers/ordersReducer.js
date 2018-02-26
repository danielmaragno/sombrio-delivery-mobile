const initialState = {
	orders: [],
	ordersMap: {}
}

export default function reducer(state=initialState, action){

	switch(action.type){
		case 'FETCH_ORDERS': {
			return {...state, orders: action.orders, ordersMap: action.ordersMap}
		}

		case 'UPDATE_ORDER_STATUS': {
			let ordersMap = Object.assign({}, state.ordersMap);
			ordersMap[action.order_id].status = action.status;
			
			return {
				...state,
				ordersMap: ordersMap
			}
		}
	}

	return state;
}