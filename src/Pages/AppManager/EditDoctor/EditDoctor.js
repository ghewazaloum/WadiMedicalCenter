import './EditDoctor.css'
import { LeftSideBar,RightSideBar,AppManagerScrollableContent} from '../../../Sections/index'
import {TableHeading,Table, SideBarDiv,LeftSideBarHeading, SideBarDivText,EditButton} from '../../../components/index'
import Cookie from "cookie-universal"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import React, { Fragment } from 'react'
import { useNavigate } from "react-router-dom";
import { useReducer } from 'react'
import TimeField from 'react-simple-timefield';
import { useLocation } from 'react-router-dom'

const EditDoctor = () => {
  const [newsorinstructions,setnewsorinstructions]=React.useState('');
  const [PostImage, setPostImage] = useState(null);
  const cookie=Cookie();
  const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
  const[name,setpostName]=useState('');
  const[description,setpostDescription]=useState('');
  const navigate=useNavigate();
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);//for refreash dom
  const [DoctorImage, setDoctorImage] = useState(null);
  const[DoctorSection,setDoctorSection]=useState(null);
  const[DoctorSpecialization,setDoctorSpecialization]=useState(null);
  const[DoctorDescription,setDoctorDescription]=useState(null);
  const[sections,setSections]=useState(null);
  const[OpenList,setOpenList]=useState(false);//to open section list
  const location=useLocation();
  let DoctorAndTherapist=null;
  let DoctorName=null;
  if(location.state!==null){
   DoctorAndTherapist=location.state.DoctorAndTherapist;
   DoctorName=location.state.doctorName;
  }
 // console.log(DoctorName)
  const [postimagetosend,setpostimagetosend]=useState('');
  const [DoctorImagetosend, setDoctorImagetosend] = useState(null);
  let infoToEdit=null;
  const BASE_URL="http://wadimedicalcenter.pythonanywhere.com/";
 ///////////////////////////////////////////////////////////////
 const [saturday,setsaturday]=useState('0');
 const[sunday,setsunday]=useState('0');
 const[monday,setmonday]=useState('0');
 const[tuesday,settuesday]=useState('0');
 const[wednesday,setwednesday]=useState('0');
 const[thursday,setthursday]=useState('0');
 const[friday,setfriday]=useState('0');
 const[startHoursIn,setstartHoursIn]=useState('00:00');
 const[endHoursIn,setendHoursIn]=useState('00:00')
 ////////////////////////////////////////////////////////////////
//extracting sections from api 
React.useEffect(()=> {
  if(headers.Authorization!=='Token undefined'){
  axios.get(`${BASE_URL}appmanager/section_names`,{headers}).then((res) => {
    if(res.data.result==="ok"){
      setSections(res.data.sections);
    }
  })};
  let formdata=new FormData();
  formdata.append('name',DoctorName);
  if(DoctorName!==''){
    if(headers.Authorization!=='Token undefined'){
     axios.post(`${BASE_URL}appmanager/doctor_information`,formdata,{headers}).then((res)=>{
      console.log('doctor info',res);
      if(res.data.result!=="invalid"){
        infoToEdit=res.data;
    if(infoToEdit!=null){
      console.log()
      setDoctorSection(infoToEdit.doctorSection);
      setDoctorDescription(infoToEdit.doctorDesc);
      setsaturday(infoToEdit.saturday);
      setsunday(infoToEdit.sunday);
      setmonday(infoToEdit.monday);
      settuesday(infoToEdit.tuesday);
      setwednesday(infoToEdit.wednesday);
      setthursday(infoToEdit.thursday);
      setfriday(infoToEdit.friday);
      setstartHoursIn(infoToEdit.startHoursIn);
      setendHoursIn(infoToEdit.endHoursIn);
      setDoctorImage(`${BASE_URL}${infoToEdit.doctorImage}`);
      
                }
      }
    });}}
}, []);
//saturday
const handlesaturday=(e)=>{
  if (e.target.className==="weekday"){
      e.target.className="Activatedweekday";
    setsaturday("1");
  }else if(e.target.className==="Activatedweekday"){
    e.target.className="weekday";
    setsaturday("0");
  }}

