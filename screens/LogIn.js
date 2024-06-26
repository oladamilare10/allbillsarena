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

const LogIn = ({ navigation }) => {

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const url = 'https://api.allbillsarena.com.ng/login.php'
    const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    }
    const apiBody = JSON.stringify(
    {
        username: username,
        password : password
    }
    )

    const [showPassword, setShowPassword] = React.useState(false)

    const [areas, setAreas] = React.useState([])
    const [selectedArea, setSelectedArea] = React.useState(null)
    const [modalVisible, setModalVisible] = React.useState(false)

    
    const [passErr, setPassErr] = React.useState(null)
    const [userErr, setUserErr] = React.useState(null)
    const [subErr, setSubErr] = React.useState(null) 
    const [msg, setMsg] = React.useState(null)
    const [load, setLoad] = React.useState(false)
    const {setIsLoggedIn} = useLogin()

    const submitForm = (e) => {
        e.preventDefault()
        if(username === '' || password === ''){
           if (username === ''){
            setUserErr("phone number field cannot be empty")
           }
           if (password === ''){
            setPassErr("password field cannot be empty")
           }
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
                    setSubErr(null)
                    setLoad(false)
                    setTimeout(() => {
                        setIsLoggedIn(resData.data.user_id)
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

   

    function renderHeader() {
        return (
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: "center",
                    marginTop: SIZES.padding * 6,
                    paddingHorizontal: SIZES.padding * 2
                }}
                onPress={() => navigation.navigate("SignUp")}
            >
                <Image
                    source={icons.back}
                    resizeMode="contain"
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.white
                    }}
                />

                <Text style={{ marginLeft: SIZES.padding * 1.5, color: COLORS.white, ...FONTS.h4 }}>Login</Text>
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
                {/* Full Name */}
                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Phone Number</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        value={username}
                        onChangeText={(val) => setUsername(val)}
                        placeholder="Enter Phone Number"
                        keyboardType="numeric"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                    />
                </View>

                

                {/* Password */}
                <View style={{ marginTop: SIZES.padding * 2 }}>
                    <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Password</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.white,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.white,
                            ...FONTS.body3
                        }}
                        value={password}
                        onChangeText={(val) => setPassword(val)}
                        placeholder="Enter Password"
                        placeholderTextColor={COLORS.white}
                        selectionColor={COLORS.white}
                        secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            right: 0,
                            bottom: 10,
                            height: 30,
                            width: 30
                        }}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={showPassword ? icons.disable_eye : icons.eye}
                            style={{
                                height: 20,
                                width: 20,
                                tintColor: COLORS.white
                            }}
                        />
                    </TouchableOpacity>
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
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 10,
                    }}
                    onPress={submitForm}
                >
                    {load && <Text style={{ color: COLORS.white, ...FONTS.h4,marginRight:10}}>Loading...</Text>}
                    {!load && <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Continue</Text>}
                    {load && <ActivityIndicator size="small" color={COLORS.white} />}
                </TouchableOpacity>
                
                {msg && <Text style={{textAlign: "center", color: COLORS.white}}>{msg}</Text>}
                {subErr && <Text style={{textAlign: "center", color: COLORS.red}}>{subErr}</Text>}


                <View style={{marginTop:30,flexDirection:"row",}}>
                    <Text >Click Here To Login...  </Text>
                    <TouchableOpacity onPress={()=> navigation.navigate("SignUp")}>
                        <Text style={{ color: COLORS.white, ...FONTS.h4 }}>Sign Up</Text>
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
                colors={[COLORS.lime, COLORS.emerald]}
                style={{ flex: 1 }}
            >
                <ScrollView>
                    {renderHeader()}
                    {renderLogo()}
                    {renderForm()}
                    {renderButton()}
                </ScrollView>
            </LinearGradient>
            {renderAreaCodesModal()}
        </KeyboardAvoidingView>
    )
}

export default LogIn;