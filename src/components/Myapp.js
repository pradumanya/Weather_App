
import React, { useState } from React
import clouds from "/Images/Clouds.png"
import rain from "/Images/Rain.png"
import clear from "Images/Clear.png"
import mist from "Images/mist.png"
import error from "Images/error.png"





const Myapp = () => {
    const [search, setSearch] = useState("");
    const [data, setData] = useState()
    const [error, setError] = useState()

    const API_KEY = "222a4b6815c529fe846814883491d255"
    const API = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"

    const handleInput =(event)=>{
        setSearch(event.target.value)
        console.log(event.target.value);
    }


    const myFun = async () =>{
        const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`);

        const jsonData = await get.json()
        console.log(jsonData);
        setData(jsonData);

        if(search === ""){
             // alert("Enter name")
             setError("please Enter Name")

        }
        else if(jsonData.cod == '404'){
            setError("Please Enter Valid Name !")
        }else{
            setError("")
        }
        setSearch("")
    
     }

     return(
        <>
        
        <div className='container'>
            <div className='inputs'>
                <input placeholder='Enter city,Country' value={search} onChange={handleInput} />
                <button onClick={myFun}><i class="bi bi-search"></i></button>
            </div>
        
        <div>
            {
                 error ?
                 <div className='errorPage'>
                     <p>{error}</p>
                     <img src={error}/>
                 </div> : ""

            }
          
           
        
              
            
            {          
                data && data.weather ?
                <div className='weathers'>
                    <h2 className='cityName'>{data.name}</h2>
                    <img src={data.weather[0].main == "Clouds" ? clouds : "" }/>
                    <img src={data.weather[0].main == "Rain" ? rain : "" }/>
                    <img src={data.weather[0].main == "Clear" ? clear : "" }/>
                    <img src={data.weather[0].main == "Mist" ? mist : "" }/>
                    <img src={data.weather[0].main == "Haze" ? clouds : "" }/>

                    <h2 className='temprature'>{Math.trunc(data.main.temp)}°C</h2>
                    <p  className='climate'>{data.weather[0].description}</p>

                </div> : ""
            
                
            }
            </div>
            </div>
            </>
        
        )    
           
}

export default Myapp
   