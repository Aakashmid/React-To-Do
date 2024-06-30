import React from 'react'

export const TaskList = ({allTasks}) => {  // props is arguement passed by parent to its child component
  return (
    <>
    <div className="flex space-x-2 items-center">
        <p className="grow-[2] font-medium  ">Task</p>
        <p className="grow font-medium  ">When</p>
        <p className="grow font-medium  ">Priority</p>
    </div>
    <ul className="all-tasks mt-4">
    {allTasks.map((task,id)=>{
      return  (
      <li className='w-full flex space-x-2 items-center '>
        <p className=" grow-[2] ">{task.desc}</p>
        <p className=" grow ">{task.due_time}</p>
        <p className=" grow ">{task.priority}</p>
      </li>
    ) 
    })}
    </ul>
    </>
  )
}
