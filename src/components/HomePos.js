import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Alert, KeyboardAvoidingView, Text, Image } from 'react-native';
import { Divider, List, ListItem } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { colorsTable, headerStyle,headerTitleStyle, viewStyle } from '../colors';
import Header from './Header';
import { formatMonetary, formatDateTime } from '../utils';


import ItemModal from './ItemModal';

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

  	openModal(item) {
  		this.props.dispatch({type: 'FETCH_MODAL_ITEM', item: item})
  		this.props.dispatch({type: 'SET_MODAL_ITEM_VISIBLE', visible: true})
  	}

  	closeModal() {
  		this.props.dispatch({type: 'SET_MODAL_ITEM_VISIBLE', visible: false})	
  	}

	render() {

		const { name, items } = this.props.pos;
		const { visible, item } = this.props.itemModal;

		return (
			<View style={viewStyle}>
				<Header title={name}  navigate={this.props.navigation.navigate} />
				<ScrollView>
					
					<List>
						{
							items.map((i, index) => (
								<ListItem
									onPress={() => this.openModal(i)}
									key={i._id}
									title={<Item item={i}/>}
									
									// hideChevron={true}

								/>
							))
						}
					</List>
				
				</ScrollView>
				
				<ItemModal 
					visible={visible}
					onRequestClose={this.closeModal.bind(this)}
				/>

			</View>
		);
	}
}

const Item = ({item}) => {
	
	return (
		<View>
			<Grid>
				<Row>
					<Col size={3}>
						<Image 
							source={{uri: 'http://www.makmassas.com.br/image/cache/data/loja/produtos/trufas/trufa-amarula/trufa-amarula-1024x1024.jpg'}}
							style={{width: 60, height: 40}}
						/>
					</Col>
					<Col size={6}>
						<Text style={{color: style.item.color}}>
							{item.name}
						</Text>
					</Col>
					<Col size={3}>
						<Text style={{color: style.item.color, position: 'absolute', right: 0}}>
							{`R$ ${formatMonetary(item.price)}`}
						</Text>
					</Col>
				</Row>
			</Grid>
				
		</View>
	)
}

const style = {
	item: {
		color: '#444',
		fontSize: 18
	}
}

const mapStateProps = state => {
	return {
		user: state.user,
		pos: state.pos,
		itemModal: state.itemModal
    }
}

export default connect(
	mapStateProps,
	null
)(HomePos)
