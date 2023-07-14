import './DeviceAppManager.css'
import { LeftSideBar,RightSideBar,AppManagerScrollableContent} from '../../../Sections/index'
import {TableHeading,Table, SideBarDiv,LeftSideBarHeading, SideBarDivText} from '../../../components/index'
import React, { Fragment } from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookie from "cookie-universal"
import axios from 'axios'
import { useNavigate,Navigate } from "react-router-dom";
import { useReducer } from 'react'

const DeviceAppManager = () => {
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
    const [SectionImage, setSectionImage] = useState(null);
    const[SectionName,setSectionName]=useState('');
    const [postimagetosend,setpostimagetosend]=useState('');
    const [sectionimagetosend,setsectionimagetosend]=useState('');
    const[sectionFullName,setsectionFullName]=useState('');

//extracting sections from api 
React.useEffect(()=> {
  if(headers.Authorization!=='Token undefined'){
    axios.get(`${BASE_URL}appmanager/section_names`,{headers}).then((res) => {
        if(res.data.result==="ok"){
          setSections(res.data.sections);
        }
      })};
      if(headers.Authorization!=='Token undefined'){
    axios.get(`${BASE_URL}appointment/Devices`,{headers}).then((res) => {
      if(res.data.result==="ok"){
        setDevices(res.data.Devices);
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
      }})
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
      axios.post("http://127.0.0.1:8000/appmanager/add_ins",formdata,{headers}).then((res)=>{
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
      })
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
const getSectionImage=(e)=>{
  if(e.target.files && e.target.files[0]){
    setSectionImage(URL.createObjectURL(e.target.files[0]));
    setsectionimagetosend(e.target.files[0]);
  }
 }
  //save the value of section name in a variable
  const handleSectionName=(e)=>{
    setSectionName(e.target.value);
  }
//save the value of section full name in a variable
const handleSectionFullName=(e)=>{
  setsectionFullName(e.target.value);
}  
//function whom post news or instruction
const add_section=(e)=>{
  e.preventDefault();
  let formdata=new FormData();
  formdata.append('name',SectionName);
  formdata.append('fullName',sectionFullName);
  formdata.append('sectionImage',sectionimagetosend);
  if(SectionName!==''){
    axios.post(`${BASE_URL}appmanager/add_section`,formdata,{headers}).then((res)=>{
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
    axios.get("http://127.0.0.1:8000/appmanager/section_names",{headers}).then((res) => {
    if(res.data.result==="ok"){
      setSections(res.data.sections);
    }
  });
    }else if(res.data.result=="invalid"&&res.data.message===' therapist '+ name +' already exists'){
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
    });
  
}
//delete icon for section
const handledeleteIcon=(e)=>{
    var DeleteIcon = e.target;
      let classname=DeleteIcon.className.baseVal;
      console.log(classname,"hhh")
      if(classname==="emptyDeleteIcon" ){
        console.log("j")
        DeleteIcon.className.baseVal="ClickDeleteIcon";
    }else { 
      DeleteIcon.className.baseVal="emptyDeleteIcon";
    } 
  }
//function to send data to Edit device 
const navigateToEditDevice=(DeviceName)=>(e)=>{
  e.preventDefault();
  if(Devices!==null){
   console.log('we will pass it to next page',Devices);
 navigate('/EditDevice', { replace: true, state: {DeviceName:DeviceName,Devices:Devices}})
}}  
    
  return (
    <>
    {headers.Authorization!=='Token undefined'?
    <div className='DeviceAppManager'>
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
        <LeftSideBarHeading>Add Section</LeftSideBarHeading>
          <SideBarDiv>
            {/*...................name input..................... */}
            <SideBarDivText>section name:</SideBarDivText>
            <input id="input" placeholder='Enter Section Name...' type='text' name='name' onChange={handleSectionName} required/>
           {/*................... full name input..................... */}
 <SideBarDivText>section full name:</SideBarDivText>
            <input id="input" placeholder='Enter Section full Name...' type='text' name='fullname' onChange={handleSectionFullName} required/>
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
            <input type='file' name='file' id='SectionImage' onChange={getSectionImage}/>
            </div>
            <div className='display_image' >
            <img className='selectedSectionImage' src={SectionImage} />
            </div>
          </div>
          <button className='Confirm'>
            <a href='' onClick={add_section}>
             Confirm
            </a>
            </button>
          <SideBarDivText>Sections</SideBarDivText>
          
        <div className="SectionList">
          <ul>      
        {sections!==null?
         sections.map((val,i)=>
          <li key={i} >
                  <svg onClick={handledeleteIcon}className='DeleteIcon' style={{marginTop:"4.2%"}} fill='#291B27' width="13" height="13" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110.61 122.88"><title>trash</title>
            <path className='emptyDeleteIcon'  d="M39.27,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Zm63.6-19.86L98,103a22.29,22.29,0,0,1-6.33,14.1,19.41,19.41,0,0,1-13.88,5.78h-45a19.4,19.4,0,0,1-13.86-5.78l0,0A22.31,22.31,0,0,1,12.59,103L7.74,38.78H0V25c0-3.32,1.63-4.58,4.84-4.58H27.58V10.79A10.82,10.82,0,0,1,38.37,0H72.24A10.82,10.82,0,0,1,83,10.79v9.62h23.35a6.19,6.19,0,0,1,1,.06A3.86,3.86,0,0,1,110.59,24c0,.2,0,.38,0,.57V38.78Zm-9.5.17H17.24L22,102.3a12.82,12.82,0,0,0,3.57,8.1l0,0a10,10,0,0,0,7.19,3h45a10.06,10.06,0,0,0,7.19-3,12.8,12.8,0,0,0,3.59-8.1L93.37,39ZM71,20.41V12.05H39.64v8.36ZM61.87,58.64a4.74,4.74,0,1,1,9.47,0V93.72a4.74,4.74,0,1,1-9.47,0V58.64Z"/></svg>
           <a>{val}</a>
          </li> 
         ):null}  
           
       </ul>  
     
          
      </div>
          </SideBarDiv>
           
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
    </div>:<Navigate to="/" />}
    </>
  )
}

export default DeviceAppManager
