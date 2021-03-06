import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, View, Alert, KeyboardAvoidingView, Text, Image } from 'react-native';
import { Divider, List, ListItem, Badge } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from './Header';
import { colorsTable, headerStyle,headerTitleStyle, viewStyle, listItemStyle } from '../colors';
import { formatMonetary, formatDateTime } from '../utils';
import { http_url } from '../http_config';


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
  		if(this.props.pos.open){
  			this.props.dispatch({type: 'FETCH_MODAL_ITEM', item: item})
	  		this.props.dispatch({type: 'SET_MODAL_ITEM_VISIBLE', visible: true})
  		}
  		else {
  			this._PosClosedAlert();
  		}
  	}

  	closeModal() {
  		this.props.dispatch({type: 'SET_MODAL_ITEM_VISIBLE', visible: false})	
  	}

  	_PosClosedAlert() {
  		Alert.alert(
			"Desculpe",
			"Não é possível fazer pedidos. Estamos fechados no momento."
  		)
  	}

	render() {

		const { name, items, open } = this.props.pos;
		const { visible, item } = this.props.itemModal;
		const openTagInfo = open ? {color: '#27ae60', text: 'ABERTO'} : {color: '#c0392b', text: 'FECHADO'}

		return (
			<View style={viewStyle}>
				<Header title={name}  navigate={this.props.navigation.navigate} />
				<View style={{flexDirection: 'row', margin: 10}}>
					<View style={{flex: 1, alignItems: 'flex-end'}}>
						{
							
							<Badge 
								containerStyle={{backgroundColor: openTagInfo.color}}
								textStyle={{color: '#fff'}}
								value={openTagInfo.text}
							/>
								
							
						}
					</View>
				</View>
				
				<ScrollView>
					
					
						{
							items.map((item, index) => (
								<ListItem
									// containerStyle={{backgroundColor: listItemStyle.backgroundColor}}
									onPress={() => this.openModal(item)}
									key={item._id}
									title={<Item item={item}/>}
									
									// hideChevron={true}

								/>
							))
						}
					
				
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
					<Col size={4} style={{height: 60, marginRight: 5, backgroundColor: '#FFF', borderRadius: 10}}>
						<Image 
							source={{uri: http_url+item.image}}
							style={{flex: 1, width: null, height: null, resizeMode: 'contain'}}
						/>
					</Col>
					<Col size={8}>
						<Text style={{color: listItemStyle.color, fontWeight: 'bold'}}>
							{item.name}
						</Text>
						<Text style={{fontWeight: 'bold'}}>
							{item.info}
						</Text>
					</Col>
					<Col size={3}>
						<Text style={{color: listItemStyle.color, fontWeight: 'bold', position: 'absolute', right: 0}}>
							{`$ ${formatMonetary(item.price)}`}
						</Text>
					</Col>
				</Row>
			</Grid>
		</View>
	)
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
