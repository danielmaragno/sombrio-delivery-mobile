import React from 'react';
import { connect } from 'react-redux';
import { View, Alert, ScrollView, Text, Image } from 'react-native';
import { Card, Divider, Icon, Badge } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";
import { formatMonetary, formatDateTime } from '../utils';
import { viewStyle, orderStatusMap, listItemStyle, colorsTable } from '../colors';
import Header from './Header';

class OrderExpand extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {

		const { index } = this.props.navigation.state.params;
		const order = this.props.orders.orders[index];
		
		return (
			<View style={viewStyle}>
				<Header title={`Pedido ${order._id.slice(-4)}`}  navigate={this.props.navigation.navigate} />

				<ScrollView>
					{
						order.items.map((item, index) => (
							<View key={index} style={{backgroundColor: listItemStyle.backgroundColor}}>
								<Grid>
									<Col size={2}>
										<Image 
											source={{uri: 'http://www.makmassas.com.br/image/cache/data/loja/produtos/trufas/trufa-amarula/trufa-amarula-1024x1024.jpg'}}
											style={{width: 60, height: 40}}
										/>
									</Col>
									<Col size={6} style={{paddingRight: 10}}>
										<Row>
											<Text 
												style={{fontWeight: 'bold', color: listItemStyle.color, fontSize: 16}}
												numberOfLines={1}
												adjustsFontSizeToFit
											>
												{item.name}
											</Text>
										</Row>
										<Row>
											<Text style={{color: listItemStyle.color, fontSize: 16}}>
												{`${item.qtd}x`}
											</Text>
											<Text style={{color: listItemStyle.color, fontSize: 16, position: 'absolute', right: 0}}>
												{`R$ ${formatMonetary(item.price_un * item.qtd)}`}
											</Text>
										</Row>
									</Col>
								</Grid>
								<Divider />
							</View>
						))
					}
				</ScrollView>
				<View style={{margin: 15}}>
					<View style={{marginBottom: 15}}>
						<Text style={{fontSize: 18, fontWeight: 'bold', color: colorsTable.info}}>
							{formatDateTime(order.timeStamp)}
						</Text>
					</View>
					
					<View style={{flexDirection: 'row'}}>
						<View>
							<Badge 
								containerStyle={{backgroundColor: orderStatusMap[order.status].color}}
							>
								<Text style={{color:'white', fontSize: 18}}>
									{orderStatusMap[order.status].title}
								</Text>
							</Badge>
						</View>
						<View style={{flex: 1, alignItems: 'flex-end'}}>
							<Text style={{fontSize: 18, fontWeight: 'bold', color: listItemStyle.color}}>
								{`Total R$ ${formatMonetary(order.total_price)}`}
							</Text>
						</View>
						
					</View>
				</View>

			</View>
		);
	}
}


const mapStateProps = state => {
	return {
		orders: state.orders,
	}
}

export default connect(
	mapStateProps,
	null
)(OrderExpand)