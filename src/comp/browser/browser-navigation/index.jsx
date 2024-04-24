import React, { useRef } from 'react'
import "./index.css"

function BrowserNavigation({ onLocationChange, location }) {
  const input = useRef()

  return (
    <div className='browser-navigation'>
      <form onSubmit={e => {
        e.preventDefault()
        const inp = input.current.value || ""

        const [protocol, origin, pathName] = inp.split("#")
        const [host, port] = origin.split(":")

        onLocationChange({
          protocol,
          pathName,
          host,
          port: parseInt(port) || 80
        })
      }}>
        <input
          ref={input}
          defaultValue={`${location.protocol}#${location.host}:${location.port}#${location.pathName}`}
          type="text"
          placeholder='Search...'
        />
        <button type='submit'>
          GO
        </button>
      </form>
    </div>
  )
}

export default BrowserNavigation