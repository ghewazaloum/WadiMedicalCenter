import './Statistics.css'
import {TableHeading,SideBarDivText,Rate, Graph,SideBarDivHeading, SideBarDiv} from '../../../components/index'
import {LeftSideBar,ScrollableContent} from '../../../Sections/index'
import { useState } from 'react';
import Cookie from "cookie-universal"
import axios from 'axios'
import React from 'react'


const Statistics = () => {
const BASE_URL="http://wadimedicalcenter.pythonanywhere.com/";
const cookie=Cookie();
const headers = { 'Authorization': `Token ${cookie.get('Token')}` };
const[OpenList,setOpenList]=useState(true);//to open technican list
const[Section,setSection]=useState("Heart");
const[cleanless,setcleanless]=useState('');
const[treatment_od_medical_staff,settreatment_od_medical_staff]=useState('');
const[reception,setreception]=useState('');
const[competents_information ,setcompetents_information]=useState('');
const [WeekOrMonth,SetWeekOrMonth]=useState('0');


const[sections,setSections]=useState(null);

//extracting sections from api 
React.useEffect(()=> {
  var sectionName=Section;
    if(headers.Authorization!=='Token undefined'){
    axios.get(`${BASE_URL}/appmanager/section_names`,{headers}).then((res) => {
      console.log(res)
      if(res.data.result==="ok"){
        setSections(res.data.sections);
      }
    })};
    axios.post(`${BASE_URL}manager/statistics_week`,{
      sectionName,      
    },{headers}).then(res=>{
      console.log('graph data',res);
      if (res.data.result==="ok"){
        setcleanless(res.data.cleanless);
        setreception(res.data.reception);
        settreatment_od_medical_staff(res.data.treatment_od_medical_staff);
        setcompetents_information(res.data.competents_information)
      }
  
  }).catch(err=>console.log(err))    
  }, []);
//fucntion whom open and close list
const OpenCloseList=(e)=>{
  if(OpenList===false){
    setOpenList(true);
  }else{setOpenList(false)}
};
//save the value of Device section in a variable
const handleSection=(val)=>(e)=>{
  if(e.target.className==="TechnicanNotSelected"){
    setSection(val.val);
  e.target.className="TechnicanSelected";

  }else{
    e.target.className="TechnicanNotSelected";

    setSection('');
  }  
}
//fucntion whom put week or month in variables
const handleWeekOrMonth=(e)=>{
  SetWeekOrMonth(e.target.value);
}
//fucntion whom put week or month in variables
const viewgraph=(e)=>{
  e.preventDefault();
  var sectionName=Section;
  console.log(sectionName)
  console.log(WeekOrMonth)
  if(sectionName!==''){
    if(WeekOrMonth==='0'){
      axios.post(`${BASE_URL}manager/statistics_week`,{
        sectionName,      
      },{headers}).then(res=>{
        console.log('graph data for week',res);
        if (res.data.result==="ok"){
          setcleanless(res.data.cleanless);
          setreception(res.data.reception);
          settreatment_od_medical_staff(res.data.treatment_od_medical_staff);
          setcompetents_information(res.data.competents_information)
        }
    
    }).catch(err=>console.log(err))
    
    }else{
      axios.post(`${BASE_URL}manager/statistics_month`,{
        sectionName,      
      },{headers}).then(res=>{
        console.log('graph data for month',res);
        if (res.data.result==="ok"){
          setcleanless(res.data.cleanless);
          setreception(res.data.reception);
          settreatment_od_medical_staff(res.data.treatment_od_medical_staff);
          setcompetents_information(res.data.competents_information)
        }
    
    }).catch(err=>console.log(err))
  
    }
  }else{
    console.log("enter section")
  }

 
}
//console.log(reception,treatment_od_medical_staff,cleanless,competents_information)

  return (
    <div className='Statistics'>
       <LeftSideBar>

        <div style={{"marginTop":"10%"}}>
           {/*....................technichan menu trigger.......................*/}
        <div className='menu-trigger'>
        <SideBarDivText>
          pick a section
          <svg onClick={OpenCloseList} className='DropDownListArrow' xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="arrow-drop-down">
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path d="m7 10 5 5 5-5H7z"></path>
            </svg>
       </SideBarDivText>
        </div> 
       {/*....................technichan menu.......................*/}
        {OpenList===true?
        <div className="TechnicanList">
        <ul>   
          {sections!==null?
          sections.map((val,i)=>
          <li key={i} >
            {val!==Section?
           <a className='TechnicanNotSelected'onClick={handleSection({val})}>{val}</a>:
           <a className='TechnicanSelected'onClick={handleSection({val})}>{val}</a>}
          </li> 
         ):null} 
       </ul>  
          
      </div> :<div className='EmptyTechnicanList'></div>}
                        
    {/*............................................................... */}  

        <SideBarDivText>Weekly/Monthly Statistics:</SideBarDivText>
          <div style={{"marginTop":"5%","marginLeft":"10%"}}>
          <div className='GenderRadioButtonDiv' >
          <input type="radio" value="0"  name="weekormonth" onClick={handleWeekOrMonth} required defaultChecked/> Weekly
          </div>
          <div className='GenderRadioButtonDiv'>
          <input type="radio" value="1"  name="weekormonth" onClick={handleWeekOrMonth} required/> Monthly
          </div>
          </div> 
          <button className='viewGraph'>
            <a href='' onClick={viewgraph}>
             View Graph
            </a>
            </button>
          </div>

        </LeftSideBar>
        <ScrollableContent>
        <TableHeading>Statistics:</TableHeading>
        <Graph competents_information={competents_information}/>
        <div className='ContainerOfMultiRate'>
        <div className='rate'>
          <div className='ratetext'>reception</div><Rate NumberOfStars={reception}/>
        </div>
        <div className='rate'>
          <div className='ratetext'>cleanlines</div><Rate NumberOfStars={cleanless}/>
        </div>
        <div className='rate'>
          <div className='ratetext'>treatment of the medical staff</div><Rate NumberOfStars={treatment_od_medical_staff}/>
        </div>
        </div>
        <hr/>
        <div className='DoctorAndTech'>Doctors And Technicans:</div>
        <div className='ContainerOfDoctorAndTech'>
        {
   (() => {
       if (competents_information!==''){
          return  competents_information.map((val,i)=>
          <div className='rate' key={i}>
          <div className='ratetext'>{val.name}</div><Rate NumberOfStars={val.therapistingRate}/>
        </div>

           )   
   }})()
}


        </div>
        </ScrollableContent>
        
    </div>
  )
}

export default Statistics
