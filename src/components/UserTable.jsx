import React, { useState, useEffect } from 'react'

import './UserTable.css'
import editIcon from './icons/edit.png'
import deleteIcon from './icons/delete.png'
const UserTable = () => {
    const [userData, setUserData] = useState([])
    const [SelectedRows, setSelectedRows] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [originalUserData, setOriginalUserData] = useState([])

    useEffect(() => {
        fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
            .then((response) => response.json())
            .then((resp) => { setUserData(resp); setOriginalUserData(resp) })
    }, [])

    const pageChange = (pageNum) => {
        setPageNumber(pageNum)
    }

    const addButtons = (count) => {
        let buttons = []
        for (let i = 1; i <= count; i++) {
            buttons.push(<span className='pageButton' onClick={() => pageChange(i)}>{i}</span>)
        }
        return buttons
    }


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
    const editUser = (e, i) => {
        const newUserName = prompt("enter new name for " + userData[i].name);
        const newEmail = prompt("Enter nsew email for " + userData[i].email);
        const newRoll = prompt("Enter new role for" + userData[i].role);

        userData[i].name = newUserName || userData[i].name;
        userData[i].email = newEmail || userData[i].email;
        userData[i].role = newRoll || userData[i].role;
        setUserData(userData.slice(0));
    }

    const applySearch = (input) => {
        const newUserData = input ? originalUserData.filter((user) =>
            user.name.includes(input)
        ) : originalUserData
        setUserData(newUserData)
    }


    return (
        <>
            <div>
                <input type='text' className='searchbar' onChange={(e) => { applySearch(e.target.value) }} placeholder='Search by name, email or role'></input>
            </div>
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

                    {userData.slice((pageNumber - 1) * 10, (pageNumber - 1) * 10 + 10).map((user, i) => {

                        return (
                            <tr className='table-row' key={user.id} >
                                <td>
                                    <input type='checkbox' onClick={(e) => { updateSelectedRows(e, i) }} />
                                </td>

                                <td className="userdata" key={user.name}>{user.name}</td>
                                <td className="userdata" key={user.email}>{user.email}</td>
                                <td className="userdata" key={user.role}>{user.role}</td>
                                <td className='center-text'>
                                    <span><img className="actionIcons" src={editIcon} alt="edit" onClick={(e) => editUser(e, i)} /></span>
                                    <span><img className="actionIcons" index={i} src={deleteIcon} alt="delete" onClick={((e) => { deleteuser(i) })} /></span>
                                </td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            </table>
            <span className='bulk'>
                <button className='delBtn' onClick={(e) => { deleteRows() }} >Delete Selected</button>
                <span className='pageButtons'>
                    <span className='pageButton' onClick={() => { setPageNumber(1) }}>{"<<"}</span>
                    <span className='pageButton' onClick={() => { setPageNumber(pageNumber > 1 ? pageNumber - 1 : pageNumber) }}>{"<"}</span>
                    {addButtons(userData.length == 0 ? 1 : Math.ceil(userData.length / 10))}
                    <span className='pageButton' onClick={() => { setPageNumber(pageNumber < Math.ceil(userData.length / 10) ? pageNumber + 1 : pageNumber) }}>{">"}</span>
                    <span className='pageButton' onClick={() => { setPageNumber(Math.ceil(userData.length / 10)) }}>{">>"}</span>
                </span>
            </span>
        </>
    )
}

export default UserTable