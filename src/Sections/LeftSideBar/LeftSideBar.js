import './LeftSideBar.css'

const LeftSideBar = (props) => {
  return (
    <div className='LeftSideBar'>
      {props.children}
    </div>
  )
}

export default LeftSideBar
