import { getResource } from '../render-canvas/fetch-data-effect'
import React, { useEffect, useRef } from 'react'
import "./index.css"

function BrowserView({ location }) {

    const canvas = useRef()

    useEffect(() => {
        const c = canvas.current || document.createElement("canvas")
        getResource(location, c)
    }, [location, canvas])

    return (
        <div className='browser-view'>
            <canvas ref={canvas} tabIndex={-1} />
        </div>
    )

}

export default BrowserView