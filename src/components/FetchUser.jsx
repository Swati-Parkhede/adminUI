import React, { useEffect, useState } from 'react'



const FetchUser = () => {
    const [data,setdata]=useState("loading")
    useEffect(()=>{
        fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
        .then((response)=>response.json())
        .then((resp)=>setdata(resp))
        
    },[])
    return (
        <>
        <div>
            {data[0].name}
        </div>
        </>
    )
}

export default FetchUser