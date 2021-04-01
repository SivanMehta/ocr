import React, { useState } from 'react';

function FileUpload() {
  // State to store uploaded file
  const [file, setFile] = useState(false);

  return (
    <div id="upload-box">
      <input type="file" onChange={ e => setFile(e.target.files[0]) } />
      <p>Filename: {file.name}</p>
      <p>File type: {file.type}</p>
      <p>File size: {file.size} bytes</p>
      {file && <ImageThumb image={file} />}
    </div>
  );
}

/**
 * Component to display thumbnail of image.
 */
const ImageThumb = ({ image }) => {
  return <img src={URL.createObjectURL(image)} alt={image.name} />;
};

function App() {
  return <FileUpload />
}


export default App;
