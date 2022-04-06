import React from 'react'

export default function Link({ linkNames, toggleLink}) {
  function handleClick() {
    toggleLink(linkNames.id)
  }
  return (
    <div>
            <input type="checkbox" checked={linkNames.selected} onChange={handleClick}></input>
            <label><a href={linkNames.linkHref} target="_blank" rel="noreferrer">{linkNames.name}</a></label>
    </div>
  )
}