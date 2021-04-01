import React, { useState, useEffect } from 'react';
import { FileDrop } from 'react-file-drop';

import OCR from './ocr';
const { createWorker } = Tesseract;
const worker = createWorker();

function ImageThumb ({ image }){
  return <img src={URL.createObjectURL(image)} alt={image.name} />;
};

function Stats({ image }) {
  return (
    <div>
      <p>Filename: {image.name}</p>
      <p>File type: {image.type}</p>
      <p>File size: {image.size} bytes</p>
    </div>
  );
}

function Upload({ setFile }) {
  const styles = { border: '1px solid black', width: 600, color: 'black', padding: 20 };
  return (
    <div>
      <div style={styles}>
        <FileDrop onDrop={ files => setFile(files[0]) }>
          Drop some files here!
        </FileDrop>
      </div>
      <p>
        Or select a file: <input type="file" onChange={ e => setFile(e.target.files[0]) } />
      </p>
    </div>
  );
}

function Loading({ children, ready, message='' }) {
  return ready ? children : (message);
}

function App() {
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

      <Loading ready={ file }>
        <ImageThumb image={ file } />
      </Loading>

      <Loading ready={ ready } message='Loading OCR Model...'>
        <OCR file={ file } worker={ worker } />
      </Loading>

      <Loading ready={ file }>
        <Stats image={ file } />
      </Loading>
    </div>
  );
}


export default App;
