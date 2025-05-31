import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    IconButton,
    Typography
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import REButton from '../../REButton/REButton';

const CreateTaskModal = ({ modalOpen, handleClose, onTaskCreate }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: new Date(new Date().setDate(new Date().getDate() + 7))
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (field) => (event) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
        
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleDateChange = (newDate) => {
        setFormData(prev => ({
            ...prev,
            dueDate: newDate
        }));

        if (errors.dueDate) {
            setErrors(prev => ({
                ...prev,
                dueDate: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!formData.dueDate || isNaN(new Date(formData.dueDate))) {
            newErrors.dueDate = 'Valid due date is required';
        } else if (new Date(formData.dueDate) < new Date()) {
            newErrors.dueDate = 'Due date cannot be in the past';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            const newTask = {
                id: Date.now(),
                title: formData.title.trim(),
                description: formData.description.trim(),
                status: 'new',
                createdAt: new Date().toLocaleString(),
                dueDate: formData.dueDate.toLocaleString()
            };

            await onTaskCreate(newTask);
            handleModalClose();
        } catch (error) {
            console.error('Error creating task:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleModalClose = () => {
        setFormData({
            title: '',
            description: '',
            dueDate: new Date(new Date().setDate(new Date().getDate() + 7))
        });
        setErrors({});
        setIsSubmitting(false);
        handleClose();
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Dialog
                open={modalOpen}
                onClose={handleModalClose}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        minHeight: '400px'
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        pb: 1
                    }}
                >
                    <Typography variant="h5" component="div" fontWeight="bold">
                        Create New Task
                    </Typography>
                    <IconButton
                        onClick={handleModalClose}
                        size="small"
                        sx={{
                            color: 'grey.500',
                            '&:hover': {
                                color: 'grey.700'
                            }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            label="Task Title"
                            variant="outlined"
                            fullWidth
                            value={formData.title}
                            onChange={handleInputChange('title')}
                            error={!!errors.title}
                            helperText={errors.title}
                            placeholder="Enter task title..."
                            autoFocus
                        />

                        <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            value={formData.description}
                            onChange={handleInputChange('description')}
                            error={!!errors.description}
                            helperText={errors.description}
                            placeholder="Enter task description..."
                        />

                        <DateTimePicker
                            label="Due Date & Time"
                            value={formData.dueDate}
                            onChange={handleDateChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    error={!!errors.dueDate}
                                    helperText={errors.dueDate}
                                />
                            )}
                            minDateTime={new Date()}
                        />
                    </Box>
                </DialogContent>

                <DialogActions sx={{ p: 3, gap: 1 }}>
                    <REButton
                        text="Reset"
                        className="bg-gray-300 text-gray-800 hover:bg-gray-400 rounded-lg"
                        onClick={() => {
                            setFormData({
                                title: '',
                                description: '',
                                dueDate: new Date(new Date().setDate(new Date().getDate() + 7))
                            });
                            setErrors({});
                        }}
                        customSize="px-5 py-2"
                    />
                    <REButton
                        text="Cancel"
                        className="bg-red-300 text-gray-800 hover:bg-red-400 rounded-lg"
                        onClick={() => {
                            handleModalClose();
                        }}
                        customSize="px-5 py-2"
                    />

                      <REButton
                        text={isSubmitting ? 'Creating...' : 'Create Task'}
                        className="bg-blue-300 text-gray-800 hover:bg-blue-400 rounded-lg"
                        onClick={() => {
                            handleSubmit();
                        }}
                        customSize="px-5 py-2"
                    />
                </DialogActions>
            </Dialog>
        </LocalizationProvider>
    );
};

export default CreateTaskModal;