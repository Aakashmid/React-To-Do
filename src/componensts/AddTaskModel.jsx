import React from 'react'


export const AddTaskModel = ({newTask,setNewTask,addTask,close}) => {

    const handleChange=(e)=>{
        const {id,value}=e.target
        const task={...newTask,[id]:value}
        setNewTask(task)
    }
  return (
    <>
    <span  className='lg:block hidden fixed w-full h-full top-0 left-0 bg-black opacity-30' onClick={close}></span>
    <div className='lg:block hidden z-20 w-[85vw] md:w-3/4 xl:w-3/5 absolute top-1/3 left-1/2  -translate-x-1/2 -translate-y-1/3 bg-white rounded-xl lg:p-4 p-2'>
        <span className='absolute right-2 top-2 px-2 py-1  hover:bg-gray-300' onClick={close}><i className="fa-solid fa-xmark fa-lg"></i></span>
        <h1 className='font-semibold text-xl p-1 mt-6'>New Task</h1>
        <form onSubmit={addTask} className='flex-col flex space-y-4 mt-6 lg:p-3 p-2' >
            <div className="flex flex-col items-start">
                <label htmlFor="desc">What is to be done ?</label>
                <input className='focus:outline-blue-300 outline outline-offset-1 outline-none border rounded p-2 w-full ' id='desc' placeholder='Enter task here' type="text" value={newTask.desc} onChange={handleChange} required />
            </div>
            <div className="flex  items-start">
                <label htmlFor="priority">Prioriy :  </label>
                <select  id="priority" className='focus:outline-blue-300 outline outline-offset-1 outline-none rounded' value={newTask.priority} onChange={handleChange} required >
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                </select>
            </div>

            <div className="flex flex-col items-start">
                <label htmlFor="due_time">Due date time</label>
                <input id='due_time' className='focus:outline-blue-300 outline outline-offset-1 outline-none border rounded p-2'  type="datetime-local" value={newTask.due_time} onChange={handleChange} required />
            </div>
            <button className=' py-2 rounded w-fit  px-10 bg-blue-500 text-white hover:bg-blue-600 ' type='submit'>Add Task </button>
        </form>
    </div>
    </>
  )
}
