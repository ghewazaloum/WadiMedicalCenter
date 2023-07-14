import './DevicesReservedAppointments.css'
import {LeftSideBar,ScrollableContent} from '../../../Sections/index'
import {LeftSideBarHeading,TableHeading,SideBarDiv,SideBarDivHeading, SideBarDivText,
  TimeButtonsContainer,ConfirmButton} from '../../../components/index'
import { useLocation } from "react-router-dom";
import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import React from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useReducer } from 'react'
import { useNavigate} from "react-router-dom";
import Cookie from "cookie-universal"

const DevicesReservedAppointments = () => {
  const BASE_URL="http://wadimedicalcenter.pythonanywhere.com/";
  const location=useLocation();  //to extract values which send from Devices see schedule
  const [patientName,setpatientName]=useState("");
  const[OpenList,setOpenList]=useState(false);//to open technican list
  const[Post,setPost]=useState('');//to put info about dt appointments
  const [availableAppointments, setavailableAppointments] = useState('');//to send available appoinments
  const [appointmentDate,setappointmentDate]=useState('');
  const [therapistName,settherapistName]=useState('');
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);//for refreash dom
  const navigate=useNavigate();//to send data to Edit device Appoinments
  const[AllTherapist,setAllTherapists]=useState('');//to put in it all therapist names when send get request
  if(location.state!==null){
    var name=location.state.data.name;//to send post request in delete function}
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

  
//extracting therapist names from api 
  React.useEffect(()=> {
    if(location.state!==null){
    var Name=name;
    const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
    axios.post(`${BASE_URL}appointment/therapists_names`,{
      Name,
    },{headers}).then((res) => {
      if(res.data.result==="ok"){
      setAllTherapists(res.data.names);
      }
    });
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
    }}
  }, []);
if (AllTherapist===null) return null;
//fucntion whom open and close list
const OpenCloseList=(e)=>{
  if(OpenList===false){
    setOpenList(true);
  }else{setOpenList(false)}
};

//fucntion whom put an input value in variables
const handleChange=(e)=>{
  setpatientName(e.target.value);
};

