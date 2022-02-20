import React,{useState, useContext} from 'react'
import { Calculations } from '../App'

function DeliveryInput(props) {
  const {index} = props
  const calculate = useContext(Calculations)
  const {deliveryArr, setDeliveryArr} = calculate

  const handleChange = (e)=>{
    let newArr = [...deliveryArr]
    newArr[index] = e.target.value
    setDeliveryArr(newArr)
  }

  return (
    <div>
      <label>Enter Delivery ID</label>
      <input onChange={handleChange}></input>
    </div>
  )
}

export default DeliveryInput