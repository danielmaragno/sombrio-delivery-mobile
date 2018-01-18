import React from 'react';
import { connect } from 'react-redux';
import { View, Alert, KeyboardAvoidingView, Text } from 'react-native';
import { Card, Badge } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { viewStyle, orderStatusMap } from '../colors';
import Header from './Header';
import { formatMonetary, formatDateTime } from '../utils';

import { fetchOrders } from '../actions/ordersActions';

class Orders extends React.Component {
	
	constructor(props) {
		super(props);

		const token  = this.props.user.token;
		const pos_id = this.props.pos.id; 
		this.props.dispatch(fetchOrders(pos_id, token))
	}

	render() {
		console.log(this.props.orders);
		const { orders } = this.props.orders;
		return (
				
			<View style={viewStyle} >
				<Header title="Meus Pedidos"  navigate={this.props.navigation.navigate} />
				<KeyboardAwareScrollView>
					<View>
						{
							orders.map((o, i) => (
								<Card  key={o._id}>
									<Grid>
										<Row style={{height: 30}}>
											<Text style={{fontWeight: 'bold', color: '#424242'}}>
												{`#${o._id.slice(-4)}`}
											</Text>
											<Badge 
												containerStyle={{backgroundColor: orderStatusMap[o.status].color}}
												wrapperStyle={{	position: 'absolute', right: 0}}
											>
												<Text style={{color:'white', fontSize: 12}}>
													{orderStatusMap[o.status].title}
												</Text>
											</Badge>
										</Row>
										<Row>
											<Text style={{fontSize: 16}}>
												{`R$ ${formatMonetary(o.total_price)}`}
											</Text>
											<Text style={{	position: 'absolute', right: 0, bottom:0}}>
												{formatDateTime(o.timeStamp)}
											</Text>
										</Row>
									</Grid>
										
									
								</Card>
							))
						}
					</View>
				</KeyboardAwareScrollView>
			</View>
		);
	}
}

const mapStateProps = state => {
	return {
		user: state.user,
		pos: state.pos,
		orders: state.orders,
	}
}

export default connect(
	mapStateProps,
	null
)(Orders)