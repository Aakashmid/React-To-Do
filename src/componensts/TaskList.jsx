import React from 'react'

export const TaskList = (props) => {  // props is arguement passed by parent to its child component
  return (
    <>
    <div className="flex space-x-2 items-center">
        <p className="grow-[2] font-medium  ">Task</p>
        <p className="grow font-medium  ">When</p>
        <p className="grow font-medium  ">Priority</p>
    </div>
    </>
  )
}
