import React, { useEffect, useState } from 'react'
import User from './User/User'
import './peoples.scss'
import Search from '../Search/Search'
import { useGlobalContext } from '../../../context'
import { getUser } from '../../../Api Request/userRequest'
import Loading from '../../Loading/Loading'

const Peoples = () => {
    const { searchValue } = useGlobalContext()
    const [peoples, setPeoples] = useState([])
    const [error, setError] = useState()
    useEffect(() => {
        getUser(searchValue, (res) => {
            if (res.status === 200) {
                setPeoples(res.data)
            } else { setError(true); setPeoples([]) }
        })
    }, [searchValue])
    return (
        <div>
            <Search />
            {
                peoples.length > 0 ? peoples.map(i => <User key={i._id} item={i} />) : error ? 'data not found' : <Loading />
            }

        </div>
    )
}

export default Peoples