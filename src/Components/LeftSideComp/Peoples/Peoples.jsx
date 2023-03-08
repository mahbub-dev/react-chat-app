import React, { useEffect, useState } from 'react'
import User from './User/User'
import './peoples.scss'
import Search from '../Search/Search'
import { useGlobalContext } from '../../../context'
import { getUser } from '../../../Api Request/userRequest'

const Peoples = () => {
    const { searchValue } = useGlobalContext()
    const [peoples, setPeoples] = useState([])
    useEffect(() => {
        getUser(searchValue, (res) => {
            if (res.status === 200) {
                setPeoples(res.data)
            }else setPeoples([])
        })
    }, [searchValue])
    return (
        <div>
            <Search />
            {
                peoples.length ? peoples.map(i => <User key={i._id} item={i} />) : 'No User Found'
            }

        </div>
    )
}

export default Peoples