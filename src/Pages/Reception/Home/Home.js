import {LeftSideBar,ScrollableContent} from '../../../Sections/index'
import { TableHeading ,Table } from '../../../components/index'
import { Xicon } from '../../../components/index'
import './Home.css'
import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookie from "cookie-universal"
import { Navigate } from "react-router-dom";

const Home = () =>{
  const BASE_URL="http://wadimedicalcenter.pythonanywhere.com/";

//extracting information from api
    const [post,setPost]=useState('');
    const cookie=Cookie();
    const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
      React.useEffect( ()=> {
         if(headers.Authorization!=='Token undefined'){
           axios
           .get(`${BASE_URL}appointment/today_appointments`,{headers}).then((res) => {
             setPost(res.data);
          })}
        }, []);
          console.log(post);
          if(post.result==="ok"&&post.message==="there is no appointments today"){
            toast.warn(post.message, {
             position: "top-right",
             autoClose: 5000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
             theme: "light",
             });
         }else if(post.result==="invalid"&&post.message==="you don't have permission to this action"){
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
        }
    

   return (
    <>
    {headers.Authorization!=='Token undefined'?
    <div className='Home'>
      <LeftSideBar></LeftSideBar>
      <ScrollableContent>
        <TableHeading>Today's Appointments</TableHeading>
        <Table zero="Time" first="Name" second="FileNumber" third="Section" fourth="Competent" fifth="Attend">
        {
   (() => {
       if (post!==null){
        if(post.result==="ok"&&post.message!=="there is no appointments today"){
          return  post.appointment.map((val,i)=>
          <tr key={i}>
               <td>{val.time}</td>
              <td>{val.Name}</td>
              <td>{val.FileNumber}</td>
              <td>{val.Section}</td>
              <td>{val.Competent}</td>
              <td >
                  <Xicon attend={val.attend} appointment_id={val.appointment_id} is_doctor={val.is_doctor}/>
                  
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

export default Home
