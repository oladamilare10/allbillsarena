import React, { useEffect, useState } from 'react'


const useFetch = (url, method, urlHeader, urlBody) => {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, SetError] = useState(null)

  useEffect(() => {
    const abortCont = new AbortController();
  fetch(url, {
        method: method,
        headers: urlHeader,
        body: urlBody
    }, { signal: abortCont.signal })
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
      if (err.name === 'AbortError') {
        console.log("Result Aborted!")
      }else{
        SetError(err.message)
        setIsLoading(null)
        setData(null)
      }
    })
    return () => abortCont.abort(); 
}, [url, urlBody])
  return {data, isLoading, error}
}

export default useFetch
