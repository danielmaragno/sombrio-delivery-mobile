import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
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
		    	outerContainerStyles={{ borderBottomWidth:0, backgroundColor: colorsTable.primary }}
		    	leftComponent={{ icon: 'menu', color: headerTitleStyle.color, onPress: () => navigate('DrawerOpen') }}
				centerComponent={<Text style={{color: '#fff', fontSize: 18}}>{title}</Text>}
				rightComponent={<CartIcon navigate={navigate} cart={cart} />}
			/>
		);
	}
}


const CartIcon = ({navigate, cart}) => {
	return (
		<TouchableOpacity onPress={() => navigate('Cart')} >
			<IconBadge
				MainElement={
					<View style={{paddingLeft: 14}}>
						<Icon 
							name="shopping-cart"
							color={headerTitleStyle.color}
						/>
					</View>
				}
				BadgeElement={
			      <Text style={{color:'#FFFFFF'}}>{cart.items.length}</Text>
			    }
			    IconBadgeStyle={{
			    	width:13,
			    	height:13,
			    	position: 'absolute',
			    	bottom:0,
			    	left: 0,
			    	top: 'auto',
			    	// right: 0
			    }}
			    Hidden={!cart.items.length}
			/>
		</TouchableOpacity>
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