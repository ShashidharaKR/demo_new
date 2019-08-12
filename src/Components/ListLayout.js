import React, { Component } from 'react';
import { Dimensions, StyleSheet, FlatList, Text, ToastAndroid, AsyncStorage, TouchableOpacity, View, Image, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import { SkypeIndicator } from 'react-native-indicators';
import { Actions } from 'react-native-router-flux';
import Dialog from "react-native-dialog";

export default class ListLayout extends React.Component {
    static navigationOptions = ({ navigation }) => ({
    });
    constructor(props) {
        super(props);
        this._retrieveData();
        this._shashi();
        this.state = { isLoading: true, idss: '0', dialogVisible: false, prod_id: '0', prod_qty: '0', prod_name: '' }
    }
    showDialog = () => {
        this.setState({ dialogVisible: true });
    };

    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    handleSubmit = () => {
        if (this.state.prod_qty == '0' || this.state.prod_qty == '00' || this.state.prod_qty == '000' || this.state.prod_qty == '0000') {
            ToastAndroid.show('Please enter a valied quantity', ToastAndroid.SHORT);
            return;
        }
        this.setState({ dialogVisible: false });
        this._addCart(this.state.prod_id, this.state.prod_name);
    };

    _checkUserId(pid, pn) {
        if (this.state.idss == '0') {
            Actions.login();
        } else {
            this.setState({ prod_id: pid, prod_name: pn });
            this.showDialog(pid, pn);
        }
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('id');
            if (value !== null) {

                this.setState({ idss: value });

            } else {
            }
        } catch (error) {
            // Error retrieving data

        }
    }


    _shashi() {
        return fetch('https://obaba.shop/obaba_shop_api/index.php/Product_c/getProductByCatId', {
            method: "POST",
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category_id: this.props.greeting,

            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                let ds = new FlatList.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson),
                }, function () {
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _addCart(pid, pn) {
        return fetch('https://obaba.shop/obaba_shop_api/index.php/Cart_c/addToCart', {
            method: "POST",
            headers: {
                Accept: 'application/json', 'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: this.state.idss,
                product_id: pid,
                qty: this.state.prod_qty
            }),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.success) {
                    ToastAndroid.show(pn + ' ' + responseJson.msg, ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show(pn + ' ' + responseJson.msg, ToastAndroid.SHORT);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }


    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    height: 5,
                    width: "100%",
                    marginBottom: 5,
                    backgroundColor: '#d2dae2',
                }}
            />
        );
    }

    render() {
        if (this.state.isLoading) {
            return (

                <View style={{ flex: 1, paddingTop: 20 }}>
                    {/* <SkypeIndicator style={styles.sky} color='#17c0eb' /> */}
                </View>
            );
        }
        if (this.state.dialogVisible) {
            return (<Dialog.Container visible={true}>
                <Dialog.Title>  Please enter quantity...</Dialog.Title>
                <Dialog.Input onChangeText={(qty) => this.setState({ prod_qty: qty })} style={{ backgroundColor: '#dfe6e9', textAlign: 'center' }} placeholder='1' keyboardType='numeric' onPress={this.handleCancel} ></Dialog.Input>
                <Dialog.Button label="Cancel" onPress={this.handleCancel} />
                <Dialog.Button label="Add to cart" onPress={this.handleSubmit} />
            </Dialog.Container>);
        }
        return (
            <FlatList contentContainerStyle={styles.list}
                dataSource={this.state.dataSource}
                renderRow={(rowData) =>
                    <View style={styles.item}>
                        <TouchableOpacity onPress={() => Actions.product({ pc: rowData.productCompany, sc: rowData.shippingCharge, producrPrice: rowData.productPrice, pn: rowData.productName, piid: rowData.id, img1: rowData.productImage1, img2: rowData.productImage2, img3: rowData.productImage3, description: rowData.productDescription })}>
                            <Image source={{ uri: "https://obaba.shop/admin/productimages/" + rowData.id + "/" + rowData.productImage1 }}
                                style={styles.imageViewContainer} />
                        </TouchableOpacity>
                        <Text style={styles.textViewContainer} >{(rowData.productName).substring(0, 16)}...</Text>
                        <Text style={{ marginTop: 4, right: 0, textDecorationLine: 'line-through', color: '#e74c3c' }} >{"₹" + rowData.productPriceBeforeDiscount + "/-"}</Text>

                        <View style={styles.obaba} >
                            <Button style={{ marginTop: 10, right: 0, }} >{"₹" + rowData.productPrice + "/-"}</Button>
                            <Icon
                                raised
                                name='add-shopping-cart'
                                type='MaterialIcons'
                                color="#f7b731"
                                reverse={true}
                                reverseColor='#FFFFFF'
                                onPress={() => this._checkUserId(rowData.id, rowData.productName)}
                            />
                        </View>
                    </ View>
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        margin: 2,
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: Dimensions.get('window').height / 8
    },
    item: {
        backgroundColor: '#fff',
        margin: 2,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width / 2.2,
        height: Dimensions.get('window').height / 3,
        borderRadius: 4
    },
    textViewContainer: {
        alignItems: 'center',
        paddingLeft: 4,
        width: Dimensions.get('window').width / 2.2,
        color: '#000'
    },
    obaba: {
        flexDirection: 'row',
    },
    btn: {
        height: Dimensions.get('window').height / 2.7,
        margin: 0,
        backgroundColor: '#FFF',
    },
    imageViewContainer: {
        width: Dimensions.get('window').width / 2.2,
        height: Dimensions.get('window').height / 8,
        resizeMode: 'contain',
        resizeMode: 'contain',
        marginTop: 4
    },

});