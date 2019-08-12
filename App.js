import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Image, View, AppRegistry, BackHandler, BackAndroid } from 'react-native';
import { createStackNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import { Router, Scene, Drawer, Actions } from 'react-native-router-flux';
import SplashScreen from './src/Components/Splash';
import Dashboard from './src/Components/Dashboard';
import MyWishlist from './src/Components/MyWishlist';
import MyCart from './src/Components/Cart';
import ListLayout from './src/Components/ListLayout';
import ProductHome from './src/Components/ProductHome';
import Login from './src/Components/Login';
import SignUp from './src/Components/SignUp';
import POSScreen from './src/Components/POS';
import PaymentGateway from './src/Components/PaymentGateway';
import AppDrawer from './src/Navigation/AppDrawer';
import SearchComponent from './src/Components/SearchComponent';
import Contact from './src/Components/ContactUs';
import HomeNew from './src/Components/HomeNew';
import HomeComponent from './src/Components/HomeComponent';
import SideMenu from './src/Components/SideMenu';
import MyOrders from './src/Components/MyOrders';

var backButtonPressedOnceToExit = false;



export default class App extends React.Component {


  constructor() {
    super()
    this.state = { bookIcon: null }
  }

  componentDidMount() {
    Actions.refresh({
      rightButtonImage: require('./src/images/obaba.jpg')
    });
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
    Icon.getImageSource('ios-book', 30).then(source =>
      this.setState({ bookIcon: source }));
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }

  onBackPress() {
    if (backButtonPressedOnceToExit) {
      BackHandler.exitApp();
    } else {
      if (Actions.currentScene !== '_home') {
        //   alert(Actions.currentScene);
        Actions.pop();
        return true;
      } else if (Actions.currentScene == '_home') {
        BackHandler.exitApp();
      } else {
        backButtonPressedOnceToExit = true;
        ToastAndroid.show("Press Back Button again to exit", ToastAndroid.SHORT);
        //setting timeout is optional
        setTimeout(() => { backButtonPressedOnceToExit = false }, 2000);
        return true;
      }
    }
  }


  render() {
    return (
      // <Router>
      //   <Scene key="root">
      //     <Scene key="splash" component={SplashScreen} initial  hideNavBar  />
      //     <Scene key="gray"  type="reset" component={DashboardScreen}   />
      //     <Scene key="product"  component={ProductHome}  />
      //     <Scene key="cart" component={MyCart}  />
      //     <Scene key="wish" component={MyWishlist}  />
      //     <Scene key="login"  component={Login}   />
      //     <Scene key="reg" component={SignUp}  />
      //     <Scene key="list" component={ListLayout}  />
      //     <Scene key="payment" component={PaymentGateway}  />
      //     <Scene key="pos" component={POSScreen}  />
      //     <Scene key="search" component={SearchComponent}  />
      //     <Scene key="home" component={AppDrawer} hideNavBar  />
      //     <Scene key="contact" component={Contact} hideNavBar  />
      //   </Scene>
      // </Router>


      <Router backAndroidHandler={this.onBackPress} >
        <Scene >
          <Scene
            hideNavBar
            key="splash"
            component={SplashScreen}
            type="reset"
          />
          <Scene
            key="registerScreen"
            component={SignUp}
          />
          <Scene key="orders" component={MyOrders} />
          <Scene key="login" component={Login} />
          <Scene key="contact" component={Contact} />
          <Scene key="product" component={ProductHome} />
          <Scene key="cart" component={MyCart} />
          <Scene key="wish" component={MyWishlist} />
          <Scene key="login" component={Login} />
          <Scene key="reg" component={SignUp} />
          <Scene key="list" component={ListLayout} />
          <Scene key="payment" component={PaymentGateway} />
          <Scene key="pos" component={POSScreen} />
          <Scene key="search" component={SearchComponent} />

          <Drawer
            open={true}
            hideNavBar
            key="drawerMenu"
            contentComponent={SideMenu}
            drawerWidth={250}
            drawerPosition="left" >
            <Scene
              // navTransparent={true}
              key="home"
              headerLayoutPreset="center"
              component={Dashboard} titleStyle={{ alignSelf: 'center' }} title='Obaba.shop'
              onRight={() => { Actions.login() }}
              rightTitle={'Login'}
              rightButtonImage={require('./src/images/obaba.jpg')}
            // rightButtonTextStyle={{ width: 30, height: 30 }}
            />
            <Scene
              key="register"
              component={SignUp}
            />
            <Scene
              key="wishlist"
              component={MyWishlist}
            />
          </Drawer>
        </Scene>

      </Router>


    );



  }
}
AppRegistry.registerComponent('obabashop', () => App);

// back={true} 