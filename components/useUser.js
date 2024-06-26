import React, {useState, useEffect} from 'react'



const useUser = (user_id) => {
    
    const [userData, setData] = useState(null)
    const [userLoading, setIsLoading] = useState(true)
    const [userError, SetError] = useState(null)

    const url = 'https://api.allbillsarena.com.ng/profile.php';
    const urlHeader = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
            const method = 'POST'
    const urlBody = JSON.stringify(
        {
        user_id: user_id
        }
    )

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

export default useUser
