import React, { useState } from 'react';

const UploadPage: React.FC = () => {

  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const url = fileReader.result as string;
        setFileUrl(url);
      };
      fileReader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <h2>Upload Page</h2>
      <div>
      <input type="file" onChange={handleFileChange} />
      {fileUrl && (
        <div>
          <h2>Preview:</h2>
          <iframe src={fileUrl} width="500px" height="500px" title="File Preview" />
        </div>
      )}
    </div>
    </div>
  );
};

export default UploadPage;