import axios from 'axios'
import React, { useState } from 'react'
import ApiRequest from '../../../Api Request/apiRequest'
import { useGlobalContext } from '../../../context'
import iconMore from './icons/more.png'
import iconReact from './icons/react.png'
import iconReply from './icons/reply.png'

const SmsOption = ({ message }) => {
    const { conversation, setConversation } = useGlobalContext()
    const [showMoreBtn, setShowMoreBtn] = useState('none')
    const handleMore = () => {
        showMoreBtn === 'none' ? setShowMoreBtn('flex') : setShowMoreBtn('none')
    }
    const handleRemove = async () => {
        try {
            const convId = localStorage.getItem('convId')
            const res = await ApiRequest.delete(`/conversation/message/${message._id}?convId=${convId}`)
            const { message: messages } = conversation
            const removeFromUi = messages.filter(i => i._id !== message._id)
            setConversation(p => ({ ...p, message: removeFromUi }))
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='message-option'>
            <button><img src={iconReact} alt="React" /></button>
            <button><img src={iconReply} alt="reply" /></button>
            <button><img src={iconMore} onClick={handleMore} alt="more" className='more' />
            </button>
            <div className="more-btns" style={{ display: showMoreBtn }}>
                <button onClick={handleRemove} className='remove'>Remove</button>
                <button>Forward</button>
            </div>
        </div>
    )
}

export default SmsOption