// function to bring appointments with device and technican free
const bringDTappointments=(e)=>{
  e.preventDefault();
  if(e.target.className==="TechnicanNotSelected"){
    var therapistName=e.target.innerText;
    settherapistName(therapistName);
    e.target.className="TechnicanSelected";
    var TechnicanNotSelected=document.getElementsByClassName("TechnicanNotSelected");
    for(var i=0;i<TechnicanNotSelected.length;i++){
      TechnicanNotSelected[i].style.pointerEvents = "none";
    }
    var deviceName=name;
  const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
   axios.post(`${BASE_URL}appointment/available_dt_appointments`,{
    deviceName,
    therapistName,
   },{headers}).then(res=>{
     console.log('Send Technican and device name',res);
     setPost(res.data);
  
     }); 
  }else{
  e.target.className="TechnicanNotSelected";
  var TechnicanNotSelected=document.getElementsByClassName("TechnicanNotSelected");
  for(var i=0;i<TechnicanNotSelected.length;i++){
    TechnicanNotSelected[i].style.pointerEvents = "fill";
  }
  setPost('');}
 
}

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
//confirm function to send new appointment info
const AddAppointment=(e)=>{
  e.preventDefault();
 var deviceName=name;
 if(patientName!==''&&therapistName!==''&&appointmentDate!==null){
  try{
    var appointmentsTime=document.getElementsByClassName("ActivatedTimeButton")[0].innerText;
    const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
    axios.post(`${BASE_URL}appointment/add_device_appointment`,{
       patientName,
       deviceName,
       therapistName,
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
            const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
            axios.post(`${BASE_URL}appointment/device_reserved_appointments`,{
            name,
           },{headers}).then((res)=>{console.log('this is',res);
           location.state.data=res.data;
           setavailableAppointments('');
           var deviceName=name;
   const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
    axios.post(`${BASE_URL}appointment/available_dt_appointments`,{
     deviceName,
     therapistName,
    },{headers}).then(res=>{
      console.log('Send Technican and device name',res);
      setPost(res.data);
      }); 
           forceUpdate();
            });
        }else{
          toast.error(res.data.result, {
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
 //console.log(deviceName,patientName,therapistName,appointmentDate,appointmentsTime);

 
} 
//function to send data to Edit device Appoinments
const navigateTo=(appointment_id,is_doctor,time,date,competentName)=>(e)=>{
  e.preventDefault();
  navigate('/EditDeviceAppointments', { replace: true, state: {data:location.state.data,appointment_id:appointment_id,is_doctor:is_doctor,
  time:time,date:date,competentName:competentName}})
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
   const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
   axios.post(`${BASE_URL}appointment/device_reserved_appointments`,{
     name,
    },{headers}).then((res)=>{
    location.state.data=res.data;
    forceUpdate();
     }); 
 })

}
  return (
    <div className='DevicesReservedAppointments'>
      <LeftSideBar>
      {location.state!==null?
      <>
        <LeftSideBarHeading>
           {name} Device Appoinments
        </LeftSideBarHeading>
        <div className='sidebar'>
          <SideBarDivHeading>Add Appoinment:</SideBarDivHeading>
          <SideBarDivText>Patient Name:</SideBarDivText>
          <input id="AddAppointmentInput" placeholder='Enter Patient Name...' type='text' name='name' onChange={handleChange}/>
       
       {/*....................technichan menu trigger.......................*/}
        <div className='menu-trigger'>
        <SideBarDivText>
          pick a technican
          <svg onClick={OpenCloseList} className='DropDownListArrow' xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="arrow-drop-down">
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path d="m7 10 5 5 5-5H7z"></path>
            </svg>
       </SideBarDivText>
        </div> 
       {/*....................technichan menu.......................*/}
        {OpenList===true?
        <div className="TechnicanList">
          <ul>
            {AllTherapist!==''?
          AllTherapist.map((val,i)=>
          <li key={i} >
           <a className='TechnicanNotSelected'onClick={bringDTappointments}>{val}</a>
          </li> 
         ):null} 
       </ul>  
          
      </div> :<div className='EmptyTechnicanList'></div>}
                        
    {/*............................................................... */}   
    {Post!==""? 
    <>
      {
        (() => {
            if (Post.availableAppointments.length===4)
               return <div className='DaysHorizonalDiv4' >
               {Post.availableAppointments.map((val,i)=>
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
     
     
             if (Post.availableAppointments.length!==4)
             return <div className='DaysHorizonalDiv' >
             {Post.availableAppointments.map((val,i)=>
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
     </>
     :null}   
          
    {/*............................................................... */}  
    {Post!==""? 
    <>
    {
   (() => {
       if (Post.availableAppointments.length===4)
          return <div className='yourResult4'>Your Results:</div>
        if (Post.availableAppointments.length!==4)
        return <div className='yourResult'>Your Results:</div>
   })()
}</>:null}
  
  

          <div className='ScrollableSideBarDiv'>
            <TimeButtonsContainer availableAppointments={availableAppointments}/>
            </div>
            <button className='Confirm' onClick={AddAppointment}>
            <a  href=''>
             Confirm
            </a>
          </button>
            </div>
            </>:null}
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
                <th>FileNumber</th>
                <th>Date</th>
                <th></th>
                <th></th>

            </tr>
     </thead>
     <tbody>
     {val.reservedAppointments.map((patient,subi)=>
             <tr key={subi}>
             <td >{patient.patientName}</td>
             <td>{patient.time}</td>
             <td>{patient.fileNumber}</td>
             <td>{val.date}</td>
             <td>
           <button className='ActivatedEditButton' onClick={navigateTo(patient.appointment_id,patient.is_doctor
            ,patient.time,val.date,patient.competentName)}><a href='/EditDeviceAppointments'>Edit</a></button>
            </td>
            <td >
            <button className='DeleteButton'>
            <a  href='#'onClick={DeleteAppointment(patient.appointment_id,patient.is_doctor)}>
            Delete
            </a>
            </button>
       </td>
          </tr>
          )}
        
     </tbody>

    </table>
      </Fragment>  
        )
            :null}


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

export default DevicesReservedAppointments
