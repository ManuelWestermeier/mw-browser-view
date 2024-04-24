import BrowserNavigation from '../browser-navigation'
import BrowserView from '../browser-view'
import React, { useState } from 'react'
import "./index.css"

function BrowserWindow() {
    const [location, setLocation] = useState({
        protocol: "mw",
        pathName: "root",
        host: "localhost",
        port: 80
    })

    return (
        <div className="browser-window">
            <BrowserNavigation
                onLocationChange={(current) => setLocation(current)}
                location={location}
            />
            <BrowserView location={location} />
        </div>
    )
}

export default BrowserWindow