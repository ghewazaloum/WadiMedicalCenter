import './Devices.css'
import { TableHeading,Table,LeftSideBarHeading } from '../../../components/index'
import { ScrollableContent,LeftSideBar } from '../../../Sections/index'
import React from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom";

const Devices = () => {
  const BASE_URL="http://wadimedicalcenter.pythonanywhere.com/";
  const [post, setPost] = React.useState(null);
  var dataToPass=null;
  const navigate=useNavigate();
  const cookie=Cookie();
  const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
//extracting information from api
React.useEffect(()=> {
  if(headers.Authorization!=='Token undefined'){
  axios.get(`${BASE_URL}appointment/Devices`,{headers}).then((res) => {
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

//openning Device Reserved Appoinments and sending info
const openDeviceReservedAppoinments=(name)=>(e)=>{
  console.log(name);
  e.preventDefault();
  const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
  axios.post(`${BASE_URL}appointment/device_reserved_appointments`,{
     name,
    },{headers}).then((res)=>{console.log("data is here after sending name",res);
    if(res.data.result==="ok"){console.log('we will pass it to next page',res.data);
    navigate('/DevicesReservedAppointments', { replace: true, state: {data:res.data,}})
  }else if(res.data.result==="invalid"&&res.data.message=== "you don't have permission to this action"){
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
  }});
}


  return (
    <>
    {headers.Authorization!=='Token undefined'?
    <div className='Devices'>
         <LeftSideBar>
        <LeftSideBarHeading>Booking Appoinments</LeftSideBarHeading>
        </LeftSideBar>
        <ScrollableContent>
        <TableHeading>Devices & Services</TableHeading>
        <Table zero="Name"  second="Section" fourth="Active" >
        {
   (() => {
       if (post!==null){
        if(post.result==="ok"){
          return  post.Devices.map((val,i)=>
          <tr key={i}>
               <td>{val.Name}</td>
               <td></td>
               <td>{val.Section}</td>
               <td></td>
               <td>{val.active}</td>
               <td>
                 <button className='SeeSchedule'onClick={openDeviceReservedAppoinments(val.Name)}><a href='/DevicesReservedAppointments' >See Schedule</a></button>
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

export default Devices
