import './EditDevice.css'
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
import { useLocation } from 'react-router-dom'
import {Switch} from "antd";
//import { moderateScale } from 'react-native-size-matters';


const EditDevice = () => {
  const BASE_URL="http://wadimedicalcenter.pythonanywhere.com/";
    const [newsorinstructions,setnewsorinstructions]=React.useState('');
    const [PostImage, setPostImage] = useState(null);
    const[name,setpostName]=useState('');
    const[description,setpostDescription]=useState('');
    const cookie=Cookie();
    const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
    const navigate=useNavigate();
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);//for refreash dom
    const location=useLocation();
    let Devices=null;
    let DeviceName=null;
    let infoToEdit=null;
    if(location.state!==null){
     Devices=location.state.Devices;
     DeviceName=location.state.DeviceName;
    }
    console.log(Devices,DeviceName);
    const [DeviceImage, setDeviceImage] = useState(null);
    const [postimagetosend,setpostimagetosend]=useState('');
    const [Deviceimagetosend,setDeviceimagetosend]=useState('');
    const[DeviceDescription,setDeviceDescription]=useState('');
    const [active,setactive]=useState('0');

//extracting sections from api 
React.useEffect(()=> {
  if(headers.Authorization!=='Token undefined'){
    axios.get(`${BASE_URL}appointment/Devices`,{headers}).then((res) => {
      if(res.data.result==="ok"){
        location.state.Devices=res.data.Devices;
  }
    });}
    console.log(Devices);
    console.log(DeviceName);
    let formdata=new FormData();
    formdata.append('name',DeviceName);
    if(DeviceName!==''){
      if(headers.Authorization!=='Token undefined'){
       axios.post(`${BASE_URL}appmanager/device_information`,formdata,{headers}).then((res)=>{
        console.log('device info',res);
        if(res.data.result!=="invalid"){
          infoToEdit=res.data;
      if(infoToEdit!=null){
        console.log()
        setDeviceDescription(infoToEdit.deviceDescription);
        setDeviceImage(`${BASE_URL}${infoToEdit.deviceImage}`);
        setactive(infoToEdit.isActive);
                  }
        }
      });}}
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
          location.state.Devices=res.data.Devices;
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
//function whom post news or instruction
const Edit_device=(e)=>{
  e.preventDefault();
  let formdata=new FormData();
 // console.log(DeviceName,Deviceimagetosend,active,DeviceDescription)
  formdata.append('deviceName',DeviceName);
  formdata.append('deviceImage',Deviceimagetosend);
  if(active!=='0'){
    formdata.append('isActive',active);
  }
  formdata.append('description',DeviceDescription);
 {/*  for (const value of formdata.values()) {
    console.log(value);
  }*/}
  if(DeviceName!==''){
    if(headers.Authorization!=='Token undefined'){
    axios.post(`${BASE_URL}appmanager/edit_device`,formdata,{headers}).then((res)=>{
    console.log('section added',res);
    if(res.data.result==="ok"&&res.data.message==="device edited successfuly"){
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
      location.state.Devices=res.data.Devices;
      forceUpdate();
    }
  });
  console.log(Devices)
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
    })}else{toast.error('ypu do not have permession', {
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
//save the value of Doctor Specialization in a variable
const handleActive=(e)=>{
  active==='0'?setactive("1"):setactive("0");
} 
  return (
    <div className="EditDevice">
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
          <button className='addDeviceorservice'>
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
             <button className='NotAactivatedappmanagerEditButton'><a href=''>Edit</a></button>
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
        <LeftSideBarHeading>Edit Device</LeftSideBarHeading>
          <div className='rightSideBarAppManager'>
            {/*...................description input..................... */}
            <div style={{display:"flex", gap: "60px",height:"35px"}}>
            <SideBarDivText>is Active?</SideBarDivText>
            {(() => {
      if(active===true)
         return <Switch className='switch'checked onClick={handleActive}/>
     
      else 
         return <Switch className='switch' onClick={handleActive}/>
  })()}
            
            </div>
            {/*...................description input..................... */}
            <SideBarDivText>Description:</SideBarDivText>
            <textarea className='textarea' rows="5" placeholder={description}onChange={handleDeviceDescription}/>
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
            <a href='' onClick={Edit_device}>
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

export default EditDevice
