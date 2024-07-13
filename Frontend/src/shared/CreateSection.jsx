
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, IconButton, Divider, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DropZone from './DropZone';
import { useDispatch } from 'react-redux';
import { createEmp, EditEmployee } from '../actions/empActions';
import { enqueueSnackbar, useSnackbar } from "notistack";


const CreateSection = ({ mode, data }) => {
    const [open, setOpen] = useState(false);
    console.log(data, "asd")
    const [previewImage2, setPreviewImage2] = useState(null);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        avatar: '',
    });

    const [formErrors, setFormErrors] = useState({
        name: false,
        email: false,
        phone: false,
    });

    useEffect(() => {
        if (mode === 'edit') {
            setFormData({
                name: data?.name || '',
                email: data?.email || '',
                phone: data?.phone || '',
                avatar: data?.avatar || '',
            });
            setPreviewImage2(data?.avatar || null);
        } else {
            setFormData({
                name: '',
                email: '',
                phone: '',
                avatar: '',
            });
            setPreviewImage2(null);
        }
    }, [mode, data]);


    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setFormData({
            name: '',
            email: '',
            phone: '',
            avatar: '',
        });
        setFormErrors({
            name: false,
            email: false,
            phone: false,
        });
        setPreviewImage2(null);
    };

    // const closeHandler = () => {
    //     setOpen(false);
    // }


    const onFileUpload = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage2(reader.result);
            setFormData((prevFormData) => ({
                ...prevFormData,
                avatar: file
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleImageClick = () => {
        alert('Image clicked!');
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value,
        }));
        setFormErrors((prevFormErrors) => ({
            ...prevFormErrors,
            [id]: false,
        }));
    };

    const handleSave = async () => {
        const { name, email, phone } = formData;
        if (!name || !email || !phone) {
            setFormErrors({
                name: !name,
                email: !email,
                phone: !phone,
            });
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('avatar', formData.avatar);


        try {
            let response;
            if (mode === 'edit') {
                response =await dispatch(EditEmployee(formDataToSend, data._id));
                // closeHandler();
            } else {
                response = await dispatch(createEmp(formDataToSend));
            }
            // if (response) {
            //     handleClose();
            // }
            if (response) {
                enqueueSnackbar(
                    mode === 'edit' ? 'Employee updated successfully!' : 'Employee created successfully!',
                    { variant: 'success' }
                );
                handleClose();
            }

        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }

    }

    return (
        <div>
            {mode === "edit" ?
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-8 rounded" onClick={handleOpen}>
                    Edit
                </button> :
                <button className='bg-indigo-900 rounded-lg text-white w-full lg:w-[150px] h-[46px] hover:bg-[#c4bcb8]' onClick={handleOpen}>Create</button>

            }

            <Dialog open={open} maxWidth="sm" fullWidth sx={{ borderRadius: '15px' }}>
                <DialogTitle className='text-[24px] font-medium'>
                    {mode === "edit" ?
                        'Edit' : 'create'}
                    <IconButton
                        aria-label='close'
                        onClick={handleClose}
                        sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <Box component="form" noValidate autoComplete="off">
                        <h3 className='text-[15px]'>Name</h3>
                        <TextField
                            autoFocus
                            margin='dense'
                            id='name'
                            type='text'
                            fullWidth
                            required
                            value={formData.name}
                            onChange={handleChange}
                            error={formErrors.name}
                            helperText={formErrors.name && "Name is required"}
                        />
                        <h3 className='text-[15px]'>Email</h3>
                        <TextField
                            autoFocus
                            margin='dense'
                            id='email'
                            type='email'
                            fullWidth
                            required
                            value={formData.email}
                            onChange={handleChange}
                            error={formErrors.email}
                            helperText={formErrors.email && "Email is required"}
                        />
                        <h3 className='text-[15px]'>Phone</h3>
                        <TextField
                            autoFocus
                            margin='dense'
                            id='phone'
                            type='tel'
                            fullWidth
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            error={formErrors.phone}
                            helperText={formErrors.phone && "Phone is required"}
                        />
                        <DropZone onFileUpload={onFileUpload} preview={previewImage2} onImageClick={handleImageClick} />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'center', paddingTop: "10px", paddingBottom: "20px" }}>
                    <Button
                        sx={{ backgroundColor: '#312e81', '&:hover': { backgroundColor: '#312e81' }, borderRadius: '10px', width: '100px' }}
                        variant="contained"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                    <Button
                        sx={{ color: '#312e81', borderColor: '#312e81', borderRadius: '10px', '&:hover': { borderColor: '#312e81' } }}
                        variant="outlined" onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CreateSection;
