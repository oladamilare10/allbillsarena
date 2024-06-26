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
    StyleSheet,
    ActivityIndicator
} from "react-native"
import { LinearGradient } from 'expo-linear-gradient'

import { COLORS, SIZES, FONTS, icons, images } from "../constants"
import { useLogin } from "../constants/CheckLiogin";
import ModalCaseError from "../components/modalCaseError";
import ModalCaseSuccess from "../components/modalCaseSuccess";
import Networks from "../components/networks";
import useBalance from "../components/useBal";
import { AntDesign } from '@expo/vector-icons';
import ModalCode from "../components/modalCode";




const Airtime = ({ navigation }) => {

    const [f_name, setF_name] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [screenShot, setScreenshot] = React.useState('')
    const [selected, setSelected] = React.useState({
        id: 0,
        name: 'mtn'
    })
      const [amount, setAmount] = React.useState(null)
      const [phone, setPhone] = React.useState(null)
      const [phoneErr, setPhoneErr] = React.useState(null)
      const [payMsg, setPayMsg] = React.useState(null)
      const [payErr, setPayErr] = React.useState(null)
      const [balMsg, setBalMsg] = React.useState(null);
      
      const [defaultText, setDefaultText] = React.useState('Select Package')
      const fee = 0
      const [showOptions, setShowOptions] = React.useState(false)
      const [isPending, setIsPending] = React.useState(false)
      const [packErr, setPackErr] = React.useState(null)
      const [modalVisibleErr, setModalVisibleErr] = React.useState(false);
    
      
      const dateData = new Date();
      const {isLoggedIn} = useLogin()
      const tId = Math.random().toString(16).slice(2)

      
    const [areas, setAreas] = React.useState([])
    const [selectedArea, setSelectedArea] = React.useState(null)
    const [modalVisible, setModalVisible] = React.useState(false)
    const [modalCodeVisible, setModalCodeVisible] = React.useState(false);

    
    const [msg, setMsg] = React.useState(null)

    
  const {balance} = useBalance(isLoggedIn)
  let newBal = 0
  if (balance){
    const addBal = (a, b) => a - b;
     newBal = addBal(Number(balance.w_balance), Number(amount));
  }
  const checkPhone = ()=> {
    if (phone === '') {
        setPhoneErr('phone number field cannot be empty')
        setMsg(null)
    }else{
        setPhoneErr(null)
        setMsg(null)
    }
}

  const url = 'https://api.allbillsarena.com.ng/update_wallet.php'
    const header = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify(
      {
        user_id: isLoggedIn,
        new_balance: newBal,
        t_amount: amount,
        desc: "Data TopUp",
        t_id: tId,
        date: dateData
      }
    )
    const handleWalletUpdate = ()=>{
        fetch(url, {
          method: "POST",
          header: header,
          body: body
        })
        .then(res => {
          return res.json();
        })
        .then(msg => {
          setBalMsg(msg.result.data)
        })
      }
      const handleSelected = (value) => {
        setSelected(value)
        setDefaultText('Selects Package')
      }
    

    const submitForm = (e) => {
        setIsPending(true)
            if(!amount) {
                setPackErr("please specify amount.")
                setIsPending(false)
              }else{
                setPackErr(null)
              }
              if(!selected){
                console.log("you need to select a network")
              }
              if(phone === '') {
                setPhoneErr("we need a phone number to process your order")
                setIsPending(false)
              }else{
                setPhoneErr(null)
              }
              if (phone && amount && selected){
                if(Number(amount) > Number(balance.w_balance)){
                  setPayErr("insufficient fund")
                  setIsPending(false)
                  setModalVisibleErr(true)
                }else{
          
                
                const urlPay = "https://vtu.ng/wp-json/api/v1/airtime?username=Allbillsarena&password=Allbillsarena2023&phone="+ phone +"&network_id="+ selected.name +"&amount=" + amount
          
          
                fetch(urlPay, {
                  method: "GET",
                })
                .then(res => {
                  if (!res.ok) {
                    throw Error('Could not fetch Data for this particular resource.')
                  }
                  return res.json()
                })
                .then(data => {
                  if (data.code === 'failure') {
                      throw Error(data.message)
                  }
                  setPayMsg(data.message)
                  setIsPending(false)
                  setModalVisible(true)
                  handleWalletUpdate()
                })
                .catch(error=> {
                  setPayErr(error.message)
                  setIsPending(false)
                  setModalVisibleErr(true)
                })
              }
          
              }
            }
            let USDollar = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            })
          
            let Naira = new Intl.NumberFormat('en-NG', {
              style: 'currency',
              currency: 'NGN'
            })

   

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

                <Text style={{ marginLeft: SIZES.padding * 1.5, color: COLORS.emerald, ...FONTS.h4 }}>Airtime</Text>
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
                <View>
                    <Networks handleSelected={handleSelected} selected={selected.id} />
                </View>
                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>Phone Number</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.emerald,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.emerald,
                            ...FONTS.body3
                        }}
                        onChangeText={(val)=> setPhone(val)}
                        placeholder="Enter Phone Number"
                        placeholderTextColor={COLORS.emerald}
                        keyboardType="numeric"
                        selectionColor={COLORS.emerald}
                    />
                    {phoneErr && <Text style={styles.errText}>{phoneErr}</Text>}
                </View>

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
                        onChangeText={(val) => setAmount(val)}
                        placeholder="Enter Amount"
                        placeholderTextColor={COLORS.emerald}
                        keyboardType="numeric"
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
                    onPress={() => setModalCodeVisible(true)}
                >
                    {isPending && <Text style={{ color: COLORS.white, ...FONTS.h4,marginRight:10 }}>Loading...</Text>}
                    {!isPending && <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Continue</Text>}
                    {isPending && <ActivityIndicator size="small" color={COLORS.white} />}
                </TouchableOpacity>


                <View style={{marginTop:30,flexDirection:"row",}}>
                    {<TouchableOpacity style={{width:"100%",alignItems: "center"}}>
                        <Text style={{ color: COLORS.emerald, ...FONTS.h4 }}>{selected.name}</Text>
                    </TouchableOpacity>}
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
                    {modalCodeVisible && <ModalCode ngn={amount} service="Airtime" submitForm={submitForm} modalCodeVisible={modalCodeVisible} setModalCodeVisible={setModalCodeVisible} resMessage={payErr} />}
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

export default Airtime;