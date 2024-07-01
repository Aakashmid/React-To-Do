import React from 'react'

export const TaskList = ({ allTasks }) => {  // props is arguement passed by parent to its child component
  return (
    <>
      <div className="flex space-x-2 items-center px-10 ">
        <p className="w-[40%] font-medium  ">Task</p>
        <p className="w-[20%] font-medium  ">When</p>
        <p className="w-[20%] font-medium  ">Priority</p>
        <p className="w-[20%] font-medium  ">Action</p>
      </div>
      <ul className="all-tasks mt-4">
        {allTasks.map((task, id) => {
          return (
            <li className='w-full flex space-x-2 items-start px-10 '>
              <span>{id + 1}.</span>
              <p className="w-[40%] break-words text-left ">{task.desc}</p>
              <p className="w-[20%] break-words  ">{task.due_time}</p>
              <p className="w-[20%] break-words  ">{task.priority}</p>
              <p className="w-[20%] flex justify-center items-baseline space-x-2">
                <span className='' >
                  <input type="checkbox" value="" className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                </span>
                <span className='px-2 py-1 rounded-full hover:bg-gray-200'>
                  <i className="fa-solid fa-trash"></i>
                </span>
              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}
