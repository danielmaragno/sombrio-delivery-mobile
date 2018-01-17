import React from 'react';
import { Header as NativeHeader } from 'react-native-elements';
import { colorsTable, headerStyle,headerTitleStyle, viewStyle } from '../colors';

const Header = ({title, navigate}) => {
  return (
    <NativeHeader
    	outerContainerStyles={{ borderBottomWidth:0 }}
    	leftComponent={{ icon: 'menu', color: headerTitleStyle.color, onPress: () => navigate('DrawerOpen') }}
		centerComponent={{ text: title, style: { color: '#fff' } }}
		rightComponent={{ icon: 'shopping-cart', color: headerTitleStyle.color, onPress: () => navigate('Chart') }}
	/>
  )
}

export default Header;