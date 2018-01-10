const base_url = "http://192.168.0.108:3000"

export function request(url, method, body) {
	return fetch( base_url+url,
			{
				method: method,
				headers: {
				    Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body)
			}
		)
} 