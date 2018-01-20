import { request, request_get } from '../http_config';


export function fetchPos(pos_id, token) {
	return (dispatch) => {
		request_get('/pos/'+pos_id, token)

		.then((response) => {
			if(response.status === 200){
				const responseBody = JSON.parse(response._bodyText);
				
				dispatch({
					type: 'FETCH_POS',
					pos: responseBody
				})
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

export function fetchItems(pos_id, token) {
	return (dispatch) => {
		
		request_get('/pos/'+pos_id+'/items', token)

		.then((response) => {
			if(response.status === 200){
				const responseBody = JSON.parse(response._bodyText);

				dispatch({type: 'FETCH_ITEMS', items: responseBody.items})
			}
			else{
				console.log(response);
			}
		})

		.catch((error) => {
			console.log(error);
		})
	}
}