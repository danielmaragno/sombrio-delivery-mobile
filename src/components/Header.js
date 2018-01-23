import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Header as NativeHeader, Icon } from 'react-native-elements';
import IconBadge from 'react-native-icon-badge';
import { colorsTable, headerStyle,headerTitleStyle, viewStyle } from '../colors';

class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {

		const { title, navigate } = this.props;
		const { cart } = this.props;

		return (
			<NativeHeader
		    	outerContainerStyles={{ borderBottomWidth:0 }}
		    	leftComponent={{ icon: 'menu', color: headerTitleStyle.color, onPress: () => navigate('DrawerOpen') }}
				centerComponent={{ text: title, style: { color: '#fff' } }}
				rightComponent={<CartIcon navigate={navigate} cart={cart} />}
			/>
		);
	}
}


const CartIcon = ({navigate, cart}) => {
	return (
		<IconBadge 
			MainElement={
				<View style={{padding: 5}}>
					<Icon 
						name="shopping-cart"
						color={headerTitleStyle.color}
						onPress={() => navigate('Cart')}
					/>
				</View>
			}
			BadgeElement={
		      <Text style={{color:'#FFFFFF'}}>{cart.items.length}</Text>
		    }
		    IconBadgeStyle={{
		    	width:13,
		    	height:13,
		    	// top: 0,
		    	// right: 0
		    }}
		    Hidden={!cart.items.length}
		/>
	)
}

const mapStateProps = state => {
	return {
		cart: state.cart
	}
}

export default connect(
	mapStateProps,
	null
)(Header, CartIcon)