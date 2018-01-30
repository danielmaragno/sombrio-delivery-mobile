import React from 'react';
import { connect } from 'react-redux';
import { View, Alert, ScrollView, Text } from 'react-native';
import { Card, FormLabel, FormInput, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colorsTable, viewStyle } from '../colors';
import Header from './Header';
import { formatAddress } from '../utils';

import { updateAddress } from '../actions/userActions';

class Address extends React.Component {
	
	constructor(props) {
		super(props);
	}

	render() {
		const { address } = this.props.user;
		
		return (
			<View style={viewStyle} >
				<Header title="Endereço"  navigate={this.props.navigation.navigate} />
					{/*
					<Card containerStyle={address ? {display: "none"} : {}}>
						<Text style={{textAlign: 'center', fontWeight: 'bold', color: '#444'}}>
							Você ainda não informou endereço!
						</Text>
					</Card>
					*/}
				<ScrollView>
					<Card>
						<KeyboardAwareScrollView>
							<Text style={{padding:10, fontSize: 16}}>
								{formatAddress(address)}
							</Text>
							<Button 
								backgroundColor={colorsTable.primary}
								title='EDITAR ENDEREÇO'
								onPress={() => this.props.navigation.navigate('AddressNew')}
							/>
						</KeyboardAwareScrollView>
					</Card>
				</ScrollView>
			</View>
		);
	}
}

const mapStateProps = state => {
	return {
		user: state.user,
	}
}

export default connect(
	mapStateProps,
	null
)(Address)