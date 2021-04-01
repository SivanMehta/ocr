import React, { useEffect, useState } from 'react';

function OCR({ worker, file }) {
  if(!file) return 'No file selected';

  const url = URL.createObjectURL(file);

  const doOCR = async () => {
    const { data: { text } } = await worker.recognize(url);
    setOcr(text);
  };
  
  const [ocr, setOcr] = useState('Working...');

  useEffect(() => {
    doOCR();
  });

  return (
    <pre>{ocr}</pre>
  );
}

export default OCR;
