import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function FileUpload({ onFileUpload }: { onFileUpload: (content: string) => void }) {
  const [fileName, setFileName] = useState<string | null>(null);

  // Define handleFileChange
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onFileUpload(content); // Pass the file content to the parent component
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="file"
        accept=".txt"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange} // Use the correct function
      />
      <label htmlFor="file-upload">
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Upload Chat
        </Button>
      </label>
      {fileName && (
        <Typography variant="body1" className="text-white">
          Uploaded: {fileName}
        </Typography>
      )}
    </div>
  );
}