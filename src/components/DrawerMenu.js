import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { Divider, List, ListItem } from 'react-native-elements';
import { drawerMenuHeaderView, drawerMenuHeaderTitle, drawerListItems } from '../colors';

import routesList from '../routes';

const DrawerMenu = (props) => {
	
	const { navigate } = props.navigation;
	console.log(routesList)

	return (
		<ScrollView>
		    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
		      {/*<DrawerItems {...props} />*/}
				<View style={drawerMenuHeaderView}>
					<Text style={drawerMenuHeaderTitle}>Daniel Maragno</Text>
					<Text>danielcoelho.esk@gmail.com</Text>
				</View>
				{
					routesList.map((l,i) => (
					<ListItem
						containerStyle={drawerListItems}
						key={l.key}
						title={l.key}
						leftIcon={l.params.leftIcon}
						onPress={() => navigate(l.routeName)}
					/>
					))
				}
				
				<List>
					<ListItem 
					key="logout"
					title="Sair"
					leftIcon={{name:"power-settings-new"}}
					/>
				</List>
		    </SafeAreaView>
	  	</ScrollView>
  	)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default DrawerMenu