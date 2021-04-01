import React, { useState, useEffect } from 'react';
import OCR from './ocr';
const { createWorker } = Tesseract;
const worker = createWorker({
  logger: log => console.log(log)
});

/**
 * Component to display thumbnail of image.
 */
function ImageThumb ({ image }){
  return <img src={URL.createObjectURL(image)} alt={image.name} />;
};

function Loading({ file, worker, ready }) {
  return ready ?
    <OCR file={ file } worker={ worker } /> :
    'Loading OCR model...';
}

function App() {
  // State to store uploaded file
  const [file, setFile] = useState(false);

  const loadModel = async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    setReady(true);
  };

  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadModel();
  });

  return (
    <div className='container'>
      <div>
        <input type="file" onChange={ e => setFile(e.target.files[0]) } />
        <p>Filename: {file.name}</p>
        <p>File type: {file.type}</p>
        <p>File size: {file.size} bytes</p>
        {file && <ImageThumb image={ file } />}
      </div>
      <Loading file={ file } worker={ worker } ready={ ready }/>
    </div>
  );
}


export default App;
