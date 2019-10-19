import React, { Component } from 'react';
import { AppRegistry, BackHandler } from 'react-native';
import { Router, Scene, Drawer, Actions } from 'react-native-router-flux';
import SplashScreen from './src/Components/Splash';


var backButtonPressedOnceToExit = false;

export default class App extends React.Component {
  constructor() {
    super()

  }



  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress.bind(this));
  }

  onBackPress() {
    if (backButtonPressedOnceToExit) {
      BackHandler.exitApp();
    } else {
      if (Actions.currentScene !== '_home') {
        Actions.pop();
        return true;
      } else if (Actions.currentScene == '_home') {
        BackHandler.exitApp();
      } else {
        backButtonPressedOnceToExit = true;
        ToastAndroid.show("Press Back Button again to exit", ToastAndroid.SHORT);
        setTimeout(() => { backButtonPressedOnceToExit = false }, 2000);
        return true;
      }
    }
  }
  render() {
    return (
      <Router backAndroidHandler={this.onBackPress} >
        <Scene >
          <Scene hideNavBar key="splash" component={SplashScreen} type="reset" />
         
        </Scene>
      </Router>
    );
  }
}
AppRegistry.registerComponent('obabashop', () => App);