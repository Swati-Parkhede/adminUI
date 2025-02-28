import React from 'react'

import './UserTable.css'
import editIcon from './icons/edit.png'
import deleteIcon from './icons/delete.png'
const UserTable = (props) => {



    return (
        <>

            <table class="usertable">
                <tr class="table-row">
                    <th>
                        <input type='checkbox' />
                    </th>
                    <th class="table-column">Name</th>
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

                            <td class="userdata" key={user.name}>{user.name}</td>
                            <td class="userdata" key={user.email}>{user.email}</td>
                            <td class="userdata" key={user.role}>{user.role}</td>
                            <td>
                                <span><img class="actionIcons" src={editIcon} alt="edit" /></span>
                                <span><img class="actionIcons" src={deleteIcon} alt="delete" /></span>
                            </td>
                        </tr>
                    )
                }
                )}
            </table>
        </>
    )
}

export default UserTable