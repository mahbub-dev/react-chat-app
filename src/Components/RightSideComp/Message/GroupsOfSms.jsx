import React from 'react'
import Message from './Message'
const GroupsOfSms = ({ index, messages, array, currentChat }) => {
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)
    const messageDate = array[index]
    let date = ''
    if (today.toDateString() === messageDate) {
        date = 'Today'
    } else if (yesterday.toDateString() === messageDate) {
        date = "Yesterday"
    } else {
        date = messageDate
    }
    return (
        <div key={index}>
            {<div className="convDate">{date}</div>}
            {
                messages.map((message, i, arr) =>
                    <Message message={message} key={i} array={arr} currentChat={currentChat} />
                )
            }
        </div>
    )
}

export default GroupsOfSms