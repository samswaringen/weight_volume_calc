import React, {useState, useEffect} from 'react';
import './App.css';
import WeightVolumeInput from './components/WeightVolumeInput';
import axios from 'axios';

export const Calculations = React.createContext()

function App() {
  const intitalItemList = {
    quantity:0,
    weight:0,
    length:0,
    width:0,
    height:0
  }
  const [itemsList, setItemsList] = useState()
  const [vehicle,setVehicle] = useState("")
  const [ready,setReady] = useState(false)
  const [deliveryID, setDeliveryID] = useState()
  const [bearer, setBearer] = useState()
  const addItem = ()=>{
    setItemsList([...itemsList,intitalItemList])
  }

  const giveVehicle = ()=>{
    let totalWeight = 0
    let totalVolume = 0
    itemsList.map((item,index)=>{
      totalWeight += (item.weightLbs*item.quantity)
      let volume = ((item.lengthIn/12)*(item.heightIn/12)*(item.widthIn/12))
      totalVolume += (volume*item.quantity)
    })
    console.log(totalVolume, totalWeight)
    if(totalWeight <= 5 && totalVolume<= 1){
      setVehicle("Bike")
    }else if(totalWeight <= 150 && totalVolume<= 31){
      setVehicle("Sedan")
    }else if(totalWeight <= 500 && totalVolume<= 69){
      setVehicle("SUV/Mini Van")
    }else if(totalWeight <= 900 && totalVolume<= 181){
      setVehicle("Pickup Truck")
    }else if(totalWeight <= 3000 && totalVolume<= 120){
      setVehicle("Cargo or Sprinter Van")
    }else if(totalWeight <= 7000 && totalVolume<= 576){
      setVehicle("Box Truck/Flatbed")
    }else if(totalWeight <= 35000 && totalVolume<= 1920){
      setVehicle("Trailer/Flatbed")
    }
  }

  useEffect(()=>{
    if(itemsList){
      giveVehicle()
    } 
  },[itemsList])

  const grabDelivery = ()=>{
    var config = {
      method: 'get',
      url: `https://onerail-operations-prod.azurewebsites.net/v1/delivery/${deliveryID}`,
      headers: { 
        'Authorization': `Bearer ${bearer}`
      }
    };
    
    axios(config)
    .then(function (response) {
      console.log(response.data.order.orderItems);
      setItemsList(response.data.order.orderItems)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <Calculations.Provider value={{itemsList:itemsList, setItemsList:setItemsList}}>
      <div className="App">
        {ready && <>
            <button onClick={addItem}>Add Item</button>
            {itemsList.map((item, index)=><div><WeightVolumeInput item={item} index={index}/></div>)}
            <button onClick={giveVehicle}>Give me vehicle</button>
            <div>Vehicle to use: {vehicle}</div>
          </>
        }
        {!ready && <>
        <div>
          <label>Enter Delivery ID</label>
          <input onChange={(e)=>setDeliveryID(e.target.value)}></input>
        </div>
        <div>
          <label>Enter Bearer Token</label>
          <input onChange={(e)=>setBearer(e.target.value)}></input>
        </div>
        <button onClick={grabDelivery}>Get Delivery</button>
        <div>Vehicle needed:{vehicle}</div>
        </>
        }
        
      </div>
    </Calculations.Provider>
  );
}

export default App;
