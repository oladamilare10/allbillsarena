import React, {useState, useEffect} from 'react'



const usePriceList = (service_id) => {
    
    const [priceData, setData] = useState(null)
    const [priceLoad, setIsLoading] = useState(true)
    const [priceError, SetError] = useState(null)

    const url = 'https://api.ufitpay.com/v1/price_list';
    const urlHeader = {
        'Content-Type': 'application/json',
        'Api-Key': 'pub-0WB98vJPCcMsJPviZsNGRLQylMCG0kFL',
        'Api-Token': 'sec-soNdkopsFWVLUTEFefvV2KS7QLoO03SQ'
    }
            const method = 'POST'
    const urlBody = JSON.stringify(
        {
        service_id: service_id
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
            setData(data);
            setIsLoading(false)
            SetError(null)
        })
        .catch(err => {
            SetError(err.message)
            setIsLoading(null)
            setData(null)
        })
    }, [service_id])
    
  return {priceData, priceLoad, priceError}
}

export default usePriceList
