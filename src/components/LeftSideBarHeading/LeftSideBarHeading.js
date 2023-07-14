import './LeftSideBarHeading.css'

const LeftSideBarHeading = (props) => {
  return (
    <div className='LeftSideBarHeading'>
      {props.children}
    </div>
  )
}

const SideBarDivHeading = (props) => {
  return (
    <div className='SideBarDivHeading'>
      {props.children}
    </div>
  )
}
const SideBarDivText = (props) => {
  return (
    <div className='SideBarDivText'>
      {props.children}
    </div>
  )
}
export default LeftSideBarHeading
export {SideBarDivHeading}
export {SideBarDivText}