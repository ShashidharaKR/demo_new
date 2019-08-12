import React from 'react';
import { Keyboard, Dimensions, ToastAndroid, AsyncStorage, ScrollView, StyleSheet, View, Image, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import { SkypeIndicator } from 'react-native-indicators';
export default class Login extends React.Component {

  static navigationOptions = {
    title: 'SIGN IN'
  }

  constructor(props) {
    super(props);
    Keyboard.dismiss()
    this._retrieveData();
    navigate = props.navigation,
      this.state = {
        isLoadingTrue: false, isLoadingFalse: false, password: '', device_token: '', device_type: '', ids: '0'
      };
  }

  _storeData = async (ids) => {
    try {
      await AsyncStorage.setItem('id', ids);
    } catch (error) {
      // Error saving data
    }
  }

  _storeDataE = async (emails) => {
    try {
      await AsyncStorage.setItem('email', emails);
    } catch (error) {
      // Error saving data
    }
  }
  _storeDataC = async (phone) => {
    try {
      await AsyncStorage.setItem('mobb', phone);

    } catch (error) {
      // Error saving data
    }
  }
  _storeDataN = async (name) => {
    try {
      await AsyncStorage.setItem('names', name);

    } catch (error) {
      // Error saving data
    }
  }

  _retrieveDataE = async () => {
    try {
      const value = await AsyncStorage.getItem('mobb');
      if (value !== null) {
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('id');
      if (value !== null) {

        this.setState({ ids: value });
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  state = {
    userName: '',
    isLoadingTrue: true,
    isLoadingFalse: false,
    password: '',
    isLoggingIn: false,
    message: '',
  }

  _userLogin = () => {

    if (this.state.userName == '' || this.state.password == '') {
      ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
      return;
    }

    this.isLoadingTrue;
    this.setState({ isLoggingIn: true, message: '' });

    var params = {
      userName: this.state.userName,
      password: this.state.password,
      grant_type: 'password'
    };

    var formBody = [];
    for (var property in params) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    var proceed = false;

    fetch("https://obaba.shop/obaba_shop_api/index.php/UserLogin_c/userLogin", {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: this.state.userName,
        user_password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        this.state.isLoadingFalse
        if (response.status) {
          proceed = true;
          this.setState({ message: response.message });
          this._storeData(response.id);
          this._storeDataE(response.email);
          this._storeDataC(response.contactno);
          this._storeDataN(response.name);
          Actions.home({ type: 'replace' });

        }
        else { this.setState({ message: response.message }); }
      })
      .then(() => {
        this.setState({ isLoggingIn: false })
        if (proceed) {
        }
      })
      .catch(err => {
        this.setState({ message: err.message });
        this.setState({ isLoggingIn: false })
      });
  }

  clearUsername = () => {
    this._username.setNativeProps({ text: '' });
    this.setState({ message: '' });
  }

  clearPassword = () => {
    this._password.setNativeProps({ text: '' });
    this.setState({ message: '' });
  }

  _logOut() {
    AsyncStorage.clear();
    Actions.splash();
  }

  render() {
    if (this.state.isLoadingTrue && this.state.isLoadingFalse) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SkypeIndicator color='#25CCF7' />
        </View>
      );
    }
    if (this.state.ids != '0') {
      return (
        <LinearGradient style={styles.indexContainer} colors={['#1B9CFC', '#55E6C1']}>
          <TouchableOpacity style={styles.welcomeImage} onPress={() => this._logOut()} >
            <Text style={{ color: '#be2edd', fontSize: Dimensions.get('window').height / 35 }}>SIGN OUT</Text>
          </TouchableOpacity>
        </LinearGradient>

      );
    } else {
      return (
        <ScrollView keyboardShouldPersistTaps='handled' behavior="padding">
          <KeyboardAvoidingView>
            <LinearGradient style={styles.container} colors={['#1B9CFC', '#55E6C1']}>
              <View style={styles.container2}>
                <Image style={styles.logo} source={require('../images/obaba.jpg')} />

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
                <View style={styles.reg}>
                  <TouchableOpacity onPress={() => Actions.reg()}>
                    <Text></Text>
                    <Text  >New user? Register here</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </KeyboardAvoidingView>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: Dimensions.get('window').height - 80,
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
    alignContent: 'center',
    alignItems: 'center',
    padding: 0,

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
    marginTop: 10,
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