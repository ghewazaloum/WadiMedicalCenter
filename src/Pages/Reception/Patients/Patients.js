import './Patients.css'
import { TableHeading,Table,LeftSideBarHeading ,SideBarDiv,SideBarDivText} from '../../../components/index'
import { ScrollableContent,LeftSideBar } from '../../../Sections/index'
import React from 'react'
import axios from 'axios'
import { useReducer } from 'react'
import { useNavigate ,Navigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookie from "cookie-universal";

const Patients = () => {
  const BASE_URL="http://wadimedicalcenter.pythonanywhere.com/";
  const [post, setPost] = React.useState(null);
  const [gender,setGender]=React.useState('');
  const [patientName,setpatientName]=React.useState('');
  const [password,setpassword]=React.useState('');
  const [relationship,setrelationship]=React.useState('');
  const [birthDate,setbirthDate]=React.useState('');
  const [phoneNumber,setphoneNumber]=React.useState('');
  const [fileNumber,setfileNumber]=React.useState('');
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);//for refreash dom
  const navigate=useNavigate();
  const cookie=Cookie();
  const headers = { 'Authorization': `Token ${cookie.get('Token')}` };

//extracting information from api
React.useEffect(()=> {
  if(headers.Authorization!=='Token undefined'){
  axios.get(`${BASE_URL}appointment/Patients`,{headers}).then((res) => {
   setPost(res.data);
  });
}}, []);
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
console.log(post);

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
//function to send data to EditAppoinments
const navigateToEditPatient=(name)=>(e)=>{
  e.preventDefault();
  console.log('we will pass it to edit appointments page');
  navigate('/EditPatient', { replace: true, state: {patientName:name}})
  
}  

  return (
    <>
    {headers.Authorization!=='Token undefined'?
    <div className="Patients">
         <LeftSideBar>
        <LeftSideBarHeading>Add Patient:</LeftSideBarHeading>
        {
   (() => {
       if (post!==null){
        if(post.result1==="ok"){
          return     <SideBarDiv>
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
            <button className='EditInPatient'onClick={navigateToEditPatient(val.Name)}><a href='/EditInPatient'>Edit</a></button>
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
    </div>:<Navigate to="/" />}
    </>
  )
}

export default Patients
