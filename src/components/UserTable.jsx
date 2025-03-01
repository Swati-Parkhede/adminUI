import React, { useState, useEffect } from 'react'

import './UserTable.css'
import editIcon from './icons/edit.png'
import deleteIcon from './icons/delete.png'
const UserTable = () => {
    const [userData, setUserData] = useState([])

    useEffect(() => {
        fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
            .then((response) => response.json())
            .then((resp) => setUserData(resp))
    }, [])


    const deleteuser = (index) => {
        const newUserData = userData.filter((_, i) => i != index)
        setUserData(newUserData)
    }

    return (
        <>
            <table className="usertable">
                <tbody>
                    <tr className="table-row">
                        <th>
                            <input type='checkbox' />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Roll</th>
                        <th className='center-text'>Action</th>
                    </tr>

                    {userData.map((user, i) => {

                        return (
                            <tr className='table-row' key={user.id} >
                                <td>
                                    <input type='checkbox' />
                                </td>

                                <td className="userdata" key={user.name}>{user.name}</td>
                                <td className="userdata" key={user.email}>{user.email}</td>
                                <td className="userdata" key={user.role}>{user.role}</td>
                                <td className='center-text'>
                                    <span><img className="actionIcons" src={editIcon} alt="edit" /></span>
                                    <span><img className="actionIcons" index={i} src={deleteIcon} alt="delete" onClick={((e) => { deleteuser(i) })} /></span>
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
        </>
    )
}

export default UserTable