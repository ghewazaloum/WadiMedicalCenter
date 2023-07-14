import './SideBarDiv.css'

const SideBarDiv = (props) => {
  return (
    <div className='LeftSideBarDiv'>
      {props.children}
    </div>
  )
}

export default SideBarDiv
