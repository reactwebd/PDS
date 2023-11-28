import React from 'react'
import MainHeader from './MainHeader'

export default function Layout(props:any) {
  return (
    <>
    <MainHeader/>
    <div>{props.children}</div>
    </>
  )
}
