import React from 'react'

const UserTable = (props) => {



    return (
        <>
            {props.users.map((user) => {

                return (<div key={user.id}>
                    <span key={user.name}>{user.name}</span>
                    <span key={user.email}>{user.email}</span>
                    <span key={user.role}>{user.role}</span>
                </div>
                )
            }

            )} 
        </>
    )
}

export default UserTable