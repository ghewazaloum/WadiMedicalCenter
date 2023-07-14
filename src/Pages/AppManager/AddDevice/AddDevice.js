import './AddDevice.css'
import { LeftSideBar,RightSideBar,AppManagerScrollableContent} from '../../../Sections/index'
import {TableHeading,Table, SideBarDiv,LeftSideBarHeading, SideBarDivText} from '../../../components/index'
import React, { Fragment } from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookie from "cookie-universal"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useReducer } from 'react'
const AddDevice = () => {
  const BASE_URL="http://wadimedicalcenter.pythonanywhere.com/";
  const [newsorinstructions,setnewsorinstructions]=React.useState('');
    const [PostImage, setPostImage] = useState(null);
    const[name,setpostName]=useState('');
    const[description,setpostDescription]=useState('');
    const cookie=Cookie();
    const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
    const[Devices,setDevices]=useState(null);
    const navigate=useNavigate();
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);//for refreash dom
    const[sections,setSections]=useState(null);
    const[type,setType]=useState('');

    const [DeviceImage, setDeviceImage] = useState(null);
    const[DeviceName,setDeviceName]=useState('');
    const [postimagetosend,setpostimagetosend]=useState('');
    const [Deviceimagetosend,setDeviceimagetosend]=useState('');
    const[DeviceDescription,setDeviceDescription]=useState('');
    const[DeviceSection,setDeviceSection]=useState('');
    const[OpenList,setOpenList]=useState(false);//to open section list

//extracting sections from api 
React.useEffect(()=> {
  if(headers.Authorization!=='Token undefined'){
    axios.get(`${BASE_URL}appointment/Devices`,{headers}).then((res) => {
      if(res.data.result==="ok"){
        setDevices(res.data.Devices);
  }
    })};
    if(headers.Authorization!=='Token undefined'){
    axios.get(`${BASE_URL}appmanager/section_names`,{headers}).then((res) => {
      if(res.data.result==="ok"){
        setSections(res.data.sections);
      }
    })};
    
  }, []);
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
const navigateToAddDevice=(e)=>{
    e.preventDefault();
   if(Devices!==null){
    console.log('we will pass it to next page',Devices);
    navigate('/AddDevice', { replace: true, state: {Devices:Devices}})
    }}
//Delete function and disappear from dom
const DeleteDevice=(name)=>(e)=>{
    e.preventDefault();
    const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
    axios.post(`${BASE_URL}appmanager/delete_device`,{
        name
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
     axios.get(`${BASE_URL}appointment/Devices`,{headers}).then((res) => {
        if(res.data.result==="ok"){
          setDevices(res.data.Devices);
          forceUpdate();
    }
      });
   })

}
//function to get save the image that we selected from desktop
const getDeviceImage=(e)=>{
  if(e.target.files && e.target.files[0]){
    setDeviceImage(URL.createObjectURL(e.target.files[0]));
    setDeviceimagetosend(e.target.files[0]);
  }
 }
  //save the value of device name in a variable
  const handleDeviceName=(e)=>{
    setDeviceName(e.target.value);
  }
