import React, {useState, useEffect} from 'react';
import './App.css';
import WeightVolumeInput from './components/WeightVolumeInput';
import axios from 'axios';
import DeliveryInput from './components/DeliveryInput';

export const Calculations = React.createContext()

function App() {
  const intitalItemList = {
    quantity:0,
    weight:0,
    length:0,
    width:0,
    height:0
  }
  const [itemsList, setItemsList] = useState([])
  const [vehicle,setVehicle] = useState("")
  const [ready,setReady] = useState(false)
  const [deliveryArr, setDeliveryArr] = useState([""])
  const [deliveryID, setDeliveryID] = useState()
  const [bearer, setBearer] = useState()
  const [totalWeight, setTotalWeight] = useState(0)
  const [totalVolume, setTotalVolume] = useState(0)

  const addItem = ()=>{
    setItemsList([...itemsList,intitalItemList])
  }

  const addDelivery = ()=>{
    setDeliveryArr([...deliveryArr,""])
  }

  const giveVehicle = ()=>{
    let newWeight = 0
    let newVolume = 0
    console.log("itemList in giveVehicle", itemsList)
    itemsList.map((item,index)=>{
      newWeight += (item.weightLbs*item.quantity)
      let volume = ((item.lengthIn/12)*(item.heightIn/12)*(item.widthIn/12))
      newVolume += (volume*item.quantity)
    })
    setTotalWeight(newWeight)
    setTotalVolume(newVolume)
    console.log(newWeight, newVolume)
    if(newWeight <= 5 && newVolume<= 1){
      setVehicle("Bike")
    }else if(newWeight <= 150 && newVolume<= 31){
      setVehicle("Sedan")
    }else if(newWeight <= 500 && newVolume<= 69){
      setVehicle("SUV/Mini Van")
    }else if(newWeight <= 900 && newVolume<= 181){
      setVehicle("Pickup Truck")
    }else if(newWeight <= 3000 && newVolume<= 120){
      setVehicle("Cargo or Sprinter Van")
    }else if(newWeight <= 7000 && newVolume<= 576){
      setVehicle("Box Truck/Flatbed")
    }else if(newWeight <= 35000 && newVolume<= 1920){
      setVehicle("Trailer/Flatbed")
    }
  }

  useEffect(()=>{
    console.log("itemsList", itemsList)
    if(ready){
      giveVehicle()
    } 
  },[itemsList,ready])


  const grabDelivery = (array, items)=>{
    if(array.length === 0){
      setReady(true)
    }else{
      var config = {
        method: 'get',
        url: `https://onerail-operations-prod.azurewebsites.net/v1/delivery/${array[0]}`,
        headers: { 
          'Authorization': `Bearer ${bearer}`
        }
      };
      axios(config)
      .then(function (response) {
        console.log("items",items)
        console.log("response", response.data.order.orderItems)
        let newItems = [...items, ...response.data.order.orderItems]
        setItemsList([...itemsList,...newItems])
        let newArray = array.slice(1,array.length)
        grabDelivery(newArray, newItems)          
      })
      .catch(function (error) {
        console.log(error);
      });
    }
         
    }

  return (
    <Calculations.Provider value={{itemsList:itemsList, setItemsList:setItemsList, setDeliveryArr:setDeliveryArr, deliveryArr:deliveryArr}}>
      <div className="App">
        {/* {ready && <>
            <button onClick={addItem}>Add Item</button>
            {itemsList.map((item, index)=><div><WeightVolumeInput item={item} index={index}/></div>)}
            <button onClick={giveVehicle}>Give me vehicle</button>
            <div>Vehicle to use: {vehicle}</div>
          </>
        } */}
        <button onClick={addDelivery}>Add Delivery</button>
        {deliveryArr.map((delivery, index)=><DeliveryInput index={index}/>)}
        <div>
          <label>Enter Bearer Token</label>
          <input onChange={(e)=>setBearer(e.target.value)}></input>
        </div>
        <button onClick={()=>grabDelivery([...deliveryArr],[...itemsList])}>Get Delivery</button>
        <div>Vehicle needed:<strong style={{fontSize:'20px'}}>{vehicle}</strong></div>
        <div>Total Weight:{totalWeight}</div>
        <div>Total Volume:{totalVolume}</div>
        
      </div>
    </Calculations.Provider>
  );
}

export default App;
