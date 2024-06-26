import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    TextInput,
    Modal,
    FlatList,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    ActivityIndicator
} from "react-native"
import { LinearGradient } from 'expo-linear-gradient'

import { COLORS, SIZES, FONTS, icons, images } from "../constants"
import { useLogin } from "../constants/CheckLiogin";
import useBalance from "../components/useBal";

const Buy = ({ navigation }) => {

    const [f_name, setF_name] = React.useState('')
    const [amount, setAmount] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [screenShot, setScreenshot] = React.useState('')

    const url = 'https://api.allbillsarena.com.ng/buy.php'
    const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    }
    const apiBody = JSON.stringify(
    {
        username: f_name,
        password : amount
    }
    )


    const [areas, setAreas] = React.useState([])
    const [selectedArea, setSelectedArea] = React.useState(null)
    const [modalVisible, setModalVisible] = React.useState(false)

    
    const [passErr, setPassErr] = React.useState(null)
    const [userErr, setUserErr] = React.useState(null)
    const [subErr, setSubErr] = React.useState(null) 
    const [msg, setMsg] = React.useState(null)
    const [load, setLoad] = React.useState(false)
    const {isLoggedIn} = useLogin()
    
  const {balance} = useBalance(isLoggedIn)

    const submitForm = (e) => {
        if(f_name === '' || amount === ''){
           if (f_name === ''){
            setUserErr("Name field cannot be empty")
           }
           if (amount === ''){
            setPassErr("Amount field cannot be empty")
           }
        }else{
            if(Number(amount) > Number(balance.w_balance)){
                setPayErr("insufficient fund")
                setIsPending(false)
                setModalVisibleErr(true)
              }else{
                setLoad(true)
                setMsg(null)
                fetch(url, {
                    method: "POST",
                    header: header,
                    body: apiBody
                    })
                    .then(res => {
                    return res.json()
                    })
                    .then(resData => {
                    if (resData.data.status === 'Error') {
                        throw Error(resData.data.message)
                    }else{
                        setMsg(resData.data.data)
                        setLoad(false)
                        setTimeout(() => {
                            navigation.navigate("Home")
                        }, 3000)
                    }
                    
                })
                    .catch(err => {
                    setSubErr(err.message)
                    setLoad(false)
                    setMsg(null)
                })
            }
        }
    }

   

    function renderHeader() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: "center",
                    marginTop: SIZES.padding * 6,
                    paddingHorizontal: SIZES.padding * 2
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

                <Text style={{ marginLeft: SIZES.padding * 1.5, color: COLORS.emerald, ...FONTS.h4 }}>Buy Crypto</Text>
            </TouchableOpacity>
        )
    }

    function renderLogo() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 5,
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={images.wallieLogo}
                    resizeMode="contain"
                    style={{
                        width: "60%"
                    }}
                />
            </View>
        )
    }

    function renderForm() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 3,
                    marginHorizontal: SIZES.padding * 3,
                }}
            >

                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>Amount</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.emerald,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.emerald,
                            ...FONTS.body3
                        }}
                        value={amount}
                        onChangeText={(val) => setAmount(val)}
                        placeholder="Enter Amount in USD$200"
                        placeholderTextColor={COLORS.emerald}
                        selectionColor={COLORS.emerald}
                    />
                </View>

                

                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>Wallet Address</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.emerald,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.emerald,
                            ...FONTS.body3
                        }}
                        value={screenShot}
                        onChangeText={(val) => setScreenshot(val)}
                        placeholder="Enter Wallet Address"
                        placeholderTextColor={COLORS.emerald}
                        selectionColor={COLORS.emerald}
                    />
                </View>
            </View>
        )
    }

    function renderButton() {
        return (
            <View style={{ margin: SIZES.padding * 3 }}>
                <TouchableOpacity
                    style={{
                        height: 60,
                        backgroundColor: COLORS.black,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        flexDirection: "row",
                        justifyContent: 'center'
                    }}
                    onPress={submitForm}
                >
                    {load && <Text style={{ color: COLORS.white, ...FONTS.h4,marginRight:10 }}>Loading...</Text>}
                    {!load && <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Continue</Text>}
                    {load && <ActivityIndicator size="small" color={COLORS.white} />}
                </TouchableOpacity>


                <View style={{marginTop:30,flexDirection:"row",}}>
                    <Text >Click Here To Sell Crypto...  </Text>
                    <TouchableOpacity onPress={()=> navigation.navigate("Sell Crypto")}>
                        <Text style={{ color: COLORS.emerald, ...FONTS.h4 }}>Sell Crypto</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function renderAreaCodesModal() {

        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{ padding: SIZES.padding, flexDirection: 'row' }}
                    onPress={() => {
                        setSelectedArea(item)
                        setModalVisible(false)
                    }}
                >
                    <Image
                        source={{ uri: item.flag }}
                        style={{
                            width: 30,
                            height: 30,
                            marginRight: 10
                        }}
                    />
                    <Text style={{ ...FONTS.body4 }}>{item.name}</Text>
                </TouchableOpacity>
            )
        }

        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View
                            style={{
                                height: 400,
                                width: SIZES.width * 0.8,
                                backgroundColor: COLORS.lightGreen,
                                borderRadius: SIZES.radius
                            }}
                        >
                            <FlatList
                                data={areas}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.code}
                                showsVerticalScrollIndicator={false}
                                style={{
                                    padding: SIZES.padding * 2,
                                    marginBottom: SIZES.padding * 2
                                }}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            style={{ flex: 1 }}
        >
            <LinearGradient
                colors={[COLORS.white, COLORS.white]}
                style={{ flex: 1 }}
            >
                <ScrollView>
                    {renderHeader()}
                    {/* {renderLogo()} */}
                    {renderForm()}
                    {renderButton()}
                </ScrollView>
            </LinearGradient>
            {renderAreaCodesModal()}
        </KeyboardAvoidingView>
    )
}

export default Buy;