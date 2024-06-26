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
import NetworksCable from "../components/networksCable";
import ModalCode from "../components/modalCode";


const cablePlan = [
    {package: "DsTv", data: [
        {code: "dstv-yanga", name: "DStv Yanga", fee: 100, price: 4200},
        {code: "dstv-padi", name: "DStv Padi", fee: 100, price: 2950},
        {code: "dstv-confam", name: "DStv Confam", fee: 100, price: 7400},
        {code: "dstv6", name: "DStv Asia", fee: 100, price: 9900},
        {code: "dstv79", name: "DStv Compact", fee: 100, price: 12500},
        {code: "dstv7", name: "DStv Compact Plus", fee: 100, price: 19800},
        {code: "dstv3", name: "DStv Premium", fee: 100, price: 29500},
        {code: "dstv10", name: "DStv Premium Asia", fee: 100, price: 33000},
        {code: "dstv9", name: "DStv Premium-French", fee: 100, price: 45600 },
        {code: "confam-extra", name: "DStv Confam + ExtraView", fee: 100, price: 11400},
        {code: "yanga-extra", name: "DStv Yanga + ExtraView", fee: 100, price: 8200},
        {code: "padi-extra", name: "DStv Padi + ExtraView", fee: 100, price: 6950},
        {code: "com-asia", name: "DStv Compact + Asia", fee: 100, price: 22400},
        {code: "dstv30", name: "DStv Compact + Extra View", fee: 100, price: 16500},
        {code: "com-frenchtouch", name: "DStv Compact + French Touch", fee: 100, price: 17100},
        {code: "dstv33", name: "DStv Premium – Extra View", fee: 100, price: 33500},
        {code: "dstv40", name: "DStv Compact Plus – Asia", fee: 100, price: 29700},
        {code: "com-frenchtouch-extra", name: "DStv Compact + French Touch + ExtraView", fee: 100, price: 21100},
        {code: "com-asia-extra", name: "DStv Compact + Asia + ExtraView", fee: 100, price: 26400},
        {code: "dstv43", name: "DStv Compact Plus + French Plus", fee: 100, price: 35900},
        {code: "complus-frenchtouch", name: "DStv Compact Plus + French Touch", fee: 100, price: 24400},
        {code: "dstv45", name: "DStv Compact Plus – Extra View", fee: 100, price: 23800},
        {code: "complus-french-extraview", name: "DStv Compact Plus + FrenchPlus + Extra View", fee: 100, price: 39900},
        {code: "dstv47", name: "DStv Compact + French Plus", fee: 100, price: 28600},
        {code: "dstv48", name: "DStv Compact Plus + Asia + ExtraView", fee: 100, price: 33700},
        {code: "dstv61", name: "DStv Premium + Asia + Extra View", fee: 100, price: 43400},
        {code: "dstv62", name: "DStv Premium + French + Extra View", fee: 100, price: 40700},
        {code: "hdpvr-access-service", name: "DStv HDPVR Access Service", fee: 100, price: 4000},
        {code: "frenchplus-addon", name: "DStv French Plus Add-on", fee: 100, price: 16100},
        {code: "asia-addon", name: "DStv Asian Add-on", fee: 100, price: 9900},
        {code: "frenchtouch-addon", name: "DStv French Touch Add-on", fee: 100, price: 4600},
        {code: "extraview-access", name: "ExtraView Access", fee: 100, price: 4000},
        {code: "french11", name: "DStv French 11", fee: 100, price: 7200}
        ]	
    },
    {package: "GoTv", data: [
        {code: "gotv-smallie", name: "GOtv Smallie", fee: 100, price: 1300},
        {code: "gotv-jinja", name: "GOtv Jinja", fee: 100, price: 2700},
        {code: "gotv-jolli", name: "GOtv Jolli", fee: 100, price: 3950},
        {code: "gotv-max", name: "GOtv Max", fee: 100, price: 5700},
        {code: "gotv-supa", name: "GOtv Supa", fee: 100, price: 7600},
        ]
    },
    {package: "StarTimes", data: [
        {code: "nova", name: "Startimes Nova", fee: 100, price: 1500},
        {code: "basic", name: "Startimes Basic", fee: 100, price: 2600},
        {code: "smart", name: "Startimes Smart", fee: 100, price: 3500},
        {code: "classic", name: "Startimes Classic", fee: 100, price: 3800},
        {code: "super", name: "Startimes Super", fee: 100, price: 6500},
        ]
    }
]

const Cable = ({ navigation }) => {

    const [selected, setSelected] = React.useState({
      id: 0,
      name: 'DsTV',
    })
      const [amount, setAmount] = React.useState(null)
      const [phone, setPhone] = React.useState(null)
      const [phoneErr, setPhoneErr] = React.useState(null)
      const [payMsg, setPayMsg] = React.useState(null)
      const [payErr, setPayErr] = React.useState(null)
      const [balMsg, setBalMsg] = React.useState(null);
      
      const [dSelected, setDSelected] = React.useState(cablePlan[selected.id].data[0])
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
        setPhoneErr('IUC Number field cannot be empty')
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
                setPhoneErr("we need a IUC Number to process your order")
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

                <Text style={{ marginLeft: SIZES.padding * 1.5, color: COLORS.emerald, ...FONTS.h4 }}>Cable Tv</Text>
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
                    <NetworksCable handleSelected={handleSelected} selected={selected.id} />
                </View>
                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>IUC Number</Text>
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
                        placeholder="Enter IUC Number"
                        placeholderTextColor={COLORS.emerald}
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
                        {cablePlan && <View style={{padding:15}}>
                        {cablePlan[selected.id].data.map((item) => {
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
                    {modalCodeVisible && <ModalCode ngn={amount + fee} service={dSelected.name} submitForm={submitForm} modalCodeVisible={modalCodeVisible} setModalCodeVisible={setModalCodeVisible} resMessage={payErr} />}
                    {modalVisible && <ModalCaseSuccess modalVisible={modalVisible} setModalVisible={setModalVisible} resMessage={payMsg} />}

                </ScrollView>
            </LinearGradient>
            {renderAreaCodesModal()}
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

export default Cable;