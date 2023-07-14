import './PatientAppointments.css'
import { TableHeading,Table,LeftSideBarHeading ,SideBarDiv,SideBarDivText} from '../../../components/index'
import { ScrollableContent,LeftSideBar } from '../../../Sections/index'
import React from 'react'
import axios from 'axios'
import { useReducer } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";

const PatientAppointments = () => {
  const BASE_URL="http://wadimedicalcenter.pythonanywhere.com/";
  const location=useLocation();  //to extract values which send from patient appoinyments button
  const [post, setPost] = React.useState(null);
  const [gender,setGender]=React.useState('');
  const [patientName,setpatientName]=React.useState('');
  const [password,setpassword]=React.useState('');
  const [relationship,setrelationship]=React.useState('');
  const [birthDate,setbirthDate]=React.useState('');
  const [phoneNumber,setphoneNumber]=React.useState('');
  const [fileNumber,setfileNumber]=React.useState('');
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);//for refreash dom
  const cookie=Cookie();
  const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
  React.useEffect( ()=> {
    if(location.state!==null){
    if(location.state.data.result==="ok"&&location.state.data.message===" then patient  don't have any appointmants"){

      toast.warn(location.state.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }}else{
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
 }, []);

  //fucntion whom put patient name in variables
const handlePatientName=(e)=>{
  setpatientName(e.target.value);
};
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
const AddPatient=(patientName,password,birthDate,gender,
  relationship,phoneNumber,fileNumber)=>(e)=>{
    e.preventDefault();
    console.log(patientName,password,birthDate,gender,
      relationship,phoneNumber,fileNumber);
    axios.post(`${BASE_URL}appointment/add_patient`,{
    patientName,
    password,
    birthDate,
    gender,
    relationship,
    phoneNumber,
    fileNumber,
   },{headers}).then(res=>{
    if (res.data.result==="ok"){
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
     else if(res.data.result==="invalid"&&res.data.message==="you already have an account"){
      toast.warn(res.data.message, {
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
     else if(res.data.result==="invalid"&&res.data.message==="invalid data"){
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
     console.log('Add Patient',res);
     axios.get(`${BASE_URL}appointment/Patients`,{headers}).then((res) => {
      setPost(res.data);
      forceUpdate();
     });
   })


}

  return (
    <div className='PatientAppointments'>
       <LeftSideBar>
        <LeftSideBarHeading>Add Patient:</LeftSideBarHeading>
        {(() => {
       if (location.state!==null){
        if(location.state.data.result==="ok"){
          return   <SideBarDiv>
          {/*...........patient name input............. */}
          <SideBarDivText>Patient Name:</SideBarDivText>
          <input id="AddPatientNameInput" placeholder='Enter Patient Name...' type='text' name='name' onChange={handlePatientName} required/>
          {/*...........patient password input............. */}
          <SideBarDivText>Patient Password:</SideBarDivText>
          <input id="AddPatientPasswordInput" placeholder='Enter Patient Password...' type='password' name='password'onChange={handlePatientPassword} required/>
           {/*...........patient fileNumber input............. */}
           <SideBarDivText>Patient fileNumber:</SideBarDivText>
          <input id="AddPatientfileNumberInput" placeholder='Enter Patient fileNumber...' type='text' name='fileNumber' onChange={handlePatientfileNumber} required/>
          {/*...........patient Gender input............. */}          
          <SideBarDivText>Gender:</SideBarDivText>
          <div style={{"marginTop":"5%"}}>
          <div className='GenderRadioButtonDiv' >
          <input type="radio" value="0"  name="gender" onClick={handlePatientGender} required/> Male
          </div>
          <div className='GenderRadioButtonDiv'>
          <input type="radio" value="1"  name="gender" onClick={handlePatientGender} required/> Female
          </div>
          </div>
          {/*...........patient Relationship input............. */}      
          <SideBarDivText>Relaionship:</SideBarDivText>
          <div style={{"marginTop":"5%"}}>
          <div className='RelationshipRadioButtonDiv' >
          <input type="radio" value="1"  name="relationship" onClick={handlePatientRelationship} required/> Single
          </div>
          <div className='RelationshipRadioButtonDiv'>
          <input type="radio" value="0"  name="relationship" onClick={handlePatientRelationship} required/> Married
          </div>
          </div>
          {/*...........patient Birth date input............. */}   
          <SideBarDivText>BirthDate:</SideBarDivText>
          <input id="birthdate" type="date" placeholder="YYYY-MM-DD" onChange={handlePatientBirthDate} required/>
          {/*...........patient Phone Number input............. */}   
          <SideBarDivText>Phone Number:</SideBarDivText>
          <input type="tel" id="phone" name="phone" placeholder='Enter Phone Number' onChange={handlePatientPhoneNumber} required/>

          <button className='AddPatient' onClick={AddPatient(patientName,password,birthDate,Number(gender),
           Number(relationship),phoneNumber,fileNumber)}>
            <a   href=''>
             Add Patient
            </a>
            </button>

        
          </SideBarDiv>
           
           }
       }else{return null}
         
   })()
}
        
        </LeftSideBar>
        <ScrollableContent>
        {(() => {
       if (location.state!==null){
        if(location.state.data.appointments!==undefined){
          return   <>
            <TableHeading>Patient {location.state.data.Name} Appointments</TableHeading>
          <div className='FileNumber'>File Number : {location.state.data.fileNumber}</div>
          <table>
          <thead>
          <tr className='FirstRow'>
                  <th>Competent</th>
                  <th>date</th>
                  <th>time</th>
                  <th>Section</th>
                  <th>status</th>
              </tr>
       </thead>
       <tbody>
       {location.state.data.appointments.map((val,i)=>
         <tr key={i}>
              <td>{val.Competent}</td>
              <td>{val.date}</td>
              <td>{val.time}</td>
              <td>{val.Section}</td>
              <td>{val.status}</td>
           </tr>
          )}
       </tbody>
          
         
        </table>
        </>
           
           }else{return <TableHeading>Patient {location.state.data.Name} Appointments</TableHeading>}
       }else{return null}
         
   })()
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

export default PatientAppointments
