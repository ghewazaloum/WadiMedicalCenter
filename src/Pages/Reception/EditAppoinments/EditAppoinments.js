import './EditAppoinments.css'
import { LeftSideBar,ScrollableContent} from '../../../Sections/index'
import { LeftSideBarHeading ,TableHeading,EditButton,DeleteButton, SideBarDiv, SideBarDivText
    ,SideBarDivHeading,TimeButtonsContainer} from '../../../components/index'
import { useLocation } from "react-router-dom";
import { Fragment } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useReducer } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookie from "cookie-universal"

//introduction
const EditAppoinments = () => {
  const BASE_URL="http://wadimedicalcenter.pythonanywhere.com/";
    const location=useLocation();//to take info from DoctorReservedAppointment
    console.log(location.state);
    if(location.state!==null){
    var is_doctor=location.state.is_doctor;
    var appointment_id=location.state.appointment_id;
    var name=location.state.data.name;//to send post request in delete function
    }else toast.error("you don't have permission to this action  sd", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);//for refreash dom
    const [date,setDate]=useState('');
    const [availableAppointments, setavailableAppointments] = useState('');//to send available appoinments
    const cookie=Cookie();
    

     
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
        const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
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
         }
         axios.post(`${BASE_URL}appointment/see_schedule`,{
           name,
          },{headers}).then((res)=>{
           location.state.data=res.data;
           setavailableAppointments('');
           forceUpdate();
   
           }); 
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
  { data: { is_doctor,appointment_id },headers} ).then(res=>{
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
    <div className='EditAppoinments'>
      <LeftSideBar>
        <LeftSideBarHeading>Editing Information</LeftSideBarHeading> 
        {location.state!==null?
        <>
          <SideBarDiv>
          <SideBarDivHeading>Add New Appoinment:</SideBarDivHeading>
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
            <a onClick={sendTime}  href=''>
             Confirm
            </a>
            </button>
          
          </SideBarDiv></>:null}

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

export default EditAppoinments
