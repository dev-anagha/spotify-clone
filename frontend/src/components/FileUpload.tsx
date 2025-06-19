import React, { useRef, useState } from 'react';
import { Button, LinearProgress, Typography, Box } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import api from '../services/api';

interface FileUploadProps {
  directory: string;
  onUpload: (filePath: string) => void;
  accept?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ directory, onUpload, accept }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [uploadedPath, setUploadedPath] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    setProgress(0);
    try {
      const filePath = await api.uploadFile(file, directory);
      setUploadedPath(filePath);
      onUpload(filePath);
    } catch (err: any) {
      setError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box>
      <input
        type="file"
        ref={inputRef}
        style={{ display: 'none' }}
        accept={accept}
        onChange={handleFileChange}
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<CloudUploadIcon />}
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
      >
        Upload File
      </Button>
      {uploading && <LinearProgress sx={{ mt: 2 }} />}
      {uploadedPath && (
        <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
          Uploaded: {uploadedPath}
        </Typography>
      )}
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload; 