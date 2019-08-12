import React from 'react';
import {
    KeyboardAvoidingView, Dimensions, ToastAndroid, ScrollView, StyleSheet, View,
    Image, Text, TextInput, ActivityIndicator, TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';

export default class SignUp extends React.Component {

    static navigationOptions = {
        title: 'CREATE AN ACCOUNT'
    }

    constructor(props) {
        super(props);

        navigate = props.navigation,
            this.state = {
                isLoadingTrue: false, isLoadingFalse: false, email: '', device_token: '', device_type: '',
                userName: '',
                isLoadingTrue: true,
                isLoadingFalse: false,
                password: '',
                isLoggingIn: false, 
                user_phone: '',
                message: ''
            };

    }

    // state = {
    //     userName: '',
    //     isLoadingTrue: true,
    //     isLoadingFalse: false,
    //     password: '',
    //     isLoggingIn: false,
    //     message: ''
    // }

    _userLogin = () => {

        if (this.state.userName == '' || this.state.password == '') {
            ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
            return;
        }

        this.isLoadingTrue;
        this.setState({ isLoggingIn: true, message: '' });

        var proceed = false;
        fetch("https://obaba.shop/obaba_shop_api/index.php/UserRegister_c/userRegister", {
            method: "POST",
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_name: this.state.userName,
                user_email: this.state.email,
                user_phone: this.state.user_phone,
                user_password: this.state.password
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                this.state.isLoadingFalse
                if (response.status) {

                    ToastAndroid.show(response.message, ToastAndroid.SHORT);
                    Actions.login();
                    proceed = true;
                }
                else this.setState({ message: response.message });
            })
            .then(() => {
                this.setState({ isLoggingIn: false })
                if (proceed) { }
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

    render() {
        if (this.state.isLoadingTrue && this.state.isLoadingFalse) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <ScrollView keyboardShouldPersistTaps="handled" behavior="padding" >
                <KeyboardAvoidingView>

                    <LinearGradient style={styles.container} colors={['#1B9CFC', '#55E6C1']}>

                        <View style={styles.inputcontainer}>

                            <TextInput underlineColorAndroid='transparent' placeholder="Username"
                                placeholderTextColor='#84817a' onChangeText={(user_name) => this.setState({ userName : user_name.trim() })}
                                style={styles.input}></TextInput>

                            <TextInput underlineColorAndroid='transparent' placeholder="E-mail"
                                placeholderTextColor='#84817a' onChangeText={(user_email) => this.setState({ email: user_email.trim() })}
                                style={styles.input}></TextInput>

                            <TextInput underlineColorAndroid='transparent' placeholder="Mobile No."
                                placeholderTextColor='#84817a' onChangeText={(user_phone) => this.setState({ user_phone: user_phone.trim() })}
                                style={styles.input}
                            ></TextInput>
                            <TextInput underlineColorAndroid='transparent' onChangeText={(user_password) => this.setState({ password: user_password.trim() })}
                                placeholder="Password" secureTextEntry placeholderTextColor='#84817a'
                                style={styles.input}>
                            </TextInput>

                            {!!this.state.message && (
                                <Text
                                    style={{ fontSize: 14, color: 'red', padding: 5 }}>
                                    {this.state.message}
                                </Text>
                            )}
                            <LinearGradient style={styles.button} colors={['#ff9ff3', '#be2edd']}>
                                <TouchableOpacity style={styles.button} onPress={this._userLogin} >
                                    <Text style={{ color: '#FFFFFF', marginBottom: 10 }}   >Sign Up</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </LinearGradient >
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: Dimensions.get('window').height - 80,
    },
    input: {
        width: '90%',
        height: 45,
        margin: 10,
        borderRadius: 5,
        paddingLeft: 10,
        backgroundColor: '#FFFFFF',
        color: "#000000",
    },
    inputcontainer: {
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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
});
