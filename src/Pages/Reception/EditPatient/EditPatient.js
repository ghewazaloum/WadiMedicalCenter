import './EditPatient.css'
import { TableHeading,Table,LeftSideBarHeading ,SideBarDiv,SideBarDivText} from '../../../components/index'
import { ScrollableContent,LeftSideBar } from '../../../Sections/index'
import React, { useState } from 'react'
import axios from 'axios'
import { useReducer } from 'react'
import { useNavigate,useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookie from "cookie-universal";

const EditPatient = () => {
  const BASE_URL="http://wadimedicalcenter.pythonanywhere.com/";
  const location=useLocation();
    const [post, setPost] = React.useState(null);
    const [gender,setGender]=React.useState('');
    const [password,setpassword]=React.useState('');
    const [relationship,setrelationship]=React.useState('');
    const [birthDate,setbirthDate]=React.useState('');
    const [phoneNumber,setphoneNumber]=React.useState('');
    const [fileNumber,setfileNumber]=React.useState('');
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);//for refreash dom
    var patient_info='';
    const navigate=useNavigate();
    const cookie=Cookie();
    const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
    if(location.state!==null){
      var patientName=location.state.patientName;
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
  //extracting information from api
  React.useEffect(()=> {
    var Name=patientName;
    axios.get(`${BASE_URL}appointment/Patients`,{headers}).then((res) => {
     setPost(res.data);
    });
     axios.post(`${BASE_URL}appointment/patient_info`,{
      Name,
     },{headers}).then((res)=>{
      patient_info=res.data;
      console.log(patient_info)
      if(patient_info!=null){
        setGender(patient_info.gnender);
        setfileNumber(patient_info.file_number);
        setbirthDate(patient_info.birthDate);
        setphoneNumber(patient_info.phoneNumber);
        setrelationship(patient_info.relationship);
                  }
   })
  }, []);
  if (post!==null){
    if(post.result==="invalid"&&post.message==="you don't have permission to this action"){
    toast.error(post.message, {
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


  //fucntion whom put patient password in variables
  const handlePatientPassword=(e)=>{
    setpassword(e.target.value);
  };
  //fucntion whom put patient gender in variables
  const handlePatientGender=(e)=>{
    setGender(e.target.value);
  }
  //fucntion whom put patient relationship in variables
  const handlePatientRelationship=(e)=>{
    setrelationship(e.target.value);
  }
  //fucntion whom put patient birth date in variables
  const handlePatientBirthDate=(e)=>{
    setbirthDate(e.target.value);
  }
  //fucntion whom put patient PhoneNumber in variables
  const handlePatientPhoneNumber=(e)=>{
    setphoneNumber(e.target.value);
  }
  //fucntion whom put patient fileNumber in variables
  const handlePatientfileNumber=(e)=>{
    setfileNumber(e.target.value);
  }
  //fucntion whom put Add patient
  const EditPatient=(patientName)=>(e)=>{
      e.preventDefault();
      console.log(patientName,password,birthDate,gender,
        relationship,phoneNumber,fileNumber);
        let formdata=new FormData();
        formdata.append('patientName',patientName);
        formdata.append('fileNumber',fileNumber);
        formdata.append('phoneNumber',phoneNumber);
        formdata.append('birthDate',birthDate);
        formdata.append('gender',gender);
        formdata.append('relationship',relationship);
        formdata.append('password',password);
          if(headers.Authorization!=='Token undefined'){
          axios.post(`${BASE_URL}appointment/edit_patient`,formdata,{headers}).then((res)=>{
            console.log('edit patient',res);
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
                axios.get(`${BASE_URL}appointment/Patients`,{headers}).then((res) => {
          if(res.data.result1==="ok"){
            setPost(res.data)
            forceUpdate();
      }
        }); 
            }})}else{ toast.error('you do not have permessions', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              })}
        
       
  
  }
    //openning patient Appoinments and sending info
    const NavigateToPatientAppointments=(Name)=>(e)=>{
      console.log(Name);
      e.preventDefault();
      axios.post(`${BASE_URL}appointment/patient_appointments`,{
         Name,
        },{headers}).then((res)=>{console.log("data is here after sending name",res);
        if(res.data!==null){console.log('we will pass it to next page',res.data);
        navigate('/PatientAppointments', { replace: true, state: {data:res.data,}})
      }}
        ).catch(err=>console.log(err))
    }
    
  
  return (
    <div className='EditPatient'>
         <LeftSideBar>
        <LeftSideBarHeading>Edit Patient:</LeftSideBarHeading>
        {
   (() => {
       if (post!==null){
        if(post.result1==="ok"){
          return     <SideBarDiv>
          {/*...........patient password input............. */}
          <SideBarDivText>Patient Password:</SideBarDivText>
          <input id="AddPatientPasswordInput" placeholder="Enter your password.." type='password' name='password'onChange={handlePatientPassword} required/>
           {/*...........patient fileNumber input............. */}
           <SideBarDivText>Patient fileNumber:</SideBarDivText>
          <input id="AddPatientfileNumberInput" placeholder={fileNumber} type='text' name='fileNumber' onChange={handlePatientfileNumber} required/>
          {/*...........patient Gender input............. */}          
          <SideBarDivText>Gender:</SideBarDivText>
          <div style={{"marginTop":"5%"}}>
          <div className='GenderRadioButtonDiv' >
          {gender==="0"?
             <>
            <input type="radio"  value="0"  name="gender" onClick={handlePatientGender}defaultChecked required/> Male
            </>:
            <>
            <input type="radio"  value="0"  name="gender" onClick={handlePatientGender} required/> Male
            </>
            }
          </div>
          <div className='GenderRadioButtonDiv'>
            {gender==="1"?
            <>  <input type="radio" value="1"  name="gender" onClick={handlePatientGender} defaultChecked required/> Female</>:
            <>  <input type="radio" value="1"  name="gender" onClick={handlePatientGender} required/> Female</>}
        
          </div>
          </div>
          {/*...........patient Relationship input............. */}      
          <SideBarDivText>Relaionship:</SideBarDivText>
          <div style={{"marginTop":"5%"}}>
          <div className='RelationshipRadioButtonDiv' >
            {relationship==="1"?
            <> <input type="radio" value="1"  name="relationship" onClick={handlePatientRelationship} defaultChecked required/> Single</>:
            <> <input type="radio" value="1"  name="relationship" onClick={handlePatientRelationship} required/> Single</>}
         
          </div>
          <div className='RelationshipRadioButtonDiv'>
            {relationship==="0"?
            <><input type="radio" value="0"  name="relationship" onClick={handlePatientRelationship}defaultChecked required/> Married</>:
            <><input type="radio" value="0"  name="relationship" onClick={handlePatientRelationship} required/> Married</>}
          
          </div>
          </div>
          {/*...........patient Birth date input............. */}   
          <SideBarDivText>BirthDate:</SideBarDivText>
          <input id="birthdate" type="date" placeholder="YYYY-MM-DD"value={birthDate} onChange={handlePatientBirthDate} required/>
          {/*...........patient Phone Number input............. */}   
          <SideBarDivText>Phone Number:</SideBarDivText>
          <input type="tel" id="phone" name="phone" placeholder={phoneNumber} onChange={handlePatientPhoneNumber} required/>

          <button className='AddPatient' onClick={EditPatient(patientName)}>
            <a   href=''>
             Edit Patient
            </a>
            </button>

        
          </SideBarDiv>
         
           }
       }else{return null}
         
   })()
}

        </LeftSideBar>
        <ScrollableContent>
        <TableHeading>Patients</TableHeading>
        <Table zero="Name"  first="File Number" second="Gender" third="Age"  >
        {(() => {
       if (post!==null){
        if(post.result1==="ok"){
          return   post.Patients.map((val,i)=>
          <tr key={i}>
               <td>{val.Name}</td>
               <td>{val.FileNumber}</td>
               <td>{val.Gender}</td>
               <td>{val.Age}</td>
               <td >
            <button className='EditInPatientNotActivated'><a href=''>Edit</a></button>
            </td>

               <td>
                 <button className='Appointments'><a href='/DevicesReservedAppointments' onClick={NavigateToPatientAppointments(val.Name)}>Appointments</a></button>
               </td>
              
            </tr>
           )
           }
       }else{return null}
         
   })()
}
        </Table>
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

export default EditPatient
