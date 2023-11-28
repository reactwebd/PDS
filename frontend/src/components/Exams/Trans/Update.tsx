// import React from 'react'
import './TestTrans.css'

export default function Update(props: { onChange: (arg0: number) => void; id: number }) {
  return (
    <button className="updated-styled-button" onClick={()=>{
                  
        props.onChange(props.id)
      }} >Update</button>
  )
}
