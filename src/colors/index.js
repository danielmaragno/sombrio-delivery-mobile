export const colorsTable = {
	// primary: '#3366CC'
    primary: "#27ae60", // green
    darkPrimary: '#1D7D46',
    lightPrimary: '#CCFFCC',
    info: "#e67e22", //orange,
    baseBackground: '#f0ead6', // marrom bem claro 
}

export const headerStyle = {
    // backgroundColor: '#2F363D', // mais escuro
    // backgroundColor: '#1A64AE' // Azul
    height: 85,  
    borderBottomWidth:0, 
    backgroundColor: colorsTable.primary 
}

export const headerTitleStyle = { 
    color: '#ffffff',
    fontWeight: 'normal',
    // fontFamily: 'Times New Roman'

}

export const viewStyle = {
    flex: 1,
    // paddingBottom: 15,
    // backgroundColor: "#A4A9AE", // mais escuro
    // backgroundColor: '#B0C7DE' // azul claro
    backgroundColor: colorsTable.baseBackground // marrom bem claro
}


export const drawerMenuHeaderView = {
	paddingTop: 33+15, // Status bar overlap
    paddingBottom: 18,
    padding: 13,
    flex: 0.5,
	backgroundColor: '#2d3436'
}

export const drawerMenuHeaderTitle = {
	fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
}

export const drawerMenuHeaderSubTitle = {
	color: drawerMenuHeaderTitle.color
}

export const drawerListItems = {
	borderBottomWidth: 0,
    marginTop: 6
}

export const orderStatusMap = {
    requested: {
    	title: 'Pendente',
    	color: '#f1c40f'
    },
    confirmed: {
    	title: 'Confirmado',
    	color: '#27ae60'
    },
    canceled: {
    	title: 'Cancelado',
    	color: '#e74c3c'
    },
    on_road: {
    	title: 'Saiu p/ Entrega',
    	color: '#2980b9'
    },
    done: {
    	title: 'Finalizado',
    	color: '#2c3e50'
    }
}

export const listItemStyle = {
    backgroundColor: "#fff",
    color: "#444"
}

export const bottomInfo = {
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 25,
    paddingTop: 25
}

export const bottomInfoText = {
    fontWeight: 'bold', 
    fontSize: 20,
    color: '#444' 
}

export const dataStyle = {
    viewBlock: {
        marginTop: 15,
        padding: 10, 
        // backgroundColor: listItemStyle.backgroundColor
    },
    viewBlockTitle: {
        // paddingLeft: 10, paddingRight: 10
        color: '#444',
        fontWeight: 'bold'
    },
    viewBlockContent: {
        color: '#444',
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10
    }
}