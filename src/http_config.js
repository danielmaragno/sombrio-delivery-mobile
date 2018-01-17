const base_url = "http://192.168.0.108:3000"

export function request(url, method, body, token=null) {
	return fetch( base_url+url,
			{
				method: method,
				headers: {
				    Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': token
				},
				body: JSON.stringify(body)
			}
		)
}

export function request_get(url, token=null){
	return fetch( base_url+url,
			{
				method: 'GET',
				headers: {
				    Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': token
				}
			}
		)
}