import react, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLogin } from "./checkLogin";


export default function TransactionCard () {
    const {isLoggedIn} = useLogin()
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(true);
    const [balError, setBalError] = useState(null)

    function convertToInternationalCurrencySystem (labelValue) {

        // Nine Zeroes for Billions
        return Math.abs(Number(labelValue)) >= 1.0e+9
    
        ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "B"
        // Six Zeroes for Millions 
        : Math.abs(Number(labelValue)) >= 1.0e+6
    
        ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
        // Three Zeroes for Thousands
        : Math.abs(Number(labelValue)) >= 1.0e+3
    
        ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(1) + "K"
    
        : Math.abs(Number(labelValue));
    
    }

    const url2 = 'https://api.allbillsarena.com.ng/wallet.php'

        const user_id = isLoggedIn;


        const urlHeader2 = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
        const urlBody = JSON.stringify(
            {
            user_id: user_id
            }
        )


        fetch(url2, {
            method: "POST",
            header: urlHeader2,
            body: urlBody
        })
        .then(res => {
            if (!res.ok) {
                throw Error('Could not fetch Data for this particular resource.')
            }
            return res.json();
        })
        .then(data => {
            if (data.status === 'error') {
                throw Error(data.message)
            }
            setBalance(data.result.data.w_balance);
            setLoading(false)
            setBalError(null)
        })
        .catch(err => {
            setBalError(err.message)
            setLoading(null)
        })


    let Naira = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
      })
      let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      })

    var inTransact = 0;
    var rate = 1100;
    var inTransactNg = inTransact / rate;
    var outTransact = 0;
    var outTransactNg = outTransact / rate;
    var balanceNg = balance / rate

    return(
        <View>
            {balance && <View style={styles.TContainer}>
                <View style={styles.balCard}>
                    <Text style={styles.usdBal}>₦{convertToInternationalCurrencySystem(balance)}</Text>
                    <Text style={styles.ngBal}>{USDollar.format(balanceNg)}</Text>
                    <Text style={styles.balTitle}>Balance</Text>
                </View>
                <View style={styles.balCard}>
                    <Text style={styles.usdBal}>₦{convertToInternationalCurrencySystem(inTransact)}</Text>
                    <Text style={styles.ngBal}>{USDollar.format(inTransactNg)}</Text>
                    <Text style={styles.crTitle}>Credit</Text>
                </View>
                <View style={styles.balCard}>
                    <Text style={styles.usdBal}>₦{convertToInternationalCurrencySystem(outTransact)}</Text>
                    <Text style={styles.ngBal}>{USDollar.format(outTransactNg)}</Text>
                    <Text style={styles.debTitle}>Debit</Text>
                </View>
            </View>}
        </View>
    )
}


const styles = StyleSheet.create({
    TContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-around',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 15,
    },
    balCard: {
        width: '30%',
        paddingVertical: 10,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        alignItems: 'center'
    },
    usdBal: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#343333',
    },
    ngBal: {
        color: 'grey',
        fontSize: 15,
        fontWeight: '500'
    },
    balTitle: {
        color: '#febb39',
        fontWeight: '500',
        fontSize: 15
    },
    debTitle: {
        color: 'red',
        fontWeight: '500',
        fontSize: 15
    },
    crTitle: {
        color: '#26AB50ED',
        fontWeight: '500',
        fontSize: 15
    },
})