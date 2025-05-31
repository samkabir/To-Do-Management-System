import React from 'react'
import { GetIcon } from '../../../icons'
import formatDate from '../../../utils/DateConverter/DateConverter'

const TaskCard = ({task, clickOnEdit, clickOnDelete}) => {
    
  return (
    <div>
        <div className={`${new Date() > new Date(task.dueDate)  ? 'bg-red-200' : 'bg-white' }  shadow-md rounded-lg p-4 mb-4`}>
            {new Date() > new Date(task.dueDate) && (
                <div className='flex items-center justify-center'>
                    <div className='flex items-center gap-2 border-2 border-red-500 rounded-lg px-2 py-1'>
                        <p className="text-red-500 font-semibold text-sm">Overdue</p>
                        <GetIcon name="OverDueIcon" className='w-4 h-4 text-red-500' />
                    </div>
                </div>
            )}
            <div className='flex items-center justify-between border-b-2 mb-2'>
                <div className=''>
                    <h2 className="text-xl font-semibold  mb-2">{task.title}</h2>
                </div>
                <div className='flex gap-2 items-center'>
                    <GetIcon name="EditIcon" className='w-6 h-6 cursor-pointer text-gray-400 hover:text-gray-800' onClick={()=>{clickOnEdit(task)}} />
                    <GetIcon name="TrashIcon" className='w-6 h-6 cursor-pointer text-red-300 hover:text-red-800 ' onClick={()=>{clickOnDelete(task)}} />
                </div>
            </div>
            <p className="text-gray-700 border-b-2 mb-2">{task.description}</p>
            <div className='flex flex-col gap-2'>
                <div className='flex   gap-2'>
                    <GetIcon name="CreateIcon" className='w-5 h-5 text-blue-500'/><p className="text-gray-800 text-sm"> Created At: <span className='font-semibold'>{formatDate(task.createdAt)}</span></p>
                </div>
                <div className='flex gap-2'>
                    <GetIcon name="CalendarIcon" className='w-5 h-5 text-red-500'/><p className="text-gray-800 text-sm">Due Date: <span className='font-semibold'>{formatDate(task.dueDate)}</span></p>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default TaskCard