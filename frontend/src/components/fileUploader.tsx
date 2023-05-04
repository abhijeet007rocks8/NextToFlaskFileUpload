// Write a react functional component to upload a file to the server.

import React, { useState } from 'react';
import axios from 'axios';

const FileUploader = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState(null);

    const handleFileChange = (e:any) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file || '');
        formData.append('fileName', fileName || '');
        try {
            const res = await axios.post('http://127.0.0.1:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FileUploader;
