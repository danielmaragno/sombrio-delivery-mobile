import React from 'react';
import { connect } from 'react-redux';
import { View, Alert, KeyboardAvoidingView, Text } from 'react-native';
import { colorsTable, headerStyle,headerTitleStyle, viewStyle } from '../colors';
import Header from './Header'

import { fetchPos, fetchItems } from '../actions/posActions';

class HomePos extends React.Component {
	
	constructor(props) {
		super(props);

		const token  = this.props.user.token;
		const pos_id = this.props.pos.id; 
		this.props.dispatch(fetchPos(pos_id, token));
		this.props.dispatch(fetchItems(pos_id, token));
		
	}

	static navigationOptions = {
	    // drawerLabel: "Teste"
  	}

	render() {

		const { name } = this.props.pos;

		return (
			<View style={viewStyle}>
				<Header title={name}  navigate={this.props.navigation.navigate} />
					
			</View>
		);
	}
}


const mapStateProps = state => {
	return {
		user: state.user,
		pos: state.pos
    }
}

export default connect(
	mapStateProps,
	null
)(HomePos)
