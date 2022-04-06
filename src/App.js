import LinkList from "./LinkList";
import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import "./style/main.css";

const LOCAL_STORAGE_KEY = 'linkapp.app'

function App() {
  const [linkNames, setLinks] = useState([])
  const linkNameRef = useRef()
  const linkHrefRef = useRef()

  useEffect(() =>{
    const storedLinks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedLinks) setLinks(storedLinks)
  }, [])

  useEffect(() =>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(linkNames))
  }, [linkNames])

  function toggleLink(id) {
    const newLinks = [...linkNames]
    const link = newLinks.find(link => link.id === id)
    link.selected = !link.selected
    setLinks(newLinks)
  }

  function handleClearSelected() {
    const newLinks = linkNames.filter(Link => !Link.selected)
    setLinks(newLinks)
  }

  function handleAddLink(e) {
    const name = linkNameRef.current.value
    const linkHref = linkHrefRef.current.value
    if(name === "") return
    if(linkHref === "") return
    setLinks(prevLinks => {
      return [...prevLinks, { id: nanoid(), name: name, linkHref: linkHref, selected: false}]
    })
    linkNameRef.current.value = null
    linkHrefRef.current.value = null
  }

  return (
    <div className="container">
      <div className="link-list">
        <div className="link-list__text-fields">
          <div className="link-list__text-field">
            <label className="link-list__text-field__label" htmlFor="link-name">Link Name</label>
            <input className="link-list__text-field__input" id="link-name" ref={linkNameRef} type="text" />
          </div>
          <div className="link-list__text-field">
            <label className="link-list__text-field__label" htmlFor="link-href">Link Href</label>
            <input className="link-list__text-field__input" id="link-href" ref={linkHrefRef} type="text" />
          </div>
          <div className="link-list__submit-buttons">
            <div className="submit-button"><button onClick={handleAddLink}>Add Link</button></div>
            <div className="submit-button"><button onClick={handleClearSelected}>Clear Selected</button></div>
          </div>
          <div className="link-list__container">
            <LinkList linkNames={linkNames} toggleLink={toggleLink}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
