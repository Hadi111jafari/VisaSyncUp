import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const CustomDropzone = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div style={dropzoneStyles}>
      <div {...getRootProps()} style={dropzoneInnerStyles}>
        <input {...getInputProps()} />
        <p>
          {selectedFiles.length > 0 ? selectedFiles[0].name : 'No file chosen'}
        </p>
        <button onClick={() => {}} className="border p-1">
          Select Files
        </button>
      </div>
    </div>
  );
};

const dropzoneStyles = {
  border: '2px dashed #eee',
  borderRadius: '4px',
  textAlign: 'center',
  cursor: 'pointer',
  width: '15rem',
  margin: '0 auto',
};

const dropzoneInnerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export default CustomDropzone;
