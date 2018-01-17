
import Home from './components/Home';
import Orders from './components/Orders';
import Address from './components/Address';

const routesList = [
	{
		key: 'Home',
		screen: Home,
		routeName: 'Home',
		params: {
			title: "Início",
			leftIcon: {
				name: 'home'
			}
		}
	},
	{
		key: 'Orders',
		screen: Orders,
		routeName: 'Orders',
		params: {
			title: "Meus Pedidos",
			leftIcon: {
				name: 'motorcycle'
			}
		}
	},
	{
		key: 'Address',
		screen: Address,
		routeName: 'Address',
		params: {
			title: "Endereço",
			leftIcon: {
				name: "location-on"
			}
		}
	}
]

export default routesList;