import './DoctorReservedAppoinments.css'
import {LeftSideBar,ScrollableContent} from '../../../Sections/index'
import {LeftSideBarHeading,TableHeading,SideBarDiv,SideBarDivHeading, SideBarDivText,
  TimeButtonsContainer,ConfirmButton} from '../../../components/index'
import { useLocation } from "react-router-dom";
import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate} from "react-router-dom";
import axios from 'axios';
import React from 'react';
import { useReducer } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookie from "cookie-universal"


const DoctorReservedAppoinments = () => {
 const BASE_URL="http://wadimedicalcenter.pythonanywhere.com/";
 const location=useLocation();  //to extract values which send from see schcedule
 const [availableAppointments, setavailableAppointments] = useState('');//to send available appoinments
 const navigate=useNavigate();//to send data to EditAppoinments
 const [ignored, forceUpdate] = useReducer(x => x + 1, 0);//for refreash dom
const [appointmentDate,setappointmentDate]=useState('');
const [patientName,setpatientName]=useState("");
var appointmentsTime='';
if(location.state!==null){
var name=location.state.data.name;//to send post request in delete function
console.log(location.state.data)
}else{
  toast.error("you don't have permission to this action", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
}
const cookie=Cookie();

React.useEffect( ()=> {
  if(location.state!==null){
    
    if(location.state.data.result==="ok"&&location.state.data.ReservedAppointments.length===0){
      toast.warn("there is no reserved appointments", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }  
}, []);

    
 //function to set value of available appoinments and date to send to Cofirm Buttton and to change layout
 const displayEmptyAppoinments=(availableAppointments,date)=>(e)=>{
  if (e.target.className==="BlackDaysHorizonalInnerDiv"){
    toast.warn("All appointments in this day are taken", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
      var DaysHorizonalInnerDiv=document.getElementsByClassName("DaysHorizonalInnerDiv");
      for(var i=0;i<DaysHorizonalInnerDiv.length;i++){
        DaysHorizonalInnerDiv[i].style.pointerEvents = "fill";
      }
      console.log(date,availableAppointments)

      e.preventDefault();
      setappointmentDate(null);
      setavailableAppointments('');
 }
 if (e.target.className==="BlackDaysHorizonalInnerDiv4"){
  toast.warn("All appointments in this day are taken", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
    var DaysHorizonalInnerDiv4=document.getElementsByClassName("DaysHorizonalInnerDiv4");
    for(var i=0;i<DaysHorizonalInnerDiv4.length;i++){
      DaysHorizonalInnerDiv4[i].style.pointerEvents = "fill";
    }
    e.preventDefault();
    setappointmentDate(null);
    setavailableAppointments('');
}
  if (e.target.className==="DaysHorizonalInnerDiv"){
     e.target.className="ActivatedDaysHorizonalInnerDiv";
    var DaysHorizonalInnerDiv=document.getElementsByClassName("DaysHorizonalInnerDiv");
    for(var i=0;i<DaysHorizonalInnerDiv.length;i++){
      DaysHorizonalInnerDiv[i].style.pointerEvents = "none";
    }
    console.log("date",availableAppointments)
    e.preventDefault();
    setappointmentDate(date);
    setavailableAppointments(availableAppointments);
  }
 else if (e.target.className==="ActivatedDaysHorizonalInnerDiv"){
    e.target.className="DaysHorizonalInnerDiv";
   var DaysHorizonalInnerDiv=document.getElementsByClassName("DaysHorizonalInnerDiv");
   for(var i=0;i<DaysHorizonalInnerDiv.length;i++){
     DaysHorizonalInnerDiv[i].style.pointerEvents = "fill";
   }
   e.preventDefault();
   setappointmentDate(null);
   setavailableAppointments('');
 }
 if (e.target.className==="DaysHorizonalInnerDiv4"){
  e.target.className="ActivatedDaysHorizonalInnerDiv4";
 var DaysHorizonalInnerDiv=document.getElementsByClassName("DaysHorizonalInnerDiv4");
 for(var i=0;i<DaysHorizonalInnerDiv.length;i++){
   DaysHorizonalInnerDiv[i].style.pointerEvents = "none";
 }
 e.preventDefault();
 setappointmentDate(date);
 setavailableAppointments(availableAppointments);
}
else if (e.target.className==="ActivatedDaysHorizonalInnerDiv4"){
 e.target.className="DaysHorizonalInnerDiv4";
var DaysHorizonalInnerDiv=document.getElementsByClassName("DaysHorizonalInnerDiv4");
for(var i=0;i<DaysHorizonalInnerDiv.length;i++){
  DaysHorizonalInnerDiv[i].style.pointerEvents = "fill";
}
e.preventDefault();
setappointmentDate(null);
setavailableAppointments('');
}
}   
//fucntion whom put an input value in variables
const handleChange=(e)=>{
  setpatientName(e.target.value);
};

//function to send data to EditAppoinments
const navigateTo=(appointment_id,is_doctor,time,date)=>(e)=>{
  e.preventDefault();
  if(location.state.data!==null){
  console.log('we will pass it to edit appointments page');
  navigate('/EditAppoinments', { replace: true, state: {data:location.state.data,appointment_id:appointment_id,is_doctor:is_doctor,
  time:time,date:date}})
  }
}
//confirm function to send new appointment info
const AddAppointment=(e)=>{
  e.preventDefault();
 var doctorName=location.state.data.name;
 console.log(appointmentDate,patientName)
 if(appointmentDate!==null&&patientName!==''){
  try{
    appointmentsTime=document.getElementsByClassName("ActivatedTimeButton")[0].innerText;
    const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
    axios.post(`${BASE_URL}appointment/add_doctor_appointment`,{
      patientName,
      doctorName,
      appointmentsTime,
      appointmentDate,
     },{headers}).then(res=>{
       console.log('Add appointment',res);
       if(res.data.result==="ok"){
         toast.success(res.data.message, {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
           });
           axios.post(`${BASE_URL}appointment/see_schedule`,{
            name,
           },{headers}).then((res)=>{console.log('',res);
           location.state.data=res.data;
           setavailableAppointments('');
           forceUpdate();
            }); 
       }else{
         toast.error(res.data.messagee, {
           position: "top-right",
           autoClose: 5000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: true,
           draggable: true,
           progress: undefined,
           theme: "light",
           });
       }
     })
  }catch{
    toast.warn("choose a specific time !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  
 
 }else{
  toast.warn("fill the fields!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
 }

}    
//Delete function and disappear from dom
const DeleteAppointment=(appointment_id,is_doctor)=>(e)=>{
     e.preventDefault();
     const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
     axios.delete(`${BASE_URL}appointment/delete_appointment`,
     { data: { is_doctor,appointment_id } ,headers}).then(res=>{
      console.log('deleted',res);
      if(res.data.result==="ok"){
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
      axios.post(`${BASE_URL}appointment/see_schedule`,{
        name,
       },{headers}).then((res)=>{
       location.state.data=res.data;
       forceUpdate();
        }); 
    })

}


  return (
    <div className='DoctorReservedAppoinments'>
      <LeftSideBar>
        {location.state!==null?
        <>
        <LeftSideBarHeading>
        Doctor {name} Appoinments
      </LeftSideBarHeading>
      <SideBarDiv>
        <SideBarDivHeading>Add Appoinment:</SideBarDivHeading>
        <SideBarDivText>Patient Name:</SideBarDivText>
        <input id="AddAppointmentInput" placeholder='Enter Patient Name...' type='text' name='name' onChange={handleChange}/>
         <SideBarDivText>pick a day:</SideBarDivText>
  {/*............................................................... */}      
  {
   (() => {
       if (location.state.data.monthlyPresence.length===4)
          return <div className='DaysHorizonalDiv4' >
          {location.state.data.monthlyPresence.map((val,i)=>
          <Fragment key={i}>
                 {
   (() => {
       if (val.availableAppointments.length===0)
          return  <div className='BlackDaysHorizonalInnerDiv4' onClick={displayEmptyAppoinments(val.availableAppointments,val.date)}>
          {val.weekDay.substring(0,3)}
          <br/>
         {val.date.substring(5)}
       </div>
        else if( val.availableAppointments.length!==0)
        return    <div className='DaysHorizonalInnerDiv4' onClick={displayEmptyAppoinments(val.availableAppointments,val.date)}>
        {val.weekDay.substring(0,3)}
        <br/>
       {val.date.substring(5)}
     </div>
   })()
}
         
       </Fragment>
       )}   
         </div>


        if (location.state.data.monthlyPresence.length!==4)
        return <div className='DaysHorizonalDiv' >
        {location.state.data.monthlyPresence.map((val,i)=>
        <Fragment key={i}>
           {
   (() => {
       if (val.availableAppointments.length===0)
          return  <div className='BlackDaysHorizonalInnerDiv' onClick={displayEmptyAppoinments(val.availableAppointments,val.date)}>
          {val.weekDay.substring(0,3)}
          <br/>
         {val.date.substring(5)}
       </div>
        else if( val.availableAppointments.length!==0)
        return <div className='DaysHorizonalInnerDiv' onClick={displayEmptyAppoinments(val.availableAppointments,val.date)}>
        {val.weekDay.substring(0,3)}
        <br/>
       {val.date.substring(5)}
     </div>
   })()
}
     </Fragment>
     )}   
       </div> 
   })()
}
  {/*............................................................... */}  
  {
   (() => {
       if (location.state.data.monthlyPresence.length===4)
          return <div className='yourResult4'>Your Results:</div>
        if (location.state.data.monthlyPresence.length!==4)
        return <div className='yourResult'>Your Results:</div>
   })()
}
       
        <div className='ScrollableSideBarDiv'>
          <TimeButtonsContainer availableAppointments={availableAppointments}/>
          </div>
          <button className='Confirm'>
          <a onClick={AddAppointment}  href=''>
           Confirm
          </a>
          </button>
        </SideBarDiv></>
        :null}
       
        </LeftSideBar>
        <ScrollableContent>
        <TableHeading>Reserved Appoinments</TableHeading>
     {location.state!==null?
     location.state.data.ReservedAppointments.map((val,i)=>
           <Fragment key={i}>
              <div className='Day'>{val.weekDay.substring(0,3)}</div>
              <table className='MultiTable' key={i} >
      <thead>
        <tr className='FirstRow'>
                <th>Name</th>
                <th>Time</th>
                <th>Date</th>
                <th>FileNumber</th>
                <th></th>
                <th></th>
            </tr>
     </thead>
     <tbody>
     {val.reservedAppointments.map((patient,subi)=>
             <tr key={subi}>
             <td>{patient.patientName}</td>
             <td>{patient.time}</td>
             <td>{val.date}</td>
             <td>{patient.fileNumber}</td>
            <td >
            <button className='ActivatedEditButton' onClick={navigateTo(patient.appointment_id,patient.is_doctor
            ,patient.time,val.date)}><a href='/EditAppoinments'>Edit</a></button>
            </td>
            <td >
            <button className='DeleteButton'>
            <a  onClick={DeleteAppointment(patient.appointment_id,patient.is_doctor)} href='#'>
            Delete
            </a>
            </button>
            </td>
          </tr>
          )}
        
     </tbody>

    </table>
      </Fragment>  
        ):null
      }


      </ScrollableContent>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
/>
    </div>
  )
}

export default DoctorReservedAppoinments
