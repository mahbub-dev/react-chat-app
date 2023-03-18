import React, { useEffect, useRef } from 'react'
const OnOffBtn = ({ setting, setStatus, status }) => {
    const dotRef = useRef()
    const slideRef = useRef()
    const handleSwitch = () => {
        if (status === 'on') {
            dotRef.current.classList.remove('transform')
            slideRef.current.classList.remove('background')
            localStorage.setItem(setting, 'off')
            setStatus('off')

        } else {
            localStorage.setItem(setting, 'on')
            dotRef.current.classList.add('transform')
            slideRef.current.classList.add('background')
            setStatus('on')
        }
    }
    useEffect(() => {
        if (status === 'on') {
            dotRef.current.classList.add('transform')
            slideRef.current.classList.add('background')
        } else {
            dotRef.current.classList.remove('transform')
            slideRef.current.classList.remove('background')
        }
    }, [setting])

    return (
        <label className="switch" >
            <span onClick={handleSwitch} ref={slideRef} className="slider round"><span ref={dotRef}></span></span>
        </label>
    )
}

export default OnOffBtn