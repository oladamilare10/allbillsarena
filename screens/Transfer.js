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
import useBalance from "../components/useBal";
import { AntDesign } from '@expo/vector-icons';
import { Colors } from "react-native/Libraries/NewAppScreen";
import Bank_function from "../data/banks";
import ModalCode from "../components/modalCode";
import useUser from "../components/useUser";


const Transfer = ({ navigation }) => {
    const { banks } = Bank_function()
    const bankList = banks.data

    const [selected, setSelected] = React.useState({
      id: 0,
      name: 'DsTV',
    })
      const [amount, setAmount] = React.useState(null)
      const [userId, setUserId] = React.useState(null)
      const [phoneErr, setPhoneErr] = React.useState(null)
      const [amountErr, setAmountErr] = React.useState(null)
      const [payMsg, setPayMsg] = React.useState(null)
      const [payErr, setPayErr] = React.useState(null)
      const [resErr, setResErr] = React.useState(null)
      const [balMsg, setBalMsg] = React.useState(null);
      const [resCheck, setResCheck] = React.useState(null);
      
      const [dSelected, setDSelected] = React.useState(bankList[0])
      const [defaultText, setDefaultText] = React.useState(dSelected.bank_name)
      const [fee, setFee] = React.useState(0)
      const [showOptions, setShowOptions] = React.useState(false)
      const [isPending, setIsPending] = React.useState(false)
      const [isPendingRes, setIsPendingRes] = React.useState(false)
      const [packErr, setPackErr] = React.useState(null)
      const [modalVisibleErr, setModalVisibleErr] = React.useState(false);
      const [modalCodeVisible, setModalCodeVisible] = React.useState(false);
      
    const addAmount = (a, b) => a + b;
    const newAmount = addAmount(Number(amount), Number(fee));
    
      
      const dateData = new Date();
      const {isLoggedIn} = useLogin()
      const tId = Math.random().toString(16).slice(2)

      const {userData} = useUser(isLoggedIn)


      
    const [areas, setAreas] = React.useState([])
    const [selectedArea, setSelectedArea] = React.useState(null)
    const [modalVisible, setModalVisible] = React.useState(false)
    const [prepaid, setPrepaid] = React.useState("prepaid")
    const [showPrepaid, setShowPrepaid] = React.useState(true)
    const [msg, setMsg] = React.useState(null)

    const urlVerify = 'https://api.ufitpay.com/v1/bank_validate'
    const accUrl = 'https://api.allbillsarena.com.ng/account_validate.php'

    const tfUrl = 'https://api.allbillsarena.com.ng/transfer.php'
    const method = 'POST'
    const urlHeader = {
        'Content-Type': 'application/json',
        'Api-Key': 'pub-0WB98vJPCcMsJPviZsNGRLQylMCG0kFL',
        'Api-Token': 'sec-soNdkopsFWVLUTEFefvV2KS7QLoO03SQ'
    }
    const urlBody = JSON.stringify({
      account_number: userId,
      bank_code: dSelected.bank_code
    });
    
    const urlBodyAllB = JSON.stringify({
      account_number: userId,
      bank_code: dSelected.bank_code
    });
    const checkFee = (value) => {
      if (value.bank_code === "001"){
        setFee(0)
      }else{
        setFee(20)
      }
    }
    

    const checkValidity = ()=> {
        setResErr(null)
        setResCheck(null)
        setIsPendingRes(true)
        if(!userId || !dSelected) {
            setResErr("need more info verify")
            setIsPendingRes(false)
        }else{
          if (dSelected.bank_code === "001"){
            setFee(0)
            fetch(accUrl, {
              method: method,
              headers: urlHeader,
              body: urlBodyAllB
            })
            .then(res => {
            if (!res.ok) {
                throw Error('Could not fetch Data for this particular resource.')
            }
            return res.json()
            })
            .then(data => {
                if (data.result.code === 'failure') {
                    throw Error(data.result.message)
                }
                setResCheck(data.result.data)
                setIsPendingRes(false)
                setResErr(null)
            })
            .catch(error=> {
                setResErr(error.message)
                setIsPendingRes(false)
                setResCheck(null)
            }) 
          }else{
              fetch(urlVerify, {
                  method: method,
                  headers: urlHeader,
                  body: urlBody
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
                  setResCheck(data.data)
                  setIsPendingRes(false)
                  setResErr(null)
              })
              .catch(error=> {
                  setResErr(error.message)
                  setIsPendingRes(false)
                  setResCheck(null)
              }) 
            }
        }
    }
    

  const {balance} = useBalance(isLoggedIn)
  let newBal = ''
  if (balance){
    const addBal = (a, b) => a - b;
     newBal = addBal(Number(balance.w_balance), Number(newAmount));
  }
  const checkPhone = ()=> {
    if (userId === '' || !userId) {
        setPhoneErr('Meter ID field cannot be empty')
        setMsg(null)
    }else{
        checkValidity()
        setPhoneErr(null)
        setMsg(null)
    }
}
const checkAmount = ()=> {
    if (amount === '' || !amount) {
        setAmountErr('Please enter a valid amount')
        setMsg(null)
    }else{
        setAmountErr(null)
        setMsg(null)
    }
}

  const url = 'https://api.allbillsarena.com.ng/update_wallet.php'
    const header = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    //   const handleSelected = (value) => {
    //     setSelected(value)
    //     setDefaultText('Selects Package')
    //   }
    
      const handleShow = () => {
        if (showOptions) {
          setShowOptions(false)
        }else{
          setShowOptions(true)
        }
      }
      const handleSelection = (value) =>  {
          setDefaultText(value.bank_name)
          setShowOptions(false)
      }

    const submitForm = (e) => {

        setIsPending(true)

        
    const body = JSON.stringify(
      {
        user_id: isLoggedIn,
        new_balance: newBal,
        t_amount: amount,
        desc: "transfer to " + resCheck.account_name,
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
            if(!dSelected) {
                setPackErr("no data package was selected.")
                setIsPending(false)
              }else{
                setPackErr(null)
              }
              if(!selected){
                setPhoneErr("you need to select a network")
              }
              if(userId === '') {
                setPhoneErr("we need a Meter ID to process your order")
                setIsPending(false)
              }else{
                setPhoneErr(null)
              }
              if (userId && dSelected && selected){
                if(Number(amount) > Number(balance)){
                  setPayErr("insufficient fund")
                  setIsPending(false)
                  setModalVisibleErr(true)
                }else{
                
                    const urlPay = "https://api.ufitpay.com/v1/bank_transfer"
                    
                    const payBody = JSON.stringify({
                      account_number: userId,
                      bank_code: dSelected.bank_code,
                      amount: amount,
                      narration: "transfer to " + resCheck.account_name,
                    });
                    const payBody1 = JSON.stringify({
                      account_number: userId,
                      bank_code: dSelected.bank_code,
                      amount: amount,
                      user_id: resCheck.user,
                      narration: "transfer From " + userData.l_name +" " + userData.f_name,
                      date: dateData,
                      tId: tId
                    });

                    if(Number(amount) > Number(balance.w_balance)){
                      setPayErr("insufficient fund")
                      setIsPending(false)
                      setModalVisibleErr(true)
                    }else{


                      if (dSelected.bank_code === "001"){
                        fetch(tfUrl, {
                          method: method,
                          headers: urlHeader,
                          body: payBody1
                        })
                        .then(res => {
                          if (!res.ok) {
                            throw Error('Could not fetch Data for this particular resource.')
                          }
                          return res.json()
                        })
                        .then(data => {
                          if (data.result.status !== 'Success') {
                              throw Error(data.result.message)
                          }
                          setPayMsg(data.result.message)
                          setIsPending(false)
                          setModalVisible(true)
                          handleWalletUpdate()
                        })
                        .catch(error=> {
                          setPayErr(error.message)
                          setIsPending(false)
                          setModalVisibleErr(true)
                        })

                      }else{
              
                        fetch(urlPay, {
                          method: method,
                          headers: urlHeader,
                          body: payBody
                        })
                        .then(res => {
                          if (!res.ok) {
                            throw Error('Could not fetch Data for this particular resource.')
                          }
                          return res.json()
                        })
                        .then(data => {
                          if (data.status !== 'success') {
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

                <Text style={{ marginLeft: SIZES.padding * 1.5, color: COLORS.emerald, ...FONTS.h4 }}>Send Money</Text>
            </TouchableOpacity>
        )
    }

    function renderPrepaid() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {showPrepaid && <View>
                <View style={{flexDirection: 'row',padding: 4,width: 200,borderRadius: 10,marginLeft: 'auto',marginRight: 'auto',justifyContent: 'space-between', backgroundColor: '#eee', marginTop: 30}}>
                  <TouchableOpacity style={{padding:8,paddingLeft:15,paddingRight:15,fontSize:17,backgroundColor: COLORS.primary,borderRadius:10}}>
                    <Text style={{color:'#fff',fontSize:16,fontWeight:'500',letterSpacing:0.5}}>Prepaid</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={{padding:8,paddingLeft:15,paddingRight:15,fontSize:17,borderRadius:10}} onPress={()=> {
                    setShowPrepaid(false)
                    setPrepaid("postpaid")
                  }}>
                    <Text style={{color:'#333',fontSize:16,fontWeight:'500',letterSpacing:0.5}}>Postpaid</Text>
                  </TouchableOpacity>
                </View>
              </View>}

              {!showPrepaid && <View>
                <View style={{flexDirection: 'row',padding: 4,width: 200,borderRadius: 10,marginLeft: 'auto',marginRight: 'auto',justifyContent: 'space-between', backgroundColor: '#eee', marginTop: 30}}>
                  <TouchableOpacity style={{padding:8,paddingLeft:15,paddingRight:15,fontSize:17,borderRadius:10}} onPress={()=> {
                    setShowPrepaid(true)
                    setPrepaid("prepaid")
                  }}>
                    <Text style={{color:'#333',fontSize:16,fontWeight:'500',letterSpacing:0.5}}>Prepaid</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={{padding:8,paddingLeft:15,paddingRight:15,fontSize:17,backgroundColor: COLORS.primary,borderRadius:10}}>
                    <Text style={{color:'#fff',fontSize:16,fontWeight:'500',letterSpacing:0.5}}>Postpaid</Text>
                  </TouchableOpacity>
                </View>
              </View>}
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

                <Text style={{marginTop: 10, ...styles.ttText}}>Select Bank </Text>
                <TouchableOpacity style={{alignItems:'center',marginTop:15, ...styles.caseTab}} onPress={handleShow}>
                        <Text style={{color: COLORS.primary,}}>{defaultText}</Text>
                        <AntDesign name="caretdown" size={12} color={COLORS.primary} />
                    </TouchableOpacity>

                    {amount && <View style={styles.amountBox}>
                        <Text>Amount: {Naira.format(amount)}</Text>
                        <Text>Fee: {Naira.format(fee)}</Text>
                    </View>}
                    
                    {showOptions && <View style={{borderWidth:1,borderColor: '#eee'}}>
                        {bankList && <View style={{padding:15}}>
                        {bankList.map((item) => {
                        return(
                            <TouchableOpacity style={styles.eachTab} onPress={() => {
                            setDSelected(item)
                            checkFee(item)
                            handleSelection(item)
                            }} key={item.bank_name}>
                            <Text>{item.bank_name}</Text>
                            </TouchableOpacity>
                        )
                        }) }
                        </View>}
                    </View>}
                        {packErr && <Text style={styles.errText}>{packErr}</Text>}

                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>Account Number</Text>
                    <TextInput
                        style={{
                            marginVertical: SIZES.padding,
                            borderBottomColor: COLORS.emerald,
                            borderBottomWidth: 1,
                            height: 40,
                            color: COLORS.emerald,
                            ...FONTS.body3
                        }}
                        onBlur={checkPhone}
                        onChangeText={(val) => setUserId(val)}
                        placeholder="Enter Account Number"
                        keyboardType="numeric"
                        placeholderTextColor={COLORS.emerald}
                        selectionColor={COLORS.emerald}
                    />
                    {phoneErr && <Text style={styles.errText}>{phoneErr}</Text>}
                    {resErr && <Text style={styles.errText}>{resErr}</Text>}
                    {resCheck && <Text style={{color: COLORS.primary}}>{resCheck.account_name}</Text>}
                    {isPendingRes && <Text style={{color:COLORS.gray}}>Loading...</Text>}
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
                        onBlur={checkAmount}
                        onChangeText={(val) => setAmount(val)}
                        placeholder="Enter Amount"
                        keyboardType="numeric"
                        placeholderTextColor={COLORS.emerald}
                        selectionColor={COLORS.emerald}
                    />
                    {amount && <Text>you'd pay: {Naira.format(newAmount)}</Text>}
                    {amountErr && <Text style={styles.errText}>{amountErr}</Text>}
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


                {dSelected && <View style={{marginTop:30,flexDirection:"row",}}>
                    {<TouchableOpacity style={{width:"100%",alignItems: "center"}}>
                        <Text style={{ color: COLORS.emerald, ...FONTS.h4 }}>{dSelected.name}</Text>
                    </TouchableOpacity>}
                </View>}
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
                    {/* {renderPrepaid()} */}
                    {renderForm()}
                    {renderButton()}
                    
                    {modalVisibleErr && <ModalCaseError modalVisibleErr={modalVisibleErr} setModalVisibleErr={setModalVisibleErr} resMessage={payErr} />}
                    {modalCodeVisible && <ModalCode ngn={newAmount} service={dSelected.bank_name} submitForm={submitForm} modalCodeVisible={modalCodeVisible} setModalCodeVisible={setModalCodeVisible} resMessage={payErr} />}
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

export default Transfer;