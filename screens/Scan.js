import React, {memo} from "react";
import {
    SafeAreaView,
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    StyleSheet
} from "react-native"
import { COLORS, SIZES, FONTS, icons, images } from "../constants"
import useBalance from "../components/useBal";
import CardDetailModal from "../components/CardDetailModal";
import Search from "../components/Search";
import ModalCaseError from "../components/modalCaseError";
import ModalCaseSuccess from "../components/modalCaseSuccess";
import { useLogin } from "../constants/CheckLiogin";



let loadMore =false
let rate = 1188

const Scan = ({ navigation }) => {

    const specialPromoData = [
        {
            id: 1,
            img: images.promoBanner,
            title: "Bonus Cashback1",
            description: "Don't miss it. Grab it now!"
        },
        {
            id: 2,
            img: images.promoBanner,
            title: "Bonus Cashback2",
            description: "Don't miss it. Grab it now!"
        },
        {
            id: 3,
            img: images.promoBanner,
            title: "Bonus Cashback3",
            description: "Don't miss it. Grab it now!"
        },
        {
            id: 4,
            img: images.promoBanner,
            title: "Bonus Cashback4",
            description: "Don't miss it. Grab it now!"
        },
    ]

    const addFund = [
        {
            id: 1,
            description: "Add Naira",
            navigationPage: "Add Fund"
        },
        {
            id: 2,
            description: "Add Crypto",
            navigationPage: "Sell Crypto"
        }
    ]
    const {isLoggedIn} = useLogin()
    
  const {balance} = useBalance(isLoggedIn)

    const [features, setFeatures] = React.useState('')
    const [selectedCard, setSelectedCard] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState({
        status: false,
        message: null
    })

    const url = 'https://giftcards-sandbox.reloadly.com/orders';
    const walletUpdateUrl = 'https://api.allbillsarena.com.ng/update_wallet.php';
    

    const secret_API_key = "uXExlxFq7F-NBMLeU4IITAiiI6Vlvv-f5jskpbVoL77fi7GoEWVJ2MscWM15I70";
    const public_API_key = "UZ4uOTTq5E3jmUNN2OzvIEGS4SclIuqy";
    const api_Url = "https://giftcards-sandbox.reloadly.com/countries/US/products";
    const [modalCodeVisible, setModalCodeVisible] = React.useState(false)
    const [searching, setSearching] = React.useState(null)
    const [search, setSearch] = React.useState("")
    const [Tokenizer, setTokenizer] = React.useState("")
    const [cardProcessing, setCardProcessing] = React.useState(false)
    const [modalVisibleErr, setModalVisibleErr] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false)
    const [payMsg, setPayMsg] = React.useState('')
    const [payErr, setPayErr] = React.useState(null)
    const dateData = new Date()

    const header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }

     const walletUpdate = (val)=> {
        const body = JSON.stringify(
            {
              user_id: isLoggedIn,
              new_balance: val.nBal,
              t_amount: val.amount,
              desc: "Gift Card Purchase",
              t_id: val.tId,
              date: dateData
            }
        )

        fetch(walletUpdateUrl, {
            method: "POST",
            header: header,
            body: body
          })
          .then(res => {
            return res.json();
          })
          .then(msg => {
            setPayMsg("Your Gift Card purchase was Successful!")
            setModalCodeVisible(false)
            setModalVisible(true)
            setCardProcessing(false)
          })
     }
    
    React.useEffect(() => {
       loadToken();
    }, [])
    const loadToken = ()=> {
        setIsLoading({status:true, message: "Preparing cards"})
        async function run() {
        const resp = await fetch(
            `https://auth.reloadly.com/oauth/token`,
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_id: public_API_key,
                client_secret: secret_API_key,
                grant_type: 'client_credentials',
                audience: 'https://giftcards-sandbox.reloadly.com'
            })
            }
        );
        
        const data = await resp.json();
            setIsLoading({status:false, message: null})
            setTokenizer(data.access_token)
            setTimeout(()=> {
                clickSow(data.access_token); 
            }, 100)
        }
        
         run();
    }
    function handleSearch(searchVal) {
        if(!features){

        }else{
            setSearch(searchVal)
            if (searchVal === "") { setSearching(features); return; }
            const filterBySearch = features.filter((item) => {
                if (item.productName.toLowerCase()
                    .includes(searchVal.toLowerCase())) { return item; }
            })
            setSearching(filterBySearch);
        }
    }

    const clickSow = (api_Token) => {
        setIsLoading({status:true, message: "Fetching gift cards"})
        async function runTwo() {
          const resps = await fetch(api_Url,
            {
              method: 'GET',
              headers: {
                'Authorization': 'Bearer ' + api_Token
              }
            }
          );
          const datas = await resps.json();
          setFeatures(datas);
          setIsLoading({status:false, message: null})
        }
        runTwo();
      }

      //send GiftCard Orders
      function submitForm (val) {
        
    const addBal = (a, b) => a - b;
    const newBal = addBal(Number(balance.w_balance), Number(val.unitPrice * rate));
        setCardProcessing(true)
        const sendOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/com.reloadly.giftcards-v1+json',
                Authorization: 'Bearer ' + Tokenizer
            },
            body: JSON.stringify(val)
        }
        if(Number(val.unitPrice*rate) > Number(balance.w_balance)){
            setPayErr("insufficient fund, please recharge wallet")
            setCardProcessing(false)
            setModalVisibleErr(true)
          }else{
            fetch(url, sendOptions)
                .then(res => res.json())
                .then(json => {
                    if (json.message){
                        throw Error(json.message)
                    }
                    walletUpdate({
                        nBal: newBal,
                        amount: val.unitPrice*rate,
                        tId: val.customIdentifier
                    })
                    setPayErr(null)
                    setModalVisibleErr(false)
                })
                .catch(err => {
                    setCardProcessing(false)
                    setModalVisible(false)
                    setModalVisibleErr(true)
                    setPayErr(err.message)
                });
            }
      }

    let Naira = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
    })


    function renderHeader() {
        return (
            <View style={{ 
                flexDirection: 'row',
                position: 'absolute',
                justifyContent: 'space-around',
                top:0,
                zIndex:3,
                paddingHorizontal: 20,
                backgroundColor:COLORS.white,
                paddingTop: SIZES.padding * 5,
                paddingBottom: 10 
                }}>

                <View style={{ flex: 1 }}>
                    <TextInput 
                        style={{
                            borderBottomWidth: 1,
                            borderBottomColor: COLORS.primary,
                            width: "90%",
                            color: COLORS.primary,
                            padding: 10,
                            paddingHorizontal: 10
                        }}
                        value={search}
                        placeholder="Search Gift Card"
                        placeholderTextColor={COLORS.primary}
                        onChangeText={(val)=> handleSearch(val)}
                    />
                </View>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={{
                            height: 40,
                            width: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: COLORS.lightGray
                        }}
                        onPress={() => navigation.navigate("Settings")}
                    >
                        <Image
                            source={icons.settings}
                            style={{
                                width: 20,
                                height: 20,
                                tintColor: COLORS.secondary
                            }}
                        />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }

     function renderBanner (){
        return (
            selectedCard ? <CardDetailModal 
                modalCodeVisible={modalCodeVisible} 
                setModalCodeVisible={setModalCodeVisible}
                card={selectedCard}
                setSelectedCard={setSelectedCard}
                submitForm={submitForm} 
                load={cardProcessing}
            /> :
            <View style={{height:90}}></View>
        )

     } 

    

    function renderFeatures() {

        const Header = () => (
            <View style={{ marginBottom: SIZES.padding * 2 }}>
                <Text style={{ ...FONTS.h3 }}>Features</Text>
            </View>
        )

        const renderItem = ({ item }) => {
            
            let imageLink = item.logoUrls[0]

            return(
            <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2, width: 170, alignItems: 'center' }}
                onPress={() => {
                    setSelectedCard(item)
                    setModalCodeVisible(true)
                }}
            >
                <View
                    style={{
                        width: 150,
                        height: 110,
                        marginBottom: 5,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius:10
                    }}
                >
                    <Image
                        source={{uri: imageLink}}
                        resizeMode="cover"
                        style={{
                            height: '100%',
                            width: '100%',
                            borderRadius:10
                        }}
                    />
                </View>
                <Text style={{ textAlign: 'center', flexWrap: 'wrap', ...FONTS.body4 }}>{item.productName}</Text>
            </TouchableOpacity>
        )}

        return (
            <View>
                {isLoading.status ? 
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        marginTop: SIZES.padding * 3,
                        ...styles.horizontal
                        }}>
                        <Text style={{color:COLORS.darkgray,fontWeight:'500',fontSize:20}}>{isLoading.message}</Text>
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    </View> 
                :
                search !== "" ?
                    
                <Search searchData={searching} setModalCodeVisible={setModalCodeVisible} setSelectedCard={setSelectedCard} />
                    
                
                :
                features && <FlatList
                    ListHeaderComponent={Header}
                    data={features}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3 }}
                    keyExtractor={item => `${item.productId}`}
                    initialNumToRender={7}
                    renderItem={renderItem}
                    style={{ marginTop: SIZES.padding * 2 }}
                    ListFooterComponent={
                        <View style={{ marginBottom: 220 }}>
                        </View>
                    }
                />}
            </View>
        )
    }

    function renderPromos() {

        const HeaderComponent = () => (
            <View>
                {renderHeader()}
                {renderBanner()}
                {renderFeatures()}
                {modalVisibleErr && <ModalCaseError modalVisibleErr={modalVisibleErr} setModalVisibleErr={setModalVisibleErr} resMessage={payErr} />}
                {modalVisible && <ModalCaseSuccess modalVisible={modalVisible} setModalVisible={setModalVisible} resMessage={payMsg} />}
            </View>
        )

        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{
                    marginVertical: SIZES.base,
                    width: SIZES.width / 2.5
                }}
                onPress={() => console.log(item.title)}
            >
                
            </TouchableOpacity>
        )

        return (
            HeaderComponent()
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            {renderPromos()}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    horizontal:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    }
})
export default memo(Scan);