import React, {useContext} from 'react'
import { Calculations } from '../App'

function WeightVolumeInput(props) {
  const {item, index} = props
  const calculate = useContext(Calculations)
  const {itemsList, setItemsList} = calculate

  const handleChange = (e,option)=>{
    let newList = [...itemsList]
    newList[index][option] = Number(e.target.value)
    setItemsList(newList)
  }
  return (
    <div style={{display:'flex',flexDirection:'row', justifyContent:'center'}}>
      <div>
        <label>Quantity</label>
        <input label="quantity" placeholder={item.quantity} style={{width:'50px'}} onChange={(e)=>handleChange(e,"quantity")}></input>
      </div>
      <div>
        <label>Weight</label>
        <input label="weight" placeholder={item.weight} style={{width:'50px'}} onChange={(e)=>handleChange(e,"weight")}></input>
      </div>
      <div>
        <label>Length</label>
        <input label="Length" placeholder={item.length} style={{width:'50px'}} onChange={(e)=>handleChange(e,"length")}></input>
      </div>
      <div>
        <label>Width</label>
        <input label="width" placeholder={item.width} style={{width:'50px'}} onChange={(e)=>handleChange(e,"width")}></input>
      </div>
      <div>
        <label>Height</label>
        <input label="height" placeholder={item.height} style={{width:'50px'}} onChange={(e)=>handleChange(e,"height")}></input>
      </div>
    </div>
  )
}

export default WeightVolumeInput