import React, { Component } from 'react';
import { Dimensions, StyleSheet, FlatList, Text, TouchableOpacity, View, AsyncStorage, Image, ToastAndroid, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import { Icon } from 'react-native-elements'
import { SkypeIndicator, UIActivityIndicator, WaveIndicator } from 'react-native-indicators';
import { Actions } from 'react-native-router-flux';
import Dialog from "react-native-dialog";

export default class HomeComponent extends React.Component {

    constructor(props) {
        super(props);

        this._retrieveData();
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

        }
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
                    alert(pn + ' ' + responseJson.msg);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    componentDidMount() {
        return fetch('https://obaba.shop/obaba_shop_api/index.php/Product_c/getProductt')
            .then((response) => response.json())
            .then((responseJson) => {

                var ret = new Array;
                for (var i = responseJson.length - 1; i >= 0; i--) {
                    ret.push(responseJson[i]);
                }

                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                    dataSourceHor: ret,
                }, function () {

                    // In this block you can do something with new state.
                });
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
        return (<View style={styles.MainContainer}>

            <FlatList horizontal style={styles.list} showsHorizontalScrollIndicator={false}

                data={this.state.dataSourceHor}

                renderItem={({item}) => 

                    <View style={styles.item}>

                        <TouchableOpacity onPress={() => Actions.product({ pc: item.productCompany, sc: item.shippingCharge, producrPrice: item.productPrice, pn: rowData.productName, piid: rowData.id, img1: rowData.productImage1, img2: rowData.productImage2, img3: rowData.productImage3, description: rowData.productDescription })}>
                            <Image source = {{ uri: "https://obaba.shop/admin/productimages/" + item.id + "/" + item.productImage1}}
                                style={styles.imageViewContainerHorizontal} />
                        </TouchableOpacity>
                        <Text style={styles.textViewContainer} >{(item.productName).substring(0, 16)}...</Text>
                        <Text style={{ marginTop: 10, right: 0, textDecorationLine: 'line-through', color: '#e74c3c' }} >{"₹" + item.productPriceBeforeDiscount + "/-"}</Text>
                        <View style={{ flexDirection: 'row' }} >
                            <Button style={{ marginTop: 0, right: 0, }} >{"₹" + item.productPrice + "/-"}</Button>
                            <Icon
                                raised
                                name='add-shopping-cart'
                                type='MaterialIcons'
                                color="#f7b731"
                                reverse={true}
                                reverseColor='#FFFFFF'
                                onPress={() => this._checkUserId(item.id, item.productName)}
                            />
                        </View>
                    </View>
                }
                keyExtractor={(item, index) => index.toString()}
            />

            <View style={{ alignContent: "center", alignItems: 'center', marginLeft: 4, marginRight: 4 }}>
                <Image source={require('../images/abt.jpg')}
                    style={styles.img} />
            </View>

            <FlatList style={{ backgroundColor: '#ffffff', margin: 4 }}

                data={this.state.dataSource}
                renderSeparator={this.ListViewItemSeparator}
                renderItem={({item}) => 

                    <View  >
                        <TouchableOpacity onPress={() => Actions.product({ pc: item.productCompany, sc: item.shippingCharge, producrPrice: item.productPrice, pn: rowData.productName, piid: rowData.id, img1: rowData.productImage1, img2: rowData.productImage2, img3: rowData.productImage3, description: rowData.productDescription })}>
                            <Image source={{ uri: "https://obaba.shop/admin/productimages/" + item.id + "/" + item.productImage1 }} style={styles.imageViewContainer} />
                        </TouchableOpacity>

                        <Text style={styles.textViewContainer} >{(item.productName)}</Text>

                        <View style={styles.obaba} >
                            <Button >{"₹" + item.productPrice + "/-"}</Button>
                            <Text style={{ margin: 10, right: 0, textDecorationLine: 'line-through', color: '#e74c3c' }} >{"₹" + item.productPriceBeforeDiscount + "/-"}</Text>
                            <Icon
                                raised
                                name='add-shopping-cart'
                                type='MaterialIcons'
                                color="#f7b731"
                                reverse={true}
                                reverseColor='#FFFFFF'
                                style={{ margin: 5, }}
                                onPress={() => this._checkUserId(item.id, item.productName)}
                            />
                        </View>
                    </View >
                }
                keyExtractor={(item, index) => index.toString()}
            />
        </View >
        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        marginTop: 5,
        padding: 2,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        marginBottom: Dimensions.get('window').height / 8
    },
    textViewContainer: {
        marginLeft: 10,
        color: '#000000'
    },
    sky: {
        alignItems: 'center',
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
    obaba: {
        flexDirection: 'row',
        marginLeft: Dimensions.get('window').width / 3

    },
    list: {
        flexDirection: 'row',
        margin: 2,
        flexWrap: 'wrap'
    },
    imageViewContainer: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 3,
        resizeMode: 'contain',
        resizeMode: 'contain',
        marginTop: 0,
        borderRadius: 2,
        margin: 2,
        borderRadius: 0
    },

    imageViewContainerHorizontal: {
        width: Dimensions.get('window').width / 2.2,
        height: Dimensions.get('window').height / 8,
        resizeMode: 'contain',
        resizeMode: 'contain',
        marginTop: 4
    },

    img: {
        height: Dimensions.get('window').height / 3,
        borderRadius: 4,
        margin: 4,
        resizeMode: 'contain',
        resizeMode: 'contain'

    }
});