import './Xicon.css'
import React from 'react'
import axios from 'axios'
import Cookie from "cookie-universal"

const Xicon = (props) => {
  var attend=props.attend;
  var is_doctor=props.is_doctor;
  var appointment_id=props.appointment_id;
  const cookie=Cookie();
  const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
  //console.log(is_doctor,appointment_id);
  //when pressing the Xicon send a request to api
  const handleXicon=(event)=>{
    var Xicon = event.target;
    let classname=Xicon.className.baseVal;
    if(classname==="emptyXicon" ){
    Xicon.className.baseVal="ClickXicon";


    axios.post("http://127.0.0.1:8000/appointment/not_attend_appointment",{
      appointment_id,
      is_doctor,
    },{headers}).then(res=>console.log('posting data',res)).catch(err=>console.log(err))
  }else { 
    Xicon.className.baseVal="emptyXicon";

    axios.post("http://127.0.0.1:8000/appointment/attend_appointment",{
      appointment_id,
      is_doctor,
    },{headers}).then(res=>console.log('get back of clicking',res)).catch(err=>console.log(err))}
  } 

  

  return (
    (() => {
      if (attend===true)
         return <svg  className='Xicon' width="26" height="25" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path onClick={handleXicon} className='emptyXicon' d="M24.0901 16.7929L23.383 17.5L24.0901 18.2071L34.0399 28.157C34.04 28.1571 34.0401 28.1572 34.0402 28.1572C34.871 28.989 34.8705 30.3355 34.0402 31.1658L31.8288 33.3771C30.9984 34.2076 29.6508 34.2076 28.8203 33.3771L18.8702 23.427L18.1631 22.7199L17.456 23.427L7.50584 33.3771C6.67534 34.2076 5.32782 34.2076 4.49732 33.3771L2.28625 31.166C2.2862 31.166 2.28616 31.166 2.28611 31.1659C2.28606 31.1659 2.28601 31.1658 2.28596 31.1658C1.45521 30.334 1.45572 28.9875 2.28596 28.1572L12.2361 18.2071L12.9432 17.5L12.2361 16.7929L2.28625 6.84304C1.45521 6.01132 1.45562 4.66458 2.28596 3.83424L4.49704 1.62316C4.49713 1.62307 4.49723 1.62297 4.49732 1.62287C5.32906 0.792121 6.67559 0.79263 7.50584 1.62287L17.456 11.573L18.1631 12.2801L18.8702 11.573L28.82 1.62316C28.8201 1.62308 28.8202 1.623 28.8203 1.62292C29.652 0.792121 30.9986 0.792616 31.8288 1.62287L34.0399 3.83395C34.04 3.83405 34.0401 3.83414 34.0402 3.83424C34.871 4.66598 34.8705 6.01251 34.0402 6.84275L24.0901 16.7929Z" fill="white" stroke="black" strokeWidth="2"/>
         </svg>
     
      else 
         return <svg  className='Xicon' width="26" height="25" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path onClick={handleXicon} className='ClickXicon' d="M24.0901 16.7929L23.383 17.5L24.0901 18.2071L34.0399 28.157C34.04 28.1571 34.0401 28.1572 34.0402 28.1572C34.871 28.989 34.8705 30.3355 34.0402 31.1658L31.8288 33.3771C30.9984 34.2076 29.6508 34.2076 28.8203 33.3771L18.8702 23.427L18.1631 22.7199L17.456 23.427L7.50584 33.3771C6.67534 34.2076 5.32782 34.2076 4.49732 33.3771L2.28625 31.166C2.2862 31.166 2.28616 31.166 2.28611 31.1659C2.28606 31.1659 2.28601 31.1658 2.28596 31.1658C1.45521 30.334 1.45572 28.9875 2.28596 28.1572L12.2361 18.2071L12.9432 17.5L12.2361 16.7929L2.28625 6.84304C1.45521 6.01132 1.45562 4.66458 2.28596 3.83424L4.49704 1.62316C4.49713 1.62307 4.49723 1.62297 4.49732 1.62287C5.32906 0.792121 6.67559 0.79263 7.50584 1.62287L17.456 11.573L18.1631 12.2801L18.8702 11.573L28.82 1.62316C28.8201 1.62308 28.8202 1.623 28.8203 1.62292C29.652 0.792121 30.9986 0.792616 31.8288 1.62287L34.0399 3.83395C34.04 3.83405 34.0401 3.83414 34.0402 3.83424C34.871 4.66598 34.8705 6.01251 34.0402 6.84275L24.0901 16.7929Z" fill="white" stroke="black" strokeWidth="2"/>
         </svg>
  })()
        

  )
}

export default Xicon
