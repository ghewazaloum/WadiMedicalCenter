import './Login.css'
import logo from '../../Assests/images/logo.png'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal"
import React from 'react';
const Login  = () => {
   const BASE_URL="http://wadimedicalcenter.pythonanywhere.com/";

//initializing variables and set function (react hook)
  const [details,setDetails]=useState({
    username:"",
    password:"",
  })
//cookie
const cookie=Cookie();   
  const [empty,setEmpty]=useState(false)
  const [invalidInput,setinvalidInput]=useState(false)
  const navigate=useNavigate();
  React.useEffect( ()=> {
  // console.log(`${BASE_URL}employee_login`);
   cookie.remove('Token')
    }, []);
//fucntion whom put an input value in variables
  const handleChange=(e)=>{
    const {name,value}=e.target;
    /* const name= e.target.name;
     const value=e.target.value;*/
     setDetails((prev)=>{
      return{...prev,[name]:value};
     });

  };

//function whom send values in http request  
  const handleLogin=(event)=>{

    event.preventDefault();
    if (details.username.length!==0 && details.password.length!==0){
    /*console.log(details.username);
    console.log(details.password);*/
    axios.post(`${BASE_URL}/employee_login`,{
      username:details.username,
      password:details.password,
      
    }).then(res=>{
      console.log('posting data',res);
      cookie.set("Token",res.data.token);
      //window.location.pathname="/";
      if(res.data.result==="ok"&&res.data.role==="RECEIPTION"){navigate('/Home');
   }else if(res.data.result==="ok"&&res.data.role==="APPMANAGER"){navigate('/DoctorsAppManager')
   }else if(res.data.result==="ok"&&res.data.role==="MANAGER"){navigate('/Statistics')
   }else{navigate('/')}
   //else if{res.data.result==="ok"&&res.data.role==="MANAGER"
    

    if(res.data.message==="username or password maybe incorrect"){setinvalidInput(true);setEmpty(false);console.log(invalidInput,"should be true")};
    }).catch(err=>console.log(err))
 
  }
    else{setEmpty(true);setinvalidInput(false);}

   // document.getElementById("InvalidInputTextBox").value="";
}
//console.log(empty);
//console.log(empty,"red")
//console.log(invalidInput,"yellow");
  return (
    <div className='Login' >
       <div className='MiddleContainer'>
       <div className='div1'>
       <img src={logo} alt=''/>
       <div className='AlwadiMedicalDiv'>ALWADI MEDICAL
       <div className='ArabicDiv'>مركز الوادي الطبي</div>
       </div>
       </div>
       
      <div className="div2"></div>

      <div className='div3'>
      <div className='UserNameDiv' >User Name 
      {
   (() => {
       if (empty&&details.username.length===0)
          return <div className='RequiredDiv1' >Required!</div>
       if (invalidInput)
          return <div className='invalidInputDiv' >Invalid Username or Password</div>
       else 
          return <div className='EmptyDiv'>''</div>
   })()
}
      </div>
      {/*...............................................................*/}
      {
   (() => {
       if (empty&&details.username.length===0)
          return <input id="EmptyTextBox" placeholder='Enter Your Name...' type='text' name='username' onChange={handleChange}/>
       if (invalidInput)
          return <input id="InvalidInputTextBox" placeholder='Enter Your Name...' type='text' name='username' onChange={handleChange}/>
       else 
          return   <input id="TextBox" placeholder='Enter Your Name...' type='text' name='username' onChange={handleChange}/>
   })()
}
      {/*...............................................................*/}
      <div className='UserNameDiv' >Password   
      {
   (() => {
       if (empty&&details.password.length===0)
          return <div className='RequiredDiv2' >Required!</div>
       if (invalidInput)
          return <div className='EmptyDiv'>''</div> 
       else 
          return <div className='EmptyDiv'>''</div>
   })()
}
      </div>
      {/*...............................................................*/}
      {
   (() => {
       if (empty&&details.password.length===0)
          return <input id="EmptyTextBox" placeholder='Enter Your Password...' type='password' name='password' onChange={handleChange}/>
        if (invalidInput)
          return <input id="InvalidInputTextBox" placeholder='Enter Your Password...' type='password' name='password' onChange={handleChange}/>
       else 
          return  <input id="TextBox"autoComplete="new-password" placeholder='Enter Your Password...' type='password' name='password' onChange={handleChange}/>
   })()
}
      {/*...............................................................*/}
      <div className='LoginButton'>
      <a className='Logina' href='' onClick={handleLogin}>Login</a>:
     </div>
      </div>
       </div>
    </div>
    
  )
}

export default Login 
