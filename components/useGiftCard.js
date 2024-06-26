import React, {useState, useEffect} from 'react'



const useGiftCard = (user_id) => {
    
    const [userData, setData] = useState(null)
    const [userLoading, setIsLoading] = useState(true)
    const [userError, SetError] = useState(null)

    const secret_API_key = "uXExlxFq7F-NBMLeU4IITAiiI6Vlvv-f5jskpbVoL77fi7GoEWVJ2MscWM15I70";
    const public_API_key = "UZ4uOTTq5E3jmUNN2OzvIEGS4SclIuqy";
    const api_Url = "https://giftcards-sandbox.reloadly.com/countries/US/products";
    const [api_Token, setApi_Token] = useState(null)
    const [respond, setRespond] = useState()

    
    useEffect(() => {
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
            setApi_Token(data.access_token); 
            console.log(api_Token) 
        }
        
        return() => run();
    })

    useEffect(() => {
      fetch(url, {
            method: method,
            headers: urlHeader,
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
            setData(data.data.data);
            setIsLoading(false)
            SetError(null)
        })
        .catch(err => {
            SetError(err.message)
            setIsLoading(null)
            setData(null)
        })
    }, [user_id])
    
  return {userData, userLoading, userError}
}

export default useGiftCard