//sunday
const handlesunday=(e)=>{
  if (e.target.className==="weekday"){
    e.target.className="Activatedweekday";
    setsunday("1");
  }else if(e.target.className==="Activatedweekday"){
    e.target.className="weekday";
    setsunday("0");
  }
}
//monday
const handlemonday=(e)=>{
  if (e.target.className==="weekday"){
    e.target.className="Activatedweekday";
    setmonday("1");
  }else if(e.target.className==="Activatedweekday"){
    e.target.className="weekday";
    setmonday("0");
  }
}
//tuesday
const handletuesday=(e)=>{
  if (e.target.className==="weekday"){
    e.target.className="Activatedweekday";
    settuesday("1");
  }else if(e.target.className==="Activatedweekday"){
    e.target.className="weekday";
    settuesday("0");
  }
}
//wednesday
const handlewednesday=(e)=>{
  if (e.target.className==="weekday"){
    e.target.className="Activatedweekday";
    setwednesday("1");
  }else if(e.target.className==="Activatedweekday"){
    e.target.className="weekday";
    setwednesday("0");
  }
}
//thursday
const handlethursday=(e)=>{
  if (e.target.className==="weekday"){
    e.target.className="Activatedweekday";
    setthursday("1");
  }else if(e.target.className==="Activatedweekday"){
    e.target.className="weekday";
    setthursday("0");
  }
}
//fucntion whom put news or instructions in variables
const handlefriday=(e)=>{
  if (e.target.className==="weekday"){
    e.target.className="Activatedweekday";
    setfriday("1");
  }else if(e.target.className==="Activatedweekday"){
    e.target.className="weekday";
    setfriday("0");
  }
}
///////////////////////////////////////////////////////////////
//function to get save the image that we selected from desktop
const getDoctorImage=(e)=>{
  if(e.target.files && e.target.files[0]){
    setDoctorImage(URL.createObjectURL(e.target.files[0]));
    setDoctorImagetosend(e.target.files[0]);
  }
 }
 //console.log(DoctorImagetosend);
//save the value of Doctor section in a variable
const handleDoctorSection=(val)=>(e)=>{
  if(e.target.className==="TechnicanNotSelected"){
    setDoctorSection(val.val);
  e.target.className="TechnicanSelected";
  var TechnicanNotSelected=document.getElementsByClassName("TechnicanNotSelected");
  for(var i=0;i<TechnicanNotSelected.length;i++){
    TechnicanNotSelected[i].style.pointerEvents = "none";
  }
  
  }else{
    e.target.className="TechnicanNotSelected";
    var TechnicanNotSelected=document.getElementsByClassName("TechnicanNotSelected");
    for(var i=0;i<TechnicanNotSelected.length;i++){
      TechnicanNotSelected[i].style.pointerEvents = "fill";
    }
    setDoctorSection('');
  }
}
//save the value of Doctor Specialization in a variable
const handleDoctorSpecialization=(e)=>{
  setDoctorSpecialization(e.target.value);
}
//save the value of Doctor Specialization in a variable
const handleDoctorDescription=(e)=>{
  setDoctorDescription(e.target.value);
}
//start hour
const handlestarthour=(e)=>{
  setstartHoursIn(e.target.value);
}
//end hour
const handleendhour=(e)=>{
  setendHoursIn(e.target.value);
}
const EditDoctor=(e)=>{
  console.log(DoctorSection,startHoursIn,endHoursIn,saturday,sunday,monday,tuesday,wednesday,thursday,friday,DoctorDescription,DoctorImage)
  e.preventDefault();
  let formdata=new FormData();
  formdata.append('doctorName',DoctorName);
  formdata.append('doctorImage',DoctorImagetosend);
  formdata.append('Specialization',DoctorSpecialization);
  formdata.append('description',DoctorDescription);
  formdata.append('sectionName',DoctorSection);
  formdata.append('saturday',saturday);
  formdata.append('sunday',sunday);
  formdata.append('monday',monday);
  formdata.append('tuesday',tuesday);
  formdata.append('wednesday',wednesday);
  formdata.append('thursday',thursday);
  formdata.append('friday',friday);
  formdata.append('startHoursIn',startHoursIn);
  formdata.append('endHoursIn',endHoursIn);
  //console.log(doctorName,doctorImage,Specialization,description,sectionName,saturday,sunday,monday,tuesday,wednesday,
   // thursday,friday,startHoursIn,endHoursIn)
   // console.log(DoctorName)
   if(DoctorName!==''){
    if(headers.Authorization!=='Token undefined'){
    axios.post(`${BASE_URL}appmanager/edit_doctor`,formdata,{headers}).then((res)=>{
      console.log('new doctor',res);
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
          axios.get(`${BASE_URL}appmanager/doctors_therapists`,{headers}).then((res) => {
    if(res.data.result==="ok"){
      location.state.DoctorAndTherapist=res.data;
      forceUpdate();
}
  });  
      }else if(res.data.result=="invalid"&&res.data.message===' doctor '+ DoctorName +' already exists'){
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
      }})}else toast.error('you do not have permessions', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })
     
   }else toast.warn('it is empty !!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    })
 

}
//fucntion whom open and close list
const OpenCloseList=(e)=>{
  if(OpenList===false){
    setOpenList(true);
  }else{setOpenList(false)}
};
//fucntion whom put news or instructions in variables
const handleNewsOrInstructions=(e)=>{
  setnewsorinstructions(e.target.value);
}

