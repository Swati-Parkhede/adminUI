import React from 'react'

import './UserTable.css'
import editIcon from './icons/edit.png'
import deleteIcon from './icons/delete.png'
const UserTable = (props) => {



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
                        <th>Action</th>
                    </tr>

                    {props.users.map((user) => {

                        return (
                            <tr key={user.id} >
                                <td>
                                    <input type='checkbox' />
                                </td>

                                <td className="userdata" key={user.name}>{user.name}</td>
                                <td className="userdata" key={user.email}>{user.email}</td>
                                <td className="userdata" key={user.role}>{user.role}</td>
                                <td>
                                    <span><img className="actionIcons" src={editIcon} alt="edit" /></span>
                                    <span><img className="actionIcons" src={deleteIcon} alt="delete" /></span>
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