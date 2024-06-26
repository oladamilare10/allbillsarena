/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { Account, AddFund, Airtime, Betting, Buy, Cable, ChangePassword, ChangePin, CreatePin, EditProfile, Electric, Internet, LogIn, Notification, Scan, Sell, Settings, SignUp, Support, Transfer } from "./screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import LoginProvider from './constants/CheckLiogin';
import { useFonts } from 'expo-font';
import Tabs from "./navigation/tabs";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent",
    },
};

const Stack = createNativeStackNavigator();

const App = () => {
    const [loaded] = useFonts({
        "Roboto-Black" : require('./assets/fonts/Roboto-Black.ttf'),
        "Roboto-Bold" : require('./assets/fonts/Roboto-Bold.ttf'),
        "Roboto-Regular" : require('./assets/fonts/Roboto-Regular.ttf'),
    })
    
    if(!loaded){
    return null;
    }
    return (
        <LoginProvider>
            <NavigationContainer theme={theme}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={'Login'}
                >
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="Login" component={LogIn} />
                    <Stack.Screen name="Sell Crypto" component={Sell} />
                    <Stack.Screen name="Buy Crypto" component={Buy} />
                    <Stack.Screen name="Cable TV" component={Cable} />
                    <Stack.Screen name="Data" component={Internet} />
                    <Stack.Screen name="Airtime" component={Airtime} />
                    <Stack.Screen name="Betting" component={Betting} />
                    <Stack.Screen name="Electric" component={Electric} />
                    <Stack.Screen name="Send Money" component={Transfer} />
                    <Stack.Screen name="Help & Support" component={Support} />
                    <Stack.Screen name="Account Details" component={Account} />
                    <Stack.Screen name="Settings" component={Settings} />
                    <Stack.Screen name="Add Fund" component={AddFund} />
                    <Stack.Screen name="Notifications" component={Notification} />
                    <Stack.Screen name="Change Password" component={ChangePassword} />
                    <Stack.Screen name="Change Pin" component={ChangePin} />
                    <Stack.Screen name="Edit Profile" component={EditProfile} />
                    <Stack.Screen name="Gift Card" component={Scan} />
                    <Stack.Screen name="Create Pin" component={CreatePin} />

                    {/* Tabs */}
                    <Stack.Screen name="Home" component={Tabs} />

                    {/* <Stack.Screen name="Scan" component={Scan} /> */}
                </Stack.Navigator>
            </NavigationContainer>
        </LoginProvider>
    )
}

export default App;
