import React, { useState, useEffect } from 'react';
import { FileDrop } from 'react-file-drop';

import OCR from './ocr';
const { createWorker } = Tesseract;
const worker = createWorker();

function ImageThumb ({ image }){
  return <img src={URL.createObjectURL(image)} alt={image.name} />;
};

function Preview({ file }) {
  return file && (
    <div>
      <p>Filename: {file.name}</p>
      <p>File type: {file.type}</p>
      <p>File size: {file.size} bytes</p>
      <ImageThumb image={ file } />
    </div>
  );
}

function Upload({ setFile }) {
  const styles = { border: '1px solid black', width: 600, color: 'black', padding: 20 };
  return (
    <div style={styles}>
      <FileDrop onDrop={ files => setFile(files[0]) }>
        Drop some files here!
      </FileDrop>
    </div>
  );
}

function Loading({ file, worker, ready }) {
  return ready ?
    <OCR file={ file } worker={ worker } /> :
    'Loading OCR model...';
}

function App() {
  // State to store uploaded file
  const [file, setFile] = useState(false);
  const [ready, setReady] = useState(false);

  const loadModel = async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    setReady(true);
  };

  useEffect(() => {
    loadModel();
  });

  return (
    <div className='container'>
      <Upload setFile={ setFile } />
      <Preview file={ file } />
      <Loading file={ file } worker={ worker } ready={ ready }/>
    </div>
  );
}


export default App;
