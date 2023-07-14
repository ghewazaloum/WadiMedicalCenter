import './EditDeviceAppointments.css'
import { LeftSideBar,ScrollableContent} from '../../../Sections/index'
import { LeftSideBarHeading ,TableHeading,EditButton,DeleteButton, SideBarDiv, SideBarDivText
    ,SideBarDivHeading,TimeButtonsContainer} from '../../../components/index'
import { useLocation } from "react-router-dom";
import { Fragment, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useReducer } from 'react'
import { useNavigate} from "react-router-dom";
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import Cookie from "cookie-universal"


const EditDeviceAppointments = () => {
  const BASE_URL="http://wadimedicalcenter.pythonanywhere.com/";
  const location=useLocation();//to take info from DeviceReservedAppointment
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);//for refreash dom
  const navigate=useNavigate();//to send data to EditAppoinments
  const[OpenList,setOpenList]=useState(false);//to open technican list
  const[Post,setPost]=useState('');//to put info about dt appointments
  const [availableAppointments, setavailableAppointments] = useState('');//to send available appoinments
  const [date,setDate]=useState('');
  const[AllTherapist,setAllTherapists]=useState('');//to put in it all therapist names when send get request
  const cookie=Cookie(); 
  const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
  if(location.state!==null){
    var is_doctor=location.state.is_doctor;
    var appointment_id=location.state.appointment_id;
    var name=location.state.data.name;//to send post request in delete function
    var therapistName=location.state.competentName;
  }else{ toast.error("you don't have permission to this action", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });}
//extracting therapist names from api 
React.useEffect(()=> {
  if(location.state!==null){
    axios.get("http://127.0.0.1:8000/appointment/therapists_names",{headers}).then((res) => {
    setAllTherapists(res.data.names);
  });}
  var deviceName=name;
  axios.post(`${BASE_URL}appointment/available_dt_appointments`,{
  deviceName,
  therapistName,
 },{headers}).then(res=>{
   console.log('Send Technican and device name',res);
   setPost(res.data);
   }); 
}, []);
if (AllTherapist===null) return null;
if(Post===null)return null;
//Delete function and disappear from dom
const DeleteAppointment=(appointment_id,is_doctor)=>(e)=>{
  e.preventDefault();
  axios.delete(`${BASE_URL}appointment/delete_appointment`,
  { data: { is_doctor,appointment_id },headers }).then(res=>{
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
   axios.post(`${BASE_URL}appointment/device_reserved_appointments`,{
     name,
    },{headers}).then((res)=>{
    location.state.data=res.data;
    forceUpdate();
     }); 
 })

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
      setDate(null);
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
    setDate(null);
    setavailableAppointments('');
}
  if (e.target.className==="DaysHorizonalInnerDiv"){
     e.target.className="ActivatedDaysHorizonalInnerDiv";
    var DaysHorizonalInnerDiv=document.getElementsByClassName("DaysHorizonalInnerDiv");
    for(var i=0;i<DaysHorizonalInnerDiv.length;i++){
      DaysHorizonalInnerDiv[i].style.pointerEvents = "none";
    }
    e.preventDefault();
    setDate(date);
    setavailableAppointments(availableAppointments);
  }
 else if (e.target.className==="ActivatedDaysHorizonalInnerDiv"){
    e.target.className="DaysHorizonalInnerDiv";
   var DaysHorizonalInnerDiv=document.getElementsByClassName("DaysHorizonalInnerDiv");
   for(var i=0;i<DaysHorizonalInnerDiv.length;i++){
     DaysHorizonalInnerDiv[i].style.pointerEvents = "fill";
   }
   e.preventDefault();
   setDate(null);
   setavailableAppointments('');
 }
 if (e.target.className==="DaysHorizonalInnerDiv4"){
  e.target.className="ActivatedDaysHorizonalInnerDiv4";
 var DaysHorizonalInnerDiv=document.getElementsByClassName("DaysHorizonalInnerDiv4");
 for(var i=0;i<DaysHorizonalInnerDiv.length;i++){
   DaysHorizonalInnerDiv[i].style.pointerEvents = "none";
 }
 e.preventDefault();
 setDate(date);
 setavailableAppointments(availableAppointments);
}
else if (e.target.className==="ActivatedDaysHorizonalInnerDiv4"){
 e.target.className="DaysHorizonalInnerDiv4";
var DaysHorizonalInnerDiv=document.getElementsByClassName("DaysHorizonalInnerDiv4");
for(var i=0;i<DaysHorizonalInnerDiv.length;i++){
  DaysHorizonalInnerDiv[i].style.pointerEvents = "fill";
}
e.preventDefault();
setDate(null);
setavailableAppointments('');
}
 
}
  //confirm function to send new appointment info
  const sendTime=(e)=>{
    e.preventDefault();
    if(date!==null){
      try{
        var time=document.getElementsByClassName("ActivatedTimeButton")[0].innerText;
        console.log(time,date,appointment_id,is_doctor);
        axios.post(`${BASE_URL}appointment/edit_appointment`,{
        is_doctor,
        appointment_id,
        date,
        time,
       },{headers}).then(res=>{
         console.log('Time Selected',res);
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
           toast.error(res.data.message, {
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
      toast.warn("choose a date!", {
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

  return (
    <div className='EditDeviceAppointments'>
        <LeftSideBar>
        <LeftSideBarHeading>Editing Information</LeftSideBarHeading>
        {location.state!==null?
        <div className='sidebar'>
       
       {/*....................technichan menu trigger.......................*/}
        <SideBarDivText>
          pick a new date in {therapistName} schedule:
       </SideBarDivText>
        

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
            <button className='Confirm' onClick={sendTime}>
            <a  href=''>
             Confirm
            </a>
            </button>
            </div>:null}
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
            <EditButton>Edit</EditButton>
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

export default EditDeviceAppointments
