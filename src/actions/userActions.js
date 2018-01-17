import { request, request_get } from '../http_config';

export function fetchUser(token) {
	return (dispatch) => {
		request_get('/client', token)
		
		.then((response) => {
			if(response.status === 200){
				const responseBody = JSON.parse(response._bodyText);
				console.log(responseBody)
				dispatch({
					type: 'FETCH_USER',
					id: responseBody.id,
					name: responseBody.name,
					address: responseBody.address
				})
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