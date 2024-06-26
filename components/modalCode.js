import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TextInput} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../constants';
import { useLogin } from "../constants/CheckLiogin";

const ModalCode = ({ ngn, modalCodeVisible, setModalCodeVisible, service, submitForm }) => {
  const [pinCode, setPinCode] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [payMsg, setPayMsg] = useState(null)
  const [payErr, setPayErr] = useState(null)
  const {isLoggedIn} = useLogin()
    let Naira = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
      })
      let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })
      const titleText = "Transfer"
      
    const url = 'https://api.allbillsarena.com.ng/pin_validation.php'
    const header = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    const body = JSON.stringify(
      {
        user_id: isLoggedIn,
        pin: pinCode
      }
    )

      const handleValidatePin = ()=> {
        setIsPending(true)
        if(pinCode === ""){
          setIsPending(false)
          setPayErr("You have an empty field!")
          }else{
            fetch(url, {
              method: "POST",
              header: header,
              body: body
            })
            .then(res => {
              return res.json();
            })
            .then(msg => {
              if(msg.data.status === "Error" ){
                throw Error(msg.data.message)
              }
                setPayErr(null)
                setPayMsg(msg.data.data)
                setIsPending(false)
                submitForm()
                setModalCodeVisible(!modalCodeVisible)
            })
            .catch(err => {
              if(err.message === "please create pin")
              {
                setIsPending(false)
                setTimeout(()=> {
                  navigation.navigate("Create Pin")
                  setPayErr("you have not created a pin, redirecting you in 2s")
                }, 2000)
              }else{
                setPayErr(err.message)
                setIsPending(false)
              }
            })
          }
      }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalCodeVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalCodeVisible(!modalCodeVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}> 

            <Text style={{ ...styles.modalText,fontWeight:"600",fontSize:25}}>Confirm Payment</Text>
            {/* <AntDesign name="checkcircle" size={40} color="green" /> */}

            <View style={{
                marginTop:0,width: '90%',
                alignItems: 'center'
            }}>
                {ngn ? <Text style={{fontSize:22,color: 'grey',fontWeight: '500'}}>{Naira.format(ngn)}</Text> : <Text style={{fontSize:22,color: 'grey',fontWeight: '500'}}>Authenticate</Text>}
                <Text style={{fontSize:15,color: '#febb39',fontWeight: '400'}}>{service ? service : titleText}</Text>
            </View>

            <View style={{
                width: '100%',
                flexDirection: 'column',
                alignItems: 'center'
            }} >
              <TextInput
                onChangeText={(val) => setPinCode(val)} 
                autoFocus 
                style={{
                  backgroundColor: COLORS.lightGray,
                  width:"70%",
                  marginTop:30,
                  padding:11,
                  borderRadius:5,
                  borderBottomColor:COLORS.gray,
                  borderBottomWidth:1,
                  textAlign:"center",
                  fontSize:22,
                  letterSpacing: 10,
                }}
                keyboardType='numeric'
              />
              {payMsg && <Text style={{color:COLORS.primary,fontSize:18,marginTop:6,fontWeight:'500',letterSpacing:1,backgroundColor:COLORS.lightGreen,padding:4,borderRadius:5}}>{payMsg}</Text>}
              {payErr && <Text style={{color:COLORS.red,fontSize:18,marginTop:6,fontWeight:'500',letterSpacing:1,backgroundColor:COLORS.lightRed,padding:4,borderRadius:5}}>{payErr}</Text>}
            </View>
            

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleValidatePin}>
              {ngn ? 
                <Text style={styles.textStyle}>
                  {isPending ? "validating..." : "PAY"}
                </Text> : 
                <Text style={styles.textStyle}>
                  {isPending ? "Validating..." : "Proceed"}
                </Text>
              }
            </Pressable>

            
            <Pressable
              style={{
                position: "absolute",
                top: 10,
                right:10
              }}
              onPress={() => {
                setModalCodeVisible(!modalCodeVisible)
              }}>
              <Text style={{color: COLORS.red,fontSize:19,padding:10}}>{"< Back"}</Text>
            </Pressable>


          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
    backgroundColor: "#00000049",
  },
  modalView: {
    margin: 20,
    width: '90%',
    marginTop: 40,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: COLORS.primary,
    marginTop: 50,
    position: "absolute",
    bottom: 40
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 17,
    paddingLeft: 40,
    paddingRight: 40
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 19,
    fontWeight: '500',
    color: 'grey'
  },
});

export default ModalCode;