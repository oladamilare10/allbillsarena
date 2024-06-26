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
    ActivityIndicator,
    SafeAreaView
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
import NotificationCard from "../components/NotificationCard";


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

const Notification = ({ navigation }) => {

    const [selected, setSelected] = React.useState({
      id: 0,
      name: 'DsTV',
    })
      const [data, setData] = React.useState(null);
      
      const [dSelected, setDSelected] = React.useState(cablePlan[selected.id].data[0])
      const [defaultText, setDefaultText] = React.useState('Select Package')
      const [isPending, setIsPending] = React.useState(false)
      const [modalVisibleErr, setModalVisibleErr] = React.useState(false);
    
      
      const dateData = new Date();
      const {isLoggedIn} = useLogin()
      const tId = Math.random().toString(16).slice(2)

      
    const [areas, setAreas] = React.useState([])
    const [selectedArea, setSelectedArea] = React.useState(null)
    const [modalVisible, setModalVisible] = React.useState(false)
    const [modalCodeVisible, setModalCodeVisible] = React.useState(false);

    

  const url = 'https://api.allbillsarena.com.ng/transaction.php'
    const header = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify(
      {
        user_id: isLoggedIn,
      }
    )
    const handleWalletUpdate = ()=>{
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
          setData(msg.result.data)
          setIsPending(false)
        })
      }
      React.useEffect(()=> {
        handleWalletUpdate()
      }, [])
      const handleSelected = (value) => {
        setSelected(value)
        setDefaultText('Selects Package')
      }
    
            let USDollar = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
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

                <Text style={{ marginLeft: SIZES.padding * 1.5, color: COLORS.emerald, ...FONTS.h4 }}>Notification</Text>
            </TouchableOpacity>
        )
    }

    return(
      <SafeAreaView>
        {renderHeader()}
        {data && <FlatList
          data={data}
          renderItem={item => (
            <NotificationCard items={item} />
          )}
          keyExtractor={(item) => item.t_id}
          showsVerticalScrollIndicator={false}
          style={{
              paddingHorizontal: SIZES.padding * 3,
              marginTop: SIZES.padding * 2,
              marginBottom: SIZES.padding * 12
          }}
        />}
      </SafeAreaView>
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

export default Notification;