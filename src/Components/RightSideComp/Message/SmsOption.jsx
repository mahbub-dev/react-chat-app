import React, { useEffect, useRef, useState } from 'react'
import ApiRequest from '../../../Api Request/apiRequest'
import { useGlobalContext } from '../../../context'
import iconMore from './icons/more.png'
import iconReact from './icons/react.png'
import iconReply from './icons/reply.png'
import { focusInput } from '../../../Utils/functions'
import './smsOption.scss'
import { useSocket } from '../../../socketContext'

const SmsOption = ({ message }) => {
    const { conversation, setConversation, setReplyRefSms } = useGlobalContext()
    const { sendDataToSocketServer } = useSocket()
    const [showMoreBtn, setShowMoreBtn] = useState('none')
    const [showReactItem, setShowReactItem] = useState('none')
    const convId = localStorage.getItem('convId')
    const reactsRef = useRef()
    const moreBtnRef = useRef()
    const emojiData = [
        { img: 'https://cdn.iconscout.com/icon/free/png-512/like-2387659-1991059.png?f=avif&w=256', alt: "love" },
        { img: 'https://cdn.iconscout.com/icon/free/png-512/love-2387666-1991064.png?f=avif&w=256', alt: "love" },
        { img: 'https://cdn.iconscout.com/icon/free/png-512/care-2387662-1991058.png?f=avif&w=256', alt: "care" },
        { img: 'https://cdn.iconscout.com/icon/free/png-512/wow-2387663-1991062.png?f=avif&w=256', alt: "wow" },
        { img: 'https://cdn.iconscout.com/icon/free/png-512/haha-2387660-1991060.png?f=avif&w=256', alt: "haha" },
        { img: 'https://cdn.iconscout.com/icon/free/png-512/angry-2387661-1991061.png?f=avif&w=256', alt: "angry" },
    ]
    const handleShowMoreBtn = () => {
        showMoreBtn === 'none' ? setShowMoreBtn('flex') : setShowMoreBtn('none')
    }
    const handleShowReactItem = () => {
        showReactItem === 'none' ? setShowReactItem('flex') : setShowReactItem('none')
    }

    const handleRemove = async () => {
        try {
            await ApiRequest.delete(`/conversation/message/${message._id}?convId=${convId}`)
            const { message: messages } = conversation
            const removeFromUi = messages.filter(i => i._id !== message._id)
            setConversation(p => ({ ...p, message: removeFromUi }))
            // send upadet message array to the socket 
            sendDataToSocketServer(removeFromUi)
        } catch (error) {
            console.log(error)
        }
    }

    // handle React
    const handleReact = async (img) => {
        try {
            await ApiRequest.post(`conversation/message/sendreact`, { _id: message?._id, convId: conversation?._id, img })
            const messageArray = conversation.message;
            let addReactInUi = messageArray?.find(i => i._id === message._id);
            addReactInUi.react = img
            sendDataToSocketServer(messageArray);
            setConversation(p => ({ ...p, messageArray }))
        } catch (error) {
            console.log(error)
        }
    }

    // handle reply 
    const handleReply = () => {
        setReplyRefSms(message)
        focusInput()
    }

    // handle outside click 
    useEffect(() => {
        // Add a click event listener to the document object
        document.addEventListener("click", handleClickOutside);
        // Remove the event listener when the component is unmounted
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };

    }, []);

    function handleClickOutside(event) {
        // Check if the target element of the click event is outside of the component
        if (reactsRef.current && !reactsRef.current.contains(event.target)) {
            setShowReactItem('none')
        }
        if (moreBtnRef.current && !moreBtnRef.current.contains(event.target)) {
            setShowMoreBtn('none')
        }
    }
    return (
        <div className="option-container">
            <div className="more-btns" style={{ display: showMoreBtn }}>
                <button onClick={handleRemove} className='remove'>Remove</button>
                <button>Forward</button>
            </div>
            <div className='reacts' style={{ display: showReactItem }}>
                {emojiData.map((i, ind) => <button key={ind} onClick={() => handleReact(i.img)}><img src={i.img} alt={i.alt} /></button>)}
            </div>
            <div className='message-option' style={{ display: showMoreBtn === 'flex' || showReactItem === 'flex' ? 'flex' : '' }}>
                <button><img src={iconReact} onClick={handleShowReactItem} ref={reactsRef} alt="React" /></button>
                <button><img src={iconReply} onClick={handleReply} alt="reply" /></button>
                <button><img src={iconMore} onClick={handleShowMoreBtn} ref={moreBtnRef} alt="more" className='more' />
                </button>
            </div>
        </div>
    )
}

export default SmsOption