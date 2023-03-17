import React from 'react'
import './activeUser.scss'
import { useSocket } from '../../../socketContext'
import ChatList from '../ChatList/ChatList'
import User from '../ChatList/User/User'
import { useGlobalContext } from '../../../context'

const ActiveUser = () => {
    const { onlineUsers } = useSocket()
    const { chatList } = useGlobalContext()
    const filterUser = chatList.filter(i => onlineUsers.some(u => u.userId === i._id))
    return (
        <div style={{marginTop:'1rem'}}>
            {
                filterUser.map((item, arr) => (
                    <div className="user" key={item._id}>
                        <div className="img">
                            <img src={item?.profilePicture} alt="img" />
                            <div className={"active"}></div>
                        </div>
                        <div className="name">
                            <h4>{item?.username}</h4>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ActiveUser