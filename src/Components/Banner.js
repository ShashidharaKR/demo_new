import React from 'react';
import Carousel from 'react-native-banner-carousel';
import { StyleSheet, Image, View, KeyboardAvoidingView, Dimensions } from 'react-native';
const BannerWidth = Dimensions.get('window').width / 1.02;
const BannerHeight = Dimensions.get('window').height / 4;

export default class Banner extends React.Component {

    constructor(props) {
        super(props); 
        this._shashi();
        this.state = {
            gists: [], values: []
        }
    }


    _shashi() {
        return fetch("https://obaba.shop/obaba_shop_api/index.php/Banners_c/getBanners", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                this.setState({ gists: response });
                console.log(this.state.gists);

            })
            .then(() => {


            })
            .catch(err => {

            });

    }

    renderPage(image, index) {
        return (

            <View key={index}>
                <Image style={styles.img} source={{ uri: "https://obaba.shop/display.php?id=" + SampleArra[index].id }} />
            </View>
        );
    }

    render() {

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Carousel
                    autoplay={true}
                    autoplayTimeout={2000}
                    loop={true}
                    index={0}
                    pageSize={BannerWidth} style={styles.banner}>

                    {this.state.gists.map(paymentss => (

                        <Image style={styles.img} source={{ uri: "https://obaba.shop/display.php?id=" + paymentss.id }} />
                    )
                    )}

                </Carousel>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        marginTop: 5,
        backgroundColor: '#fff',
    },
    banner: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',

    },
    img: {
        width: BannerWidth,
        justifyContent: 'center',
        height: BannerHeight,
        resizeMode: 'contain'


    }
});