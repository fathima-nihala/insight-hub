import React, { useCallback } from 'react'
import img from '../assets/user-removebg-preview.png'
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { Box } from '@mui/material';


const DropZone = ({ onFileUpload, preview, onImageClick }) => {

    const onDrop = useCallback(acceptedFiles => {
        onFileUpload(acceptedFiles);
    }, [onFileUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
    });

    return (
        <div {...getRootProps()} className={`rounded-[10px] bg-[#D9D9D9] border p-10 text-center cursor-pointer ${isDragActive ? 'active' : ''}`}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <Box margin="auto" className="flex flex-col justify-center text-center">

                    {preview ?
                        <div onClick={onImageClick} className='flex items-center justify-center object-cover'>
                            <img src={preview} alt="" style={{ maxWidth: '100%', maxHeight: '200px', cursor: 'pointer' }} />
                        </div> : <div className='flex items-center justify-center object-cover'>
                            <img src={img} className='' />
                        </div>
                    }

                </Box>
            )}

        </div>
    );
};

DropZone.propTypes = {
    onFileUpload: PropTypes.func.isRequired,
    preview: PropTypes.string,
    onImageClick: PropTypes.func.isRequired,
};

export default DropZone;
