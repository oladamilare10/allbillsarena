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
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient'

import { COLORS, SIZES, FONTS, icons, images } from "../constants"
import { useLogin } from "../constants/CheckLiogin";
import ImagePick from "../components/ImagePicker";
import useUser from "../components/useUser";
import axios from 'axios'
import ModalCaseSuccess from "../components/modalCaseSuccess";
import ModalCaseError from "../components/modalCaseError";

const Sell = ({ navigation }) => {
    const {isLoggedIn} = useLogin()

    const [f_name, setF_name] = React.useState('')
    const [amount, setAmount] = React.useState('')
    const [screenShot, setScreenshot] = React.useState('')
    const [coin, setCoin] = React.useState("BTC")
    const {userData} = useUser(isLoggedIn);
    
    const user = userData

    const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    }
    let rate = 1400


    const [areas, setAreas] = React.useState([])
    const [selectedArea, setSelectedArea] = React.useState(null)
    const [modalVisible, setModalVisible] = React.useState(false)

    
    const [passErr, setPassErr] = React.useState(null)
    const [msg, setMsg] = React.useState(null)
    const [load, setLoad] = React.useState(false)
    const [btc, setBtc] = React.useState(true)
    const [eth, setEth] = React.useState(false)
    const [usdt, setUsdt] = React.useState(false)
    const [showForm, setShowForm] = React.useState(false)
    const [filename, setFilename] = React.useState(null)
    const [tImage, setImage] = React.useState(null);
    const [submitMessage, setSubmitMessage] = React.useState(null);
    const [imageHolder, setImageHolder] = React.useState(null)
    const [errMsg, setErrMsg] = React.useState(null)
    const [showReview, setShowReview] = React.useState(null)
    const [loadText, setLoadText] = React.useState(null)
    const [showUpload, setShowUpload] = React.useState(null)
    const [modalVisibleErr, setModalVisibleErr] = React.useState(false);
    const [payMsg, setPayMsg] = React.useState('')
    const [payErr, setPayErr] = React.useState(null)
    
  const uploadUrl = "https://crypto.allbillsarena.com.ng/api/upload.php"

  
  const sellUrl = "https://api.allbillsarena.com.ng/app_sell.php"
  const tId = Math.random().toString(16).slice(2)

  
  let Naira = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  })
  
    const price = amount * rate

      

  const handleImageUpload = ()=> {
    setLoad(true)
    setLoadText("uploading Image...")
      const tImages = new FormData();
      tImages.append('image', {
        uri: tImage,
        name: new Date() + "_allBillsTrade.png",
        type: 'image/png'
      });

      setTimeout(()=> {
        axios.post(uploadUrl, tImages, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          }
        }).then(res => {
            if(res.data === '') {
                throw Error("please make sure you upload an image file")
            }
            if(res.data === 'File is not an image.') {
                throw Error("File is not an image.")
            }
            if(res.data === 'Sorry, only JPG, JPEG, PNG & GIF files are allowed.') {
                throw Error("Sorry, only JPG, JPEG, PNG & GIF files are allowed.")
            }
            if(res.data === 'Sorry, your file was not uploaded.') {
                throw Error("Sorry, your file was not uploaded.")
            }
            if(res.data === 'Sorry, there was an error uploading your file.') {
                throw Error("Sorry, there was an error uploading your file.")
            }
          setImageHolder(res.data);
          setLoad(false);
          setLoadText(null)
          setErrMsg(null);
          setShowReview(true);
          setShowUpload(false);
          submitForm(res.data);
      })
      .catch(err => {
          setLoad(false)
          setErrMsg(err.message)
          console.log(err.message)
          setLoadText(null)
      })
      }, 900)
    }
    const submitForm = (value) => {
        if(amount === ''){
           if (amount === ''){
            setPassErr("Amount field cannot be empty")
           }
        }else{
            setLoad(true)
            setMsg(null)
            fetch(sellUrl, {
                method: "POST",
                header: header,
                body: JSON.stringify(
                    {
                    coin: coin,
                    phone: user.phone,
                    email: user.email,
                    tId: tId,
                    amount: amount,
                    ngn_amount: price,
                    user_id: isLoggedIn,
                    date: new Date(),
                    tImage: "https://crypto.allbillsarena.com.ng/api/" + value
                    }
                )
            })
            .then(res => {
                if (!res.ok) {
                    throw Error('Could not fetch Data for this particular resource.')
                }
                return res.json();
            })
            .then(data => {
                if (data.data.status === 'error') {
                    throw Error(data.message)
                }
                if (data.data.status === 'Success') {
                    setPayMsg("Your request has been sent successfully and is currently under review")
                    setTimeout(() => {
                    setModalVisible(true)
                    setLoad(false)
                    }, 3000);
                    console.log(payMsg)
                }
            })
            .catch(err => {
                setLoad(false)
                console.log(err.message)
            })
        }
    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          aspect: [4, 3],
          quality: 1,
        });
    
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
          setFilename(result.assets[0].fileName)
        }
      };
   

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

                <Text style={{ marginLeft: SIZES.padding * 1.5, color: COLORS.emerald, ...FONTS.h4 }}>Sell Crypto</Text>
            </TouchableOpacity>
        )
    }

    function renderBtc() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 5,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={icons.btc}
                    resizeMode="contain"
                    style={{
                        width: "60%"
                    }}
                />
            </View>
        )
    }
    function renderEth() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 5,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={icons.eth}
                    resizeMode="contain"
                    style={{
                        width: "60%"
                    }}
                />
            </View>
        )
    }

    function renderUsdt() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding * 5,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={icons.usdt}
                    resizeMode="contain"
                    style={{
                        width: "60%"
                    }}
                />
            </View>
        )
    }

    function renderSwitchButton() {
        return(
            <View style={{
                width:200,
                flexDirection: 'row',
                justifyContent: 'center',
                marginRight: 'auto',
                marginLeft: 'auto'
            }}>
                <TouchableOpacity
                 style={{
                    padding:10,
                    borderColor: COLORS.black,
                    borderWidth: 1,
                    paddingLeft: 17,
                    paddingRight: 17,
                    backgroundColor: COLORS.black,
                 }}
                 onPress={()=> {
                    setCoin("BTC")
                    setBtc(true)
                    setEth(false)
                    setUsdt(false)
                }}>
                    <Text style={{
                    color: COLORS.white,
                    fontWeight: 500
                    }}>Btc</Text>
                </TouchableOpacity>
                <TouchableOpacity
                 style={{
                    padding:10,
                    borderColor: COLORS.black,
                    borderWidth: 1,
                    paddingLeft: 17,
                    paddingRight: 17
                 }}
                  onPress={()=> {
                    setCoin("ETH")
                    setBtc(false)
                    setEth(true)
                    setUsdt(false)
                }}>
                    <Text>ETH</Text>
                </TouchableOpacity>
                <TouchableOpacity
                 style={{
                    padding:10,
                    borderColor: COLORS.black,
                    borderWidth: 1,
                    paddingLeft: 17,
                    paddingRight: 17
                 }}
                 onPress={()=> {
                    setCoin("USDT")
                    setBtc(false)
                    setEth(false)
                    setUsdt(true)
                }}>
                    <Text>USDT</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderSwitchButtonOne() {
        return(
            <View style={{
                width:200,
                flexDirection: 'row',
                justifyContent: 'center',
                marginRight: 'auto',
                marginLeft: 'auto'
            }}>
                <TouchableOpacity
                 style={{
                    padding:10,
                    borderColor: COLORS.black,
                    borderWidth: 1,
                    paddingLeft: 17,
                    paddingRight: 17
                 }}
                 onPress={()=> {
                    setBtc(true)
                    setEth(false)
                    setUsdt(false)
                }}>
                    <Text>Btc</Text>
                </TouchableOpacity>
                <TouchableOpacity
                 style={{
                    padding:10,
                    borderColor: COLORS.black,
                    borderWidth: 1,
                    paddingLeft: 17,
                    paddingRight: 17,
                    backgroundColor: COLORS.black,
                 }}
                  onPress={()=> {
                    setBtc(false)
                    setEth(true)
                    setUsdt(false)
                }}>
                    <Text style={{
                    color: COLORS.white,
                    fontWeight: 500
                    }}>ETH</Text>
                </TouchableOpacity>
                <TouchableOpacity
                 style={{
                    padding:10,
                    borderColor: COLORS.black,
                    borderWidth: 1,
                    paddingLeft: 17,
                    paddingRight: 17
                 }}
                 onPress={()=> {
                    setBtc(false)
                    setEth(false)
                    setUsdt(true)
                }}>
                    <Text>USDT</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function renderSwitchButtonTwo() {
        return(
            <View style={{
                width:200,
                flexDirection: 'row',
                justifyContent: 'center',
                marginRight: 'auto',
                marginLeft: 'auto'
            }}>
                <TouchableOpacity
                 style={{
                    padding:10,
                    borderColor: COLORS.black,
                    borderWidth: 1,
                    paddingLeft: 17,
                    paddingRight: 17
                 }}
                 onPress={()=> {
                    setBtc(true)
                    setEth(false)
                    setUsdt(false)
                }}>
                    <Text>Btc</Text>
                </TouchableOpacity>
                <TouchableOpacity
                 style={{
                    padding:10,
                    borderColor: COLORS.black,
                    borderWidth: 1,
                    paddingLeft: 17,
                    paddingRight: 17
                 }}
                  onPress={()=> {
                    setBtc(false)
                    setEth(true)
                    setUsdt(false)
                }}>
                    <Text>ETH</Text>
                </TouchableOpacity>
                <TouchableOpacity
                 style={{
                    padding:10,
                    borderColor: COLORS.black,
                    borderWidth: 1,
                    paddingLeft: 17,
                    paddingRight: 17,
                    backgroundColor: COLORS.black,
                 }}
                 onPress={()=> {
                    setBtc(false)
                    setEth(false)
                    setUsdt(true)
                }}>
                    <Text style={{
                    color: COLORS.white,
                    fontWeight: 500
                    }}>USDT</Text>
                </TouchableOpacity>
            </View>
        )
    }
    function renderAddress() {
        return(
            <View style={{
                flexDirection:'row',
                justifyContent:'center',
                marginBottom:25,
                backgroundColor:COLORS.lightGray,
                padding: 5,
            }}>
                <Text style={{
                    color:COLORS.black,
                    fontWeight:'500'
                }}>bc1qu07zyc65a2u6pdw29nfmmt5yg863nys570j4cp</Text>
            </View>
        )
    }

    function renderAddressOne() {
        return(
            <View style={{
                flexDirection:'row',
                justifyContent:'center',
                marginBottom:25,
                backgroundColor:COLORS.lightGray,
                padding: 5,
            }}>
                <Text style={{
                    color:COLORS.black,
                    fontWeight:'500'
                }}>0xEbb5c7aecBa984392A6F0F3c03724609aD7db7a7</Text>
            </View>
        )
    }

    function renderAddressTwo() {
        return(
            <View style={{
                flexDirection:'row',
                justifyContent:'center',
                marginBottom:25,
                backgroundColor:COLORS.lightGray,
                padding: 5,
            }}>
                <Text style={{
                    color:COLORS.black,
                    fontWeight:'500'
                }}>0xEbb5c7aecBa984392A6F0F3c03724609aD7db7a7</Text>
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

                <View style={{alignItems: 'center',flexDirection: 'row', ...styles.spaceDown}}>
                    <ImagePick onPress={pickImage} />
                    {tImage && <Image source={{ uri: tImage }} style={{ width: 40, height: 40,marginLeft: 10 }} />}
                    {errMsg && <Text style={{color: 'red',fontSize:12,textAlign: 'center'}}>{errMsg}</Text>}
                </View>

                <View style={{ marginTop: SIZES.padding * 3 }}>
                    <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>Amount {amount ? '(' + Naira.format(price) +')' : ""}</Text>
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
                        placeholder="Enter Amount Sent"
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
                    onPress={handleImageUpload}
                >
                    {load && <Text style={{ color: COLORS.white, ...FONTS.h4,marginRight:10 }}>{loadText ? loadText : "Loading..."}</Text>}
                    {!load && <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Continue</Text>}
                    {load && <ActivityIndicator size="small" color={COLORS.white} />}
                </TouchableOpacity>


                <View style={{marginTop:30,flexDirection:"row",}}>
                    <Text >Buy Assets...  </Text>
                    <TouchableOpacity onPress={()=> navigation.navigate("Buy Crypto")}>
                        <Text style={{ color: COLORS.emerald, ...FONTS.h4 }}>Buy Crypto</Text>
                    </TouchableOpacity>
                </View>
                
                {modalVisibleErr && <ModalCaseError modalVisibleErr={modalVisibleErr} setModalVisibleErr={setModalVisibleErr} resMessage={payErr} />}
                {modalVisible && <ModalCaseSuccess modalVisible={modalVisible} setModalVisible={setModalVisible} resMessage={payMsg} />}
        
            </View>
        )
    }


    function renderButtonTwo() {
        return (
            <View style={{ margin: SIZES.padding * 3 }}>
                <TouchableOpacity
                    style={{
                        height: 60,
                        backgroundColor: COLORS.black,
                        borderRadius: SIZES.radius / 1.5,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}
                    onPress={()=> setShowForm(true)}
                >
                    {load && <Text style={{ color: COLORS.white, ...FONTS.h4,marginRight:10 }}>Loading...</Text>}
                    {!load && <Text style={{ color: COLORS.white, ...FONTS.h3 }}>Continue</Text>}
                    {load && <ActivityIndicator size="small" color={COLORS.white} />}
                </TouchableOpacity>


                {/* <View style={{marginTop:30,flexDirection:"row",}}>
                    <Text >Click Here To Buy Crypto...  </Text>
                    <TouchableOpacity onPress={()=> navigation.navigate("Buy Crypto")}>
                        <Text style={{ color: COLORS.emerald, ...FONTS.h4 }}>Buy Crypto</Text>
                    </TouchableOpacity>
                </View> */}
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
                   {!showForm && <View>
                        {btc && renderBtc()}
                        {eth && renderEth()}
                        {usdt && renderUsdt()}
                        {btc && renderAddress()}
                        {eth && renderAddressOne()}
                        {usdt && renderAddressTwo()}
                        {btc && renderSwitchButton()}
                        {eth && renderSwitchButtonOne()}
                        {usdt && renderSwitchButtonTwo()}
                    </View>}
                    
                    {!showForm && renderButtonTwo()}
                    {showForm && renderForm()}
                    {showForm && renderButton()}
                </ScrollView>
            </LinearGradient>
            {renderAreaCodesModal()}
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 20,
      paddingHorizontal: 0,
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    content:{
      flex: 1,
    },
    transact: {
      flex: 1,
      marginTop: 0,
      marginLeft: 10,
      marginRight: 10,
      paddingLeft: 15,
      paddingRight: 15
    },
    transactColumn: {
      flex: 1,
      padding: 15,
      marginBottom: 2,
      flexDirection: 'row',
      justifyContent: 'space-between',
      //borderBottomColor: 'grey',
      //borderBottomWidth: 1,
    },
    transactHeader: {
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 10,
      color: '#333333FE',
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10
    },
    ngAmount: {
      fontSize: 19,
      marginTop: 10,
      marginBottom: 30,
    },
    revContainer: {
      width: "90%",
      flexDirection: 'column',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 20,
    },
    revBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10
    },
    sellTitle: {
      fontSize: 25,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 20,
      color: 'grey'
    },
    setTag: {
      fontSize: 15,
      fontWeight: '400',
      color: '#404040'
    },
    sellMain: {
      fontSize: 18,
      fontWeight: '500',
      color: '#febb39'
    },
    spaceDown:{
      paddingBottom: 0
    }
    })

export default Sell;