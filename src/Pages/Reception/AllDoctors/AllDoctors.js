import './AllDoctors.css'
import {LeftSideBar,ScrollableContent} from '../../../Sections/index'
import { LeftSideBarHeading,Table,TableHeading} from '../../../components/index'
import React from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";
import Cookie from "cookie-universal"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllDoctors = () => {
  const BASE_URL="http://wadimedicalcenter.pythonanywhere.com/";
  const [post, setPost] = React.useState(null);
  var dataToPass=null;
  const navigate=useNavigate();
  const cookie=Cookie();
  const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
  console.log(headers.Authorization);
  //extracting information from api
  React.useEffect(()=> {
    if(headers.Authorization!=='Token undefined'){
      axios.get(`${BASE_URL}appointment/Doctors`,{headers}).then((res) => {
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

  

 
 
  //openning Doctor Reserved Appoinments and sending info
 const openDoctorReservedAppoinments=(name)=>(e)=>{
  console.log(name);
  e.preventDefault();
    const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
  axios.post(`${BASE_URL}appointment/see_schedule`,{
     name,
    },{headers}).then((res)=>{console.log("data is here after sending name",res);
    if(res.data!==null){console.log('we will pass it to next page',res.data);
    navigate('/DoctorReservedAppoinments', { replace: true, state: {data:res.data,}})
  }}
    ).catch(err=>console.log(err))
}

  return (
    <>
    {headers.Authorization!=='Token undefined'?
    <div className='AllDoctors'>
      <LeftSideBar>
        <LeftSideBarHeading>Booking Appoinments</LeftSideBarHeading>
        </LeftSideBar>
        <ScrollableContent>
        <TableHeading>Doctors</TableHeading>
        <Table zero="Name"  second="Section" fourth="Presence" >
        {
   (() => {
       if (post!==null){
        if(post.result==="ok"){
          return  post.Doctors.map((val,i)=>
          <tr key={i}>
               <td>{val.Name}</td>
               <td></td>
               <td>{val.Section}</td>
               <td></td>
               <td>{val.Presence}</td>
               <td>
                 <button className='SeeSchedule' onClick={openDoctorReservedAppoinments(val.Name)}><a href='/DoctorReservedAppoinments' >See Schedule</a></button>
               </td>
   
   
            </tr>
           )}
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

export default AllDoctors
