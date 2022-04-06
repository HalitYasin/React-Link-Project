import React from 'react'
import Link from './Link'

export default function LinkList({ linkNames, toggleLink }) {
  return (
    linkNames.map(linkNames => {
        return <Link key={linkNames.id} toggleLink={toggleLink} linkNames={linkNames} />
    })
  )
}
