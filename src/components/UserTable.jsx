import React, { useState, useEffect } from 'react'

import './UserTable.css'
import editIcon from './icons/edit.png'
import deleteIcon from './icons/delete.png'
const UserTable = () => {
    const [userData, setUserData] = useState([])
    const [SelectedRows, setSelectedRows] = useState([])

    useEffect(() => {
        fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
            .then((response) => response.json())
            .then((resp) => setUserData(resp))
    }, [])


    const deleteuser = (index) => {
        const newUserData = userData.filter((_, i) => i != index)
        setUserData(newUserData)
    }

    const deleteRows = () => {
        const newUserData = userData.filter((_, i) => !SelectedRows.includes(i))
        setUserData(newUserData)

    }

    const updateSelectedRows = (e, i) => {
        if (e.target.checked) {
            SelectedRows.push(i);
        }
        else {
            const index = SelectedRows.indexOf(i)
            delete SelectedRows[index]
        }
        setSelectedRows(SelectedRows)
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
                                    <input type='checkbox' onClick={(e) => { updateSelectedRows(e, i) }} />
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
            <button className='delBtn' onClick={(e) => { deleteRows() }} >Delete Selected</button>
        </>
    )
}

export default UserTable