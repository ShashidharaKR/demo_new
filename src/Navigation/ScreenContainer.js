import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation'
import { Icon } from 'react-native-elements'
import MyWishlist from './../Components/MyWishlist';
import MyOrders from './../Components/MyOrders';
import ContactUs from './../Components/ContactUs';
import Cart from './../Components/Cart';
import Dashboard from './../Components/Dashboard';
import HomeNew from './../Components/HomeNew';
import HomeComponent from './../Components/HomeComponent';
import AppNavigator from './AppNavigator';
import NavigationNew from './NavigationNew';


const NavigationStack = createDrawerNavigator({
    Dashboard: {
        screen: NavigationNew,
    },

    MyWishlist: {
        screen: MyWishlist
    },
    MyCart: {
        screen: Cart
    },
    MyOrders: {
        screen: MyOrders
    },
    Contact: {
        screen: ContactUs
    },


},
    {
        initialRouteName: 'Dashboard',
        drawerPosition: 'left',
        contentComponent: CustomDrawerContentComponent,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle'
    });


    const CustomDrawerContentComponent = (props) => (

        <Container style={styles.container1} >
            <TouchableOpacity >
                <Header style={styles.drawerHeader} >
    
                    <Body>
                        <Icon style={styles.drawerImage}
                            raised
                            name='user'
                            type='font-awesome'
                            color='#3742fa'
                            size={30} />
                        <Text style={styles.txt}>{emails}</Text>
                        <Text style={styles.txt}>{mobile}</Text>
                    </Body>
    
                </Header>
            </TouchableOpacity>
            <Content>
                <DrawerItems {...props} />
            </Content>
    
        </Container>
    
    );

const Container = createAppContainer(NavigationStack);

export default Container; 