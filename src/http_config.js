export const base_url = "192.168.0.108:3000"

export const http_url = "http://"+base_url

export function request(url, method, body, token=null) {
	return fetch( http_url+url,
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
	return fetch( http_url+url,
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