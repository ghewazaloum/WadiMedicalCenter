import './Buttons.css'


const DeleteButton = (props) => {
  return (
    <button className='DeleteButton'>
        <a href=''>
        {props.children}
        </a>
        </button>
  )
}

const EditButton = (props) => {
    return (
        <button className='EditButton'>
            <a href=''>
            {props.children}
            </a>
            </button>
      )
  }
const ConfirmButton = (props) => {
    return (
        <button className='Confirm'>
            <a href=''>
            {props.children}
            </a>
            </button>
      )
  }
export default DeleteButton
export {EditButton}
export {ConfirmButton}
