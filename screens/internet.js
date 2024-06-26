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
import ModalCode from "../components/modalCode";
import Networks from "../components/networks";
import useBalance from "../components/useBal";
import { FontAwesome, AntDesign, Foundation } from '@expo/vector-icons';


const dataPlan = [
    {network: "mtn", data: [
      {code: "500", name:"MTN SME Data 500MB – 2 Days", price: 200},
      {code: "M1024", name:"MTN SME Data 1GB – 2 Days", price: 345},
      {code: "M2024", name:"MTN SME Data 2GB – 20 Days", price: 689},
      {code: "3000", name:"MTN SME Data 3GB – 30 Days", price: 1019},
      {code: "5000", name:"MTN SME Data 5GB – 30 Days", price: 1699},
      {code: "10000", name:"MTN SME Data 10GB – 30 Days", price: 200},
      {code: "mtn-20hrs-1500", name:"MTN Data 6GB -7 Days", price: 1499},
      {code: "mtn-30gb-8000", name:"MTN Data 30GB – 30 Days", price: 4990},
      {code: "mtn-40gb-10000", name:"MTN Data 40GB – 30 Days", price: 9970},
      {code: "mtn-75gb-15000", name:"MTN Data 75GB – 30 Days", price: 14970}
    ]},
    {network: "airtel", data: [
      {code: "airt-1100", name:"Airtel Data 1.5GB – 30 Days", price: 1079},
      {code: "airt-1300", name:"Airtel Data 2GB – 30 Days", price: 1289},
      {code: "airt-1650", name:"Airtel Data 3GB – 30 Days", price: 1639},
      {code: "airt-2200", name:"Airtel Data 4.5GB – 30 Days", price: 2189},
      {code: "airt-3300", name:"Airtel Data 10GB – 30 Days", price: 3289},
      {code: "airt-5500", name:"Airtel Data 20GB – 30 Days", price: 5489},
      {code: "airt-11000", name:"Airtel Data 40GB – 30 Days", price: 10799},
      {code: "airt-330x ", name:"Airtel Data 1GB – 1 Day", price: 347},
      {code: "airt-550", name:"Airtel Data 750MB – 14 Days", price: 550},
      {code: "airt-1650-2", name:"Airtel Data 6GB – 7 Days", price: 1639},
      {code: "AIRTEL500MB", name:"Airtel Data 500MB (Gift) – 30 Days", price: 160},
      {code: "AIRTEL1GB", name:"Airtel Data 1GB (Gift) – 30 Days", price: 299},
      {code: "AIRTEL2GB", name:"Airtel Data 2GB (Gift)– 30 Days", price: 599},
      {code: "AIRTEL5GB", name:"Airtel Data 5GB (Gift)– 30 Days", price: 1499},
      {code: "AIRTEL10GB", name:"Airtel Data 10GB (Gift)– 30 Days", price: 2990},
      {code: "AIRTEL15GB", name:"Airtel Data 15GB (Gift)– 30 Days", price: 4400},
      {code: "AIRTEL20GB", name:"Airtel Data 20GB (Gift)– 30 Days", price: 5800},
    ]},
    {network: "glo", data: [
      {code: "glo100x", name:"Glo Data 1GB – 5 Nights", price: 99},
      {code: "glo200x", name:"Glo Data 1.25GB – 1 Day (Sunday)", price: 199},
      {code: "G500", name:"Glo Data 1.35GB – 14 Days", price: 499},
      {code: "G1000", name:"Glo Data 2.9GB – 30 Days", price: 989},
      {code: "G2000", name:"Glo Data 5.8GB – 30 Days", price: 1979},
      {code: "G2500 ", name:"Glo Data 7.7GB – 30 Days", price: 2489},
      {code: "G3000", name:"Glo Data 10GB – 30 Days", price: 2979},
      {code: "G4000", name:"Glo Data 13.25GB – 30 Days", price: 3899},
      {code: "G5000", name:"Glo Data 18.25GB – 30 Days", price: 4949},
      {code: "G8000", name:"Glo Data 29.5GB – 30 Days", price: 7899},
      {code: "glo10000 ", name:"Glo Data 50GB – 30 Days", price: 9959}
    ]},
    {network: "9mobile", data: [
      {code: "9MOB1000", name:"9mobile Data 1GB – 30 Days", price: 995},
      {code: "9MOB34500", name:"9mobile Data 2.5GB – 30 Days", price: 1995},
      {code: "9MOB8000", name:"9mobile Data 11.5GB – 30 Days", price: 7969},
      {code: "9MOB5000", name:"9mobile Data 15GB – 30 Days", price: 9899},
    ]},
  ]

