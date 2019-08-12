import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { AppRegistry, StyleSheet, FlatList, Text, TouchableOpacity, View, AsyncStorage, Image, ToastAndroid, Platform } from 'react-native';

import LoginScreen from '../Components/Login';
import SignUpScreen from '../Components/SignUp';
import Dashboard from '../Components/Dashboard';
import MyCart from '../Components/Cart';
import MyWishlist from '../Components/MyWishlist';
import MyOrders from '../Components/MyOrders';
import ProductHomeScreen from '../Components/ProductHome';
import ListLayoutScreen from '../Components/ListLayout';
import Drawer from './AppDrawer';
import MyScreen from './../Components/Splash';
import HomeNew from './../Components/HomeNew';

const LoginS = createStackNavigator({ Login: LoginScreen, Dashboard: Dashboard, SignUpScreen: SignUpScreen });

const DashboardS = createStackNavigator({
  Dashboard: Dashboard, ListLayout: ListLayoutScreen, ProductHome: ProductHomeScreen
});

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Login: LoginS,
  SignUpScreen: SignUpScreen,
  Drawer: HomeNew,
  MyWishlist: MyWishlist,
  MyCart: MyCart,
  MyOrders: MyOrders,
  ProductHome: ProductHomeScreen,
  ListLayout: ListLayoutScreen
},
  {
    initialRouteName: 'Drawer',
  }
);

AppRegistry.registerComponent('obabashop', () => AppNavigater);