//save the value of post name in a variable
const handlepostName=(e)=>{
  setpostName(e.target.value);
}

//save the value of post description in a variable
const handlepostDescription=(e)=>{
  setpostDescription(e.target.value);
}

//function to get save the image that we selected from desktop
const getPostImage=(e)=>{
  if(e.target.files && e.target.files[0]){
   setPostImage(URL.createObjectURL(e.target.files[0]));
   setpostimagetosend(e.target.files[0]);
  }
 }

//function whom post news or instruction
const Post=(e)=>{
  e.preventDefault();
  let formdata=new FormData();
  if(newsorinstructions==="0"){//news
    formdata.append('postImage',postimagetosend);
    formdata.append('name',name);
    formdata.append('description',description)
    if(description!==''){
      if(headers.Authorization!=='Token undefined'){
      axios.post(`${BASE_URL}appmanager/add_post`,formdata,{headers}).then((res)=>{
        console.log('news posted',res);
      if(res.data.result==="ok"&&res.data.message==="added successfuly"){
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
      }else if(res.data.result=="invalid"&&res.data.message==='post already added'){
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
    }else toast.warn('description is empty !!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })
   
  
  }else if(newsorinstructions==="1"){//instruction
   formdata.append('insImage',postimagetosend);
   formdata.append('name',name);
   formdata.append('description',description)
    if(description!==''){
      if(headers.Authorization!=='Token undefined'){
      axios.post(`${BASE_URL}appmanager/add_ins`,formdata,{headers}).then((res)=>{
        console.log('instruction posted',res);
        if(res.data.result==="ok"&&res.data.message==="added successfuly"){
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
        }else if(res.data.result=="invalid"&&res.data.message==='post already added'){
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
      })}else{ toast.error('you do not have permessions', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        })}
    }else toast.warn('description is empty !!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })
   
  }else toast.warn('it is empty !!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    })
}
//openning add doctor and sending info
const navigateToAddDoctor=(e)=>{
  e.preventDefault();
  if(DoctorAndTherapist!==null){
  console.log('we will pass it to next page',DoctorAndTherapist);
  navigate('/AddDoctor', { replace: true, state: {DoctorAndTherapist:DoctorAndTherapist}})
  }}
//Delete function and disappear from dom
const DeleteDoctor=(name)=>(e)=>{
  e.preventDefault();
  const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
  const doctorName=name;
  axios.post(`${BASE_URL}appmanager/delete_doctor`,{
    doctorName
     },{headers}).then(res=>{
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
   }else if(res.data.result==="invalid"&&res.data.message==="you don't have permission to do this action"){
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
   axios.get(`${BASE_URL}appmanager/doctors_therapists`,{headers}).then((res) => {
      if(res.data.result==="ok"){
        location.state.DoctorAndTherapist=res.data;
        forceUpdate();
  }
    });
 })

}  
  return (
    <div className="EditDoctor">
        <LeftSideBar>
         <LeftSideBarHeading>
         Add News/Instruction Post
        </LeftSideBarHeading>
        <SideBarDiv>
         <div style={{"marginTop":"5%" ,"marginLeft":"1%"}}>
          <div className='NewsOrInstructionsRadioButtonDiv' >
          <input type="radio" value="0"  name="newsorinstruction" onClick={handleNewsOrInstructions} required/>News
          </div>
          <div className='NewsOrInstructionsRadioButtonDiv'>
          <input type="radio" value="1"  name="newsorinstruction" onClick={handleNewsOrInstructions} required/>Instructions
          </div>
          </div>
          <input id="input" placeholder='Enter Post Name...' type='text' name='name' onChange={handlepostName} required/>
          <textarea className='textarea' rows="5" placeholder='enter your post'onChange={handlepostDescription}/>
          <div className='ContainerOfPickedImage'>
            <div style={{display:"flex", gap: "24px",height:"35px"}}>
            <SideBarDivText>Pick an Image:</SideBarDivText>
            <label htmlFor='PostImage' style={{marginTop:"4%"}}>
              <i>
                <svg width="30" height="28" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <g filter="url(#filter0_d_79_132)">
                 <path d="M27.4383 5.46875V19.5312C27.4383 20.8252 26.4829 21.875 25.3053 21.875H6.81862C5.64099 21.875 4.68555 20.8252 4.68555 19.5312V5.46875C4.68555 4.1748 5.64099 3.125 6.81862 3.125H10.7293L11.2759 1.51855C11.5869 0.605469 12.3824 0 13.2712 0H18.8483C19.7371 0 20.5325 0.605469 20.8436 1.51855L21.3946 3.125H25.3053C26.4829 3.125 27.4383 4.1748 27.4383 5.46875ZM21.3946 12.5C21.3946 9.26758 19.0038 6.64062 16.0619 6.64062C13.1201 6.64062 10.7293 9.26758 10.7293 12.5C10.7293 15.7324 13.1201 18.3594 16.0619 18.3594C19.0038 18.3594 21.3946 15.7324 21.3946 12.5ZM19.9726 12.5C19.9726 14.8682 18.2172 16.7969 16.0619 16.7969C13.9066 16.7969 12.1513 14.8682 12.1513 12.5C12.1513 10.1318 13.9066 8.20312 16.0619 8.20312C18.2172 8.20312 19.9726 10.1318 19.9726 12.5Z" fill="#7E1E80"/>
                 </g>
                 <defs>
                 <filter id="filter0_d_79_132" x="0.685547" y="0" width="30.7529" height="29.875" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                 <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                 <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                 <feOffset dy="4"/>
                 <feGaussianBlur stdDeviation="2"/>
                 <feComposite in2="hardAlpha" operator="out"/>
                 <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                 <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_79_132"/>
                 <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_79_132" result="shape"/>
                 </filter>
                 </defs>
                 </svg>
                 </i>
                 </label>
            <input type='file' name='PostImage' id='PostImage' onChange={getPostImage}/>
            </div>
            <div className='display_image' >
            <img className='selectedPostImage' src={PostImage} />
            </div>
          </div>
          <button className='Confirm'>
            <a href='' onClick={Post}>
             Post
            </a>
            </button>
          </SideBarDiv>
        </LeftSideBar>
        <AppManagerScrollableContent>
          <div style={{display:"flex"}}>
          <TableHeading>Doctors</TableHeading>
          <button className='addDoctor'>
            <a href='' onClick={navigateToAddDoctor}>
             Add
            </a>
            </button>

          </div>

          <Table zero="Name"  first="Section" second="specialization" >
        {location.state!==null?

        DoctorAndTherapist.Doctors.map((val,i)=>
       <tr key={i}>
            <td>{val.Name}</td>
            <td>{val.Section}</td>
            <td>{val.Specialization}</td>
            <td></td>
             <td >
            <button className='NotAactivatedappmanagerEditButton'><a href=''>Edit</a></button>
            </td>
            <td >
            <button className='DeleteButton'>
            <a href='#' onClick={DeleteDoctor(val.Name)}>
            Delete
            </a>
            </button>
            </td>


         </tr>
        ):null
        }
        </Table>
      </AppManagerScrollableContent>
      <RightSideBar>
        <LeftSideBarHeading>Edit Doctor</LeftSideBarHeading>
          <div className='rightSideBarAppManager'>
            {/*...................section menu trigger..................... */}
            <div className='menu-trigger'>
            <SideBarDivText>
              Section:
            <svg onClick={OpenCloseList} className='DropDownListArrow' xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="arrow-drop-down">
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path d="m7 10 5 5 5-5H7z"></path>
            </svg>
              </SideBarDivText>
              </div>
                {/*....................section menu.......................*/}

        {OpenList===true?
        <div className="TechnicanList">
          {sections!==null?
          <>
          <ul>
          {sections.map((val,i)=>
          <li key={i} >
          {val!==DoctorSection?
           <a className='TechnicanNotSelected' onClick={handleDoctorSection({val})}>{val}</a>
           :<a className='TechnicanSelected' onClick={handleDoctorSection({val})}>{val}</a>}
          </li> 
         )} 
       </ul> 
        </>:null}
          
      </div> :<div className='EmptyTechnicanList'></div>}
             {/*...................Specialization input..................... */}
             <SideBarDivText>Specialization:</SideBarDivText>
            <input id="input" placeholder='Enter Specialization...' type='text' name='name' onChange={handleDoctorSpecialization} required/>
            {/*...................description input..................... */}
            <SideBarDivText>Description:</SideBarDivText>
            <textarea className='textarea' rows="5" placeholder={DoctorDescription} onChange={handleDoctorDescription}/>
            {/*...................image pick..................... */}
            <div className='ContainerOfPickedImage'>
            <div style={{display:"flex", gap: "24px",height:"35px"}}>
            <SideBarDivText>Pick an Image:</SideBarDivText>
            <label htmlFor='SectionImage' style={{marginTop:"4%"}}>
              <i>
                <svg width="30" height="28" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <g filter="url(#filter0_d_79_132)">
                 <path d="M27.4383 5.46875V19.5312C27.4383 20.8252 26.4829 21.875 25.3053 21.875H6.81862C5.64099 21.875 4.68555 20.8252 4.68555 19.5312V5.46875C4.68555 4.1748 5.64099 3.125 6.81862 3.125H10.7293L11.2759 1.51855C11.5869 0.605469 12.3824 0 13.2712 0H18.8483C19.7371 0 20.5325 0.605469 20.8436 1.51855L21.3946 3.125H25.3053C26.4829 3.125 27.4383 4.1748 27.4383 5.46875ZM21.3946 12.5C21.3946 9.26758 19.0038 6.64062 16.0619 6.64062C13.1201 6.64062 10.7293 9.26758 10.7293 12.5C10.7293 15.7324 13.1201 18.3594 16.0619 18.3594C19.0038 18.3594 21.3946 15.7324 21.3946 12.5ZM19.9726 12.5C19.9726 14.8682 18.2172 16.7969 16.0619 16.7969C13.9066 16.7969 12.1513 14.8682 12.1513 12.5C12.1513 10.1318 13.9066 8.20312 16.0619 8.20312C18.2172 8.20312 19.9726 10.1318 19.9726 12.5Z" fill="#7E1E80"/>
                 </g>
                 <defs>
                 <filter id="filter0_d_79_132" x="0.685547" y="0" width="30.7529" height="29.875" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                 <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                 <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                 <feOffset dy="4"/>
                 <feGaussianBlur stdDeviation="2"/>
                 <feComposite in2="hardAlpha" operator="out"/>
                 <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                 <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_79_132"/>
                 <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_79_132" result="shape"/>
                 </filter>
                 </defs>
                 </svg>
                 </i>
                 </label>
            <input type='file' name='file' id='SectionImage' onChange={getDoctorImage}/>
            </div>
            <div className='display_image' >
            <img className='selectedSectionImage' src={DoctorImage} />
            </div>
          </div>
            {/*...................days pick..................... */}
            <SideBarDivText>Pick Days:</SideBarDivText>
            <div className='weekDays' >
              {saturday==='0'?
              <div className='weekday' onClick={handlesaturday}>
    sat
               </div>:
               <div className='Activatedweekday' onClick={handlesaturday}>
               sat
                          </div>}
             {sunday==='0'?           
               <div className='weekday' onClick={handlesunday}>
    sun
               </div>:
                <div className='Activatedweekday' onClick={handlesunday}>
                sun
                           </div>}
             {monday==='0'?               
               <div className='weekday'onClick={handlemonday}>
    mon
               </div>:
                <div className='Activatedweekday'onClick={handlemonday}>
                mon
                           </div>}
             {tuesday==='0'?          
               <div className='weekday' onClick={handletuesday}>
    tue
               </div>:
                <div className='Activatedweekday' onClick={handletuesday}>
                tue
                           </div>}
             {wednesday==='0'?
               <div className='weekday' onClick={handlewednesday}>
    wed
               </div>:
               <div className='Activatedweekday' onClick={handlewednesday}>
               wed
                          </div>}
             {thursday==='0'?            
               <div className='weekday'onClick={handlethursday}>
    thu
               </div>:
              <div className='Activatedweekday'onClick={handlethursday}>
                              thu
                </div>}
                {friday==='0'?    
               <div className='weekday'onClick={handlefriday}>
    fri
               </div>:
                <div className='Activatedweekday'onClick={handlefriday}>
                              fri
                 </div>}
           </div>
          {/*...................time pick..................... */}
          <div style={{display:"flex",gap:"25px"}}>
          <SideBarDivText>Start Time:</SideBarDivText>
          <TimeField style={{width:"33%"}} className="form-control" value={startHoursIn} onChange={handlestarthour} />
          </div>
          <div style={{display:"flex" ,marginTop:"1%",gap:"31px"}}>
          <SideBarDivText>End Time:</SideBarDivText>
          <TimeField style={{width:"33%"}} className="form-control" value={endHoursIn} onChange={handleendhour} />
          </div>
       
          <button className='Confirm'>
            <a href='' onClick={EditDoctor}>
             Confirm
            </a>
            </button>
        
   
          </div>
           
        </RightSideBar>
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

export default EditDoctor
