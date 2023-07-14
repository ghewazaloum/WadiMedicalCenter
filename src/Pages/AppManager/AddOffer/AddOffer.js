import './AddOffer.css'
import { LeftSideBar,RightSideBar,AppManagerScrollableContent} from '../../../Sections/index'
import {TableHeading,Table, SideBarDiv,LeftSideBarHeading, SideBarDivText} from '../../../components/index'
import React, { Fragment } from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookie from "cookie-universal"
import axios from 'axios'
import {Navigate } from "react-router-dom";
import { useReducer } from 'react'
import { useNavigate } from "react-router-dom";
import TimeField from 'react-simple-timefield';

const AddOffer = () => {
  const BASE_URL="http://wadimedicalcenter.pythonanywhere.com/";
  const [newsorinstructions,setnewsorinstructions]=React.useState('');
const [PostImage, setPostImage] = useState(null);
const[name,setpostName]=useState('');
const[description,setpostDescription]=useState('');
const cookie=Cookie();
const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
const[sections,setSections]=useState(null);
const [OfferImage, setOfferImage] = useState(null);
const[OfferName,setOfferName]=useState('');
const [postimagetosend,setpostimagetosend]=useState('');
const [Offerimagetosend,setOfferimagetosend]=useState('');
const[offers,setoffers]=useState(null);
const [ignored, forceUpdate] = useReducer(x => x + 1, 0);//for refreash dom
const navigate=useNavigate();
const[OfferDescription,setOfferDescription]=useState(null);
const[StartDate,setStartDate]=useState('')
const[EndDate,setEndDate]=useState('')
const[startHoursIn,setstartHoursIn]=useState('00:00');
const[endHoursIn,setendHoursIn]=useState('00:00')
var startdatetime='';
var enddatetime='';
const[OldPrice,setOldPrice]=useState('');
const[NewPrice,setNewPrice]=useState('');
const[Discount,setDiscount]=useState('');


//extracting sections from api 
React.useEffect(()=> {
  if(headers.Authorization!=='Token undefined'){
  axios.get(`${BASE_URL}appmanager/section_names`,{headers}).then((res) => {
    if(res.data.result==="ok"){
      setSections(res.data.sections);
    }
  })};
  if(headers.Authorization!=='Token undefined'){
  axios.get(`${BASE_URL}appmanager/offers`,{headers}).then((res) => {
    if(res.data.result==="ok"){
      setoffers(res.data);
}
  })};

}, []);

//if(offers!==null){console.log(offers.offers,typeof(offers))}else console.log("hhh")

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
//function to get save the image that we selected from desktop
const getOfferImage=(e)=>{
  if(e.target.files && e.target.files[0]){
    setOfferImage(URL.createObjectURL(e.target.files[0]));
    setOfferimagetosend(e.target.files[0]);
  }
 }
//save the value of section name in a variable
const handleOfferName=(e)=>{
  setOfferName(e.target.value);
}
//save the value of old price in a variable
const handleOldPrice=(e)=>{
  setOldPrice(e.target.value);
}
//save the value of old price in a variable
const handleNewPrice=(e)=>{
  setNewPrice(e.target.value);
}
//save the value of old price in a variable
const handleDiscount=(e)=>{
  setDiscount(e.target.value);
}
//function whom post news or instruction
const AddOffer=(e)=>{
  if(StartDate!==''&&startHoursIn!=='00:00'){startdatetime=StartDate+' '+startHoursIn} 
  if(EndDate!==''&&endHoursIn!=='00:00'){enddatetime=EndDate+' '+endHoursIn} 
  console.log(enddatetime,startdatetime)
  console.log(OfferName,Offerimagetosend,OfferDescription,startdatetime,enddatetime,OldPrice,NewPrice,Discount)
  e.preventDefault();
   let formdata=new FormData();
  formdata.append('offerName',OfferName);
  formdata.append('offerImage',Offerimagetosend);
  formdata.append('description',OfferDescription);
  formdata.append('startDate',startdatetime);
  formdata.append('endDate',enddatetime);
  formdata.append('oldPrice',OldPrice);
  formdata.append('newPrice',NewPrice);
  formdata.append('discount',Discount);

  if(OfferName!==''){
    if(headers.Authorization!=='Token undefined'){
    axios.post(`${BASE_URL}appmanager/add_offer`,formdata,{headers}).then((res)=>{
    console.log('offer added',res);
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
    axios.get(`${BASE_URL}appmanager/offers`,{headers}).then((res) => {
    if(res.data.result==="ok"){
      setoffers(res.data);
      forceUpdate();
    }
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
    })}else{toast.error('you do not have permessions', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })}
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
//openning add doctor and sending info
const navigateToAddOffer=(e)=>{
  e.preventDefault();
  if(offers!==null){
  console.log('we will pass it to next page',offers);
  navigate('/AddOffer', { replace: true, state: {offers:offers}})
  } }  

//Delete function and disappear from dom
const DeleteOffer=(id)=>(e)=>{
  e.preventDefault();
  const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
  const offerId=id;
  axios.post(`${BASE_URL}appmanager/delete_offer`,{
    offerId
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
   }else if(res.data.result==="invalid"&&res.data.message==="you don\'t have permission to do this action"){
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
   axios.get(`${BASE_URL}appmanager/offers`,{headers}).then((res) => {
      if(res.data.result==="ok"){
        setoffers(res.data);
        forceUpdate();
  }
    });
 })

}  
//save the value of offer desc in a variable
const handleOfferDescription=(e)=>{
  setOfferDescription(e.target.value);
}
//fucntion whom put start date in variables
const handleStartDate=(e)=>{
  setStartDate(e.target.value);
}
//fucntion whom put end date in variables
const handleEndDate=(e)=>{
  setEndDate(e.target.value);
}
//start hour
const handlestarthour=(e)=>{
  setstartHoursIn(e.target.value);
}
//end hour
const handlendhour=(e)=>{
  setendHoursIn(e.target.value);
}
  return (
    <div className='AddOffer'>

    <div className="Offers">
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
          <TableHeading>Offers</TableHeading>
          <button className='NotActivatedaddDoctor'>
            <a href='' onClick={navigateToAddOffer}>
             Add
            </a>
            </button>
          </div>

          <Table zero="Name"  first="Start date" second="End date" third="New price" fourth="Discount" >
         {offers!==null?
        offers.offers.map((val,i)=>
       <tr key={i}>
            <td>{val.offerName}</td>
            <td>{val.startDate}</td>
            <td>{val.endDate}</td>
            <td>{val.newPrice}</td>
            <td >{val.discount}</td>
            <td >
            <button className='DeleteButton'>
            <a href='#'onClick={DeleteOffer(val.offerId)} >
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
        <LeftSideBarHeading>Add Offer</LeftSideBarHeading>
        <div className='rightSideBarAppManager'>
            {/*...................name input..................... */}
            <SideBarDivText>Offer name:</SideBarDivText>
            <input id="input" placeholder='Enter Offer Name...' type='text' name='name' onChange={handleOfferName} required/>
          {/*................... image..................... */}
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
            <input type='file' name='file' id='SectionImage' onChange={getOfferImage}/>
            </div>
            <div className='display_image' >
            <img className='selectedSectionImage' src={OfferImage} />
            </div>
          </div>
            {/*...................description input..................... */}
            <SideBarDivText>Description:</SideBarDivText>
            <textarea className='textarea' rows="5" placeholder='enter description'onChange={handleOfferDescription}/>
        {/*...........start date input............. */}   
        <SideBarDivText>start Date:</SideBarDivText>
        <input style={{width:"88%",marginLeft:"7.5%"}} id="birthdate" type="date" placeholder="YYYY-MM-DD"onChange={handleStartDate}  required/>
 
       

           {/*...........patient Birth date input............. */}   
        <SideBarDivText>End Date:</SideBarDivText>
          <input style={{width:"88%",marginLeft:"7.5%"}} id="birthdate" type="date" placeholder="YYYY-MM-DD"  onChange={handleEndDate}required/>
                {/*...................time pick..................... */}
                <div style={{display:"flex",gap:"25px"}}>
          <SideBarDivText>Start Time:</SideBarDivText>
          <TimeField style={{width:"33%",marginTop:"3%"}} onChange={handlestarthour}className="form-control"/>
          </div>   
           {/*...................time pick..................... */}
           <div style={{display:"flex",gap:"25px"}}>
          <SideBarDivText>End Time:</SideBarDivText>
          <TimeField style={{width:"33%",marginTop:"3%",marginLeft:"2.5%"}} onChange={handlendhour} className="form-control"/>
          </div>
            {/*...................name input..................... */}
            <SideBarDivText>Old Price:</SideBarDivText>
            <input id="input" placeholder='Enter Old Price...' type='text' name='oldprice' onChange={handleOldPrice} required/>
    {/*...................name input..................... */}
    <SideBarDivText>New Price:</SideBarDivText>
            <input id="input" placeholder='Enter new Price...' type='text' name='newprice' onChange={handleNewPrice} required/>
    {/*...................name input..................... */}
    <SideBarDivText>Discount:</SideBarDivText>
            <input id="input" placeholder='Enter dicount...' type='text' name='disount' onChange={handleDiscount} required/>

          <button className='Confirm'>
            <a href='' onClick={AddOffer}>
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
     
    </div>
  )
}

export default AddOffer
