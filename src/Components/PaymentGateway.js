import React, { Component } from 'react';
import { WebView } from 'react-native';
import { SkypeIndicator } from 'react-native-indicators';

export default class PaymentGateway extends React.Component {

    static navigationOptions = {
        title: 'Payment Gateway'
    }

    constructor(props) {
        super(props);
        navigate = props.navigation,
            this.state = { email: '', password: '', device_token: '', device_type: '', isLoading: false };

    }
    render() {
        if (this.state.isLoading) {
            return (

                <View style={{ flex: 1, paddingTop: 20 }}>
                    <SkypeIndicator style={styles.sky} color='#17c0eb' />
                </View>
            );
        }
        return (
            <WebView
                startInLoadingState={true}
                source={{ uri: 'https://pay.easebuzz.in/pay/' + this.props.pg_url }}
                style={{ margin: 4 }}
            />
        );
    }
}



