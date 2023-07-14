import './ScrollableContent.css'

const ScrollableContent = (props) => {
  return (
    <div className='ScrollableContent'>
      {props.children}
    </div>
  )
}

export default ScrollableContent
