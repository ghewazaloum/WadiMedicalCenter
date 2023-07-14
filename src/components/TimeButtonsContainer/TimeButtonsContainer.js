import './TimeButtonsContainer.css'
import {TimeButton} from '../index'
import { Fragment } from 'react';

const TimeButtonsContainer = (props) => {
  var availableAppointments=props.availableAppointments;
  if (availableAppointments==='')return null;
  return (
  
    <div className='TimeButtonsContainer'>
      
        {availableAppointments.map((val,i)=>
        <div key={i}>
          {i%2===0?
          <>
          {availableAppointments[i]!==undefined?
          <TimeButton>{availableAppointments[i]}</TimeButton>:
          null}

        {availableAppointments[i+1]!==undefined&&i<=availableAppointments.length?
        <TimeButton>{availableAppointments[i+1]}</TimeButton>
        :null} 

        </>:null}

        </div>)
        }
              
 
 
 
    </div>
  )
}

export default TimeButtonsContainer
