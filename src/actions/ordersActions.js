import { request, request_get } from '../http_config';


export function fetchOrders(pos_id, token){

	return (dispatch) => {

		request_get('/pos/'+pos_id+'/order', token)

		.then((response) => {
			if(response.status === 200){
				const responseBody = JSON.parse(response._bodyText);
				console.log(responseBody);
				dispatch({type: 'FETCH_ORDERS', orders: responseBody})
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