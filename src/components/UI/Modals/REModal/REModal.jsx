import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { GetIcon } from "../../../../icons";
import REButton from "../../REButton/REButton";
import formatDate from "../../../../utils/DateConverter/DateConverter";
import { useState, useEffect } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";

const REModal = ({ modalOpen, handleClose, task, setModalOpen, clickOnDelete, onTaskUpdate }) => {

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: '',
    description: '',
    dueDate: null
  });
  const [errors, setErrors] = useState({});

  // Initialize edited task when task prop changes or modal opens
  useEffect(() => {
    if (task && modalOpen) {
      setEditedTask({
        title: task.title || '',
        description: task.description || '',
        dueDate: task.dueDate ? dayjs(task.dueDate) : dayjs()
      });
      setErrors({});
      setEdit(false);
    }
  }, [task, modalOpen]);

  const handleDelete = (task) => {
    clickOnDelete(task);
    setModalOpen(false);
  };

  const handleInputChange = (field, value) => {
    setEditedTask(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!editedTask.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!editedTask.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!editedTask.dueDate || !editedTask.dueDate.isValid()) {
      newErrors.dueDate = 'Valid due date is required';
    } else if (editedTask.dueDate.isBefore(dayjs(), 'minute')) {
      newErrors.dueDate = 'Due date cannot be in the past';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const updatedTask = {
      ...task,
      title: editedTask.title.trim(),
      description: editedTask.description.trim(),
      dueDate: editedTask.dueDate.format('M/D/YYYY, h:mm:ss A') // Format to match your existing format
    };

    // Call the update function passed from parent
    if (onTaskUpdate) {
      onTaskUpdate(updatedTask);
    }

    setEdit(false);
  };

  const handleCancel = () => {
    // Reset to original values
    setEditedTask({
      title: task.title || '',
      description: task.description || '',
      dueDate: task.dueDate ? dayjs(task.dueDate) : dayjs()
    });
    setErrors({});
    setEdit(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Modal
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[40%] min-h-[79%] max-h-[80%] rounded-lg shadow-xl bg-white border-none overflow-hidden flex flex-col">

            <div className="flex justify-between items-center p-5 border-b-2 border-gray-200">
              <div className="flex items-center gap-2 flex-1">
                {edit ? (
                  <div className="flex-1 mr-4">
                    <TextField
                      value={editedTask.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      variant="outlined"
                      size="small"
                      fullWidth
                      error={!!errors.title}
                      helperText={errors.title}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          fontSize: '1.5rem',
                          fontWeight: 'bold'
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-lightBlack">{task?.title}</div>
                )}

                <div className="">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${task?.status === 'new' ? 'bg-blue-100 text-blue-800' :
                    task?.status === 'ongoing' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                    {task?.status.charAt(0).toUpperCase() + task?.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="cursor-pointer" onClick={handleClose}>
                <GetIcon name="CrossIcon" className="h-6 w-6" />
              </div>
            </div>

            {new Date() > new Date(task?.dueDate) && (
              <div className="mt-4 mx-5 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <GetIcon name="OverDueIcon" className="w-5 h-5 text-red-500" />
                  <p className="text-red-700 font-semibold">This task is overdue!</p>
                </div>
              </div>
            )}

            <div className="px-5 py-4 border-b-2 border-gray-200">
              <div className='flex flex-col gap-2'>
                <div className='flex gap-2'>
                  <GetIcon name="CreateIcon" className='w-5 h-5 text-blue-500' />
                  <p className="text-gray-800 text-sm"> Created At: <span className='font-semibold'>{formatDate(task?.createdAt)}</span></p>
                </div>
                <div className='flex gap-2 items-center'>
                  <GetIcon name="CalendarIcon" className='w-5 h-5 text-red-500' />
                  {edit ? (
                    <div className="flex-1">
                      <DateTimePicker
                        label="Due Date & Time"
                        value={editedTask.dueDate}
                        onChange={(newValue) => handleInputChange('dueDate', newValue)}
                        slotProps={{
                          textField: {
                            size: 'small',
                            error: !!errors.dueDate,
                            helperText: errors.dueDate,
                            sx: { width: '250px' }
                          }
                        }}
                        minDateTime={dayjs()}
                      />
                    </div>
                  ) : (
                    <p className="text-gray-800 text-sm">Due Date: <span className='font-semibold'>{formatDate(task?.dueDate)}</span></p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="mx-1 my-5">
                <div className="p-4">
                  <div className="mb-4">
                    <h3 className="font-semibold text-lg mb-2">Description:</h3>
                    {edit ? (
                      <TextField
                        value={editedTask.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        error={!!errors.description}
                        helperText={errors.description}
                        placeholder="Enter task description..."
                      />
                    ) : (
                      <p className="text-gray-700">{task?.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="py-4 border-t-2 border-gray-200 bg-white mt-auto">
              <div className="flex flex-wrap justify-center gap-2">
                {edit ? (
                  <>
                    <REButton
                      text="Save"
                      className="bg-green-500 text-white hover:bg-green-600 rounded-lg"
                      onClick={handleSave}
                      customSize="px-5 py-2"
                    />
                    <REButton
                      text="Cancel"
                      className="bg-gray-500 text-white hover:bg-gray-600 rounded-lg"
                      onClick={handleCancel}
                      customSize="px-5 py-2"
                    />
                  </>
                ) : (
                  <>
                    <REButton
                      text="Edit"
                      className="bg-blue-500 text-white hover:bg-blue-600 rounded-lg"
                      onClick={() => setEdit(true)}
                      customSize="px-5 py-2"
                    />
                    <REButton
                      text="Delete"
                      className="bg-red-500 text-white hover:bg-red-600 rounded-lg"
                      onClick={() => setDeleteModalOpen(true)}
                      customSize="px-5 py-2"
                    />
                    <REButton
                      text="Close"
                      className="bg-gray-300 text-gray-800 hover:bg-gray-400 rounded-lg"
                      onClick={() => setModalOpen(false)}
                      customSize="px-5 py-2"
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </Modal>

        <DeleteModal
          modalOpen={deleteModalOpen}
          handleClose={() => setDeleteModalOpen(false)}
          task={task}
          setModalOpen={setDeleteModalOpen}
          clickOnDelete={handleDelete}
        />
      </div>
    </LocalizationProvider>
  );
};

export default REModal;