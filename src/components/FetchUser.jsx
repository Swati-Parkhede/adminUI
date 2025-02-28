import React, { useEffect, useState } from 'react'
import UserTable from './UserTable'



const FetchUser = () => {
    const [data,setdata]=useState([])
    useEffect(()=>{
        fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
        .then((response)=>response.json())
        .then((resp)=>setdata(resp))        
    },[])
    return (
        <>
        <div>
            <UserTable users={data}/>
        </div>
        </>
    )
}

export default FetchUser