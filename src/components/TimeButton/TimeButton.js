import './TimeButton.css'

const TimeButton = (props) => {
  const changeStyle=(e)=>{
    if (e.target.className==="TimeButton"){
      e.target.className="ActivatedTimeButton";
     var TimeButtons=document.getElementsByClassName("TimeButton");
     for(var i=0;i<TimeButtons.length;i++){
       TimeButtons[i].style.pointerEvents = "none";
     }
   }
   
   else if (e.target.className==="ActivatedTimeButton"){
    e.target.className="TimeButton";
   var TimeButtons=document.getElementsByClassName("TimeButton");
   for(var i=0;i<TimeButtons.length;i++){
     TimeButtons[i].style.pointerEvents = "fill";
   }
 }

  }
  return (
    <div onClick={changeStyle} className='TimeButton'>
      {props.children}
    </div>
  )
}

export default TimeButton
