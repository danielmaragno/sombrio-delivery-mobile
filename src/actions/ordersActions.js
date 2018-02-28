import { request, request_get } from '../http_config';


export function fetchOrders(token){

	return (dispatch) => {

		request_get('/client/orders', token)

		.then((response) => {
			if(response.status === 200){
				const responseBody = JSON.parse(response._bodyText);
				// console.log(responseBody);

				let orders = [], ordersMap = {};

				for(let i=0, order; order=responseBody[i++];){
					orders.push(order._id);
					ordersMap[order._id] = order;
				}

				// console.log("ORDERS LIST");
				// console.log(orders);
				// console.log("\n\n\n");
				// console.log("ORDERS MAP");
				// console.log(ordersMap);
				dispatch({type: 'FETCH_ORDERS', orders: orders, ordersMap: ordersMap})
			}
			else {
				console.log(response);
			}
		})

		.catch((error) => {
			console.log(error);
		})
	}
}

export function updateOrderStatus(token, order_id, older_status){

	return (dispatch) => {

		request_get('/order/'+order_id+'/status', token)

		.then((response) => {
			
			if(response.status === 200){
				const order = JSON.parse(response._bodyText);
				console.log(order);
				
				// Check if status has changed
				if(!compareStatus(older_status, order.status)){
					// triggerNotification();
					dispatch({
						type: 'UPDATE_ORDER_STATUS',
						order_id: order._id,
						status: order.status
					})
				}
			}
			else {
				console.log(response);
			}
		})

		.catch((error) => {
			console.log(error);
		})
	}
}

function compareStatus(older_status, status) {
	return older_status === status;
}

function triggerNotification() {
	console.log("MUDOU");
}