const Internet = ({ navigation }) => {

    const [selected, setSelected] = React.useState({
        id: 0,
        name: 'mtn'
    })
      const [amount, setAmount] = React.useState(null)
      const [phone, setPhone] = React.useState('')
      const [phoneErr, setPhoneErr] = React.useState(null)
      const [payMsg, setPayMsg] = React.useState(null)
      const [payErr, setPayErr] = React.useState(null)
      const [balMsg, setBalMsg] = React.useState(null);
      
      const [dSelected, setDSelected] = React.useState(dataPlan[selected.id].data[0])
      const [defaultText, setDefaultText] = React.useState('Select Package')
      const fee = 0
      const [showOptions, setShowOptions] = React.useState(false)
      const [isPending, setIsPending] = React.useState(false)
      const [packErr, setPackErr] = React.useState(null)
      const [modalVisibleErr, setModalVisibleErr] = React.useState(false);
      const [modalCodeVisible, setModalCodeVisible] = React.useState(false);
    
      
      const dateData = new Date();
      const {isLoggedIn} = useLogin()
      const tId = Math.random().toString(16).slice(2)

      
    const [areas, setAreas] = React.useState([])
    const [selectedArea, setSelectedArea] = React.useState(null)
    const [modalVisible, setModalVisible] = React.useState(false)

    
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
    
      const handleShow = () => {
        if (showOptions) {
          setShowOptions(false)
        }else{
          setShowOptions(true)
        }
      }
      const handleSelection = (value) =>  {
          setDefaultText(value.name)
          setShowOptions(false)
          setAmount(value.price)
      }

    const submitForm = (e) => {
        setIsPending(true)
            if(!dSelected) {
                setPackErr("no data package was selected.")
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
              if (phone && dSelected && selected){
                if(Number(amount) > Number(balance.w_balance)){
                  setPayErr("insufficient fund")
                  setIsPending(false)
                  setModalVisibleErr(true)
                }else{
          
                
                  const urlPay = "https://vtu.ng/wp-json/api/v1/data?username=Allbillsarena&password=Allbillsarena2023&phone="+ phone +"&network_id="+ selected.name + "&variation_id=" + dSelected.code

          
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

                <Text style={{ marginLeft: SIZES.padding * 1.5, color: COLORS.emerald, ...FONTS.h4 }}>Internet</Text>
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
                        onBlur={checkPhone}
                        onChangeText={(val) => setPhone(val)}
                        placeholder="Enter Phone Number"
                        placeholderTextColor={COLORS.emerald}
                        keyboardType="numeric"
                        selectionColor={COLORS.emerald}
                    />
                    {phoneErr && <Text style={styles.errText}>{phoneErr}</Text>}
                </View>

                <Text style={{marginTop: 10, ...styles.ttText}}>Select Data Plan</Text>
                <TouchableOpacity style={{alignItems:'center',marginTop:15, ...styles.caseTab}} onPress={handleShow}>
                        <Text style={{color: COLORS.primary,}}>{defaultText}</Text>
                        <AntDesign name="caretdown" size={12} color={COLORS.primary} />
                    </TouchableOpacity>

                    {amount && <View style={styles.amountBox}>
                        <Text>Amount: {Naira.format(amount)}</Text>
                        <Text>Fee: {Naira.format(fee)}</Text>
                    </View>}
                    
                    {showOptions && <View style={{borderWidth:1,borderColor: '#eee'}}>
                        {dataPlan && <View style={{padding:15}}>
                        {dataPlan[selected.id].data.map((item) => {
                        return(
                            <TouchableOpacity style={styles.eachTab} onPress={() => {
                            setDSelected(item)
                            handleSelection(item)
                            }} key={item.code}>
                            <Text>{item.name}</Text>
                            </TouchableOpacity>
                        )
                        }) }
                        </View>}
                    </View>}
                        {packErr && <Text style={styles.errText}>{packErr}</Text>}
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
                    {isPending && <Text style={{ color: COLORS.white, ...FONTS.h4 }}>Loading...</Text>}
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
                    
                    {modalVisibleErr && <ModalCaseError modalVisibleErr={modalVisibleErr} setModalVisibleErr={setModalVisibleErr} resMessage={payErr} />}
                    {modalCodeVisible && <ModalCode ngn={amount + fee} service="Data Bundle" submitForm={submitForm} modalCodeVisible={modalCodeVisible} setModalCodeVisible={setModalCodeVisible} resMessage={payErr} />}
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

export default Internet;