//function whom post news or instruction
const add_device=(e)=>{
  e.preventDefault();
  let formdata=new FormData();
  console.log(DeviceName,Deviceimagetosend,DeviceSection,DeviceDescription,type)
  formdata.append('name',DeviceName);
  formdata.append('deviceImage',Deviceimagetosend);
  formdata.append('sectionName',DeviceSection);
  formdata.append('description',DeviceDescription);
  formdata.append('isService',type);
  console.log(formdata)
  if(DeviceName!==''){
    if(headers.Authorization!=='Token undefined'){
    axios.post(`${BASE_URL}appmanager/add_device`,formdata,{headers}).then((res)=>{
    console.log('section added',res);
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
    axios.get(`${BASE_URL}appointment/Devices`,{headers}).then((res) => {
    if(res.data.result==="ok"){
      setDevices(res.data.Devices);
    }
  });
  console.log(Devices)
    }else if(res.data.result=="invalid"&&res.data.message===' device '+ DeviceName +' already exists'){
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
    })}else{
      toast.error('you do not have permessions', {
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
  }else toast.warn('it is empty !!', {
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
//save the value of Doctor Specialization in a variable
const handleDeviceDescription=(e)=>{
  setDeviceDescription(e.target.value);
}  
//save the value of Device section in a variable
const handleDeviceSection=(val)=>(e)=>{
  if(e.target.className==="TechnicanNotSelected"){
    setDeviceSection(val.val);
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
    setDeviceSection('');
  }
}
//fucntion whom open and close list
const OpenCloseList=(e)=>{
  if(OpenList===false){
    setOpenList(true);
  }else{setOpenList(false)}
};
//function to send data to Edit device 
const navigateToEditDevice=(DeviceName)=>(e)=>{
  e.preventDefault();
  if(Devices!==null){
   console.log('we will pass it to next page',Devices);
 navigate('/EditDevice', { replace: true, state: {DeviceName:DeviceName,Devices:Devices}})
}} 
//fucntion whom put service or device in variables
const handleType=(e)=>{
  setType(e.target.value);
}
console.log(type);
  return (
    <div className='AddDevice'>
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
          <TableHeading>Devices & Services</TableHeading>
          <button className='NotActivatedaddDeviceorservice'>
            <a href='' onClick={navigateToAddDevice}>
             Add
            </a>
            </button>
          </div>

        <Table zero="Name"  first="Section" second="Active" >
        {Devices!==null?    
        Devices.map((val,i)=>
       <tr key={i}>
            <td>{val.Name}</td>
            <td>{val.Section}</td>
            <td>{val.active}</td>
            <td></td>
             <td >
            <button className='appmanagerEditButton'>
              <a href=''onClick={navigateToEditDevice(val.Name)}>
                Edit
                </a>
                </button>
            </td>
            <td >
            <button className='DeleteButton'>
            <a href='#' onClick={DeleteDevice(val.Name)}>
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
        <LeftSideBarHeading>Add Device/Service</LeftSideBarHeading>
          <div className='rightSideBarAppManager'>
              {/*...........patient Gender input............. */}          
          <SideBarDivText>Device or Service:</SideBarDivText>
          <div style={{"marginTop":"5%"}}>
          <div className='GenderRadioButtonDiv' >
          <input type="radio" value="0"  name="type" onClick={handleType} required/> Device
          </div>
          <div className='GenderRadioButtonDiv'>
          <input type="radio" value="1"  name="type" onClick={handleType} required/> Service
          </div>
          </div>
            {/*...................name input..................... */}
            <SideBarDivText> name:</SideBarDivText>
            <input id="input" placeholder='Enter Device Name...' type='text' name='name' onChange={handleDeviceName} required/>
            {/*...................description input..................... */}
            <SideBarDivText>Description:</SideBarDivText>
            <textarea className='textarea' rows="5" placeholder='enter description'onChange={handleDeviceDescription}/>
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
           <a  className='TechnicanNotSelected'onClick={handleDeviceSection({val})}>{val}</a>
          </li> 
         )} 
       </ul> 
        </>:null}
          
      </div> :<div className='EmptyTechnicanList'></div>}
      {/*........................................................................ */}
            <div className='ContainerOfPickedImage'>
            <div style={{display:"flex", gap: "24px",height:"35px"}}>
            <SideBarDivText>Pick an Image:</SideBarDivText>
            <label htmlFor='DeviceImage' style={{marginTop:"4%"}}>
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
            <input type='file' name='file' id='DeviceImage' onChange={getDeviceImage}/>
            </div>
            <div className='display_image' >
            <img className='selectedSectionImage' src={DeviceImage} />
            </div>
          </div>
          <button className='Confirm'>
            <a href='' onClick={add_device}>
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

export default AddDevice
