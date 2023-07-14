import './Table.css'

import React from 'react';
const Table = (props) => {

  return (
    <table >
      <thead>
        <tr className='FirstRow'>
                <th>{props.zero}</th>
                <th>{props.first}</th>
                <th>{props.second}</th>
                <th>{props.third}</th>
                <th>{props.fourth}</th>
                <th>{props.fifth}</th>
            </tr>
     </thead>
     <tbody>
          {props.children}
     </tbody>

    </table>
  )
}

export default Table
