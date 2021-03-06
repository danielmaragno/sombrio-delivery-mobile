
import Home from './components/Home';
import HomePos from './components/HomePos';
import Orders from './components/Orders';
import Address from './components/Address';
import PasswdChange from './components/PasswdChange';

const routesList = [
	{
		key: 'HomePos',
		screen: HomePos,
		routeName: 'HomePos',
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
			title: "Meu Endereço Padrão",
			leftIcon: {
				name: "location-on"
			}
		}
	},
	{
		key: 'PasswdChange',
		screen: PasswdChange,
		routeName: 'PasswdChange',
		params: {
			title: "Alterar Senha",
			leftIcon: {
				name: 'vpn-key'
			}
		}
	}
]

export default routesList;