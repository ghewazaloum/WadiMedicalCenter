import './Container.css'

const Container = (props) => {
  return (
    <div className='c'>
     {props.children}
    </div>
  )
}

export default Container
