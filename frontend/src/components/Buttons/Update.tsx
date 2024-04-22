// import React from 'react'

import { useNavigate } from 'react-router-dom'
import '../Styles/TestTrans.css'
export default function Update(props: { id: number }) {
  const navigate = useNavigate()
  return (
    <button className="updated-styled-button" onClick={()=>{
        navigate(`/exam_update/:${props.id}`)    
        // props.onChange(props.id)
      }} >Update</button>
  )
}