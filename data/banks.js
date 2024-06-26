const Bank_function = () => {
    const banks ={
        "resource": "banks",
        "status": "success",
        "data": [
            {
                "bank_code": "001",
                "bank_name": "All Bills Arena"
            },
            {
                "bank_code": "801",
                "bank_name": "Abbey Mortgage Bank"
            },
            {
                "bank_code": "044",
                "bank_name": "Access Bank"
            },
            {
                "bank_code": "063",
                "bank_name": "Access Bank (Diamond)"
            },
            {
                "bank_code": "035A",
                "bank_name": "ALAT by WEMA"
            },
            {
                "bank_code": "401",
                "bank_name": "ASO Savings and Loans"
            },
            {
                "bank_code": "50931",
                "bank_name": "Bowen Microfinance Bank"
            },
            {
                "bank_code": "50823",
                "bank_name": "CEMCS Microfinance Bank"
            },
            {
                "bank_code": "023",
                "bank_name": "Citibank Nigeria"
            },
            {
                "bank_code": "559",
                "bank_name": "Coronation Merchant Bank"
            },
            {
                "bank_code": "050",
                "bank_name": "Ecobank Nigeria"
            },
            {
                "bank_code": "562",
                "bank_name": "Ekondo Microfinance Bank"
            },
            {
                "bank_code": "090328",
                "bank_name": "EYOWO MICROFINANCE BANK"
            },
            {
                "bank_code": "070",
                "bank_name": "Fidelity Bank"
            },
            {
                "bank_code": "011",
                "bank_name": "First Bank of Nigeria"
            },
            {
                "bank_code": "214",
                "bank_name": "First City Monument Bank (FCMB)"
            },
            {
                "bank_code": "501",
                "bank_name": "FSDH Merchant Bank Limited"
            },
            {
                "bank_code": "058",
                "bank_name": "Guaranty Trust Bank (GTB)"
            },
            {
                "bank_code": "526",
                "bank_name": "PARALLEX BANK"
            },
            {
                "bank_code": "50383",
                "bank_name": "Hasal Microfinance Bank"
            },
            {
                "bank_code": "030",
                "bank_name": "Heritage Bank"
            },
            {
                "bank_code": "309",
                "bank_name": "FBN MOBILE"
            },
            {
                "bank_code": "50457",
                "bank_name": "Infinity MFB"
            },
            {
                "bank_code": "301",
                "bank_name": "Jaiz Bank"
            },
            {
                "bank_code": "082",
                "bank_name": "Keystone Bank"
            },
            {
                "bank_code": "90052",
                "bank_name": "Lagos Building Investment Company Plc."
            },
            {
                "bank_code": "565",
                "bank_name": "One Finance"
            },
            {
                "bank_code": "599",
                "bank_name": "RENMONEY MICROFINANCE BANK"
            },
            {
                "bank_code": "311",
                "bank_name": "Parkway - ReadyCash"
            },
            {
                "bank_code": "305",
                "bank_name": "Paycom (Opay)"
            },
            {
                "bank_code": "50746",
                "bank_name": "Petra Mircofinance Bank Plc"
            },
            {
                "bank_code": "076",
                "bank_name": "Polaris Bank"
            },
            {
                "bank_code": "101",
                "bank_name": "Providus Bank"
            },
            {
                "bank_code": "125",
                "bank_name": "Rubies MFB"
            },
            {
                "bank_code": "644",
                "bank_name": "Sparkle Microfinance Bank"
            },
            {
                "bank_code": "221",
                "bank_name": "Stanbic IBTC Bank"
            },
            {
                "bank_code": "068",
                "bank_name": "Standard Chartered Bank"
            },
            {
                "bank_code": "232",
                "bank_name": "Sterling Bank"
            },
            {
                "bank_code": "100",
                "bank_name": "Suntrust Bank"
            },
            {
                "bank_code": "000026",
                "bank_name": "TAJ Bank"
            },
            {
                "bank_code": "090115",
                "bank_name": "TCF MFB"
            },
            {
                "bank_code": "102",
                "bank_name": "Titan Trust Bank"
            },
            {
                "bank_code": "032",
                "bank_name": "Union Bank of Nigeria"
            },
            {
                "bank_code": "033",
                "bank_name": "United Bank For Africa (UBA)"
            },
            {
                "bank_code": "215",
                "bank_name": "Unity Bank"
            },
            {
                "bank_code": "035",
                "bank_name": "WEMA Bank"
            },
            {
                "bank_code": "057",
                "bank_name": "Zenith Bank"
            },
            {
                "bank_code": "322",
                "bank_name": "Zenith Easy Wallet (Zenith Mobile)"
            },
            {
                "bank_code": "090539",
                "bank_name": "Enrich Microfinance Bank"
            },
            {
                "bank_code": "120002",
                "bank_name": "HOPE PSB"
            },
            {
                "bank_code": "100547",
                "bank_name": "Al-Barakah MFB"
            },
            {
                "bank_code": "100020",
                "bank_name": "Apeks MFB"
            },
            {
                "bank_code": "100554",
                "bank_name": "BcKash MFB"
            },
            {
                "bank_code": "100579",
                "bank_name": "Boctrust MFB"
            },
            {
                "bank_code": "100125",
                "bank_name": "CIT MFB"
            },
            {
                "bank_code": "100518",
                "bank_name": "Chikum MFB"
            },
            {
                "bank_code": "100064",
                "bank_name": "Consumer MFB"
            },
            {
                "bank_code": "100505",
                "bank_name": "Ekondo MFB"
            },
            {
                "bank_code": "100487",
                "bank_name": "Empire Trust MFB"
            },
            {
                "bank_code": "084",
                "bank_name": "Enterpise Bank (Spring)"
            },
            {
                "bank_code": "100082",
                "bank_name": "FidFund MFB"
            },
            {
                "bank_code": "100022",
                "bank_name": "FinaTrust MFB"
            },
            {
                "bank_code": "100589",
                "bank_name": "Gateway Mortgage"
            },
            {
                "bank_code": "103",
                "bank_name": "Globus Bank"
            },
            {
                "bank_code": "100608",
                "bank_name": "Gowans MFB"
            },
            {
                "bank_code": "551",
                "bank_name": "COVENANT MICROFINANCE BANK"
            },
            {
                "bank_code": "090267",
                "bank_name": "Kuda Bank"
            },
            {
                "bank_code": "999996",
                "bank_name": "MINT-Finex MFB"
            },
            {
                "bank_code": "014",
                "bank_name": "Mainstreet (Afri Bank)"
            },
            {
                "bank_code": "100562",
                "bank_name": "Microvis MFB"
            },
            {
                "bank_code": "100647",
                "bank_name": "Money Trust MFB"
            },
            {
                "bank_code": "327",
                "bank_name": "Paga"
            },
            {
                "bank_code": "100033",
                "bank_name": "PalmPay"
            },
            {
                "bank_code": "100590",
                "bank_name": "Pecan Trust MFB"
            },
            {
                "bank_code": "100550",
                "bank_name": "Personal Trust MFB"
            },
            {
                "bank_code": "100056",
                "bank_name": "Refuge Mortgage"
            },
            {
                "bank_code": "100548",
                "bank_name": "Regent MFB"
            },
            {
                "bank_code": "100637",
                "bank_name": "Richway MFB"
            },
            {
                "bank_code": "100546",
                "bank_name": "Royal Exchange MFB"
            },
            {
                "bank_code": "090286",
                "bank_name": "Safe Haven MFB"
            },
            {
                "bank_code": "100005",
                "bank_name": "Sagamu MFB"
            },
            {
                "bank_code": "580",
                "bank_name": "Seed Capital MFB"
            },
            {
                "bank_code": "100685",
                "bank_name": "Tangerine Money"
            },
            {
                "bank_code": "100489",
                "bank_name": "VFD Microfinance Bank Limited"
            },
            {
                "bank_code": "100134",
                "bank_name": "Verite MFB"
            },
            {
                "bank_code": "100011",
                "bank_name": "Visa MFB"
            },
            {
                "bank_code": "100591",
                "bank_name": "Xslnce MFB"
            },
            {
                "bank_code": "315",
                "bank_name": "GTBank Mobile Money"
            },
            {
                "bank_code": "090267",
                "bank_name": "Kuda Microfinance Bank"
            },
            {
                "bank_code": "327",
                "bank_name": "MKUDI"
            },
            {
                "bank_code": "605",
                "bank_name": "NIRSAL MICROFINANCE BANK"
            },
            {
                "bank_code": "090405",
                "bank_name": "MONIEPOINT MICROFINANCE"
            }
        ]
    }

    return {banks}
}
export default Bank_function