'use strict';
import React from 'react';
import { Alert, Dimensions, ToastAndroid, AsyncStorage, ScrollView, StyleSheet, View, Image, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SkypeIndicator } from 'react-native-indicators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';

import { Provider } from 'react-redux';

import store from '../../app/store'; //Import the store
import Home from '../../app/components/home'; //Import the component file

class Login extends React.Component {

  static navigationOptions = {
    title: 'SIGN IN'
  }
  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      isLoadingTrue: true,
      isLoadingFalse: false,
      password: '',
      isLoggingIn: false,
      message: '',
    }

  }



  _userLogin = () => {
    // 
    if (this.state.userName == '' || this.state.password == '') {
      ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
      return;
    } else {
       if (this.state.userName == 'hruday@gmail.com' && this.state.password == 'hruday123') {
      //if (this.state.userName == '1111' && this.state.password == '1111') {
        this.setState({ isLoggingIn: true });
      } else {
        ToastAndroid.show('Username or Password wrong', ToastAndroid.SHORT)
      }

    };
  }



  componentDidMount() {
    this.props.getDataLogin(); //call our action
    //ToastAndroid.show(this.props.data, ToastAndroid.SHORT);
    //alert(this.props.data);

  }




  render() {
    if (this.state.isLoggingIn) {
      return (
        <Provider store={store}>
          <Home />
        </Provider>);
    } else {
      return (

        <ScrollView keyboardShouldPersistTaps='handled' behavior="padding">
          <KeyboardAvoidingView>
            <LinearGradient style={styles.container} colors={['#1B9CFC', '#55E6C1']}>
              <View style={styles.container2}>

                <TextInput underlineColorAndroid='transparent' placeholder="E-mail"
                  placeholderTextColor='#84817a'
                  style={styles.input}
                  onSubmitEditing={() => this.passwordInput.focus()}
                  onChangeText={(userName) => this.setState({ userName })}
                  autoFocus={true}>
                </TextInput>

                <TextInput underlineColorAndroid='transparent' placeholder="Password" placeholderTextColor='#84817a'
                  secureTextEntry style={styles.input}
                  ref={(input) => this.passwordInput = input}
                  onChangeText={(password) => this.setState({ password })}
                  secureTextEntry={true}
                  onSubmitEditing={this._userLogin}>
                </TextInput>

                {!!this.state.message && (
                  <Text
                    style={{ fontSize: 14, color: 'red', padding: 5 }}>
                    {this.state.message}
                  </Text>
                )}
                <LinearGradient style={styles.button} colors={['#ff9ff3', '#be2edd']}>
                  <TouchableOpacity style={styles.button} onPress={this._userLogin}>
                    <Text style={{ color: '#FFFFFF', marginBottom: 10 }}
                      disabled={this.state.isLoggingIn || !this.state.userName || !this.state.password}
                    >SIGN IN</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </LinearGradient>
          </KeyboardAvoidingView>
        </ScrollView>
      );
    }
  }
}
function mapStateToProps(state, props) {
  return {
    loading: state.dataReducers.loading,
    data: state.dataReducers.data
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Login);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: Dimensions.get('window').height,
  },
  indexContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcometxt: {
    textAlign: 'center',
    fontSize: 20,
    color: '#10598F'
  },
  welcomeImage: {
    width: Dimensions.get('window').width / 2.5,
    height: Dimensions.get('window').height / 12,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9b59b6',
    borderRadius: 40,
    fontSize: Dimensions.get('window').height / 35,
    backgroundColor: "#FFFFFF"
  },
  container2: {
    flex: 1,
    marginTop: 30,
    marginBottom: 30,
    justifyContent: 'center',

  },
  container3: {
    position: 'absolute',
    top: 0, left: 0,
    right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'

  },
  reg: {
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
  },
  button: {
    width: '90%',
    height: 45,
    color: '#FFFFFF',
    borderRadius: 5,
    justifyContent: 'center',
    margin: 20,
    alignItems: 'center'
  },
  input: {
    width: '90%',
    height: 45,
    paddingLeft: 15,
    marginBottom: 10,
    margin: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
    color: "#2c3e50",
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').height / 3,
    resizeMode: 'contain',
    borderRadius: 50,
  },
});