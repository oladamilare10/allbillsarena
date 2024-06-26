import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    StyleSheet
} from "react-native"
import { LinearGradient } from 'expo-linear-gradient'

import { COLORS, SIZES, FONTS, icons } from "../constants"
import { useLogin } from "../constants/CheckLiogin";
import ModalCaseError from "../components/modalCaseError";
import ModalCaseSuccess from "../components/modalCaseSuccess";
import ModalCode from "../components/modalCode";




const CreatePin = ({ navigation }) => {

      const [rePassword, setRePassword] = React.useState(null)
      const [password, setPassword] = React.useState(null)
      const [passwordErr, setPasswordErr] = React.useState(null)
      const [payMsg, setPayMsg] = React.useState(null)
      const [payErr, setPayErr] = React.useState(null)
      const [errMsg, setErrMsg] = React.useState(null)
      
      const fee = 0
      const [isPending, setIsPending] = React.useState(false)
      const [modalVisibleErr, setModalVisibleErr] = React.useState(false);
    
      
      const dateData = new Date();
      const {isLoggedIn} = useLogin()

      
    const [modalVisible, setModalVisible] = React.useState(false)
    const [modalCodeVisible, setModalCodeVisible] = React.useState(false);


    
  

  const url = 'https://api.allbillsarena.com.ng/create_pin.php'
    const header = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify(
      {
        user_id: isLoggedIn,
        pin: password,
        date: dateData
      }
    )
      const checkPassMatch = ()=> {
        if (password !== rePassword) {
            setErrMsg("Password doesn't match!")
            setIsPending(false)
        } else{
            setErrMsg(null)
            handlePasswordUpdate()
        }
      }
    const handlePasswordUpdate = ()=>{
        setIsPending(true)
            fetch(url, {
            method: "POST",
            header: header,
            body: body
            })
            .then(res => {
            return res.json();
            })
            .then(msg => {
               setPayMsg(msg.data.data)
               setIsPending(false)
               setModalVisible(true)
            })
            setIsPending(false)
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
                onPress={() => navigation.navigate("Settings")}
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

                <Text style={{ marginLeft: SIZES.padding * 1.5, color: COLORS.emerald, ...FONTS.h4 }}>Create Pin</Text>
            </TouchableOpacity>
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
                    <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>New Pin</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.emerald,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.emerald,
                            ...FONTS.body3
                        }}
                        onChangeText={(val)=> setPassword(val)}
                        keyboardType="numeric"
                        placeholder="Enter New Pin"
                        placeholderTextColor={COLORS.emerald}
                        selectionColor={COLORS.emerald}
                    />
                    {passwordErr && <Text style={styles.errText}>{passwordErr}</Text>}
                </View>

                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>Re-Pin</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.emerald,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.emerald,
                            ...FONTS.body3
                        }}
                        onChangeText={(val) => setRePassword(val)}
                        keyboardType="numeric"
                        onBlur={checkPassMatch}
                        placeholder="Re-Enter Pin"
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
                        justifyContent: 'center'
                    }}
                    onPress={checkPassMatch}
                >
                    {isPending && <Text style={{ color: COLORS.white, ...FONTS.h4 }}>Loading...</Text>}
                    {!isPending && <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Continue</Text>}
                </TouchableOpacity>

                <View style={{marginTop:10}}>
                    {errMsg &&
                        <Text style={{ color: COLORS.red, ...FONTS.body4, textAlign:'center' }}>{errMsg}</Text>
                    }
                    {payMsg &&
                        <Text style={{ color: COLORS.green, ...FONTS.body4, textAlign:'center' }}>{payMsg}</Text>
                    }
                </View>
            </View>
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
                    
                    {modalVisibleErr && <ModalCaseError modalVisibleErr={modalVisibleErr} setModalVisibleErr={setModalVisibleErr} resMessage={payErr} />}
                    {modalCodeVisible && <ModalCode service="Password Change" submitForm={handlePasswordUpdate} modalCodeVisible={modalCodeVisible} setModalCodeVisible={setModalCodeVisible} resMessage={payErr} />}
                    {modalVisible && <ModalCaseSuccess modalVisible={modalVisible} setModalVisible={setModalVisible} resMessage={payMsg} />}

                </ScrollView>
            </LinearGradient>
            {/* {renderAreaCodesModal()} */}
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    case: {
      marginTop: 20,
      backgroundColor: '#fff',
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
      paddingTop: 25,
      marginBottom: 10
    },
    payBtn: {
      backgroundColor: '#febb39',
      minWidth: 90,
      marginTop:45,
      alignItems: 'center',
      padding: 10,
      borderRadius: 10,
      marginRight: 20,
      marginLeft: 20,
      marginBottom: 120
    },
    payBtnText:{
      color: '#000',
      fontWeight: 'bold',
      fontSize: 20
    },
    inputBox: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      borderBottomWidth: 1,
      borderBottomColor: '#A8A8A8',
      padding: 6,
      marginBottom: 10
  },
  input: {
      width: '90%',
      marginLeft: 10,
      fontSize: 17,
      padding: 5,
  },
  iconStyle: {
      padding: 10
  },
  icon: { 
      marginLeft: -40, 
      marginTop: 10
  },
  errText: {
      color: 'red',
      fontSize: 13,
      fontWeight: '500',
      margin: 0,
      textAlign: 'center'
  },
  ttText: {
    marginLeft: 0,
    fontWeight: '500',
    fontSize: 16,
    color: COLORS.gray,
  },
  selectedNet: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  eachTab: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  caseTab: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
    borderRadius:8,
    flexDirection:'row',
    justifyContent: "space-between"
  },
  mainTitle:{
    fontSize: 18,
    fontWeight: '500',
    borderLeftColor: '#333',
    borderLeftWidth: 3,
    paddingLeft: 15,
    color: '#242424',
    marginBottom: 20
  },
  amountBox: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between'
  },
  })

export default CreatePin;