import React, { memo, useEffect, useState } from 'react'
import './index.css'

const loading = memo(() => {
    // loading loading_out
    const [loadingStatus, setLoadingStatus] = useState('loading')

    useEffect(() => {
        console.log('loading mount')
        setLoadingStatus('loading')
        setTimeout(() => {
            console.log('2s- loading mount')
            setLoadingStatus('loading_out')
        }, 2000);


        return () => {
            console.log('loading unmount')
            setLoadingStatus('loading_out')
        }


    }, [])

    return (
        <div id='loading' className={loadingStatus}>
            <svg viewBox='0 0 50 50'>
                <circle r='25' cx='25' cy='25'></circle>
            </svg>
            <p>LOADING</p>
        </div>
    )
})

export default loading