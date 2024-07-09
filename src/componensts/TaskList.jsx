import React from 'react'

export const TaskList = ({ allTasks, removetask ,SetCompletedTask , completedTasks}) => {  // props is arguement passed by parent to its child component
  const handleCheckboxChange=(taskId)=>{
    SetCompletedTask(taskId);
  }
  return (
    <>
      <div className="flex space-x-2 items-center lg:px-10 px-3 ">
        <p className="w-[40%] font-medium text-left ">Tasks</p>
        <p className="w-[20%] font-medium hidden lg:block ">When</p>
        <p className="w-[20%] font-medium hidden lg:block ">Priority</p>

      </div>
      <ul className="all-tasks mt-4">
        {allTasks.map((task, id) => {
          return (
            <li key={id} className=' w-full flex  lg:space-x-2 lg:items-start lg:px-10 px-3 my-1 '>
              <span>{id + 1}.</span>
              <p id='' className={`${completedTasks[id] && 'line-through text-gray-500' } w-[80%] lg:w-[40%] break-words text-left `}>{task.desc}</p>
              <p id='' className="w-[20%] break-words hidden lg:block ">{task.due_time}</p>
              <p id='' className="w-[20%] break-words hidden lg:block ">{task.priority}</p>
              <p id='' className="w-[20%] flex items-end space-x-4">
                <span className='' >
                  <input onChange={()=>handleCheckboxChange(id)} type="checkbox"  checked={completedTasks[id] ?true:false} className=" w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 rounded-lg" />
                </span>
                { completedTasks[id] &&
                  (<span onClick={() => removetask(id)} className=' text-red-600  px-2 py-1 rounded-full hover:bg-gray-200'>
                    <i className="fa-solid fa-trash fa-lg "></i>
                  </span>)
                }
              </p>
            </li>
          )
        })}
      </ul>
    </>
  )
}
