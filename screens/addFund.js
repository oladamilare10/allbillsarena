
import React from 'react';
import { Image, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import { COLORS, SIZES, FONTS, icons } from '../constants';
import Constants from 'expo-constants'
import { useLogin } from "../constants/CheckLiogin";



let Naira = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
})
    
// ...
const AddFund = ({ navigation }) => {
    
    const {isLoggedIn} = useLogin()
   

    function renderHeader() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: "center",
                    marginTop: SIZES.padding * 6,
                    paddingHorizontal: SIZES.padding * 1
                }}
                onPress={() => navigation.navigate("Home")}
            >
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.emerald
                    }}
                />

                <Text style={{ marginLeft: SIZES.padding * 1.5, color: COLORS.emerald, ...FONTS.h4 }}>Add Funds</Text>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            {renderHeader()}
            <WebView 
            style={{
                flex: 1,
            }}
                source={{ url: `https://pay.allbillsarena.com/mobviderse/${isLoggedIn}` }}
                mixedContentMode="compatibility"
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={true}
                onLoad={console.log("loading...")}
                scalesPageToFit={true}
            />
        </SafeAreaView>
    );
}

export default AddFund;