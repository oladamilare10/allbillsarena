import React, { useState, useEffect } from "react";

const useBalance =(user_id)=> {
    const [balance, setBalance] = useState(null);
const [loading, setLoading] = useState(true);
const [balError, setBalError] = useState(null)


    
const url2 = 'https://api.allbillsarena.com.ng/wallet.php'



const urlHeader2 = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}
const urlBody = JSON.stringify(
    {
      user_id: user_id
    }
  )

    useEffect(()=> {
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
          setBalance(data.result.data);
          setLoading(false)
          setBalError(null)
      })
      .catch(err => {
          setBalError(err.message)
          setLoading(null)
      })
    }, [user_id])
  
    return{balance, loading,balError}
}
export default useBalance
